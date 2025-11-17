import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expression Visualizer",
  description: "Animated breakdown of (cosec A - cot A)(1 + cos A)"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
