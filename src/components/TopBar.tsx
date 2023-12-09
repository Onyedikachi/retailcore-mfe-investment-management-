import { useContext, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "./Button";
import { InvestmentContext, AppContext } from "../utils/context";
import { StatusCategoryType } from "@app/constants/enums";
import CreateButton from "./CreateButton";
import SearchInput from "./SearchInput";
import { useGetPostProductsMutation } from "@app/api";
import { useNavigate } from "react-router-dom";

export const getSearchResult = (
  value,
  getProducts,

  setSearchResults
) => {
  if (!value.length) {
    setSearchResults([]);
    return;
  }

  getProducts({
    search: value,
    page: 1,
    page_Size: 25,
    filter_by: "created_by_me",
  });
};

export function Tabs() {
  const [active, setActtive] = useState("investment");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const tabOptions = [
    {
      title: "deposit",
      url: "/product/factory/dashboard/Deposit",
    },
    {
      title: "credit",
      url: "#",
    },
    {
      title: "Over the counter Payments",
      url: "/product/factory/dashboard/Payment",
    },
    {
      title: "investment",
      url: "/product-factory/investment",
    },
  ];

  function handleTabClick (tab){
    setActtive(tab.title)
    navigate(tab.url)
  }

  const [
    getProducts,
    { data, isSuccess, isError, error, isLoading: searchLoading },
  ] = useGetPostProductsMutation();

  function handleSearch(value) {}
  return (
    <div className="flex justify-between">
      <ul className="flex gap-x-8">
        {tabOptions.map((tab) => (
          <li
            key={tab.title}
            onClick={() => {
              handleTabClick(tab)
            }}
            data-testid={tab.title}
            className={`${
              active == tab.title
                ? "text-[#252C32] text-lg font-semibold "
                : "text-[#636363] text-base "
            }   capitalize flex flex-col justify-end cursor-pointer`}
          >
            <span className="block mb-[7px]">{tab.title}</span>
            <span
              className={`${
                active == tab.title
                  ? " border-[#CF2A2A] shadow-[0px_0px_4px_1px_rgba(0,0,0,0.25)] border-[1.5px]"
                  : "border-[#DDE2E4] border-[0.75px] shadow-[0px_0px_2px_0px_rgba(228,139,139,0.48)]"
              }   rounded-lg w-full block`}
            />
          </li>
        ))}
      </ul>
      <div>
        <SearchInput
          hideBorder
          setSearchTerm={(value) =>
            getSearchResult(
              value,
              getProducts,

              setSearchResults
            )
          }
          placeholder="Search by product"
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchLoading={searchLoading}
          handleSearch={(value) => handleSearch(value)}
        />
      </div>
    </div>
  );
}
export default function TopBar() {
  const { isChecker, category } = useContext(InvestmentContext);
  const { permissions } = useContext(AppContext);

  return (
    <div className="bg-white px-8   w-full border-b border-[#E5E9EB]">
      <div
        data-testid="top-bar"
        className="py-[52px] w-full min-h-[198px] flex gap-x-9 items-center"
      >
        <h1 className="text-[#636363] text-[38px] font-bold">
          Product Factory
        </h1>

        <CreateButton>
          <Button data-testid="create-btn" className="bg-sterling-red-800">
            <span className="p-[5px]">
              <HiPlus fontSize={14} />
            </span>{" "}
            Create new product
          </Button>
        </CreateButton>
      </div>
      <Tabs />
    </div>
  );
}
