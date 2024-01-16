import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { BookInvestmentOptions, IBookInvestmentOptions } from "@app/constants";
import { useNavigate } from "react-router-dom";

type BookInvestmentButton = {
  children?: any;
};

export default function BookInvestmentButton({
  children,
}: BookInvestmentButton) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goToUrl = (url) => {
    navigate(url);

    setIsOpen(false);
  };

  return (
    <div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="relative">
          <div onClick={() => setIsOpen(true)}>{children}</div>
          {isOpen && (
            <div className="top-0 absolute w-[286px] z-10 bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
              <ul>
                {BookInvestmentOptions?.map((item: IBookInvestmentOptions) => (
                  <li className="group" key={item.title}>
                    <button
                      onClick={() => {
                        goToUrl(item.url);
                      }}
                      className={`disabled:opacity-50 disabled:cursor-not-allowed w-full z-10 relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 group-last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
}
