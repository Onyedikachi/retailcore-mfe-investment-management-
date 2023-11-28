import { useContext } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "./Button";
import { InvestmentContext, AppContext } from "../utils/context";
import { StatusCategoryType } from "@app/constants/enums";

import CreateButton from "./CreateButton";

export default function TopBar() {
  const { isChecker, category } = useContext(InvestmentContext);
  const { permissions } = useContext(AppContext);

  const items = [
    {
      label: "Action",
      link: "#",
      hasDivider: true,
      subMenu: [
        {
          label: "Another action",
          link: "#",
          hasDivider: true,
          subMenu: [
            {
              label: "Another action",
              link: "#",
              hasDivider: true,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-white px-8 py-[52px] w-full border border-[#E5E9EB] min-h-[198px] flex gap-x-9 items-center border-t-0">
      <h1 className="text-[#636363] text-5xl font-bold">Product Factory</h1>

      <CreateButton>
        <Button className="bg-sterling-red-800">
          <span className="p-[5px]">
            <HiPlus fontSize={14} />
          </span>{" "}
          Create new product
        </Button>
      </CreateButton>
    </div>
  );
}
