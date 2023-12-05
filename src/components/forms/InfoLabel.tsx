import React from "react";
import { RiInformationLine } from "react-icons/ri";

export default function InfoLabel({
  label,
  info,
}: {
  label?: string;
  info?: string;
}) {
  return (
    <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
      {label} {info && <RiInformationLine />}
    </span>
  );
}
