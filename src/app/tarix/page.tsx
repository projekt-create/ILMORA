import type { Metadata } from 'next';
import { HistoryHub } from '@/features/history/components/HistoryHub';

export const metadata: Metadata = { title: 'Tarix — ILMORA', description: 'O‘zbekiston va jahon tarixini tizimli o‘rganish platformasi.' };

export default function HistoryPage() { return <HistoryHub />; }
