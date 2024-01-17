import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";
import { useGetUserQuery, useGetUsersPermissionsQuery } from "../../api";
import { removeNullEmptyKeys } from "@app/utils";
import { Switch } from "@headlessui/react";
import { ProductSearch, Button, FormToolTip } from "@app/components";
import { FormUpload, RedDot } from "../forms";
interface LiquidationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  detail: any;
  title: string;
  type: string;
}

export function handleSuccess(userIsSuccess, setUsers, branchMembersData) {
  if (userIsSuccess) {
    setUsers(
      branchMembersData?.data?.map((i) => {
        return {
          ...i,
          name: i.fullname,
          value: i.id,
        };
      })
    );
  }
}
export default function Liquidation({
  isOpen,
  setIsOpen,
  onConfirm,
  detail,
  title,
  type,
}: LiquidationProps): React.JSX.Element {
  const [reason, setReason] = React.useState<any>("");
  const [users, setUsers] = React.useState([]);
  const [isTrue, setIsTrue] = React.useState(true);
  const [queryParams, setQueryParams] = React.useState({
    page: 1,
    size: 1500,
    search: "",
    branchId: "12",
    state: "ACTIVE",
  });

  // const { data, isSuccess, isError, isLoading } = useGetUserQuery(creatorId);

  // React.useEffect(() => {
  //   if (isSuccess) {
  //   }
  //   if (isError) {
  //   }
  // }, [isSuccess, data, isError]);
  // React.useEffect(() => {
  //   handleSuccess(userIsSuccess, setUsers, branchMembersData);
  // }, [userIsSuccess]);
  const text =
    "The customer is required to provide a 10-day notice before requesting part liquidation, proceeding with this request implies that the customer has given ample notice as specified.";
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} data-testid="Layout">
      <div className="w-[700px] p-8 rounded-lg bg-white text-left shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex justify-between items-center pb-4 mb-[42px] border-b border-[#CCCCCC]">
          <h3 className="text-[#747373] font-bold text-xl uppercase">
            {title}
          </h3>
          <button
            data-testid="cancel-btn"
            onClick={() => setIsOpen(false)}
            className="p-2 outline-none bg-transparent"
          >
            <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
          </button>
        </div>

        <div className="overflow-y-auto h-[500px] pr-6">
          <div className="flex items-start mb-10 rounded-[10px] border border-[#EBEBEB] bg-[#AAAAAA12] py-6 px-5 gap-x-[6px]">
            <span className="inline-flex mt-1">
              <FaInfoCircle className="text-[#D4A62F]" />
            </span>
            <span className="text-sm text-[#747373]">{text}</span>
          </div>

          <div>
            {type === "part" && (
              <div className="mb-10">
                <label
                  htmlFor="reason"
                  className="flex items-center text-[#333333] mb-2 gap-x-1"
                >
                  Amount to liquidate{" "}
                  <span className="flex">
                    {" "}
                    <RedDot />
                  </span>
                </label>
                <div className="relative flex items-center max-w-[642px] mb-[2px]">
                  <input
                    id="productName"
                    data-testid="product-name"
                    className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
                    placeholder="Enter value"
                  />
                  <div className="overflow-hidden absolute right-0 text-[10px] text-[#8F8F8F] flex items-center   rounded-full shadow-[0px_0px_1px_0px_rgba(26,32,36,0.32),0px_1px_2px_0px_rgba(91,104,113,0.32)] border-[#E5E9EB]">
                    <span className="w-[55px] border-r border-[#E5E9EB] py-1 px-2">
                      {" "}
                      NGN
                    </span>

                    <span className="w-[55px] py-1 px-2 bg-[#FFE9E9]">
                      {" "}
                      Percent
                    </span>
                  </div>
                </div>
                <div className="text-sm text-[#AAAAAA]">
                  <span> Max: 50% of investment(NGN 500,000)</span>{" "}
                </div>
              </div>
            )}
            <div className="mb-10">
              <label
                htmlFor="reason"
                className="flex items-center text-[#333333] mb-2 gap-x-1"
              >
                Provide justification for {type} liquidation{" "}
                <span className="flex">
                  {" "}
                  <RedDot />
                </span>
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                required
                className="outline-none border border-[#AAAAAA] rounded-lg px-3 py-[11px] w-full resize-none"
                placeholder="Reason"
                data-testid="reason-input"
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-2 w-[300px]">
                <label
                  htmlFor="upload"
                  className="flex items-center text-[#333333] mb-2 gap-x-1"
                >
                  Upload Supporting Documents{" "}
                  <span className="flex">
                    {" "}
                    <RedDot />
                  </span>
                </label>
              </div>
              <FormUpload
                data-testid="input"
                accept={[]}
                onUploadComplete={(value) => {}}
              />
            </div>
            <div className="mb-10">
              <div className="flex items-center gap-2 w-[300px]">
                <label
                  htmlFor="upload"
                  className="text-[#333333] mb-2 flex items-center"
                >
                  Notify customer of liquidation
                  <span className="flex">
                    {" "}
                    <RedDot />
                  </span>
                </label>
                <FormToolTip tip="Hello" />
              </div>
              <Switch
                checked={isTrue}
                onChange={() => {}}
                className={classNames(
                  isTrue ? "bg-[#CF2A2A]" : "bg-transparent",
                  "border-[#CF2A2A] relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border  transition-colors duration-200 ease-in-out focus:outline-none ring-0  "
                )}
              >
                <span
                  data-testid="switch"
                  aria-hidden="true"
                  className={classNames(
                    isTrue
                      ? "translate-x-[14px] bg-white"
                      : "translate-x-0  bg-white ",
                    "pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full border border-[#CF2A2A] shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <div className="mb-10 rounded-[10px] border border-[#EBEBEB] bg-[#AAAAAA12] py-6 px-5">
              <div className="flex items-center gap-x-1 mb-2">
                <span className="inline-flex mr-1">
                  <FaInfoCircle className="text-[#D4A62F]" />
                </span>
                <span className="text-sm text-[#747373] font-semibold capitalize">
                  {type} Liquidation Penalties
                </span>
                <span className="text-xs  font-semibold text-red-600">
                  [<span>Prototype only</span>:{" "}
                  <span className="font-normal">Possible displays</span>]
                </span>
              </div>
              <span className="block text-sm text-[#747373] mb-4">None</span>
              <span className="block text-sm text-[#747373] mb-4">
                Forfeiture of 20% of accrued interests
              </span>
              <span className="block text-sm text-[#747373] mb-4">
                Forfeiture of all accrued interests
              </span>
              <div className="flex items-center mb-2  gap-x-1">
                <span className="text-sm text-[#747373]">Charge: </span>
                <span className="text-sm text-[#747373] font-semibold">
                  Term Deposition Liquidation Charge [NGN 1,859]
                </span>
              </div>
            </div>
            <div className="flex items-center mb-10 rounded-[10px] border border-[#EBEBEB] bg-[#AAAAAA12] py-6 px-5 gap-x-1">
              <span className="text-sm text-[#747373]">
                Liquidation value:{" "}
              </span>
              <span className="text-sm text-[#747373] font-semibold">
                NGN 1,858,4959,999
              </span>
            </div>

            <div className="flex justify-center items-center">
              <Button
                type="button"
                data-testid="submit-btn"
                onClick={() => onConfirm()}
                disabled={reason?.length < 3}
                className="rounded-lg text-base font-medium py-[5px] bg-sterling-red-800 border border-[#D8DAE5] text-white px-10"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
