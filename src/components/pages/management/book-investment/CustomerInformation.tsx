import React from "react";
import AccountSearch from "@app/components/AccountSearch";
import { InputDivs } from "@app/components/pages/term-deposit/forms/accounting-entries-and-events";
import { FormUpload } from "@app/components/forms";

export const onProceed = (proceed) => {
  proceed();
};

type CustomerInformationProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
};
export default function CustomerInformation({
  formData,
  setFormData,
  proceed,
}: CustomerInformationProps) {
  return (
    <form
      id="customerInformation"
      data-testid="submit-button"
      onSubmit={(d) => onProceed(proceed)}
    >
      {" "}
      <div className="flex flex-col gap-4 px-[30px] py-5">
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs label={"Customer account"}>
            <div className="ml-[51px] w-[360px]">
              <AccountSearch placeholder={"Search by account number"} />
            </div>
          </InputDivs>
          <InputDivs label={"Customer’s investment request form"}>
            <div className="ml-[51px] w-[360px]">
            <FormUpload
              data-testid="input"
              accept={[]}
              onUploadComplete={(value) => {
                console.log(value)
              }}
            />            </div>
          </InputDivs>
        </div>
      </div>
    </form>
  );
}
