import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useStore } from "../utils/store";

const Transactions: NextPage = () => {
  const router = useRouter();
  const { session } = useStore();

  return (
    <>
      <h1 className="text-3xl">Transactions</h1>
      <div className="py-4" />
      <button onClick={() => router.push("/")}>Go to Profile</button>
    </>
  );
};

export default Transactions;
