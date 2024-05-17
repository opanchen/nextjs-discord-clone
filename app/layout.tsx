import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL as string;

export const metadata: Metadata = {
  title: "Discord Clone",
  description:
    "Team Chat Application built with Next.js, TailwindCSS, ShadcnUI, Socket.io, MySQL and Prisma.",
  // metadataBase: new URL(baseUrl), //! --- triggers an error
  alternates: {
    canonical: baseUrl,
  },
  manifest: "/meta/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/meta/favicon.ico",
      },
      {
        url: "/meta/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/meta/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/meta/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/meta/favicon.ico",
    apple: "/meta/apple-touch-icon.png",
    other: {
      rel: "/meta/apple-touch-icon.png",
      url: "/meta/apple-touch-icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
            <SocketProvider>
              <ModalProvider />

              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
