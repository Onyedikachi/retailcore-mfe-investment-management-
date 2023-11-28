import React, { useState, useRef, useEffect } from "react";
import { FaCaretRight } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";

export function closeButton(
  setIsOpen,
  setSecondActive,
  setFourthActive,
  setThirdActive
) {
  setIsOpen(false);
  setSecondActive("");
  setThirdActive("");
  setFourthActive("");
}
export function goToUrl(url, navigate) {
  navigate(url);
}
export default function CreateButton({ children }) {
  const navigate = useNavigate();
  const windowSize = useRef(window.innerWidth);
  const [firstActive, setFirstActive] = useState("");
  const [secondActive, setSecondActive] = useState("");
  const [thirdActive, setThirdActive] = useState("");
  const [fourthActive, setFourthActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      title: "Deposit",
      key: "deposit",
      isUrl: false,
      links: [
        {
          title: "Current",
          key: "current",
          isUrl: true,
          url: "#",
        },

        {
          title: "Savings",
          key: "savings",
          isUrl: true,
          url: "#",
        },
      ],
    },
    {
      title: "Credit",
      key: "credit",
      isUrl: false,
      links: [
        {
          title: "Loans",
          key: "loans",
          isUrl: false,
          url: "#",
          links: [
            {
              title: "Individual Loans",
              key: "individual-loans",
              isUrl: true,
              url: "#",
            },
            {
              title: "Commercial loans",
              key: "commercial-loans",
              isUrl: false,
              url: "#",
              links: [
                {
                  title: "SME Loans",
                  key: "sme-loans",
                  isUrl: true,
                  url: "#",
                },
                {
                  title: "Corporate loans",
                  key: "corporate-loans",
                  isUrl: true,
                  url: "#",
                },
              ],
            },
          ],
        },
        {
          title: "Overdraft",
          key: "overdraft",
          isUrl: true,
          url: "#",
        },
      ],
    },
    {
      title: "Over the counter payment",
      key: "counter-payment",
      isUrl: false,
      links: [
        {
          title: "Cash withdrawal",
          key: "cash-withdrawal",
          isUrl: true,
          url: "#",
        },
        {
          title: "Within bank transfer",
          key: "within-bank-transfer",
          isUrl: true,
          url: "#",
        },
        {
          title: "Other bank transfer",
          key: "other-bank-transfer",
          isUrl: true,
          url: "#",
        },
      ],
    },
    {
      title: "Investment",
      key: "investment",
      isUrl: false,
      links: [
        {
          title: "Term deposits",
          key: "term-deposits",
          isUrl: true,
          url: "#",
        },
        {
          title: "Treasury Bill",
          key: "treasury-bill",
          isUrl: true,
          url: "#",
        },
        {
          title: "Commercial paper",
          key: "commercial-paper",
          isUrl: true,
          url: "#",
        },
      ],
    },
  ];

  useEffect(() => {
    setSecondActive("");
    setThirdActive("");
    setFourthActive("");
  }, [firstActive]);
  useEffect(() => {
    setThirdActive("");
    setFourthActive("");
  }, [setSecondActive]);
  useEffect(() => {
    setFourthActive("");
  }, [setThirdActive]);

  return (
    <OutsideClickHandler
      onOutsideClick={() =>
        closeButton(setIsOpen, setSecondActive, setFourthActive, setThirdActive)
      }
    >
      <div className="relative">
        <span onClick={() => setIsOpen(true)}>{children}</span>

        {/* First level  */}
        {isOpen && (
          <div className="top-0 absolute w-[286px] z-10 bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
            <ul>
              {options.map(
                (item: {
                  title: string;
                  key: string;
                  isUrl: boolean;
                  links: any;
                  url: string;
                }) => (
                  <li
                    key={item.key}
                    onClick={() =>
                      item.isUrl
                        ? goToUrl(item.url, navigate)
                        : setFirstActive(item.key)
                    }
                    className={`z-10 relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer ${
                      firstActive.toLowerCase() === item.key
                        ? "bg-[#F9E5E5]"
                        : "bg-white"
                    }`}
                  >
                    <span>{item.key}</span> {!item.isUrl && <FaCaretRight />}
                    {/* second level  */}
                    {!item.isUrl && firstActive.toLowerCase() === item.key && (
                      <div className="z-10 absolute top-0 -right-[212px] w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
                        <ul>
                          {item?.links.map(
                            (item2: {
                              title: string;
                              key: string;
                              isUrl: boolean;
                              links: any;
                              url: string;
                            }) => (
                              <li
                                key={item2.key}
                                onClick={() =>
                                  item2.isUrl
                                    ? goToUrl(item2.url, navigate)
                                    : setSecondActive(item2.key)
                                }
                                className={`relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer  ${
                                  secondActive.toLowerCase() === item2.key
                                    ? "bg-[#F9E5E5]"
                                    : "bg-white"
                                }`}
                              >
                                <span>{item2.key}</span>{" "}
                                {!item2.isUrl && <FaCaretRight />}
                                {/* Third level  */}
                                {!item2.isUrl &&
                                  secondActive.toLowerCase() === item2.key && (
                                    <div
                                      className={`z-10 absolute top-0  ${
                                        windowSize.current > 1500
                                          ? "-right-[212px]"
                                          : "left-0"
                                      } w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]`}
                                    >
                                      <ul>
                                        {item2?.links.map(
                                          (item3: {
                                            title: string;
                                            key: string;
                                            isUrl: boolean;
                                            links: any;
                                            url: string;
                                          }) => (
                                            <li
                                              key={item3.key}
                                              onClick={() =>
                                                item3.isUrl
                                                  ? goToUrl(item3.url, navigate)
                                                  : setThirdActive(item3.key)
                                              }
                                              className={`relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer  ${
                                                thirdActive.toLowerCase() ===
                                                item3.key
                                                  ? "bg-[#F9E5E5]"
                                                  : "bg-white"
                                              }`}
                                            >
                                              <span>{item3.key}</span>{" "}
                                              {!item3.isUrl && <FaCaretRight />}
                                              {!item3.isUrl &&
                                                thirdActive.toLowerCase() ===
                                                  item3.key && (
                                                  <div className="z-10 absolute top-0 -right-[212px] w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
                                                    <ul>
                                                      {item3?.links.map(
                                                        (item4: {
                                                          title: string;
                                                          key: string;
                                                          isUrl: boolean;
                                                          links: any;
                                                          url: string;
                                                        }) => (
                                                          <li
                                                            key={item4.key}
                                                            onClick={() =>
                                                              item4.isUrl
                                                                ? goToUrl(
                                                                    item4.url,
                                                                    navigate
                                                                  )
                                                                : setFourthActive(
                                                                    item3.key
                                                                  )
                                                            }
                                                            className={`relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 last:rounded-b-lg cursor-pointer  hover:bg-[#F9E5E5] ${
                                                              fourthActive.toLowerCase() ===
                                                              item4.key
                                                                ? "bg-[#F9E5E5]"
                                                                : "bg-white"
                                                            }`}
                                                          >
                                                            <span>
                                                              {item4.key}
                                                            </span>{" "}
                                                            {!item4.isUrl && (
                                                              <FaCaretRight />
                                                            )}
                                                            {/* Fourth level  */}
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  </div>
                                                )}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
