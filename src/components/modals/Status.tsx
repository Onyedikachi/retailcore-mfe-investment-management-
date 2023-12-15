import React, { useContext } from "react";
import { IoIosUndo, IoIosRefresh } from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaTimes, FaAngleRight } from "react-icons/fa";
import ModalLayout from "./Layout";
import Button from "../Button";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "@app/utils";
import { IoChevronForward } from "react-icons/io5";

interface SuccessProps {
  text: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  canClose?: boolean;
  canCreate?: boolean
}

export function Success({
  text,
  isOpen,
  setIsOpen,
  canClose = false,
  canCreate = false
}: SuccessProps): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useContext(AppContext);

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative h-[400px] w-[606px] flex flex-col justify-between px-10 py-8 rounded-lg bg-white text-center items-center">
        <div className="flex justify-center items-center">
          <HiCheckCircle className="text-[80px] text-[#2FB755]" />{" "}
        </div>
        <p className="font-normal text-2xl">{text}</p>
        <div className="flex justify-between items-center gap-x-[6px] w-full">
          {location?.pathname === "/product-factory/investment" ? (
            <Button
              onClick={() =>
                role === "superadmin" ||
                location?.search === "?category=requests"
                  ? navigate(0)
                  : navigate("/product-factory/investment?category=requests")
              }
              type="button"
              data-testid="close-btn"
              className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-10 text-[#667085] outline-none"
            >
              <IoIosUndo className="text-sterling-red-800 text-4xl" /> Return to
              dashboard
            </Button>
          ) : (
            <Button
              onClick={() =>
                location?.search === "?category=requests"
                  ? navigate(0)
                  : navigate("/product-factory/investment?category=requests")
              }
              type="button"
              data-testid="dashboard-link"
              className={`text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full text-[#667085] outline-none`}
            >
              <IoIosUndo className="text-sterling-red-800 text-4xl" /> Return to
              dashboard
            </Button>
          )}

          {canCreate && (
            <Button
              onClick={() =>
                navigate("/product-factory/investment/term deposit/create")
              }
              type="button"
              data-testid="dashboard-link"
              className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full text-[#667085] outline-none"
            >
              Create another product  <FaAngleRight className="text-sterling-red-800 text-2xl" />
            </Button>
          )}
        </div>
        {canClose && (
          <button
            type="button"
            className="top-4 p-2 right-3 absolute"
            data-testid="can-close"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        )}
      </div>
    </ModalLayout>
  );
}

interface FailedProps {
  text: string;
  subtext: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  canClose?: boolean;
  canRetry?: boolean;
  canProceed?: boolean;
}
export function Failed({
  text,
  isOpen,
  subtext,
  setIsOpen,
  canClose = false,
  canRetry = false,
  canProceed = false,
}: FailedProps): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative h-[400px] w-[556px] flex flex-col justify-between px-10 py-8 rounded-lg bg-white text-center items-center">
        <div className="flex justify-center items-center mb-6">
          <RiErrorWarningFill className="text-[80px] text-danger-500" />{" "}
        </div>
        <p className="font-normal text-2xl">{text}</p>
        <p className="font-normal text-base mb-[26px]">{subtext}</p>
        <div
          className={`flex  items-center gap-x-10 w-full ${
            !canProceed && !canRetry ? "justify-center" : "justify-between"
          }`}
        >
          <div>
            {location?.pathname === "/product-factory/investment" ? (
              <Button
                onClick={() => navigate(0)}
                type="button"
                data-testid="close-btn"
                className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-1 text-[#667085] outline-none"
              >
                <IoIosUndo className="text-sterling-red-800 text-4xl" /> Return
                to dashboard
              </Button>
            ) : (
              <Button
                onClick={() =>
                  location?.search === "?category=requests"
                    ? navigate(0)
                    : navigate("/product-factory/investment?category=requests")
                }
                type="button"
                data-testid="dashboard-link"
                className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-1 text-[#667085] outline-none"
              >
                <IoIosUndo className="text-sterling-red-800 text-4xl" /> Return
                to dashboard
              </Button>
            )}
          </div>
          {canRetry && (
            <div>
              {" "}
              <Button
                onClick={() => setIsOpen(false)}
                type="button"
                data-testid="close-btn"
                className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-1 text-[#CF2A2A] hover:underline outline-none"
              >
                Click to retry
              </Button>
            </div>
          )}
          {canProceed && (
            <div>
              {" "}
              <Button
                onClick={() => setIsOpen(false)}
                type="button"
                data-testid="close-btn"
                className="flex gap-x-1 items-center text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-1 text-[#667085] outline-none"
              >
                Proceed
                <IoChevronForward className="text-[#CF2A2A] text-2xl" />
              </Button>
            </div>
          )}
        </div>
        {canClose && (
          <button
            type="button"
            className="top-4 p-2 right-3 absolute"
            data-testid="can-close"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        )}
      </div>
    </ModalLayout>
  );
}

interface PromptProps {
  heading?: string;
  text1: string;
  text2?: string;
  canProceed?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  canClose?: boolean;
}

export function Prompt({
  heading,
  text1,
  text2,
  canProceed = false,
  isOpen,
  setIsOpen,
  canClose = false,
}: PromptProps): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative h-[400px] w-[556px] flex flex-col justify-between px-10 py-8 rounded-lg bg-white text-center items-center">
        <div className="flex flex-col justify-center items-center">
          <RiErrorWarningFill className="text-[80px] text-sterling-red-800 mb-6" />{" "}
          {heading && <h4 className="font-normal text-2xl">{heading}</h4>}
        </div>
        <div>
          <p className="font-normal text-base">{text1}</p>
          {text2 && <p className="font-normal text-base">{text2}</p>}
        </div>
        <div
          className={`${
            canProceed ? "justify-between" : "justify-center"
          } w-full flex  items-center gap-x-[6px]`}
        >
          {location?.pathname === "/product-factory/investment" ? (
            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              data-testid="close-btn"
              className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-10 text-[#667085] outline-none"
            >
              <IoIosUndo className="text-sterling-red-800 text-4xl" /> Return to
              dashboard
            </Button>
          ) : (
            <Button
              onClick={() =>
                location?.search === "?category=requests"
                  ? navigate(0)
                  : navigate("/product-factory/investment?category=requests")
              }
              type="button"
              data-testid="dashboard-link"
              className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border w-full px-10 text-[#667085] outline-none"
            >
              <IoIosUndo className="text-sterling-red-800 text-4xl" /> Return to
              dashboard
            </Button>
          )}
          {canProceed && (
            <Button
              type="button"
              data-testid="proceed"
              className="text-base py-[5px] border-none font-normal h-[44px] bg-transparent border  px-0 text-[#667085] outline-none"
            >
              <span>Proceed</span>{" "}
              <FaAngleRight className="text-sterling-red-800 text-2xl" />
            </Button>
          )}
        </div>
        {canClose && (
          <button
            type="button"
            className="top-4 p-2 right-3 absolute"
            onClick={() => setIsOpen(false)}
            data-testid="can-close"
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        )}
      </div>
    </ModalLayout>
  );
}
