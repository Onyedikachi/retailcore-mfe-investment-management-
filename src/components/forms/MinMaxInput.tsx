import React from "react";
interface MinMaxProps {
  label: string;
  hasButton?: boolean;
  currency?: string;
  className?: string;
}
export default function MinMaxInput({
  label,
  hasButton,
  currency,
  className,
}: MinMaxProps) {
  return (
    <div className={`${className} flex items-center gap-4`}>
      <div>{label}</div>
      {currency && <div className="text-[#636363]">{currency}</div>}

      <div className="w-full flex flex-col gap-2">
        <div className="relative flex items-center max-w-[642px]">
          <input
            data-testid="min-max-input"
            className={`placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4  border-b border-[#8F8F8F] placeholder:text-[#BCBBBB] `}
            onChange={(e) => e.target.valueAsNumber}
            placeholder="01"
            // maxLength={defaultLength}
            defaultValue={0}
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
      </div>
    </div>
  );
}
