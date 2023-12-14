import React from "react";
import CurrencyInput from "react-currency-input-field";
interface MinMaxProps {
  label?: string;
  hasButton?: boolean;
  currency?: string;
  className?: string;
  inputName?: string;
  register?: any;
  handleChange?: (value) => void;
  defaultValue?: any;
  errors?: any;
  setValue?: any;
  clearErrors?: any;
  trigger?: any;
  error?: string;
  disabled?: boolean;
  type?: string;
  isPercent?: boolean;
  isCurrency?: boolean;
  placeholder?: string;
  max?: number;
  disablegroupseparators?: boolean;
}
export default function MinMaxInput({
  label,
  hasButton,
  currency,
  className,
  register = () => {},
  handleChange,
  inputName,
  defaultValue = 0,
  errors,
  setValue,
  clearErrors,
  trigger,
  error,
  disabled = false,
  type = "text",
  isPercent = false,
  isCurrency,
  placeholder = "0",
  max,
  disablegroupseparators,
}: MinMaxProps) {
  return (
    <div>
      <div className={`${className} flex items-center gap-4`}>
        {label && <div>{label}</div>}
        {currency && <div className="text-[#636363]">{currency}</div>}

        <div className="w-full flex flex-col gap-2">
          <div className="relative flex items-center max-w-[642px]">
            {!isCurrency && (
              <input
                type={type}
                disabled={disabled}
                data-testid="min-max-input"
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4  border-b border-[#8F8F8F] placeholder:text-[#BCBBBB] ${
                  (errors && errors[inputName]) || error
                    ? "border-red-600"
                    : "border-[#8F8F8F]"
                }`}
                onChange={(e) => {
                  clearErrors(inputName);
                  setValue(inputName, e.target.valueAsNumber);
                  trigger(inputName);
                }}
                placeholder={placeholder}
                // maxLength={defaultLength}
                max={max}
                // {...register(inputName, { required: true })}
                defaultValue={defaultValue}
              />
            )}
            {isCurrency && (
              <CurrencyInput
              
                id={inputName}
                name={inputName}
                placeholder={placeholder}
                defaultValue={defaultValue}
                decimalsLimit={2}
                disableGroupSeparators={disablegroupseparators}
                onValueChange={(value, name) => {
                  clearErrors(inputName);
                  setValue(inputName, value);
                  trigger(inputName);
                }}
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4  border-b border-[#8F8F8F] placeholder:text-[#BCBBBB] ${
                  (errors && errors[inputName]) || error
                    ? "border-red-600"
                    : "border-[#8F8F8F]"
                }`}
              />
            )}
            {isPercent && <span data-testid='percent' className="absolute right-1">%</span>}
            <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
              {hasButton && (
                <span>
                  {0}/{50}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {((errors && errors[inputName]) || error) && (
        <span className="text-sm text-danger-500">
          {errors[inputName]?.message || error}
        </span>
      )}
    </div>
  );
}
