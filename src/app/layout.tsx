import type { Metadata } from "next";
import "../../styles.css";

export const metadata: Metadata = {
  title: "NovelVerse - Truyện chữ đỉnh cao",
  description:
    "NovelVerse là giao diện đọc truyện Ruby Noir với trang chủ, chi tiết truyện và trang đọc chương.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="ruby-noir">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Lora:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,400,1,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-layout="ruby-noir">
        {children}
      </body>
    </html>
  );
}
