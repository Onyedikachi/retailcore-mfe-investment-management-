import React, { useState } from "react";
import { BookInvestmentFormSteps } from "@app/constants";

import { useParams } from "react-router-dom";

import { Breadcrumbs, Button, FormStepComponent } from "@app/components";

export default function IndexComponent() {
  const { process, investmentType } = useParams();
  const [step, setStep] = useState(1);

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/product-factory/investment/management",
    },
    {
      id: 2,
      title: "book new Investment",
      url: "/product-factory/investment/management",
    },
    {
      id: 3,
      title: investmentType,
      url: `/product-factory/investment/management/${investmentType}`,
    },
  ];
  function handleLinks(links, process) {
    // const extraLinks = [
    //   {
    //     id: 3,
    //     title: "Term Deposit",
    //     url: "/product-factory/investment",
    //   },
    //   {
    //     id: 4,
    //     title: productData?.productInfo?.productName,
    //     url: "#",
    //   },
    // ];
    // if (
    //   process === "continue" ||
    //   process === "modify" ||
    //   process === "withdraw_modify"
    // ) {
    //   let filteredLinks = links.filter((i) => i.id !== 3);
    //   return [...filteredLinks, ...extraLinks];
    // }

    return links;
  }
  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          New Term Deposit Product
        </h1>
        <Breadcrumbs links={handleLinks(links, process)} />
      </div>
      {/* {productData.productInfo.productName} */}
      <div className="h-full px-[37px] py-[30px] bg-[#F7F7F7]">
        <div className=" bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] ">
          <div className="pb-[49px] ">
            <FormStepComponent
              formStepItems={BookInvestmentFormSteps}
              step={step}
            />
          </div>
          <div className=" bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[87px] pt-[100px] pb-[43px] ">
            {/* {form component} */}

            <div className="h-px w-full bg-[#CCCCCC] mb-12 mt-16"></div>

            <div className="flex mb-[70px]  justify-between">
              <div>
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => {}}
                    className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                  >
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex justify-end gap-6">
                <Button
                  type="button"
                  onClick={() => {}}
                  className="text-gray-500 px-10 py-1 font-medium text-base bg-white border border-[#D8DAE5] leading-[24px] disabled:bg-transparent"
                >
                  Save As Draft
                </Button>

                <Button
                  type="submit"
                  className={
                    "bg-sterling-red-800 rounded-lg px-10 py-1 font-medium text-base"
                  }
                >
                  {step < 5 ? "Next" : "Proceed"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
