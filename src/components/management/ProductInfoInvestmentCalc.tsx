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
  {
    name: "Customer Eligibility Criteria",
    data: {
      name: "",
    },
    isOpen: false,
  },
  {
    name: "Pricing Configuration",
    data: {
      name: "",
    },
    isOpen: false,
  },
  {
    name: "Early & Part Liquidation Configuration",
    data: {
      name: "",
    },
    isOpen: false,
  },
  {
    name: "Charges & Taxes Configuration",
    data: {
      name: "",
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
            Product Information
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
                <div className="flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.39063 2.68924L6.39062 12.3103C6.39062 12.5989 6.69531 12.76 6.90332 12.5813L12.4814 7.77079C12.6411 7.63309 12.6411 7.36795 12.4814 7.22879L6.90332 2.41825C6.69531 2.23954 6.39063 2.40067 6.39063 2.68924Z"
                      fill="#555555"
                    />
                  </svg>
                  <span
                    onClick={() => (item.isOpen = !item.isOpen)}
                    className="text-[#636363] text-base font-medium"
                  >
                    {item.name}
                  </span>
                </div>

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
