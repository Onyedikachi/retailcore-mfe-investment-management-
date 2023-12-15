// @ts-nocheck
import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu } from "@headlessui/react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlayCircle,
  FaBan,
  FaClone,
} from "react-icons/fa";
import { usePopper } from "../hooks/use-popper";

export function handleIcons(value: string) {
  switch (value) {
    case "FaEye":
      return <FaEye className="text-[#3FA2F7]" />;
    case "FaEdit":
      return <FaEdit className="text-[#D4A62F]" />;
    case "FaTrash":
      return <FaTrash className="text-[#DC5A5D]" />;
    case "FaBan":
      return <FaBan className="text-[#DC5A5D]" />;
    case "FaPlayCircle":
      return <FaPlayCircle className="text-[#2FB755]" />;
    case "FaClone":
      return <FaClone className="text-[#085CA5]" />;
  }
}
export default function TestDrop({
  options,
  children,
  handleClick,
}: {
  options: any;
  children: ReactNode;
  handleClick?: (e: any) => void;
}) {
  let [trigger, container] = usePopper({
    placement: "bottom-end",
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
  });

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <span className="inline-flex rounded-md">
          <Menu.Button
            data-testid="trigger"
            ref={trigger}
            className="inline-flex w-full justify-center px-4 py-2 text-sm "
          >
            {children}
          </Menu.Button>
        </span>

        <Portal>
          <Menu.Items
            ref={container}
            className="shadow-[0px_0px_4px_0px_#00000040] mt-2 min-w-[227px]  divide-y divide-gray-100 rounded-b-lg bg-white z-40"
          >
            <div className="">
              {options?.map((item: { id: any; text: string; icon: string }) => (
                <Menu.Item key={item?.text}>
                  {() => (
                    <button
                      data-testid="menu-button"
                      name={item.text}
                      onClick={() => handleClick(item?.text)}
                      className={` group flex w-full items-center whitespace-nowrap px-4 py-[11px] text-sm text-[#636363] gap-x-3 hover:bg-[#F9E5E5]`}
                    >
                      {handleIcons(item?.icon)} {item?.text}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Portal>
      </Menu>
    </div>
  );
}

function Portal(props: { children: ReactNode }) {
  let { children } = props;
  let [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
