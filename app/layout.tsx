"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ActiveThemeProvider } from "@/components/active-theme";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeThemeValue, setActiveThemeValue] = useState<string | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const themeFromCookie = Cookies.get("active_theme");
    setActiveThemeValue(themeFromCookie);
    setMounted(true);
  }, []);

  const isScaled = activeThemeValue?.endsWith("-scaled");


  if (!mounted) return null;

  return (
    <html
      lang="en"
      className={activeThemeValue ? `theme-${activeThemeValue}` : ""}
      style={{
        colorScheme: activeThemeValue?.includes("dark") ? "dark" : "light",
      }}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : ""
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            {children}
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
