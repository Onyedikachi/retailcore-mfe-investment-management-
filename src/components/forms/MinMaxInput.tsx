import React from "react";
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
  trigger?: any
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
  trigger
}: MinMaxProps) {
  return (
    <div className={`${className} flex items-center gap-4`}>
      {label && <div>{label}</div>}
      {currency && <div className="text-[#636363]">{currency}</div>}

      <div className="w-full flex flex-col gap-2">
        <div className="relative flex items-center max-w-[642px]">
          <input
            data-testid="min-max-input"
            className={`placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4  border-b border-[#8F8F8F] placeholder:text-[#BCBBBB] ${
              errors && errors[inputName]
                ? "border-red-600"
                : "border-[#8F8F8F]"
            }`}
            onChange={(e) => {
              setValue(inputName, e.target.valueAsNumber);
              clearErrors(inputName);
              trigger(inputName)
            }}
            placeholder="0"
            // maxLength={defaultLength}
            {...register(inputName)}
            defaultValue={defaultValue}
            // aria-invalid={errors?.name ? "true" : "false"}
          />
          <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
            {hasButton && (
              <span>
                {0}/{50}
              </span>
            )}
          </div>
        </div>
        {errors && errors[inputName] && (
          <span className="text-sm text-danger-500">
            {errors[inputName]?.message}
          </span>
        )}
      </div>
    </div>
  );
}
