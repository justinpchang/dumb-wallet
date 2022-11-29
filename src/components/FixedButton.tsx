import { useRouter } from "next/router";
import Link from "next/link";

import { Plus } from "react-feather";

const PATHS_WITH_ADD_BUTTON = ["/"];

const FixedButton = () => {
  const router = useRouter();

  const withAddButton = PATHS_WITH_ADD_BUTTON.includes(router.pathname);

  return (
    <>
      {withAddButton && (
        <Link href="/transactions/add">
          <div className="fixed w-20 h-20 flex justify-center items-center bottom-3 right-3 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white rounded-full drop-shadow-lg">
            <a>
              <Plus size={50} />
            </a>
          </div>
        </Link>
      )}
    </>
  );
};

export default FixedButton;
