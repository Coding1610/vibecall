import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import "react-datepicker/dist/react-datepicker.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibe Call",
  description: "A fun and engaging way to connect",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl:"/icons/logo.svg",
          socialButtonsVariant:'iconButton',
        },
        variables:{
          colorText:"#fff",
          colorPrimary:"#0E78F9",
          colorBackground:"#1c1f2e",
          colorInputBackground:"#252a41",
          colorInputText:"#fff",
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}