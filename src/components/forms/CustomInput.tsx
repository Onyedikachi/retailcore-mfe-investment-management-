import React from "react";

type CustomInputProps = {
  placeholder?: string;
  inputClass?: string;
  defaultValue?: any;
  formData?: any;
  maxLength?: number;
  setFormData?: (value) => void;
};
export function handleChange(value, formData, setFormData, maxLength) {
  console.log(value);
  // setFormData({...formData})
}
export default function CustomInput({
  formData,
  setFormData,
  maxLength,
  defaultValue,
  placeholder,
  inputClass,
}: CustomInputProps) {
  return (
    <div className="relative flex items-center w-full">
      <input
        data-testid="custom-input"
        className={`${inputClass} placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
        onChange={(e) =>
          handleChange(e.target.value, formData, setFormData, maxLength)
        }
        placeholder={placeholder}
        // maxLength={defaultLength}
        defaultValue={defaultValue}
        // aria-invalid={errors?.name ? "true" : "false"}
      />
      {maxLength > 0 && (
        <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
          <span data-testid="maxLength">
            {0}/{maxLength}
          </span>{" "}
        </div>
      )}
    </div>
  );
}
