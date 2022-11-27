import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center pt-10">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
