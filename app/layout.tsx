import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wilfredo Melgar | Ingeniero en Sistemas",
  description: "Ingeniero en Sistemas con 10 años de experiencia desarrollando soluciones tecnológicas innovadoras. Especializado en aplicaciones web escalables y de alto rendimiento.",
  openGraph: {
    title: "Wilfredo Melgar | Ingeniero en Sistemas",
    description: "Ingeniero en Sistemas con 10 años de experiencia desarrollando soluciones tecnológicas innovadoras.",
    url: "https://wilfredo-melgar.vercel.app",
    siteName: "Wilfredo Melgar Portfolio",
    images: [
      {
        url: "https://wilfredo-melgar.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilfredo Melgar | Ingeniero en Sistemas",
    description: "Ingeniero en Sistemas con 10 años de experiencia en desarrollo de software.",
    images: ["https://wilfredo-melgar.vercel.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
