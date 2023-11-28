import { Menu, Transition } from "@headlessui/react";
import {
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../components/ui/Icon";

type ItemType = {
  label: string;
  link: string;
  hasDivider: boolean;
  subMenu: any[];
};

export type CascadingDropdown = {
  label: any;
  wrapperClass?: string;
  labelClass?: string;
  classMenuItems?: string;
  classItem?: string;
  className?: string;
  items?: ItemType[];
};

const CascadingDropdown = ({
  label = "Dropdown",
  wrapperClass = "inline-block",
  labelClass = "label-class-custom",
  classMenuItems = "-mt-10 pt-1 w-[220px]",
  items,
  classItem = "px-4 py-2",
  className = "",
}: PropsWithChildren<CascadingDropdown>) => {
  return (
    <div className={`relative ${wrapperClass}`}>
      <Menu as="div" className={`block w-full ${className}`}>
        <Menu.Button className="block w-full">
          <div className={labelClass}>{label}</div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`absolute  ltr:right-0 rtl:left-0 origin-top-right  border border-[#FFF]
            rounded-b-[8px] bg-[#FFF]   shadow-md z-[9999]
            ${classMenuItems}
            `}
          >
            <div>
              {items?.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? "bg-[#F9E5E5]" : " "
                      } block   text-[#636363]  ${
                        item.hasDivider ? "border-t border-slate-100 " : ""
                      }`}
                    >
                      {item.link ? (
                        <NavLink
                          to={item.link}
                          className={`block ${classItem}`}
                        >
                          <span className="block text-sm">{item.label}</span>
                        </NavLink>
                      ) : (
                        <div className={`block cursor-pointer ${classItem}`}>
                          <span className="block text-sm">{item.label}</span>
                        </div>
                      )}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CascadingDropdown;
