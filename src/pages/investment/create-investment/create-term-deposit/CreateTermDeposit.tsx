import React from "react";
import {
  Breadcrumbs,
  Loader,
  Button,
  FormStepComponent,
  ProductInformationForm,
} from "@app/components";
export default function CreateTermDeposit() {
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
          <FormStepComponent />
          <div className=" bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[87px] pt-[100px] pb-[43px] ">
            <div>stuff</div>
          </div>
        </div>
      </div>
    </div>
  );
}
