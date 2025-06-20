'use client';
import { Header } from '@/components/Header';
import { Page } from '@/components/Page';
import { Footer } from '@/components/Footer';
import './css/index.css';

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-900 p-2 sm:p-4 space-y-2 sm:space-y-6 max-w-screen-xl mx-auto">
      <Header />
      <Page />
      <Footer />
    </div>
  );
}
