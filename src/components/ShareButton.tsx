import React from "react";
import Button from "./Button";
import { BsFillShareFill } from "react-icons/bs";
import { RWebShare } from "react-web-share";

const ShareButton = ({ title, text, url }: any) => {
  return (
    <div data-testid="share-btn">
      <RWebShare
        data={{
          title,
          text,
          url,
        }}
      >
        <Button className="cursor-pointer max-w-max  px-10 py-[5px] bg-white rounded-lg border border-gray-300 justify-center items-center gap-2.5 inline-flex">
          <BsFillShareFill className="text-[#636363] w-[24px] h-[24px]" />

          <div className="mr-auto text-gray-500 text-base font-medium leading-normal">
            Share
          </div>
        </Button>
      </RWebShare>
    </div>
  );
};

export default ShareButton;
