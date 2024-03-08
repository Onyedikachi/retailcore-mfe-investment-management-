import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  id: string | number;
  title: string;
  url: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbItem[];
}

export default function Breadcrumbs({
  links,
}: BreadcrumbsProps): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-x-2" data-testid="breadcrumbs">
      <button
        className="py-1 px-1 h-8 w-8 rounded flex items-center justify-center outline-none bg-transparent hover:bg-[#F9F2F2]"
        onClick={() => navigate(-1)}
        data-testid="back button"
      >
        <BsArrowLeft className="text-[#636363]" />{" "}
      </button>
      <ul className="flex gap-x-8 uppercase items-center">
        {links.map((item: BreadcrumbItem, idx: number) => (
          <li
            key={`${idx.toString()}-index`}
            onMouseOver={() => { }}
            onClick={() => navigate(item.url)}
            data-testid={item.title}
            className={`first-of-type:hover:bg-[#F9F2F2] ${item.url !== "#" ? "hover:bg-[#F9F2F2] cursor-pointer" : ""
              } px-2 py-1 rounded first-of-type:cursor-pointer relative text-[#8F8F8F] text-base font-medium last-of-type:text-[#636363] after:absolute after:content-[''] after:right-[-16px] after:top-1/2 after:translate-y-[-50%] after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-[#636363] after:-rotate-45 last-of-type:after:content-none`}
          >
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
