import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

const BASE_URL = 'https://portafolio-production-c136.up.railway.app';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    es: 'Wilfredo Melgar | Desarrollador Full Stack',
    en: 'Wilfredo Melgar | Full Stack Developer',
  };

  const descriptions: Record<string, string> = {
    es: 'Ingeniero de Sistemas y Desarrollador Full Stack. Portfolio profesional con proyectos, blog y experiencia en desarrollo web.',
    en: 'Systems Engineer & Full Stack Developer. Professional portfolio with projects, blog and web development experience.',
  };

  return {
    title: {
      default: titles[locale] || titles.es,
      template: `%s | Wilfredo Melgar`,
    },
    description: descriptions[locale] || descriptions.es,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'es': '/es',
      },
    },
    openGraph: {
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
      url: `${BASE_URL}/${locale}`,
      siteName: 'Wilfredo Melgar Portfolio',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.es,
      description: descriptions[locale] || descriptions.es,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!(['en', 'es'] as string[]).includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
