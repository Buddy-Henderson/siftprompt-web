import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import our clean navbar component here
import Navbar from "@/components/Navbar"; 
import 'katex/dist/katex.min.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Upgraded to strict Next.js Metadata typing with advanced fallbacks
export const metadata: Metadata = {
  title: {
    default: 'SiftPrompt | Enterprise LLM Prompt Compression & Context Middleware',
    template: '%s | SiftPrompt',
  },
  description: 'Intercept and compress token sequences seamlessly. Reduce your LLM context costs by 35% to 50%, mitigate redundancy overhead, and accelerate streaming model response speeds.',
  keywords: ['Prompt Engineering', 'RAG Optimization', 'Context Window Compression', 'LLM Cost Reduction', 'Token Minification'],
  metadataBase: new URL("https://siftprompt.com"), // Crucial for absolute pathing resolutions
  alternates: {
    canonical: "/",
  },

  icons: {
    icon: '/favicon.jpg', 
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },

  openGraph: {
    title: 'SiftPrompt | Enterprise Prompt Compression Middleware',
    description: 'Stop wasting enterprise budget on boilerplate prompt data. Optimize context windows instantly.',
    url: 'https://siftprompt.com',
    siteName: 'SiftPrompt',
    images: [
      {
        url: 'https://siftprompt.com/og-cover.png', // Create a 1200x630 graphic placeholder later
        width: 1200,
        height: 630,
        alt: 'SiftPrompt Architecture Interface Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiftPrompt | Context Optimization Middleware',
    description: 'Compress RAG payload token counts securely before model ingestion.',
    images: ['https://siftprompt.com/og-cover.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Remove inline styles here, rely on the @apply in globals.css */}
      <body>
        <Navbar />
        <main className="w-full max-w-7xl mx-auto px-4 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}