import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Search and explore movies and series using OMDb API",
  keywords: ["Next.js", "React", "TypeScript", "OMDB API"],
  openGraph: {
    title: "Movie Explorer",
    description: "Search and explore movies and series using OMDb API",
    images: [{
      url: "/Logo.png",
      width: 1200,
      height: 630,
      alt: "Movie Explorer Logo",
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
