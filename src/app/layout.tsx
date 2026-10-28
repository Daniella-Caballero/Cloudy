import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloudy",
  description: "Un espacio sencillo para tus notas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
