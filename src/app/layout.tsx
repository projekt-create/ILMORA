import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { AppLayout } from '@/components/layout/AppLayout';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
};

export const metadata: Metadata = {
  title: 'ILMORA — O‘zbekiston qonunchiligini o‘rganish platformasi',
  description:
    'O‘zbekiston Respublikasi qonunchiligi, kodekslar, qonunlar va normativ-huquqiy hujjatlarni o‘rganish bo‘yicha zamonaviy elektron huquqiy kutubxona va ta\'lim platformasi.',
  keywords: [
    'ILMORA',
    'qonun',
    'kodeks',
    'O‘zbekiston qonunchiligi',
    'lexuz',
    'huquq',
    'milliy sertifikat',
    'konstitutsiya',
    'jinoyat kodeksi',
    'mehnat kodeksi',
  ],
  authors: [{ name: 'ILMORA EdTech Platform' }],
  openGraph: {
    title: 'ILMORA — O‘zbekiston qonunchiligini o‘rganish platformasi',
    description: 'Zamonaviy elektron huquqiy kutubxona va ta\'lim platformasi',
    url: 'https://ilmora.uz',
    siteName: 'ILMORA',
    locale: 'uz_UZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-700 dark:selection:text-amber-300">
        <AppProviders>
          <AppLayout>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  );
}
