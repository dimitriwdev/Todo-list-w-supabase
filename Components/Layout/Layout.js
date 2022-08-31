import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const titleBuilder = router.pathname.split("/").pop();
  const title = titleBuilder.charAt(0).toUpperCase() + titleBuilder.slice(1);

  return (
    <div>
      <Head>
        <title>{title ? title : "Darkmode + Tailwind"}</title>
        <meta name="description" content="darkmode + tailwind test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between bg-gray-300 dark:bg-zinc-800">
        <header>
          <Navbar />
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
