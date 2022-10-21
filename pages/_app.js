import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
import { I18NProvider } from "context/i18n";
function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <I18NProvider>
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  );
}

export default MyApp;
