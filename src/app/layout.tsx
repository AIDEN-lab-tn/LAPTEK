import { Inter } from 'next/font/google';
import './css/style.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Laptek Store - Gaming & Tech Hub',
  description: 'Professional e-commerce dashboard for gaming laptops, PCs, and accessories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}