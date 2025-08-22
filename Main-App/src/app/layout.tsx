import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const myFont = localFont({
  src: "../font/Jersey15-Regular.ttf",
});

export const metadata: Metadata = {
  title: "Raksha AI",
  description: "AI-Powered Crime Detection for a Safer Bandung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} 
      
       antialiased`}
      >
        <main className="gradient">
          <Navbar />
          {children}

          <Footer />
        </main>
      </body>
    </html>
  );
}
