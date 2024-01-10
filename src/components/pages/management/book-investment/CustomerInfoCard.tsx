import React from "react";

export const Info = ({ title, data }) => {
  return (
    <div className="flex flex-col gap-[1px]">
      <h4 className="text-base font-semibold text-[#636363]">{title}</h4>
      <p className="text-sm font-semibold text-[#636363]">
        <span className="h-[7px] w-[7px] rounded-full bg-[#2FB755]"></span>
        {data}</p>

      <div className="px-2 rounded-[4px] bg-[#D4F7DC] max-w-max">
        <span className="text-[#15692A] text-base font-medium">Active</span>
      </div>

      <span className="text-xs font-normal text-[#2FB755] underline">View all customer information</span>
    </div>
  );
};
export default function CustomerInfoCard() {
  return (
    <div className="py-6 px-10 rounded-lg shadow-custom bg-gray-100 w-full flex flex-col gap-6">
      <h1 className="font-bold text-[20px] text-[#747373]">
        Customer’s Information
      </h1>
      <div className="grid grid-cols-4 gap-2">
        <Info title={"Customer Name"} data={"Temitope Yusuf Chukwuma"} />
        <Info title={"Customer ID"} data={"TD- BYZX"} />
        <Info title={"Customer Type"} data={"Individual"} />
        <Info title={"Status"} data={"Active"} />
        <Info title={"BVN"} data={"22234567856"} />
        <Info title={" Phone Number"} data={"08012345678"} />
        <Info title={"Email Address"} data={"samuelyusuf@email.com"} />
        <Info title={"Customer Persona"} data={"High Net-Worth"} />
        <Info title={"KYC Status"} data={"Complete"} />
        <Info title={"Risk Status"} data={"LOW"} />
        <Info title={"Relationship Manager"} data={"Iyke David"} />
        <Info title={"Email Address"} data={"samuelyusuf@email.com"} />
        
      </div>
    </div>
  );
}
