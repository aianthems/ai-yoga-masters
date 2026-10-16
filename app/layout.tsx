import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import SiteFooter from "./components/site-footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, robotsMetadata } from "../lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  robots: robotsMetadata(),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<SiteFooter /></body>
    </html>
  );
}
