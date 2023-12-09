import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (isChecked: boolean) => void;
  sublabel?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  sublabel,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
    if (onChange) onChange(!isChecked);
  };

  return (
    <div>
      <label className="flex gap-x-3 items-center text-[#636363] text-sm cursor-pointer font-normal capitalize">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="accent-sterling-red-800"
          data-testid={label}
        />
        <span className="whitespace-nowrap block">{label}</span>
        <span className="whitespace-nowrap text-xs text-[#aaa]">{sublabel}</span>
      </label>
    </div>
  );
};

export default Checkbox;
