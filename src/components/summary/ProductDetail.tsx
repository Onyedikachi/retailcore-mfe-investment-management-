import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";

export function DebitCreditTable() {
  const headers = [
    {
      title: "debit",
      key: "debit",
    },
    {
      title: "credit",
      key: "credit",
    },
  ];
  const dataTab = [
    {
      debitAccount: "ASTCAJHgsU12",
      debitBalance: "Current Account Balances",
      creditAccount: "Current Account Balances",
      creditBalance: "ASTCA4gJHU12",
    },
    {
      debitAccount: "ASTCAJ4HU12",
      debitBalance: "Savings Account Balances",
      creditAccount: "Savings Account Balances",
      creditBalance: "ASTCAJfHU12",
    },
  ];
  return (
    <table>
      <thead>
        <tr>
          {headers.map((i) => (
            <th
              className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] text-left after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
              key={i.key}
            >
              {i.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTab.map((i) => (
          <tr
            key={i.creditBalance}
            className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
          >
            <td className="text-sm font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative text-left">
              <span>
                <span className="block">{i.debitBalance}</span>
                <span className="text-[#aaa]">{i.debitAccount}</span>
              </span>
            </td>
            <td className="text-sm font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative text-left">
              <span>
                <span className="block">{i.creditBalance}</span>
                <span className="text-[#aaa]">{i.creditAccount}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default function ProductDetail({ detail, previousDetail }: any) {
  const [isNewDescription, setDescription] = useState(false);

  return (
    <div>
      <h3 className="text-[#636363] text-[18px] font-semibold mb-[56px]">
        Term Deposit Product Details
      </h3>
      <div className="grid gap-y-[56px]">
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Product Information
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product Name
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail &&
                  previousDetail?.productInfo?.productName !==
                    detail?.productInfo?.productName && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousDetail?.productInfo?.productName}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.productInfo?.productName}{" "}
                  {previousDetail?.productInfo?.productName !==
                    detail?.productInfo?.productName && (
                    <span className="block text-success-500 pl-[2px]">
                      {" "}
                      New
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Slogan
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail && previousDetail?.slogan !== detail.slogan && (
                  <span className="block  line-through mb-2 text-[#aaa]">
                    {" "}
                    {previousDetail?.slogan}
                  </span>
                )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.slogan}{" "}
                  {previousDetail &&
                    previousDetail?.slogan !== detail?.slogan && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product Description
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail &&
                  previousDetail?.description !== detail.description && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousDetail?.description}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.description}{" "}
                  {previousDetail &&
                    previousDetail?.description !== detail?.description && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product Currency
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail &&
                  previousDetail?.currency !== detail.currency && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousDetail?.currency}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.currency}{" "}
                  {previousDetail &&
                    previousDetail?.currency !== detail?.currency && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Tenure
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail && previousDetail?.tenure !== detail.tenure && (
                  <span className="block  line-through mb-2 text-[#aaa]">
                    {" "}
                    {previousDetail?.tenure}
                  </span>
                )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.tenure}{" "}
                  {previousDetail &&
                    previousDetail?.tenure !== detail?.tenure && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>

            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product life cycle
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail &&
                  previousDetail?.productLifeCycle !==
                    detail.productLifeCycle && (
                    <span className="block  line-through mb-2 text-[#aaa]">
                      {" "}
                      {previousDetail?.productLifeCycle}
                    </span>
                  )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.productLifeCycle}{" "}
                  {previousDetail &&
                    previousDetail?.productLifeCycle !==
                      detail?.productLifeCycle && (
                      <span className="block text-success-500 pl-[2px]">
                        {" "}
                        New
                      </span>
                    )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Customer Information Requirement
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Customer group category
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail && previousDetail?.name !== detail.name && (
                  <span className="block  line-through mb-2 text-[#aaa]">
                    {" "}
                    {previousDetail?.name}
                  </span>
                )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.name}{" "}
                  {previousDetail && previousDetail?.name !== detail?.name && (
                    <span className="block text-success-500 pl-[2px]">
                      {" "}
                      New
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Age group eligibility
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail && previousDetail?.name !== detail.name && (
                  <span className="block  line-through mb-2 text-[#aaa]">
                    {" "}
                    {previousDetail?.name}
                  </span>
                )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.name}{" "}
                  {previousDetail && previousDetail?.name !== detail?.name && (
                    <span className="block text-success-500 pl-[2px]">
                      {" "}
                      New
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Documentation required
              </div>
              <div className="w-full text-base font-normal text-[#636363] flex flex-wrap gap-x-1 gap-y-1">
                <span className="font-medium text-[#16252A] bg-[#E0E0E0] px-[15px] py-[9px] rounded-full text-xs">
                  {" "}
                  Customer photo
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Pricing Configuration
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Applicable Tenor
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="block  mb-2 text-[#636363]">
                  {" "}
                  {detail?.name}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Applicable Principal
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="block  mb-2 text-[#636363]">
                  {" "}
                  {detail?.name}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Applicable Interest Rate Range
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="block  mb-2 text-[#636363]">
                  {" "}
                  3 - 10% for tenr between 1 - 2 months
                </span>
                <span className="block  mb-2 text-[#636363]">
                  {" "}
                  3 - 10% for tenr between 1 - 2 months
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Early & Part Liquidation Setup
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Part Liquidation
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                {previousDetail && previousDetail?.name !== detail.name && (
                  <span className="block  line-through mb-2 text-[#aaa]">
                    {" "}
                    {previousDetail?.name}
                  </span>
                )}
                <span className="flex itmes-center">
                  {" "}
                  {detail?.name}{" "}
                  {previousDetail && previousDetail?.name !== detail?.name && (
                    <span className="block text-success-500 pl-[2px]">
                      {" "}
                      New
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Early Liquidation
              </div>
              <div className="w-full text-base font-normal text-[#636363]">
                <span className="block">
                  Require notice of{" "}
                  <span className="font-medium text-[#16252A]">7 days</span>{" "}
                  before liquidation
                </span>
                <span className="block">
                  {" "}
                  <span className=" text-[#16252A]">Penalty</span> Take a charge
                  of "charge"
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Charges & Taxes
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Prinicipal Deposit
              </div>
              <div className="w-full">
                <div className="w-full text-base font-normal text-[#636363] mb-5">
                  <span className="block  text-base mb-2 ">
                    {" "}
                    Applicable charges
                  </span>

                  <div className="flex gap-x-1 gap-y-1 flex-wrap">
                    <span className="bg-[#E0E0E0] px-[15px] py-[6px] rounded-full flex items-center gap-x-4">
                      <span className="flex flex-col items-center justify-center text-xs">
                        <span className="font-medium text-[#16252A]">
                          {" "}
                          Deposit fee
                        </span>
                        <span>NGN 40000</span>
                      </span>
                      <FaEye />
                    </span>
                  </div>
                </div>
                <div className="w-full text-base font-normal text-[#636363]">
                  <span className="block  text-base mb-2 ">
                    {" "}
                    Applicable Taxes
                  </span>

                  <div className="flex gap-x-1 gap-y-1 flex-wrap">
                    <span className="bg-[#E0E0E0] px-[15px] py-[6px] rounded-full flex items-center gap-x-4">
                      <span className="flex flex-col items-center justify-center text-xs">
                        <span className="font-medium text-[#16252A]">
                          {" "}
                          Deposit fee
                        </span>
                        <span>NGN 40000</span>
                      </span>
                      <FaEye />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Account Entries
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Principal Deposit
              </div>
              <div className="w-full text-base font-normal">
                <DebitCreditTable />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
            Generated Product Code
          </h4>
          <div className="grid grid-cols-1 gap-[25px] px-12">
            <div className=" flex gap-[54px]">
              <div className="w-[300px]   text-base font-medium text-[#636363]">
                Product COde
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
