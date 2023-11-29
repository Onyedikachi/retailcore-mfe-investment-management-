import React from "react";

type CustomInputProps = {
  inputClass?: string;
  defaultValue?: any;
  formData?: any;
  maxLength?: number;
  setFormData?: (value) => void;
};
export function handleChange(value, formData, setFormData, maxLength) {
  console.log(value);
}
export default function CustomInput({
  formData,
  setFormData,
  maxLength,
  defaultValue,
  inputClass,
}: CustomInputProps) {
  return (
    <div className="relative flex items-center w-full">
      <input
        data-testid="ccustom-input"
        className={`${inputClass} placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
        onChange={(e) =>
          handleChange(e.target.value, formData, setFormData, maxLength)
        }
        placeholder=""
        // maxLength={defaultLength}
        defaultValue={defaultValue}
        // aria-invalid={errors?.name ? "true" : "false"}
      />
      {maxLength && (
        <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
          <span>
            {0}/{maxLength}
          </span>{" "}
        </div>
      )}
    </div>
  );
}
