import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from '../components/Layout';
import "./globals.css";
import { getSessionUser } from '@/utils/session'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Created by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser();
  const isLoggedIn = !!user;
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout isLoggedIn={isLoggedIn}>{children}</Layout>
      </body>
    </html>
  );
}