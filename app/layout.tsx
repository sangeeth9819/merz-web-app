import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Using Inter as a temporary font until Google Sans is downloaded
// To use Google Sans Flex: download from https://fonts.google.com/specimen/Google+Sans+Flex
// and place font files in /public/fonts/
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Merz - Corporate Banking Portal",
  description: "Secure payment and banking portal for corporate accounts",
  keywords: ["banking", "payments", "corporate", "finance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
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
