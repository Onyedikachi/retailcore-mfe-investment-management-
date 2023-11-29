import React, { useState } from "react";
import {
  Breadcrumbs,
  Loader,
  Button,
  FormStepComponent,
} from "@app/components";
import {
  ProductInformation,
  CustomerEligibilityCriteria,
} from "@app/components/pages/term-deposit/forms";
import { termDepositFormSteps } from "@app/constants";
export default function CreateTermDeposit() {
  const step = 1;
  const links = [
    {
      id: 1,
      title: "Product Factory",
      url: "/product/factory/dashboard/deposit",
    },
    {
      id: 2,
      title: "Investment",
      url: "/investment-management",
    },
    {
      id: 3,
      title: "New Term Deposit Product",
      url: "#",
    },
  ];
  const productInformationFormData = useState({
    name: "",
    slogan: "",
    description: "",
    lifeCycle: "",
    currency: "",
  });

  // let component;

  // switch (step) {
  //   case 1:
  //     component = <ProductInformation formData={productInformationFormData} />;
  //     break;
  //   case 2:
  //     component = <CustomerEligibilityCriteria />;
  //     break;
  //   case 3:
  //     component = <ProductInformation formData={productInformationFormData} />;
  //     break;
  //     break;
  //   default:
  //     component = <div>Default Component</div>;
  // }
  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          New Term Deposit Product
        </h1>
        <Breadcrumbs links={links} />
      </div>
      <div className="h-full px-[37px] py-[30px] bg-[#F7F7F7]">
        <div className=" bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] ">
          <div className="pb-[49px] ">
            <FormStepComponent
              formStepItems={termDepositFormSteps}
              step={step}
            />
          </div>
          <div className=" bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[87px] pt-[100px] pb-[43px] ">
            <ProductInformation formData={productInformationFormData} />
          </div>
        </div>
      </div>
    </div>
  );
}
