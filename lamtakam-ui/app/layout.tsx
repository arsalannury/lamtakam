"use client";

import "./globals.css";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import localFont from "next/font/local";
import { useEffect } from "react";
import  Head  from 'next/head';

const IranSans = localFont({
  src: "../font/Sans a4fran3.ttf",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const call = async () => {
      const session = await getSession();
      if (!session) {
        router.replace("/auth");
      }
    };
    call();
  }, []);

  return (
    <>
      <Head>
        <title>لام تا کام</title>
      </Head>
      <html lang="en" className={IranSans.className}>
        <body style={{ margin: "0" }}>{children}</body>
      </html>
    </>
  );
}
