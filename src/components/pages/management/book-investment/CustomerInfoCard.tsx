import BottomBarLoader from "@app/components/BottomBarLoader";
import { capitalizeFirstLetter } from "@app/utils";
import React from "react";
type InfoProps = {
  title: string;
  data: any;
  type?: string;
  setIsOpen?: (e) => void;
};
export const Info = ({ title, data, type, setIsOpen }: InfoProps) => {
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
              <circle
                cx="6.5"
                cy="7"
                r="6.5"
                fill={
                  data?.toLowerCase() === "complete"
                    ? "#2FB755"
                    : "rgb(220 38 38)"
                }
              />
            </svg>
          )}

          {type === "customerPersona" && (
            <span className={`text-[#3FA2F7]  `}>{data || "-"}</span>
          )}
          {type === "riskStatus" && (
            <span
              className={` ${
                data?.toLowerCase() == "low"
                  ? "text-[#2FB755] font-normal text-base"
                  : data
                  ? "text-red-600"
                  : ""
              } `}
            >
              {data || "-"}
            </span>
          )}
          {type === "relationshipManager" && (
            <span className={` ${data ? "underline" : ""}`}>{data || "-"}</span>
          )}
          {type !== "relationshipManager" &&
            type !== "riskStatus" &&
            type !== "customerPersona" && (
              <span className={``}>{data || "-"}</span>
            )}
        </div>
      )}

      {type === "status" && (
        <div className="px-2 rounded-[4px] bg-[#D4F7DC] max-w-max">
          <span
            className={`${
              data?.toLowerCase() === "active"
                ? "text-[#15692A] "
                : "text-red-600"
            } text-base font-medium`}
          >
            {data || "-"}
          </span>
        </div>
      )}

      {type === "customerName" && (
        <span
          onClick={() => setIsOpen(true)}
          className="text-xs font-normal text-[#2FB755] underline"
        >
          View all customer information
        </span>
      )}
    </div>
  );
};
export default function CustomerInfoCard({
  customerData,
  setIsOpen,
  isLoading,
}) {
  return (
    <div className="py-6 px-10 rounded-lg shadow-custom bg-gray-100 w-full ">
      {isLoading ? (
        <BottomBarLoader />
      ) : (
        <div data-testid="customerInformation" className="flex flex-col gap-6">
          <h1 className="font-bold text-[20px] text-[#747373]">
            Customer’s Information
          </h1>
          <div className="grid grid-cols-4 gap-8">
            <Info
              title={"Customer Name"}
              data={`${capitalizeFirstLetter(
                customerData?.customer_profiles?.[0]?.firstName
              )} ${capitalizeFirstLetter(
                customerData?.customer_profiles?.[0]?.otherNames
              )} ${capitalizeFirstLetter(
                customerData?.customer_profiles?.[0]?.surname
              )}`}
              type={"customerName"}
              setIsOpen={setIsOpen}
            />
            <Info title={"Customer ID"} data={customerData?.accountNumber} />
            <Info title={"Customer Type"} data={customerData?.customerType} />
            <Info
              title={"Status"}
              data={customerData?.status}
              type={"status"}
            />
            <Info
              title={"BVN"}
              data={customerData?.customer_profiles?.[0]?.bvn}
            />
            <Info
              title={" Phone Number"}
              data={customerData?.customer_profiles?.[0]?.mobileNumber}
            />
            <Info
              title={"Email Address"}
              data={customerData?.customer_profiles?.[0]?.emailAddress}
            />
            <Info
              title={"Customer Persona"}
              data={
                customerData?.risk_assessments?.find(
                  (i) => i.parameter.toLowerCase() === "customer persona"
                )?.parameterOption
              }
              type={"customerPersona"}
            />

            <Info
              title={"KYC Status"}
              data={
                customerData?.risk_assessments
                  ?.find(
                    (i) =>
                      i.parameter.toLowerCase() ===
                      "status of customer identity verification"
                  )
                  ?.parameterOption?.toLowerCase() === "passed"
                  ? "Complete"
                  : "Incomplete"
              }
              type={"kycStatus"}
            />
            <Info
              title={"Risk Status"}
              data={customerData?.riskStatus}
              type={"riskStatus"}
            />
            <Info
              title={"Relationship Manager"}
              data={customerData?.customer_profiles?.[0]?.relationshipOfficer}
              type={"relationshipManager"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
