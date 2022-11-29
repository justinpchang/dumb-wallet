import "../styles/globals.css";

import type { AppProps } from "next/app";

import FixedButton from "../components/FixedButton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col justify-start items-center pt-10">
        <Component {...pageProps} />
      </div>
      <FixedButton />
    </div>
  );
}

export default MyApp;
