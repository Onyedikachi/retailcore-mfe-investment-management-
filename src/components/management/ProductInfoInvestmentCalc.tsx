import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
// interface ILogProps {
//   isFetching: boolean;
//   isLoading: boolean;
//   activities: Array<any>;
// }

const productInfoArray = [
  {
    name: "Product Information",
    data: {
      name: "Test Term Deposit",
    },
    isOpen: false,
  },
];
export default function ProductInfoInvestmentCalc({}) {
  //   const { process } = useParams();
  return (
    <div className="flex flex-col max-w-[377px] w-full gap-[17px]">
      <div
        data-testid="product-info"
        className="border border-[#E5E9EB]  w-full rounded-lg bg-[#ffffff]"
      >
        <div className="pt-[30px] pb-[19px] border-b border-[#cccccc] px-6 ">
          <span className="text-[#636363] font-medium text-[20px] uppercase">
            Product Info
          </span>
        </div>

        <div className="flex flex-col gap-6 px-6 py-[36px]">
          <div className="flex flex-col rounded-[6px] bg-[#F9F2F2] gap-[13px] px-[21px] py-[16px]">
            <span className="text-base text-[#636363] font-medium ">
              Sterling Premium Term Deposit
            </span>
            <span className="text-sm font-normal text-[#636363]">
              Description of the product
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {productInfoArray.map((item, index) => (
              <div key={index} className="">
                <span onClick={() => (item.isOpen = !item.isOpen)} className="">
                  {item.name}
                </span>
                {/* {item.isOpen && <div>Item Details</div>} */}
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      <div
        data-testid="product-info"
        className="border border-[#E5E9EB]  w-full rounded-lg bg-[#ffffff]"
      >
        <div className="pt-[30px] pb-[19px] border-b border-[#cccccc] px-6 ">
          <span className="text-[#636363] font-medium text-[20px] uppercase">
            Investment Calculation
          </span>
        </div>

        <div className="flex flex-col gap-6 px-6 py-[36px]">
          <div className="flex flex-col ">
            <span className="text-[#636363] font-medium text-base">
              Value at Maturity
            </span>
            <span className="">-</span>
          </div>
          <div className="flex flex-col ">
            <span className="text-[#636363] font-medium text-base">
              Maturity Date
            </span>
            <span className="">-</span>
          </div>
        </div>
      </div>
    </div>
  );
}
