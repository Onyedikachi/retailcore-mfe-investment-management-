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
  ledgerTypes,
  index,
  setLedgerType,
}) => {
  let data = {
    ledgerType: key,
    ledgerCode: ledgerInfo?.accountNo,
    glClass: ledgerInfo?.accountType,
  };
  setLedgerType((prevLedgerType) => {
    const updatedLedgerType = [...prevLedgerType];
    updatedLedgerType[index] = {
      ...updatedLedgerType[index],
      ...data,
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
  const indexedLedgers = [0, 1];
  const [clearFields, setClearField] = useState(false);
  const [ledgerTypes, setLedgerType] = useState<any>([
    {
      ledgerType: 0,
      ledgerCode: "",
      glClass: "",
    },
  ]);
  function handleSwitch() {
    if (ledgerTypes.length === 2) {
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
          ledgerType: first?.ledgerType === 1 ? 0 : 1,
        };

        return [updatedFirst];
      });
    }
  }

  function addField(type: number) {
    setLedgerType([
      ...ledgerTypes,
      {
        ledgerType: type,
        ledgerCode: "",
        glClass: "",
      },
    ]);
  }
  function removeLedger(type: number) {
    setLedgerType(ledgerTypes.filter((i) => i.ledgerType !== type));
  }

  useEffect(() => {
    handleValue(ledgerTypes);
  }, [ledgerTypes]);

  const TypeOptions = {
    0: "debit",
    1: "credit",
  };
  return (
    <Fragment>
      <div className="flex justify-between items-center relative w-full border rounded-[10px] border-[#EEEEEE] px-4 py-[30px]">
        <div className="grid grid-cols-2 gap-x-[64px]">
          {ledgerTypes.map((item, index) => (
            <div className="w-[366px] flex-1" key={item.ledgerType}>
              <div className="flex gap-x-3 items-center capitalize font-medium mb-1">
                <span>{TypeOptions[item.ledgerType]} ledger</span>
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
                    ledgerTypes,
                    index,
                    setLedgerType,
                  })
                }
                inputName={item.ledgerType.toString()}
                defaultValue={item?.ledgerCode}
                register={register}
                trigger={trigger}
                errors={errors}
                clearFields={clearFields}
                placeholder="Type to search and select"
                formData={formData}
                accountType={item?.glClass}
                showImpact={true}
                impact={
                  item.ledgerType === 0
                    ? "debit_impact_on_balance"
                    : "credit_impact_on_balance"
                }
              />

              {index === 1 && ledgerTypes.length === 2 && (
                <button
                  type="button"
                  onClick={() => removeLedger(item.ledgerType)}
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
          {indexedLedgers.map((type) => (
            <button
              key={type}
              type="button"
              disabled={ledgerTypes.some((i) => parseInt(i.ledgerType,10) === type)}
              className={`flex items-center gap-x-4 cursor-pointer text-[#636363] disabled:opacity-50 disabled:cursor-not-allowed text-xs ${
                ledgerTypes.some((i) => parseInt(i.ledgerType,10) === type) ? "opacity-50" : ""
              }`}
              onClick={() => addField(type)}
            >
              <span className="text-[18px]">
                <IoMdAddCircle />
              </span>{" "}
              <span>{`Add ${TypeOptions[type]} entry`}</span>
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
