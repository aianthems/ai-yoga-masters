import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Yoga Masters",
  description:
    "Ancient practice for intelligent tools. Train attention, judgment, and agency in the age of AI.",
  openGraph: {
    title: "AI Yoga Masters",
    description: "Train the user, not only the model.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
