import React from "react";
import { Icon } from "@iconify/react";

type IconType = {
  icon?: any;
  className?: string;
  width?: string | number;
  rotate?: any;
  hFlip?: any;
  vFlip?: any;
};
const Icons = ({ icon, className, width, rotate, hFlip, vFlip }: IconType) => {
  return (
    <span data-testid="icon">
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </span>
  );
};

export default Icons;
