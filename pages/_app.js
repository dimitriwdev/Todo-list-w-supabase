import React from "react";
import Layout from "../Components/Layout/Layout";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

// INSTALL NEXT WITH TAILWIND
//
// yarn create next-app app-name
// yarn add -D tailwindcss postcss autoprefixer
// yarn tailwindcss init -p
//  =>  it created tailwind.config.js & postcss.config.js files
// add this at the top of global.css:
//
//  @tailwind base;
//  @tailwind components;
//  @tailwind utilities;
//
// remove Home.module.css file and import & styles in index.js
