import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast, ToastOptions } from "react-toastify";

// Define the correct type for ToastOptions
export const toastProps: ToastOptions = {
  position: "bottom-left",
};

export const errorToastProps: ToastOptions = {
  ...toastProps,
  // Add any specific properties for error toasts here
};

export const Msg = (
  { closeToast }: { closeToast: () => void },
  text: string
) => (
  <div className="flex gap-x-10 justify-between items-center w-[246px]">
    <div className="flex gap-x-4">
      <div>
        <FaInfoCircle data-testid="info-icon" className="text-[30px] text-sterling-red-800" />
      </div>
      <div>
        <p className="text-base font-medium mb-2 text-[#333]">System Alert</p>
        <p className="text-sm text-[#666]">{text}</p>
      </div>
    </div>
  </div>
);

export function customToast(text: string) {
  toast.info(({ closeToast }) => Msg({ closeToast }, text), toastProps);
}

// Function to display error toasts
export function errorToast(text: string) {
  toast.error(({ closeToast }) => Msg({ closeToast }, text), errorToastProps);
}
