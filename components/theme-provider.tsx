"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Enable view transitions for smooth theme switching if supported
  React.useEffect(() => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const style = document.createElement("style");
      style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.4s;
          animation-timing-function: ease-in-out;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
