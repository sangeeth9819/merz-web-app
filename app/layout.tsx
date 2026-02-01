import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Using Google Sans Flex font
const googleSansFlex = localFont({
  src: [
    { path: "../public/fonts/GoogleSansFlex_24pt-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/GoogleSansFlex_24pt-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Merz - Corporate Banking Portal",
  description: "Secure payment and banking portal for corporate accounts",
  keywords: ["banking", "payments", "corporate", "finance"],
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${googleSansFlex.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="merz-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
