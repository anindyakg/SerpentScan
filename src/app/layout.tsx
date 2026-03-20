import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { AaravGptBadge } from '@/components/AaravGptBadge';
import { Footer } from '@/components/Footer';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SerpentScan | Automate Your Code Security',
  description: 'AI-driven code security scanner and SARIF reporter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} bg-[#000000] text-white antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <AaravGptBadge />
        </AuthProvider>
      </body>
    </html>
  );
}
