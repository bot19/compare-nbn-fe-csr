'use client';
import { Header } from '@/components/Header';
import { Page } from '@/components/Page';
import { Footer } from '@/components/Footer';
import './css/index.css';

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-900 p-4">
      <Header />
      <Page />
      <Footer />
    </div>
  );
}
