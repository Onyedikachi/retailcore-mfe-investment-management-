import React from "react";
import { InputDivs } from "@app/components/pages/term-deposit/forms/accounting-entries-and-events";
import AccountSearch from "@app/components/AccountSearch";
import MinMaxInput from "@app/components/forms/MinMaxInput";
export const onProceed = (proceed) => {
  proceed();
};

type FacilityDetailsProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
};
export default function FacilityDetails({
  formData,
  setFormData,
  proceed,
}: FacilityDetailsProps) {
  return (
    <form
      id="facilityDetails"
      data-testid="submit-button"
      onSubmit={(d) => onProceed(proceed)}
    >
      {" "}
      <div data-testid="facility-details" className="flex flex-col gap-4 px-[30px] py-5">
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs label={"Investment product"}>
            <div className="flex gap-[15px]">
              <div className="ml-[51px] w-[360px]">
                <AccountSearch placeholder={"Search Investment Product"} />
              </div>
            </div>
          </InputDivs>
          <InputDivs label={"Investment product category"} isCompulsory={false}>
            <div className="flex gap-[15px]">
              <div className="ml-[51px] ">
                <span className="text-base font-normal text-[#636363]">
                  Term Deposit Product
                </span>
              </div>
            </div>
          </InputDivs>
          <InputDivs
            label={"Investment purpose"}
            isCompulsory={false}
            divClass={"!items-start"}
          >
            <div className="relative w-full">
              <textarea
                id="investmentPurpose"
                data-testid="investmentPurpose"
                placeholder="Enter Investment Purpose"
                maxLength={250}
                className={`w-[360px] ml-[51px] min-h-[150px] rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none `}
              />
            </div>
          </InputDivs>
          <InputDivs label={"Tenor"}>
            <div className="flex gap-[15px]">
            <div className="ml-[51px] w-[360px]">
               <div className="flex items-center w-full gap-[15px] justify-between">
               <MinMaxInput   />
               <span className="text-base font-normal text-[#636363]">Months</span>
               </div>
                <div className="text-sm text-[#AAAAAA]">
                  <span>3 - 12 months</span>
                </div>
              </div>
            </div>
          </InputDivs>
          <InputDivs label={"Principal"}>
            <div className="flex gap-[15px]">
              <div className="ml-[51px] w-[360px]">
                <MinMaxInput currency={"NGN"} isCurrency />
                <div className="text-sm text-[#AAAAAA]">
                  <span>NGN 1,000,000 - NGN 2,000,000</span>
                </div>
              </div>
            </div>
          </InputDivs>
          <InputDivs label={"Interest rate"}>
            <div className="flex gap-[15px]">
              <div className="ml-[51px] w-[360px]">
                <MinMaxInput  isPercent />
                <div className="text-sm text-[#AAAAAA]">
                  <span>3 - 10% per annum</span>
                </div>
              </div>
            </div>
          </InputDivs>
        </div>
      </div>
    </form>
  );
}
