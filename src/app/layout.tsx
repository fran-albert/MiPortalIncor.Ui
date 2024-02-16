import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SideBar from "@/components/sideBar";
import { Toaster } from "sonner";
import SessionAuthProvider from "@/context/SessionAuthProviders";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Portal - Incor",
  description: "Incor - Mi Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionAuthProvider>
          <SideBar />
          <Toaster richColors position="top-center" />
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
