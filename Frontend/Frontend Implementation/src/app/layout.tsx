import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SearchProvider } from "@/components/SearchContext"; // Add this import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC Builder",
  description: "Custom PC Builder",
  icons: {
    icon: '/images/PCBuilder.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider> {/* Add this wrapper */}
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </SearchProvider> {/* Close the wrapper */}
      </body>
    </html>
  );
}
