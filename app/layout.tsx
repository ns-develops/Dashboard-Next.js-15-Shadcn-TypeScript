
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientWrapper from "@/components/client-wrapper"; 


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "My App",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background overscroll-none font-sans antialiased">
     
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
