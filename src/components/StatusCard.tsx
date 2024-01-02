import React, { useState, useContext, useEffect } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { InvestmentContext, AppContext } from "../utils/context";
import { StatusCategoryType } from "../constants/enums";
import { Select } from "./forms";
import {
  StatusTypes,
  CheckerStatusRequests,
  StatusRequests,
  StatusCategories,
  ProductOptions,
  RequestOptions,
  ApproveProductOptions,
  CreateProductOptions,
  CreateRequestOptions,
  ApproveRequestOptions,
} from "@app/constants";

export function filterAllProductsOptions(): any[] {
  return StatusTypes;
}

export function filterCheckerOptions(): any[] {
  return CheckerStatusRequests.filter((i) => i.type !== "draft");
}

export function filterDefaultOptions(): any[] {
  return StatusRequests.filter(
    (i) => i.type !== "pending" && i.type !== "rejected"
  );
}

// Main sorting function
export function sortOptions(category: string, isChecker: boolean): any[] {
  if (category === StatusCategoryType.AllProducts) {
    return filterAllProductsOptions();
  }

  if (isChecker) {
    return filterCheckerOptions();
  }

  return filterDefaultOptions();
}

export const StatusButton = ({
  item,
  isActive,
  setActiveType,
  analyticsData,
  isLoading,
}: any) => {
  return (
    <button
      data-testid={item?.type}
      onClick={() => setActiveType(item?.type)}
      className={`border min-w-[60px] rounded-lg py-1 px-[15px] flex flex-col cursor-pointer relative ${
        isActive
          ? "bg-[#EFEFEF] border-[#D0D5DD]"
          : "border-transparent hover:bg-gray-50 hover:border-[#D0D5DD]"
      } after:content-[""] after:w-1 after:h-[80%] after:absolute after:border-r after:right-[-12px] after:top-1/2 after:translate-y-[-50%] after:border-[#E5E9EB] last-of-type:after:content-none`}
    >
      <span
        className={`text-sm capitalize ${
          isActive ? "font-semibold" : "font-normal"
        }`}
        style={{ color: item?.color }}
      >
        {item?.type}
      </span>
      <span className="text-2xl xl:text-4xl text-[#252C32] font-semibold">
        {!isLoading && count(item, analyticsData)}
        {isLoading && (
          <div
            data-testid="loading"
            className="mt-3 spinner-border h-6 w-6 border-t border-danger-500 rounded-full animate-spin"
          ></div>
        )}
      </span>
    </button>
  );
};

export const count = (item, analyticsData) => {
  switch (item?.type?.toLowerCase()) {
    case "all":
      return analyticsData?.data?.All || 0;
    case "active":
      return analyticsData?.data?.A || 0;
    case "inactive":
      return analyticsData?.data?.I || 0;
    case "approved":
      return analyticsData?.data?.A || 0;
    case "pending":
      return analyticsData?.data?.P || 0;
    case "in-review":
      return analyticsData?.data?.P || 0;
    case "draft":
      return analyticsData?.data?.D || 0;
    case "rejected":
      return analyticsData?.data?.R || 0;
    case "in-issue":
      return analyticsData?.data?.R || 0;
    default:
      return 0;
  }
};

export const handleClick = (
  setCategory,
  item,
  setSelected,
  category,
  filteredProductOptions,
  filteredRequestOptions
) => {
  setCategory(item?.type);
  setSelected(
    category === StatusCategoryType?.AllProducts
      ? filteredProductOptions[0]
      : filteredRequestOptions[0]
  );
};

export const StatusCategoryButton = ({
  item,
  category,
  setCategory,
  setSelected,
  filteredProductOptions,
  filteredRequestOptions,
}: any) => {
  return (
    <button
      type="button"
      name={item.type}
      data-testid={`${item.type}-btn`}
      onClick={() =>
        handleClick(
          setCategory,
          item,
          setSelected,
          category,
          filteredProductOptions,
          filteredRequestOptions
        )
      }
      className={`${
        category?.toLowerCase() === item?.type?.toLowerCase()
          ? "!bg-white font-semibold text-[20px]"
          : "hover:bg-gray-50 bg-[#EFEFEF]"
      }  px-4 py-[19px] text-[18px] text-[#636363] text-left flex gap-x-[5px] items-center leading-[24px] w-full capitalize border-[#D0D5DD] border-b last-of-type:border-b-0`}
    >
      {" "}
      <AiFillCaretRight
        className={`${
          category === item.type ? "visible" : "invisible"
        } text-sterling-red-800`}
      />{" "}
      {item.type}
    </button>
  );
};

export function handleActiveType(activeType, setStatus) {
  switch (activeType) {
    case "all":
      setStatus("");
      break;
    case "active":
      setStatus("A");
      break;
    case "inactive":
      setStatus("I");
      break;
    case "approved":
      setStatus("A");
      break;
    case "pending":
      setStatus("P");
      break;
    case "draft":
      setStatus("D");
      break;
    case "rejected":
      setStatus("R");
      break;
    case "in-review":
      setStatus("P");
      break;
    case "in-issue":
      setStatus("R");
      break;
  }
}

export function handlePermission(
  setFilteredRequestOptions,
  permissions,
  ProductOptions,
  RequestOptions,
  setFilteredProductOptions
) {
  if (!permissions?.length) return;
  if (
    permissions?.includes(
      "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
    ) &&
    permissions?.includes("CREATE_INVESTMENT_PRODUCT")
  ) {
    if (
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_RECORDS") ||
      permissions?.includes("CREATE_INVESTMENT_PRODUCT")
    ) {
      setFilteredProductOptions(ProductOptions);
    } else {
      setFilteredProductOptions(
        ProductOptions.map((i: any) => {
          if (i.value === "created_by_anyone") {
            i.disabled = true;
          }
          if (i.value === "approved_system_wide") {
            i.disabled = true;
          }
          return i;
        })
      );
    }
    if (
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS") ||
      permissions?.includes("CREATE_INVESTMENT_PRODUCT")
    ) {
      setFilteredRequestOptions(RequestOptions);
    } else {
      setFilteredRequestOptions(
        RequestOptions.map((i: any) => {
          if (i.value === "created_by_anyone") {
            i.disabled = true;
          }
          if (i.value === "sent_to_anyone") {
            i.disabled = true;
          }
          return i;
        })
      );
    }
  } else if (
    permissions?.includes("CREATE_INVESTMENT_PRODUCT") &&
    !permissions?.includes(
      "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
    )
  ) {
    if (
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_RECORDS") ||
      permissions?.includes("CREATE_INVESTMENT_PRODUCT")
    ) {
      setFilteredProductOptions(CreateProductOptions);
    } else {
      setFilteredProductOptions(
        CreateProductOptions.map((i: any) => {
          if (i.value === "created_by_anyone") {
            i.disabled = true;
          }

          return i;
        })
      );
    }
    if (
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS") ||
      permissions?.includes("CREATE_INVESTMENT_PRODUCT")
    ) {
      setFilteredRequestOptions(CreateRequestOptions);
    } else {
      setFilteredRequestOptions(
        CreateRequestOptions.map((i: any) => {
          if (i.value === "created_by_anyone") {
            i.disabled = true;
          }

          return i;
        })
      );
    }
  } else if (
    !permissions?.includes("CREATE_INVESTMENT_PRODUCT") &&
    permissions?.includes(
      "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
    )
  ) {
    if (
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_RECORDS") ||
      permissions?.includes(
        "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
      )
    ) {
      setFilteredProductOptions(ApproveProductOptions);
    } else {
      setFilteredProductOptions(
        ApproveProductOptions.map((i: any) => {
          if (i.value === "approved_system_wide") {
            i.disabled = true;
          }
          return i;
        })
      );
    }
    if (
      permissions?.includes("VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS") ||
      permissions?.includes(
        "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"
      )
    ) {
      setFilteredRequestOptions(ApproveRequestOptions);
    } else {
      setFilteredRequestOptions(
        ApproveRequestOptions.map((i: any) => {
          if (i.value === "sent_to_anyone") {
            i.disabled = true;
          }
          return i;
        })
      );
    }
  } else {
    setFilteredProductOptions(CreateProductOptions);
    setFilteredRequestOptions(CreateRequestOptions);
  }
}
export default function StatusCard({
  data,
  requests,
  isLoading,
  handleChange,
}: any): React.JSX.Element {
  // const { permissions } = useContext(AppContext);

  const [activeType, setActiveType] = useState<string | undefined>("all");
  const [filteredProductOptions, setFilteredProductOptions] = useState([]);
  const [filteredRequestOptions, setFilteredRequestOptions] = useState([]);
  const { isChecker, selected, setSelected, category, setCategory, status } =
    useContext(InvestmentContext);
  const { permissions } = useContext(AppContext);

  // Get select value
  function handleSelected(value: any) {
    setSelected(value);
    return value;
  }

  useEffect(() => {
    handleChange({ selected: selected?.value, category, activeType: "all" });
  }, [selected?.value]);

  useEffect(() => {
    handleChange({ selected: selected?.value, category, activeType });
  }, [category, activeType]);

  useEffect(() => {
    if (status === "") {
      setActiveType("all");
    }
  }, [status]);

  useEffect(() => {
    setActiveType("all");
  }, [selected]);

  useEffect(() => {
    handlePermission(
      setFilteredRequestOptions,
      permissions,
      ProductOptions,
      RequestOptions,
      setFilteredProductOptions
    );
  }, [permissions, category]);

  useEffect(() => {
    setSelected(
      category === StatusCategoryType.Requests
        ? filteredRequestOptions[0]
        : filteredProductOptions[0]
    );
  }, [category, filteredProductOptions, filteredRequestOptions]);

  return (
    <div className="flex border border-[#E5E9EB] rounded-lg">
      <div className=" w-[208px] rounded-l-lg border-r border-[#D0D5DD] overflow-hidden">
        {StatusCategories.map((item, idx) => (
          <StatusCategoryButton
            key={item.id}
            item={item}
            category={category}
            setCategory={setCategory}
            setSelected={setSelected}
            filteredRequestOptions={filteredRequestOptions}
            filteredProductOptions={filteredProductOptions}
          />
        ))}
      </div>
      <div className="flex-1 bg-white py-[10px] px-[22px] rounded-r-lg flex justify-between">
        <div className="flex gap-x-5 py-[14px] pl-[20px]">
          {sortOptions(category, isChecker).map((item) => (
            <StatusButton
              key={`${item.type}-${item.id}`}
              item={item}
              isActive={activeType === item.type}
              setActiveType={setActiveType}
              isLoading={isLoading}
              analyticsData={
                category === StatusCategoryType.AllProducts ? data : requests
              }
            />
          ))}
        </div>

        <div>
          <Select
            options={
              category === StatusCategoryType?.AllProducts
                ? filteredProductOptions
                : filteredRequestOptions
            }
            handleSelected={(value: any) => handleSelected(value)}
            value={selected}
          />
        </div>
      </div>
    </div>
  );
}
