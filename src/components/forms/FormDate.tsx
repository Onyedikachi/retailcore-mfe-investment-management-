import React, { useState, forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function FormDate() {
  const [date, setDate] = useState("");
  //   const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
  //     <button className="example-custom-input" onClick={onClick} ref={ref}>
  //       {value}
  //     </button>
  //   ));
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
