import { AiOutlineLoading } from "react-icons/ai";

import { Layout } from "./modals";

export default function Loader({
  text,
  isOpen,
}: {
  isOpen: boolean;
  setIsOpen?: (e: any) => void;
  text: string;
}) {
  return (
    <div>
      {isOpen && (
        <Layout isOpen={isOpen} setIsOpen={() => {}}>
          <div
            data-testid="loader"
            className="w-[220px] flex flex-col justify-center items-center px-10 py-[40px] gap-y-4 rounded-lg bg-white text-center shadow-[0px_20px_24px_0px_rgba(16,24,40,0.08),_0px_8px_8px_0px_rgba(16,24,40,0.03)]"
          >
            <span>
              <AiOutlineLoading
                data-testid="AiOutlineLoading"
                className="text-[60px] test-[#636363] animate-spin"
              />
            </span>
            <p className="text-base capitalize">{text}</p>
          </div>
        </Layout>
      )}
    </div>
  );
}
