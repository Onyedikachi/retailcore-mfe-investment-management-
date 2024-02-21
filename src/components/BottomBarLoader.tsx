import React from "react";

const BottomBarLoader = ({
  w = "w-10",
  h = "h-10",
}: {
  w?: string;
  h?: string;
}) => {
  return (
    <div
      data-testid="bottom-bar-loader"
      className="w-full  p-2 flex justify-center items-center"
    >
      <div
        className={`spinner-border h-10 w-10 border-t border-danger-500 rounded-full animate-spin ${w} ${h}`}
      ></div>
    </div>
  );
};

export default BottomBarLoader;
