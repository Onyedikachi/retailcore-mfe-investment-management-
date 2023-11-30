import React from "react";
import { Button } from "@app/components";
import SubmitSvg from "@app/assets/images/SubmitSvg";
import ModifySvg from "@app/assets/images/ModifySvg";
import CancelSvg from "@app/assets/images/CancelSvg";
export default function Actions() {
  return (
    <div className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-[60px] py-[40px]  ">
      <div className=" flex  gap-6">
        <button
          onClick={() => {}}
          type="button"
          className="max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
        >
          <CancelSvg />

          <div className="mr-auto text-gray-500 text-base font-medium leading-normal">
            Cancel
          </div>
        </button>

        <Button
          onClick={() => {}}
          className="ml-auto max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex"
        >
          <ModifySvg />
          <span className="text-gray-500 text-base font-medium leading-normal">
            Modify
          </span>
        </Button>

        <button
          onClick={() => {}}
          disabled={false}
          type="submit"
          className="px-10 py-[5px] flex items-center gap-2 justify-center text-[#ffffff] bg-sterling-red-800 rounded-lg active:scale-95"
        >
          <SubmitSvg />
          <span className=" font-medium text-base">Submit</span>
        </button>
      </div>
    </div>
  );
}
