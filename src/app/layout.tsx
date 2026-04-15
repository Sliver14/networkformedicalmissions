import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const reey = localFont({
  src: [
    {
      path: '../../public/assets/vendors/reey-font/reey-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-reey'
});

export const viewport: Viewport = {
  themeColor: "#06b6d4",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Network for Medical Missions",
  description: "Network for Medical Missions - Providing medical, relief and community support services.",
  icons: {
    icon: [
      { url: "/assets/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/assets/images/favicons/favicon.ico",
    apple: "/assets/images/favicons/apple-touch-icon.png",
  },
  manifest: "/assets/images/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </head>
      <body className={`${nunito.variable} ${reey.variable} font-sans antialiased`}>
        <Providers>
          <div className="page-wrapper flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
