import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhamma map",
  description: "A visual, structured map of core Theravada Buddhist teachings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
