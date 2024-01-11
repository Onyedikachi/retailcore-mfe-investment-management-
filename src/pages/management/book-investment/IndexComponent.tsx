import React, { useEffect, useState } from "react";
import { BookInvestmentFormSteps } from "@app/constants";
import {ProductInfoInvestmentCalc} from '@app/components/management'
import { useNavigate, useParams } from "react-router-dom";
import handleFormRef from "./HandleFormRef";

import { Breadcrumbs, Button, FormStepComponent } from "@app/components";
import BookInvestmentFormComponent from "./FormComponent";

export function handleNext(step, setStep, BookInvestmentFormSteps) {
  console.log(step)
  step < BookInvestmentFormSteps.length && setStep(step + 1);
}

export function handlePrev(step, setStep, BookInvestmentFormSteps) {
  step > BookInvestmentFormSteps[0].index && setStep(step - 1);
}
export default function IndexComponent() {
  const { process, investmentType } = useParams();
  const [step, setStep] = useState(1);
  const [formRef, setFormRef] = useState(null);
  const navigate = useNavigate();

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/product-factory/investment/management/overview",
    },
    {
      id: 2,
      title: "book new Investment",
      url: "/product-factory/investment/management/overview",
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
    //     title: "Te\rm Deposit",
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

  function handleNav() {
    step < BookInvestmentFormSteps.length
      ? handleNext(step, setStep, BookInvestmentFormSteps)
      : navigate("#");
  }

  useEffect(() => {
    handleFormRef({ step, setFormRef });
  }, [step]);
  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          New Term Deposit Product
        </h1>
        <Breadcrumbs links={handleLinks(links, process)} />
      </div>
      {/* {productData.productInfo.productName} */}
      <div className="">
        <div className="flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
          
          <div className="flex-1 bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] ">
            <div className="pb-[49px] ">
              <FormStepComponent
                formStepItems={BookInvestmentFormSteps}
                step={step}
              />
            </div>
            <div className=" bg-[#ffffff] border border-[#EEEEEE] rounded-[10px] px-[87px] pt-[100px] pb-[43px] ">
              {/* {form component} */}
              <BookInvestmentFormComponent step={step} handleNav={handleNav} />

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
                    form={formRef}
                    className={
                      "bg-sterling-red-800 rounded-lg px-10 py-1 font-medium text-base"
                    }
                  >
                    {step < 3 ? "Next" : "Proceed"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className='min-w-[377px]'> 
          <ProductInfoInvestmentCalc />
        </div>
        </div>
       
      </div>
    </div>
  );
}
