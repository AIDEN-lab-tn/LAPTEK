"use client";
import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Layout } from '@/components/Dashboard/layout/layout';
import '../../css/dashboard/globals.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
        >
          <NextUIProvider>
            <Layout>
              {children}
            </Layout>
          </NextUIProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}