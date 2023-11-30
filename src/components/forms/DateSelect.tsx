// @ts-nocheck
import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import OutsideClickHandler from "react-outside-click-handler";
import { usePopper } from "../../hooks/use-popper";
import Button from "../Button";
import moment from "moment";
import { DateFilterOptions } from "@app/constants";

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}

export function handleClick(item, setDuration, setDates) {
 
  setDuration(item.value);
  if (item.value) {
    setDates({
      endDate: moment().format("l"), // Get the current date and time
      startDate: moment().subtract(item.value, "days").format("l"), // Add the specified duration to the start date
    });
  }
}

export const onChange = (dates, setDate) => {
  const [start, end] = dates;
  setDate({
    startDate: start,
    endDate: end,
  });
};
export default function DateSelect({
  children,
  onChangeDate,
}: {
  children: ReactNode;
  onChangeDate: (e) => void;
}): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, container] = usePopper({
    placement: "bottom-end",
    strategy: "absolute",
    modifiers: [{ name: "offset", options: { offset: [0, 36] } }],
  });
  const [duration, setDuration] = useState(0);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    onChangeDate(dates);
  }, [dates]);

  return (
    <div className="relative inline-block max-w-max">
      <button
        className=" cursor-pointer bg-transparent outline-none  h-auto w-auto"
        ref={trigger}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="date-select"
      >
        {children}
      </button>

      <div>
        {" "}
        {isOpen && (
          <Portal>
            <div
              ref={container}
              className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white py-4 pr-4 rounded-b-lg top-12"
            >
              <OutsideClickHandler
                onOutsideClick={() => closeDropdown(setIsOpen)}
              >
                <div className="mb-4 flex gap-x-4">
                  <ul className="flex flex-col gap-y-1 text-left w-full">
                    {DateFilterOptions.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() =>
                            handleClick(item, setDuration, setDates)
                          }
                          data-testid={item.name}
                          className={`outline-none h-8 flex items-center capitalize font-medium px-5 py-1 whitespace-nowrap cursor-pointer text-[#636363] text-sm w-full ${
                            duration === item.value
                              ? "bg-[#F9E5E5]"
                              : "hover:bg-[#F9E5E5]/30 "
                          }`}
                        >
                          {" "}
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className={`flex-1`}>
                    <DatePicker
                      data-testid="date-picker"
                      selected={
                        dates.startDate ? new Date(dates.startDate) : null
                      }
                      onChange={(value) => onChange(value, setDate)}
                      startDate={
                        dates.startDate ? new Date(dates.startDate) : null
                      }
                      endDate={dates.endDate ? new Date(dates.endDate) : null}
                      selectsRange
                      inline
                      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      setDuration("");
                      setDates({
                        startDate: null,
                        endDate: null,
                      });
                    }}
                    data-testid="reset"
                    className="bg-sterling-red-800 font-medium text-sm px-[27px] rounded-lg py-[7px]"
                  >
                    Reset
                  </Button>
                </div>
              </OutsideClickHandler>
            </div>
          </Portal>
        )}
      </div>
    </div>
  );
}

function Portal(props: { children: ReactNode }) {
  let { children } = props;
  let [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
