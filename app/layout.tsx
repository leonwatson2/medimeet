import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/local";
import "./globals.css";
import { cn } from "/@lib/utils"
const fontSans = Plus_Jakarta_Sans({
  src: "latin",
  variable: "--font-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Medimeet",
  description: "Healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn}
      >
        {children}
      </body>
    </html>
  );
}
