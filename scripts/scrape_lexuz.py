#!/usr/bin/env python3
"""Build full, current Lex.uz code data for the ILMORA law library.

The downloader keeps the official hierarchy, article headings and every current
article paragraph. Every article also retains its precise Lex.uz anchor so the
reader can verify the source without relying on a copied text alone.
"""

import json
import os
import re
import sys
import time
from bs4 import BeautifulSoup
import requests

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "data")

CODES = [
    {"slug": "konstitutsiya", "docId": 6445145, "totalArticles": 155},
    {"slug": "jinoyat-kodeksi", "docId": 111453, "totalArticles": 302},
    {"slug": "fuqarolik-kodeksi", "docId": 111189, "totalArticles": 1199},
    {"slug": "mehnat-kodeksi", "docId": 6257288, "totalArticles": 581},
    {"slug": "mamuriy-javobgarlik-kodeksi", "docId": 97664, "totalArticles": 348},
    {"slug": "oila-kodeksi", "docId": 104720, "totalArticles": 238},
    {"slug": "soliq-kodeksi", "docId": 4674902, "totalArticles": 483},
    {"slug": "jinoyat-protsessual-kodeksi", "docId": 111460, "totalArticles": 605},
    {"slug": "fuqarolik-protsessual-kodeksi", "docId": 3517337, "totalArticles": 457},
    {"slug": "iqtisodiy-protsessual-kodeksi", "docId": 3523891, "totalArticles": 351},
    {"slug": "mamuriy-sud-ishlarini-yuritish-kodeksi", "docId": 3527353, "totalArticles": 288},
    {"slug": "bojxona-kodeksi", "docId": 2876354, "totalArticles": 422},
    {"slug": "yer-kodeksi", "docId": 152653, "totalArticles": 93},
    {"slug": "uy-joy-kodeksi", "docId": 106136, "totalArticles": 141},
    {"slug": "budjet-kodeksi", "docId": 2304138, "totalArticles": 193},
    {"slug": "shaharsozlik-kodeksi", "docId": 5307951, "totalArticles": 88},
    {"slug": "saylov-kodeksi", "docId": 4386848, "totalArticles": 103},
    {"slug": "havo-kodeksi", "docId": 55594, "totalArticles": 136},
]

USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

def fetch_page(doc_id: int, latin: bool = True) -> str | None:
    # Some legacy Lex.uz documents are exposed only with, or only without,
    # the Latin-script URL's leading minus sign.
    prefixes = ["-", ""] if latin else [""]
    urls = [
        f"https://lex.uz/docs/{prefix}{doc_id}"
        for prefix in prefixes
    ]
    if latin:
        urls.extend(f"https://lex.uz/uz/docs/{prefix}{doc_id}" for prefix in prefixes)
    for url in urls:
        try:
            resp = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
            resp.raise_for_status()
            return resp.text
        except Exception as e:
            print(f"[ERROR] fetching {url}: {e}")
    return None

ARTICLE_RE = re.compile(r"^(\d+)(?:\s*[-.]?\s*(\d+|[a-z]))?\s*[-–—]?\s*modda\b", re.IGNORECASE)
CHAPTER_RE = re.compile(r"^(?:\d+|[IVXLCDM]+)\s*-?\s*bob\b", re.IGNORECASE)
SECTION_RE = re.compile(r"\bbo['ʻʼ‘’`]lim\b", re.IGNORECASE)
PART_RE = re.compile(r"\bqism\b", re.IGNORECASE)

def item_title(item) -> str:
    link = item.find("div", class_="docNavbar__item-link")
    return link.get_text(" ", strip=True) if link else ""


def extract_articles(item: BeautifulSoup, doc_id: int) -> list[dict]:
    articles = []
    for child in item.find_all("div", class_="docNabvar__child-link"):
        link = child.find("a")
        if not link:
            continue
        title = link.get_text(" ", strip=True)
        match = ARTICLE_RE.search(title)
        target = re.search(r"scrollText\('([^']+)'\)", link.get("href", ""))
        if not match or not target:
            continue

        number = int(match.group(1))
        suffix = match.group(2) or ""
        id_base = f"{number}-{suffix}" if suffix else str(number)
        articles.append({
            "id": f"{id_base}-modda",
            "number": number,
            "suffix": suffix or None,
            "title": title,
            "content": "",
            "sourceUrl": f"https://lex.uz/docs/-{doc_id}#{target.group(1)}",
        })
    return articles


def element_text(element) -> str:
    """Return the legal text, excluding Lex.uz's hover-action controls."""
    for controls in element.select(".lx_elem2, .COMMENT, .COMMENTLEXUZ"):
        controls.decompose()
    return element.get_text(" ", strip=True)


def article_key(number: int, suffix: str | None) -> tuple[int, str]:
    return (number, (suffix or "").replace(" ", "").lower())


def extract_article_bodies(soup: BeautifulSoup) -> dict[tuple[int, str], str]:
    """Collect ACT_TEXT blocks following every article heading in source order."""
    bodies: dict[tuple[int, str], list[str]] = {}
    current_key: tuple[int, str] | None = None

    for element in soup.select(".CLAUSE_DEFAULT.lx_elem, .ACT_TEXT.lx_elem"):
        classes = element.get("class", [])
        text = element_text(element)

        if "CLAUSE_DEFAULT" in classes:
            match = ARTICLE_RE.search(text)
            if match:
                current_key = article_key(int(match.group(1)), match.group(2))
                bodies.setdefault(current_key, [])
            else:
                current_key = None
            continue

        if current_key and text:
            bodies[current_key].append(text)

    return {
        key: "\n\n".join(paragraphs)
        for key, paragraphs in bodies.items()
        if paragraphs
    }


def parse_outline(soup: BeautifulSoup, doc_id: int) -> list[dict]:
    toc = soup.select_one(".docNavbar #dvToc")
    if not toc:
        return []

    parts = []
    current_part = None
    current_chapter = None

    def ensure_part():
        nonlocal current_part
        if current_part is None:
            current_part = {"id": "umumiy-qism", "title": "Umumiy qism", "chapters": []}
            parts.append(current_part)
        return current_part

    def add_chapter(title: str):
        nonlocal current_chapter
        part = ensure_part()
        current_chapter = {
            "id": f"{len(parts)}-bob-{len(part['chapters']) + 1}",
            "number": len(part["chapters"]) + 1,
            "title": title,
            "articles": [],
        }
        part["chapters"].append(current_chapter)
        return current_chapter

    for item in toc.find_all("div", class_="docNavbar__item", recursive=False):
        title = item_title(item)
        if not title:
            continue
        articles = extract_articles(item, doc_id)

        if not articles:
            if CHAPTER_RE.search(title):
                add_chapter(title)
            elif SECTION_RE.search(title) or PART_RE.search(title):
                current_part = {
                    "id": f"qism-{len(parts) + 1}",
                    "title": title,
                    "chapters": [],
                }
                parts.append(current_part)
                current_chapter = None
            continue

        if CHAPTER_RE.search(title):
            chapter = add_chapter(title)
        elif current_chapter is not None:
            chapter = current_chapter
        else:
            chapter = add_chapter(title)

        known_ids = {article["id"] for article in chapter["articles"]}
        chapter["articles"].extend(article for article in articles if article["id"] not in known_ids)

    return [part for part in parts if part["chapters"]]

def scrape_code(code_info: dict) -> dict | None:
    slug = code_info["slug"]
    doc_id = code_info["docId"]
    print(f"\n=== Scraping {slug} (docId={doc_id}) ===")
    html_uz = fetch_page(doc_id, latin=True)
    if not html_uz:
        return None
    soup_uz = BeautifulSoup(html_uz, "lxml")
    parts = parse_outline(soup_uz, doc_id)
    article_bodies = extract_article_bodies(soup_uz)

    for part in parts:
        for chapter in part["chapters"]:
            for article in chapter["articles"]:
                key = article_key(article["number"], article.get("suffix"))
                article["content"] = article_bodies.get(key, "")

    article_count = sum(
        len(chapter["articles"])
        for part in parts
        for chapter in part["chapters"]
    )
    full_text_count = sum(
        1
        for part in parts
        for chapter in part["chapters"]
        for article in chapter["articles"]
        if article["content"]
    )
    print(f"  Uzbek text: {len(parts)} parts, {article_count} articles, {full_text_count} with text")
    title_el = soup_uz.find("div", class_="act__header_title")
    doc_title = title_el.get_text(strip=True) if title_el else slug
    return {
        "slug": slug,
        "title": doc_title,
        "sourceUrl": f"https://lex.uz/docs/-{doc_id}",
        "articleCount": article_count,
        "parts": parts,
    }

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    requested_slugs = set(sys.argv[1:])
    known_slugs = {code["slug"] for code in CODES}
    unknown_slugs = requested_slugs - known_slugs
    if unknown_slugs:
        print("Unknown code slugs:", ", ".join(sorted(unknown_slugs)))
        sys.exit(2)

    codes_to_process = [code for code in CODES if not requested_slugs or code["slug"] in requested_slugs]
    processed = []
    failures = []
    for code in codes_to_process:
        try:
            data = scrape_code(code)
            if data:
                out_path = os.path.join(OUTPUT_DIR, f"{code['slug']}.json")
                with open(out_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                print(f"  Saved {out_path} ({data['articleCount']} articles)")
                processed.append((code['slug'], data['articleCount']))
            else:
                failures.append(code['slug'])
        except Exception as exc:
            print(f"[EXCEPTION] {code['slug']}: {exc}")
            failures.append(code['slug'])
        time.sleep(2)
    print("\n=== Summary ===")
    for slug, cnt in processed:
        print(f"  {slug}: {cnt} articles")
    if failures:
        print("  Failures:", ", ".join(failures))
    print(f"Output directory: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
