import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
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
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
