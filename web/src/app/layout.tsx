import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fruit Design Academy",
  description: "Course platform for fruit design workshops and digital learning."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): ReactElement {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
