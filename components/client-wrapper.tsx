
"use client";  

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ActiveThemeProvider } from "@/components/active-theme";
import { cn } from "@/lib/utils";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
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
    <div
      className={cn(
        activeThemeValue ? `theme-${activeThemeValue}` : "",
        isScaled ? "theme-scaled" : ""
      )}
      style={{
        colorScheme: activeThemeValue?.includes("dark") ? "dark" : "light",
      }}
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
    </div>
  );
}
