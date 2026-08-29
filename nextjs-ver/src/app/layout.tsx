import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Analytics using Next.js",
  description: "A simple web analytics dashboard built with Next.js and Vercel",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black">
          <main className="flex gap-6 w-full max-w-3xl flex-col items-start justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            {children}
            {/* <Analytics /> */}
          </main>
        </div>
      </body>
    </html>
  );
}
