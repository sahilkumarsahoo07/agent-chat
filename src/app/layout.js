import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import MainLayout from "@/components/main-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/context/chat-context";

export const metadata = {
  title: "Agent-Chat",
  description: "Advanced AI Agent Chat Interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
