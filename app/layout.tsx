import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/common/header";
import Footer from "@/components/ui/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DocSummarizer -AI Powered Pdf Summarization",
  description:
    "Save Hours Of reading time ,Transform lengthy PDF's into clear ,accurate summaries in seconds with our advanced Ai technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative min-h-screen flex flex-col justify-between bg-red-50">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster richColors/>
        </body>
      </html>
    </ClerkProvider>
  );
}
