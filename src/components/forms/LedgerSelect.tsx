import { Checkbox, RedDot } from "@app/components/forms";
import { GlInput } from "@app/components/forms";
import { glMappingSchema, chargesAndTaxesSchema } from "@app/constants";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { IoMdAddCircle } from "react-icons/io";
import {
  FaCaretDown,
  FaMinusCircle,
  FaStopCircle,
  FaTimes,
} from "react-icons/fa";
import { BsX } from "react-icons/bs";

export const handleClear = (
  setClearField,
  clearFields,
  setMapOptions,
  reset
) => {
  setClearField(!clearFields);
  setMapOptions([]);
  reset();
};

export const handleClick = ({
  key,
  ledgerInfo,
  ledgerType,
  index,
  setLedgerType,
}) => {
 
  let data = {
    accountName: ledgerInfo.accountName,
    accountId: ledgerInfo?.accountNo,
    accountType: ledgerInfo?.accountType,
  };
  setLedgerType((prevLedgerType) => {
    const updatedLedgerType = [...prevLedgerType];
    updatedLedgerType[index] = {
      ...updatedLedgerType[index],
      value: data,
    };

    // Return the updated array
    return updatedLedgerType;
  });
 
};

export default ({
  formData,
  handleValue,
  register,
  trigger,
  errors,
  removeField,
}) => {
  const [clearFields, setClearField] = useState(false);
  const [ledgerType, setLedgerType] = useState<any>([
    {
      type: "debit",
      value: null,
    },
  ]);
  function handleSwitch() {
    if (ledgerType.length === 2) {
      setLedgerType((prevLedgerType) => {
        const [first, second] = prevLedgerType;
        const updatedFirst = { ...first, type: second?.type };
        const updatedSecond = { ...second, type: first?.type };
        return [updatedFirst, updatedSecond];
      });
    } else {
      setLedgerType((prevLedgerType) => {
      
        const [first] = prevLedgerType;
        const updatedFirst = {
          ...first,
          type: first?.type === "credit" ? "debit" : "credit",
        };
   
        return [updatedFirst];
      });
    }
  }
  const ledgerTypes = ["debit", "credit"];
  function addField(type: string) {
    setLedgerType([
      ...ledgerType,
      {
        type,
        value: null,
      },
    ]);
  }
  function removeLedger(type: string) {
    setLedgerType(ledgerType.filter((i) => i.type !== type));
  }

  useEffect(() => {
    handleValue(ledgerType);
  }, [ledgerType]);

  return (
    <Fragment>
      <div className="flex justify-between items-center relative w-full border rounded-[10px] border-[#EEEEEE] px-4 py-[30px]">
        <div className="grid grid-cols-2 gap-x-[64px]">
          {ledgerType.map((item, index) => (
            <div className="w-[366px] flex-1" key={item.type}>
              <div className="flex gap-x-3 items-center capitalize font-medium mb-1">
                <span>{item.type} ledger</span>
                <button
                  type="button"
                  onClick={() => handleSwitch()}
                  className="text-red-600 px-[10px] py-[2px] rounded-lg border border-[#D8DAE5] text-xs italic"
                >
                  Switch Entry
                </button>
              </div>
              <GlInput
                handleClick={(key, ledgerInfo) =>
                  handleClick({
                    key,
                    ledgerInfo,
                    ledgerType,
                    index,
                    setLedgerType,
                  })
                }
                inputName={item.type}
                defaultValue={item?.value?.accountName}
                register={register}
                trigger={trigger}
                errors={errors}
                clearFields={clearFields}
                placeholder="Type to search and select"
                formData={formData}
                accountType={item?.value?.accountType}
                showImpact={true}
                impact={
                  item.type === "debit"
                    ? "debit_impact_on_balance"
                    : "credit_impact_on_balance"
                }
              />

              {index === 1 && ledgerType.length === 2 && (
                <button
                  type="button"
                  onClick={() => removeLedger(item.type)}
                  className="text-sm text-[#333] flex gap-x-1 max-w-max items-center mt-1"
                >
                  <span className="text-red-500">
                    <FaMinusCircle />
                  </span>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-1">
          {ledgerTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`flex items-center gap-x-4 cursor-pointer text-[#636363] disabled:opacity-50 disabled:cursor-not-allowed text-xs ${
                ledgerType.map((i) => i.type).includes(type) ? "opacity-50" : ""
              }`}
              onClick={() => addField(type)}
            >
              <span className="text-[18px]">
                <IoMdAddCircle />
              </span>{" "}
              <span>{`Add ${type} entry`}</span>
            </button>
          ))}
        </div>
        {removeField && (
          <span
            onClick={removeField}
            className="absolute top-[6px] right-[6px]"
          >
            <BsX />
          </span>
        )}
      </div>
    </Fragment>
  );
};
