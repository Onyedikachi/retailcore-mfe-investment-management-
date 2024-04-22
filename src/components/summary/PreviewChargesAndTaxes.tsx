import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  useGetApplicableChargesQuery,
  useGetApplicableTaxesQuery,
} from "@app/api";
import { Fragment, useState } from "react";

const ChargeItem = ({ charge }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="bg-[#E0E0E0] rounded-full w-max-[200px] px-[14px] py-1 flex flex-row justify-between items-center">
      <div className="text-sm flex flex-col justify-center items-start">
        <span className="text-black capitalize">{charge?.name}</span>
        {/* <span>{charge?.currency} - </span> */}
      </div>
      {/* <span onClick={() => setShow(show ? false : true)}>
                {
                    show ? <FaEye /> : <FaEyeSlash />
                }
            </span> */}
    </div>
  );
};
const TaxItem = ({ tax }) => {
  const [show, setShow] = useState(true);
  return (
    <div className="bg-[#E0E0E0] rounded-full  w-max-[200px] px-[14px] py-1 flex flex-row justify-between items-center">
      <div className="text-sm flex flex-col justify-center items-start">
        <span className="text-black capitalize">{tax?.name}</span>
        {/* <span>{tax?.currency} {tax?.tax_values[0]?.tax_amount} </span> */}
      </div>
      {/* <span onClick={() => setShow(show ? false : true)}>
                {
                    show ? <FaEye /> : <FaEyeSlash />
                }
            </span> */}
    </div>
  );
};

export default ({ detail }) => {
  const valueTypes = [
    {
      header: "Principal Deposit",
      key: "principalDepositChargesAndTaxes",
    },
    {
      header: "Early Liquidation",
      key: "earlyLiquidationChargesAndTaxes",
    },
    {
      header: "Part Liquidation",
      key: "partLiquidationChargesAndTaxes",
    },
    {
      header: "Maturity Liquidation",
      key: "investmentLiquidationChargesAndTaxes",
    },
  ];
  const valueTypes1 = [
    {
      header: "Issuance Charges & Taxes",
      key: "issuanceChargesAndTaxes",
    },
    {
      header: "Redemption Charges & Taxes",
      key: "redemptionChargesAndTaxes",
    },
  
  ];

  const { data: charges } = useGetApplicableChargesQuery();
  const { data: taxes } = useGetApplicableTaxesQuery();

  return (
    <div className="flex flex-col">
      <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
        Charges And Taxes
      </h4>
      <div className="grid grid-cols-1 gap-[25px] px-12">
        {valueTypes.map(
          (item) =>
            detail &&
            (detail[item.key]?.applicableCharges.length > 0 ||
              detail[item.key]?.applicableTaxes.length > 0) && (
              <div key={item.key} className=" flex gap-[54px]">
                <h4 className="w-[260px] text-base font-medium text-[#636363]">
                  {item.header}
                </h4>
                <div className="flex flex-col flex-1 text-base font-normal text-[#636363]">
                  {detail[item.key]?.applicableCharges.length > 0 && (
                    <Fragment>
                      <span className="mb-2">Applicable Charges</span>
                      <div className="flex flex-row flex-wrap mb-4">
                        {detail[item.key]?.applicableCharges?.map((item, idx) => {
                          const charge = charges?.data?.records.find(
                            (i) => i.charge_id === item
                          );
                          return <ChargeItem key={`id-${idx}`} charge={charge} />;
                        })}
                      </div>
                    </Fragment>
                  )}
                  {detail[item.key]?.applicableTaxes.length > 0 && (
                    <Fragment>
                      <span className="mb-2">Applicable Taxes</span>
                      <div className="flex flex-row flex-wrap mb-4">
                        {detail[item.key]?.applicableTaxes?.map((item, idx) => {
                          const tax = taxes?.data?.records.find(
                            (i) => i.tax_id === item
                          );
                          return <TaxItem key={`id-${idx}`} tax={tax} />;
                        })}
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
