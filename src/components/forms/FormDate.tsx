import React, { useState, forwardRef, useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";

interface FormDateProps {
  className?: string;
  inputName?: string;
  register?: any;
  handleChange?: (value) => void;
  defaultValue?: "";
}

export default function FormDate({
  register = () => {},
  inputName,
  handleChange,
  className,
  defaultValue,
}: FormDateProps) {
  const [date, setDate] = useState(defaultValue);

  useEffect(() => {
    handleChange(date);
  }, [date]);
  const MyContainer = ({ className, children }) => {
    return (
      <div
        style={{
          padding: "8px",
          background: "#ffffff",
          color: "#fff",
          borderRadius: "4px",
          boxShadow: "0px 4px 8px 0px rgba(5, 27, 68, 0.08)",
        }}
      >
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };
  return (
    <div>
      <div className="relative flex items-center">
        <DatePicker
          data-testid="date-picker"
          selected={date ? new Date(date) : null}
          onChange={(date) => setDate(date)}
          // {...register(inputName, {
          //   // required: true,
          // })}
          calendarContainer={MyContainer}
          placeholderText="dd/mm/yyyy"
          className={` placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4 border-b border-[#8F8F8F] placeholder:text-[#BCBBBB] `}
        />
        {/* <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
          <FaRegCalendarAlt />
        </div> */}
      </div>
    </div>
  );
}
