import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "Network for Medical Missions",
  description: "Network for Medical Missions - Providing medical, relief and community support services.",
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
        <div className="page-wrapper">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
