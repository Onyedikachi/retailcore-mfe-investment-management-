import React, { useState, useEffect } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { FaCalendar, FaRegCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

interface FormDateProps {
  className?: string;
  inputName?: string;
  register?: any;
  handleChange?: (value: Date) => void;
  defaultValue?: string | null;
  errors?: any;
  minDate?: Date | null;
  maxDate?: Date | null;
  clearErrors?: (name?: string | string[]) => void;
  trigger: any
}

const FormDate: React.FC<FormDateProps> = ({
  register = () => {},
  inputName,
  handleChange,
  className,
  defaultValue,
  errors,
  minDate,
  maxDate,
  clearErrors,
  trigger
}: FormDateProps) => {
  const [date, setDate] = useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null
  );

  useEffect(() => {
    if (defaultValue) {
      setDate(new Date(defaultValue));
    }
  }, [defaultValue]);

  useEffect(() => {
    handleChange(date!); // Ensuring date is not null
  }, [date]);

  const MyContainer: React.FC<{ className: string }> = ({
    className,
    children,
  }) => (
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

  return (
    <div>
      <div className="relative flex items-center date-picker">
        <DatePicker
          showIcon
          dateFormat="dd/MM/yyyy"
          data-testid="date-picker"
          selected={date}
          onChange={(date) => {
            handleChange(date)
            setDate(date);
            clearErrors && clearErrors(inputName);
            trigger && trigger(inputName)
          }}
          calendarContainer={MyContainer}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="dd/mm/yyyy"
          className={`placeholder-[#BCBBBB] ring-0 outline-none w-full py-1 pl-2 pr-4 border-b placeholder:text-[#BCBBBB] ${
            errors && errors[inputName] ? "border-red-600" : "border-[#8F8F8F]"
          }`}
        />
       <span className="absolute right-[2px]"> <FaCalendar /></span>
      </div>
      {errors && errors[inputName] && (
        <span className="text-sm text-danger-500">
          {errors[inputName]?.message}
        </span>
      )}
    </div>
  );
};

export default FormDate;
