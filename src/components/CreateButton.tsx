import { ButtonOptions } from "@app/constants";
import { AppContext } from "@app/utils";
import React, { useState, useRef, useEffect, useContext } from "react";
import { FaCaretRight } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";

interface CreateProp {
  title: string;
  key: string;
  isUrl: boolean;
  links: any;
  url: string;
  permission: string;
}
export function closeButton(
  setIsOpen,
  setSecondActive,
  setFourthActive,
  setThirdActive,
  setFirstActive
) {
  setIsOpen(false);
  setFirstActive("");
  setSecondActive("");
  setThirdActive("");
  setFourthActive("");
}
export function goToUrl(url, navigate) {
  if (url && navigate) {
    navigate(url);
  }
}
export default function CreateButton({ children }) {
  const { permissions } = useContext(AppContext);
  const navigate = useNavigate();
  const windowSize = useRef(window.innerWidth);
  const [firstActive, setFirstActive] = useState("");
  const [secondActive, setSecondActive] = useState("");
  const [thirdActive, setThirdActive] = useState("");
  const [fourthActive, setFourthActive] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
    <div data-testid="top-bar">
      <OutsideClickHandler
        onOutsideClick={() =>
          closeButton(
            setIsOpen,
            setSecondActive,
            setFourthActive,
            setThirdActive,
            setFirstActive
          )
        }
      >
        <div className="relative">
          <span onClick={() => setIsOpen(true)}>{children}</span>

          {/* First level  */}
          {isOpen && (
            <div className="top-0 absolute w-[286px] z-10 bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
              <ul>
                {ButtonOptions.map((item: CreateProp) => (
                  <li className="group">
                    <button
                      disabled={!permissions.includes(item?.permission)}
                      key={item.key}
                      onClick={() =>
                        item.isUrl
                          ? goToUrl(item.url, navigate)
                          : setFirstActive(item.key)
                      }
                      className={`disabled:opacity-50 disabled:cursor-not-allowed w-full z-10 relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 group-last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer ${
                        firstActive.toLowerCase() === item.key
                          ? "bg-[#F9E5E5]"
                          : "bg-white"
                      }`}
                    >
                      <span>{item.title}</span>{" "}
                      {!item.isUrl && <FaCaretRight />}
                      {/* second level  */}
                      {!item.isUrl &&
                        firstActive.toLowerCase() === item.key && (
                          <div className="z-10 absolute top-0 -right-[212px] w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
                            <ul>
                              {item?.links.map((item2: CreateProp) => (
                                <li className="group">
                                  <button
                                    key={item2.key}
                                    onClick={() =>
                                      item2.isUrl
                                        ? goToUrl(item2.url, navigate)
                                        : setSecondActive(item2.key)
                                    }
                                    className={`disabled:opacity-50 disabled:cursor-not-allowed w-full relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 group-last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer  ${
                                      secondActive.toLowerCase() === item2.key
                                        ? "bg-[#F9E5E5]"
                                        : "bg-white"
                                    }`}
                                  >
                                    <span>{item2.title}</span>{" "}
                                    {!item2.isUrl && <FaCaretRight />}
                                    {/* Third level  */}
                                    {!item2.isUrl &&
                                      secondActive.toLowerCase() ===
                                        item2.key && (
                                        <div
                                          className={`z-10 absolute top-0  ${
                                            windowSize.current > 1500
                                              ? "-right-[212px]"
                                              : "left-0"
                                          } w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]`}
                                        >
                                          <ul>
                                            {item2?.links.map(
                                              (item3: CreateProp) => (
                                                <li className="group">
                                                  <button
                                                    key={item3.key}
                                                    onClick={() =>
                                                      item3.isUrl
                                                        ? goToUrl(
                                                            item3.url,
                                                            navigate
                                                          )
                                                        : setThirdActive(
                                                            item3.key
                                                          )
                                                    }
                                                    className={`disabled:opacity-50 disabled:cursor-not-allowed w-full relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 group-last:rounded-b-lg hover:bg-[#F9E5E5] cursor-pointer  ${
                                                      thirdActive.toLowerCase() ===
                                                      item3.key
                                                        ? "bg-[#F9E5E5]"
                                                        : "bg-white"
                                                    }`}
                                                  >
                                                    <span>{item3.title}</span>{" "}
                                                    {!item3.isUrl && (
                                                      <FaCaretRight />
                                                    )}
                                                    {!item3.isUrl &&
                                                      thirdActive.toLowerCase() ===
                                                        item3.key && (
                                                        <div className="z-10 absolute top-0 -right-[212px] w-[209px] bg-white rounded-b-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] pt-[1px]">
                                                          <ul>
                                                            {item3?.links.map(
                                                              (
                                                                item4: CreateProp
                                                              ) => (
                                                                <li className="group">
                                                                  <button
                                                                    key={
                                                                      item4.key
                                                                    }
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
                                                                    className={`disabled:opacity-50 disabled:cursor-not-allowed w-full relative text-base text-[#636363] capitalize pl-6 pr-4 flex justify-between items-center py-3 group-last:rounded-b-lg cursor-pointer  hover:bg-[#F9E5E5] ${
                                                                      fourthActive.toLowerCase() ===
                                                                      item4.key
                                                                        ? "bg-[#F9E5E5]"
                                                                        : "bg-white"
                                                                    }`}
                                                                  >
                                                                    <span>
                                                                      {
                                                                        item4.title
                                                                      }
                                                                    </span>{" "}
                                                                    {!item4.isUrl && (
                                                                      <FaCaretRight />
                                                                    )}
                                                                    {/* Fourth level  */}
                                                                  </button>
                                                                </li>
                                                              )
                                                            )}
                                                          </ul>
                                                        </div>
                                                      )}
                                                  </button>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
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
