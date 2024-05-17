import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SideBar from "@/components/sideBar";
import { Toaster } from "sonner";
import SessionAuthProvider from "@/context/SessionAuthProviders";
import MainContainer from "@/components/mainContainer";
import { SideBarV2 } from "@/components/component/side-bar-v2";
import { useRouter } from "next/navigation";

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
    <html lang="es">
      <body className={inter.className}>
        <SessionAuthProvider>
          <Toaster richColors position="top-center" />
          <MainContainer children={children} />
        </SessionAuthProvider>
      </body>
    </html>
  );
}
