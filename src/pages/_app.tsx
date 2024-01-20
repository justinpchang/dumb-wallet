import "../styles/globals.css";

import type { AppProps } from "next/app";

import FixedButton from "../components/FixedButton";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        <div className="flex flex-col justify-start items-center pt-10">
          <Component {...pageProps} />
        </div>
        <FixedButton />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
