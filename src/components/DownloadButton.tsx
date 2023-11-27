import React from "react";
import { HiDownload } from "react-icons/hi";

export default function DownloadButton({ handleDownload }: any) {
  return (
    <button
      onClick={() => handleDownload()}
      type="button"
      className="flex gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
    >
      <HiDownload className="text-lg" /> Download
    </button>
  );
}
