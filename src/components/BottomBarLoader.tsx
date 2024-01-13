import React from "react";

const BottomBarLoader = () => {
  return (
    <div
      data-testid="bottom-bar-loader"
      className="w-full  p-2 flex justify-center items-center"
    >
      <div className="spinner-border h-10 w-10 border-t border-danger-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default BottomBarLoader;
