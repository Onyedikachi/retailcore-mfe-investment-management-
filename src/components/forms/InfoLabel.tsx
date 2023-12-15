import { toolTips } from "@app/constants";
import React from "react";
import { RiInformationLine } from "react-icons/ri";
import FormToolTip from "../FormToolTip";

export default function InfoLabel({
  label,
  info,
}: {
  label?: string;
  info?: string;
}) {
  return (
    <span className="capitalize min-w-[300px] flex items-center gap-[5px] text-[##636363] text-base font-medium">
      {label}    <FormToolTip tip={toolTips.ageGroup} />
    </span>
  );
}
