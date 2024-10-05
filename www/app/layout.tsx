import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { DOMAIN } from "@repo/constant";

export const metadata: Metadata = {
  title: "CLI - Create Super Turbo",
  metadataBase: new URL(DOMAIN),
  description:
    "The create-super-turbo tool simplifies Turborepo setup, giving you a ready-made stack with React, Next.js, Express, and popular tools—all configured for immediate coding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
