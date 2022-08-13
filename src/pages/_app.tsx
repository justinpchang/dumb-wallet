import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
