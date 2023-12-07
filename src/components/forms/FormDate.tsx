import React, { useState, forwardRef, useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";

interface FormDateProps {
  className?: string;
  inputName?: string;
  register?: any;
  handleChange?: (value) => void;
  defaultValue?: string;
  errors?: any;
  minDate?: any;
  maxDate?: any;
  clearErrors?: any;
}

export default function FormDate({
  register = () => {},
  inputName,
  handleChange,
  className,
  defaultValue = "",
  errors,
  minDate,
  maxDate,
  clearErrors,
}: FormDateProps) {
  const [date, setDate] = useState(defaultValue);

  useEffect(() => {
    handleChange(date);
  }, [date]);
  useEffect(() => {
    console.log("🚀 ~ file: FormDate.tsx:26 ~ minDate:", minDate);
  }, [minDate]);
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
      <div className="relative flex items-center date-picker">
        <DatePicker
          showIcon
          dateFormat="dd/MM/yyyy"
          data-testid="date-picker"
          selected={date ? new Date(date) : null}
          onChange={(date) => {
            setDate(date);
            clearErrors(inputName);
          }}
          calendarContainer={MyContainer}
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
          placeholderText="dd/mm/yyyy"
          className={` placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4 border-b  placeholder:text-[#BCBBBB] ${
            errors && errors[inputName] ? "border-red-600" : "border-[#8F8F8F]"
          } `}
        />
      </div>
      {errors && errors[inputName] && (
        <span className="text-sm text-danger-500">
          {errors[inputName]?.message}
        </span>
      )}
    </div>
  );
}
