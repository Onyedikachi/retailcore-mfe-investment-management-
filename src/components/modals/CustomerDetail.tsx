import React, { useContext, useRef, useState, useEffect } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaTimes, FaCaretRight, FaCaretDown } from "react-icons/fa";
import moment from "moment";
import ModalLayout from "./Layout";
import { detailData } from "@app/constants/investment";
import { downloadUsingFetch } from "@app/utils/downloadFile";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  detail: any;
}
export const TabHeader = ({ title, active }) => {
  return (
    <div data-testid="tab-header" className="border  flex gap-x-4 items-center py-1 px-4 border-[#eee]">
      {active.includes(title) ? (
        <FaCaretDown className="text-red-600" />
      ) : (
        <FaCaretRight data-testid="caret-icon" className="text-red-600" />
      )}{" "}
      {title}
    </div>
  );
};

export const TabContent = ({ title, content, detail }) => {
  return (
    <div className="grid grid-cols-1 gap-y-6 px-[70px] mt-[27px]">
      {content.map((item) => (
        <div data-testid="tab-content-item" key={`${item.key}-idx`} className="flex gap-x-[60px] items-center">
          <div data-testid="tab-content-label" className="text-base font-medium w-[200px] capitalize">
            {item.label}
          </div>
          {item.type === "date" ? (
            <div className="text-base font-normal">
              {moment(detail[item.key]).format("l")}
            </div>
          ) : (
            <div>
              {item.type === "array" ? (
                <div className="text-base font-normal">
                  {detail[item.key] && JSON.parse(detail[item.key]).length ? (
                    <span className="flex items-center gap-x-3">
                      <span>Uploaded </span>{" "}
                      <button
                        onClick={() =>
                          downloadUsingFetch(JSON.parse(detail[item.key])[0][item.subkey])
                        }
                      >
                        (View)
                      </button>
                    </span>
                  ) : (
                    "Not uploaded"
                  )}
                </div>
              ) : (
                <div className="text-base font-normal">{detail[item.key]}</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const CustomerDetail = ({ isOpen, setIsOpen, detail }: Props) => {
  const [active, setActive] = useState([]);
  const toggleTab = (val) => {
    setActive((prevActive) => {
      if (prevActive.includes(val)) {
        return prevActive.filter((i) => i !== val);
      } else {
        return [...prevActive, val];
      }
    });
  };

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        data-testid="product-view"
        className="relative  w-[1218px]  rounded-lg bg-white px-16 pb-16"
      >
        <div>
          <div className="flex justify-between items-center pb-6 pt-8 border-b border-[#CCCCCC] w-full mb-[52px]">
            <div className="flex gap-x-5 items-center">
              <h1
                data-testid="product-name"
                className="text-[#636363] font-bold text-2xl uppercase"
              >
                Customer's Information
              </h1>
            </div>
            <span onClick={() => setIsOpen(false)}>
              {" "}
              <FaTimes className="text-[#525252]" />{" "}
            </span>
          </div>

          <div className="flex gap-x-4 items-center mb-10">
            <div>
              <img
                src={
                  detail?.customerPhoto
                    ? JSON.parse(detail?.customerPhoto)[0]?.signedUrl
                    : ""
                }
                className="w-[152px] h-[152px] rounded-full bg-gray-50"
                alt="photo"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold mb-[6px] capitalize">
                {detail?.firstName} {detail?.otherNames} {detail?.surname}
              </p>
              <p className="text-base font-normal">
                <span className="font-semibold">ID</span>:{" "}
                {detail?.validId && JSON.parse(detail?.validId).length
                  ? JSON.parse(detail?.validId)
                  : "-"}
              </p>
            </div>
          </div>

          <div className="py-2 max-h-[450px] overflow-y-auto grid gap-y-[27px]">
            {detailData.map((item) => (
              <div key={item.title}>
                <div onClick={() => toggleTab(item.title)}>
                  <TabHeader title={item.title} active={active} />
                </div>
                {active.includes(item.title) && (
                  <TabContent
                    title={item.title}
                    content={item.data}
                    detail={detail}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};
