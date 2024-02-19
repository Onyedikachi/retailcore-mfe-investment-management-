import { useContext, useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";
import { InvestmentContext, AppContext } from "../utils/context";
import { StatusCategoryType } from "@app/constants/enums";
import CreateButton from "./CreateButton";
import SearchInput from "./SearchInput";
import { useGetPostProductsMutation } from "@app/api";
import { useNavigate } from "react-router-dom";
import {
  RequiredCreditPermissions,
  RequiredDepositPermissions,
  RequiredPaymentPermissions,
} from "@app/constants/investment";

export const getSearchResult = (
  value,
  getProducts,
  setSearchResults,
  selected
) => {
  if (!value.length) {
    setSearchResults([]);
    return;
  }

  getProducts({
    search: value,
    page: 1,
    page_Size: 100,
    filter_by: selected.value,
  });
};

export function Tabs() {
  const location = useLocation();
  const { permissions } = useContext(AppContext);
  const { selected, setDetailOpen, setDetail } = useContext(InvestmentContext);
  const [active, setActtive] = useState("investment");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const filteredTabs = useRef([]);

  const tabOptions = [
    {
      title: "deposit",
      url: "/product/factory/dashboard/Deposit",
      disabled: false,
    },
    {
      title: "credit",
      url: "#",
      disabled: false,
    },
    {
      title: "Over the counter Payments",
      url: "/product/factory/dashboard/Payment",
      disabled: false,
    },
    {
      title: "investment",
      url: "/product-factory/investment",
      disabled: false,
    },
  ];
  useEffect(() => {
    filteredTabs.current = tabOptions.map((i) => {
      if (i.title === "credit") {
        i.disabled = !RequiredCreditPermissions.some((item) =>
          permissions.includes(item)
        );
      }
      if (i.title === "deposit") {
        i.disabled = !RequiredDepositPermissions.some((item) =>
          permissions.includes(item)
        );
      }
      if (i.title === "Over the counter Payments") {
        i.disabled = !RequiredPaymentPermissions.some((item) =>
          permissions.includes(item)
        );
      }
      return i;
    });
  }, [permissions]);

  function handleTabClick(tab) {
    setActtive(tab.title);
    navigate(tab.url);
  }

  const [
    getProducts,
    { data, isSuccess, isError, error, isLoading: searchLoading },
  ] = useGetPostProductsMutation();

  useEffect(() => {
    isSuccess &&
      setSearchResults([
        {
          title: "Investment",
          data: data.results.map((i) => {
            return {
              ...i,
              name: i.productName,
              code: i.productCode,
            };
          }),
        },
      ]);

    return () => {
      setSearchResults([]);
    };
  }, [data, isSuccess]);
  function handleSearch(value, item) {
    if (item) {
      if (location.pathname.includes("/investment")) {
        setDetail(item);
        setDetailOpen(true);
      } else {
        navigate(
          `/product-factory/investment?preview=search_product&productId=${item.id}`
        );
      }
    }
  }
  return (
    <div className="flex justify-between">
      <ul className="flex gap-x-8 items-end">
        {filteredTabs.current.map((tab) => (
          <li   key={tab.title}>
            <button
            
              onClick={() => {
                handleTabClick(tab);
              }}
              data-testid={tab.title}
              disabled={tab.disabled}
              className={`${
                active == tab.title
                  ? "text-[#252C32] text-lg font-semibold "
                  : "text-[#636363] text-base "
              }   capitalize flex flex-col justify-end cursor-pointer disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <span className="block mb-[7px]">{tab.title}</span>
              <span
                className={`${
                  active == tab.title
                    ? " border-[#CF2A2A] shadow-[0px_0px_4px_1px_rgba(0,0,0,0.25)] border-[1.5px]"
                    : "border-[#DDE2E4] border-[0.75px] shadow-[0px_0px_2px_0px_rgba(228,139,139,0.48)]"
                }   rounded-lg w-full block`}
              />
            </button>
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

              setSearchResults,
              selected
            )
          }
          placeholder="Search by product"
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchLoading={searchLoading}
          handleSearch={(value, item) => handleSearch(value, item)}
          type="multi"
        />
      </div>
    </div>
  );
}
export default function TopBar() {
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
          <button
            disabled={!permissions.length}
            data-testid="create-btn"
            className="btn bg-sterling-red-800"
          >
            <span className="p-[5px]">
              <HiPlus fontSize={14} />
            </span>{" "}
            Create new product
          </button>
        </CreateButton>
      </div>
      <Tabs />
    </div>
  );
}
