import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from '../components/Layout';
import "./globals.css";
//import "../styles/global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Created by create next app",
};

//export default function RootLayout({
//  children,
//}: Readonly<{
//  children: React.ReactNode;
//}>) {
//  return (
//    <html lang="en">
//      <body className={inter.className}>{children}</body>
//    </html>
//  );
//}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}