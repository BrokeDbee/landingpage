import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import QueryProvider from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Knutsford University SRC - Student Representative Council",
  description:
    "Stay updated with the latest news, events, and initiatives from the Knutsford University Student Representative Council. Your voice matters!",
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
        <QueryProvider>
          <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navigation />
            <div className="mt-20">{children}</div>
            <Footer />
          </main>
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
