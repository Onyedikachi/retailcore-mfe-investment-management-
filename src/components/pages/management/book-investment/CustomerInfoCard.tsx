import React from "react";
type InfoProps = {
  title: string;
  data: any;
  type?: string;
};
export const Info = ({ title, data, type }: InfoProps) => {
  return (
    <div className="flex flex-col gap-[1px]">
      <h4 className="text-base font-semibold text-[#636363]">{title}</h4>

      {type !== "status" && (
        <div className="text-sm font-normal text-[#636363] flex gap-2 items-center">
          {type == "kycStatus" && (
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6.5" cy="7" r="6.5" fill="#2FB755" />
            </svg>
          )}

          <span
            className={`${
              type == "customerPersona" ? "text-[#3FA2F7] text-base" : ""
            }  ${
              type == "riskStatus" ? "text-[#2FB755] font-normal text-base" : ""
            } ${type == "relationshipManager" ? "underline" : ""}`}
          >
            {data}
          </span>
        </div>
      )}

      {type === "status" && (
        <div className="px-2 rounded-[4px] bg-[#D4F7DC] max-w-max">
          <span className="text-[#15692A] text-base font-medium">Active</span>
        </div>
      )}

      {type === "customerName" && (
        <span className="text-xs font-normal text-[#2FB755] underline">
          View all customer information
        </span>
      )}
    </div>
  );
};
export default function CustomerInfoCard() {
  return (
    <div data-testid="customerInformation" className="py-6 px-10 rounded-lg shadow-custom bg-gray-100 w-full flex flex-col gap-6">
      <h1 className="font-bold text-[20px] text-[#747373]">
        Customer’s Information
      </h1>
      <div className="grid grid-cols-4 gap-8">
        <Info
          title={"Customer Name"}
          data={"Temitope Yusuf Chukwuma"}
          type={"customerName"}
        />
        <Info title={"Customer ID"} data={"TD- BYZX"} />
        <Info title={"Customer Type"} data={"Individual"} />
        <Info title={"Status"} data={"Active"} type={"status"} />
        <Info title={"BVN"} data={"22234567856"} />
        <Info title={" Phone Number"} data={"08012345678"} />
        <Info title={"Email Address"} data={"samuelyusuf@email.com"} />
        <Info
          title={"Customer Persona"}
          data={"High Net-Worth"}
          type={"customerPersona"}
        />
        <Info title={"KYC Status"} data={"Complete"} type={"kycStatus"} />
        <Info title={"Risk Status"} data={"LOW"} type={"riskStatus"} />
        <Info
          title={"Relationship Manager"}
          data={"Iyke David"}
          type={"relationshipManager"}
        />
      </div>
    </div>
  );
}
