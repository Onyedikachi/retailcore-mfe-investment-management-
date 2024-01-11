import React, { useEffect, useState } from "react";
import { BookInvestmentFormSteps } from "@app/constants";
import { ProductInfoInvestmentCalc } from "@app/components/management";
import { useNavigate, useParams } from "react-router-dom";
import ProductSearch from "@app/components/ProductSearch";
import { Breadcrumbs, Button } from "@app/components";

export default function IndexComponent() {
  const { process, investmentType } = useParams();
  const navigate = useNavigate();

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/product-factory/investment/management/overview",
    },
    {
      id: 2,
      title: "Overview",
      url: "/product-factory/investment/management/overview",
    },
    {
      id: 3,
      title: investmentType,
      url: `/product-factory/investment/management/products/${investmentType}`,
    },
  ];
  function handleLinks(links, process) {
    return links;
  }

  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Investment Management
        </h1>
        <Breadcrumbs links={handleLinks(links, process)} />
      </div>
      {/* {productData.productInfo.productName} */}
      <div className="">
        <div className="flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
          <div className="flex w-full bg-[#ffffff] rounded-md px-[24px] pt-[30px] pb-[49px] gap-3 ">
            <div className="border border-[#E5E9EB] rounded-lg py-6 px-3 min-w-[243px] flex flex-col gap-[26px]">
              <span className="text-[#636363] text-base font-bold uppercase">
                Investment PRODUCTS
              </span>

              <div>
                {" "}
                <ProductSearch placeholder="Search" options={[]} />
              </div>

              <div>stuff</div>
            </div>
            <div className="flex-1 border border-[#E5E9EB] rounded-lg py-[13px] px-[31px] flex-col gap-[27px]">
              <div className="flex justify-end items-center">
                <div className="flex items-center gap-[11px]">
                  <div className="shadow-custom">
                    {" "}
                    <ProductSearch
                      placeholder="Search by product name/code"
                      options={[]}
                    />
                  </div>
                  <span className="text-[#E5E9EB]">|</span>
                  <div className="flex gap-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 4C6.26522 4 6.51957 4.10536 6.70711 4.29289C6.89464 4.48043 7 4.73478 7 5V7.101C7.83204 6.25227 8.86643 5.62931 10.0057 5.29078C11.1451 4.95226 12.3518 4.90932 13.5123 5.16601C14.6728 5.42269 15.7488 5.97056 16.6391 6.758C17.5294 7.54544 18.2045 8.54654 18.601 9.667C18.6491 9.79176 18.6717 9.92489 18.6674 10.0585C18.6632 10.1922 18.6322 10.3236 18.5763 10.4451C18.5203 10.5665 18.4406 10.6755 18.3418 10.7656C18.243 10.8557 18.1272 10.9251 18.0011 10.9696C17.875 11.0142 17.7413 11.033 17.6078 11.0249C17.4744 11.0169 17.3439 10.9822 17.224 10.9228C17.1042 10.8635 16.9975 10.7807 16.9103 10.6794C16.823 10.5781 16.7569 10.4603 16.716 10.333C16.4141 9.47982 15.8865 8.72451 15.1892 8.14758C14.4919 7.57064 13.6512 7.19369 12.7566 7.05688C11.862 6.92008 10.947 7.02855 10.1092 7.37074C9.27133 7.71293 8.54204 8.27602 7.999 9H11C11.2652 9 11.5196 9.10536 11.7071 9.29289C11.8946 9.48043 12 9.73478 12 10C12 10.2652 11.8946 10.5196 11.7071 10.7071C11.5196 10.8946 11.2652 11 11 11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10V5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4ZM6.008 13.057C6.13184 13.0133 6.26308 12.9943 6.39422 13.0013C6.52537 13.0083 6.65386 13.0411 6.77235 13.0977C6.89084 13.1544 6.99701 13.2338 7.0848 13.3315C7.17259 13.4291 7.24028 13.5432 7.284 13.667C7.58586 14.5202 8.11355 15.2755 8.81082 15.8524C9.50809 16.4294 10.3488 16.8063 11.2434 16.9431C12.138 17.0799 13.053 16.9714 13.8908 16.6293C14.7287 16.2871 15.458 15.724 16.001 15H13C12.7348 15 12.4804 14.8946 12.2929 14.7071C12.1054 14.5196 12 14.2652 12 14C12 13.7348 12.1054 13.4804 12.2929 13.2929C12.4804 13.1054 12.7348 13 13 13H18C18.2652 13 18.5196 13.1054 18.7071 13.2929C18.8946 13.4804 19 13.7348 19 14V19C19 19.2652 18.8946 19.5196 18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20C17.7348 20 17.4804 19.8946 17.2929 19.7071C17.1054 19.5196 17 19.2652 17 19V16.899C16.168 17.7477 15.1336 18.3707 13.9943 18.7092C12.8549 19.0477 11.6482 19.0907 10.4877 18.834C9.32723 18.5773 8.25117 18.0294 7.36091 17.242C6.47065 16.4546 5.79548 15.4535 5.399 14.333C5.35526 14.2092 5.33634 14.0779 5.34333 13.9468C5.35031 13.8156 5.38306 13.6871 5.43971 13.5687C5.49635 13.4502 5.57578 13.344 5.67346 13.2562C5.77114 13.1684 5.88516 13.1007 6.009 13.057H6.008Z"
                        fill="#48535B"
                      />
                    </svg>
                    <span className="text-base font-normal text-[#636363]">
                      Refresh Table
                    </span>
                  </div>
                </div>
              </div>
              <div className="">Table</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
