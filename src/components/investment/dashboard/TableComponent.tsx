import React, { useContext, useEffect, useState } from "react";
import { ExportToCsv } from "export-to-csv";
import { HiRefresh, HiDownload } from "react-icons/hi";
import { StatusCategoryType } from "../../../constants/enums";
import moment from "moment";
import { ucObjectKeys, InvestmentContext, AppContext } from "@app/utils";
import {
  useGetPostProductsMutation,
  useGetPostRequestsMutation,
  useGetUsersPermissionsQuery,
} from "@app/api";
import SearchInput from "@app/components/SearchInput";
import Table from "@app/components/table";
import {
  DropDownOptions,
  ProductTypes,
  StatusFilterOptions,
  StatusTypes,
  TypeFilterOptions,
  productHeader,
  requestHeader,
} from "@app/constants";
import optionsDataHandler from "@app/utils/optionsDataHandler";
import { handleProductDownloadSuccess } from "@app/utils/handleProductDownloadSuccess";
interface RequestDataProps {
  request: string;
  type: string;
  initiator?: string;
  reviewer?: string;
  status: string;
  "updated on": string;
}

interface ProductDataProps {
  "product name": string;
  "product code": string;
  "product type": string;
  state: string;
  "updated on": string;
}

export const handleDropdown = (
  status: string,
  isChecker,
  DropDownOptions,
  setOptionsByStatus,
  locked = false,
  permissions: string[] = []
) => {
  if (locked)
    return DropDownOptions[setOptionsByStatus(status)].filter(
      (i: any) => i.text.toLowerCase() === "view"
    );
  if (!status) return [];
  if (isChecker) {
    return DropDownOptions[setOptionsByStatus(status)].filter(
      (i: any) => i.text.toLowerCase() === "view"
    );
  } else {
    let options = DropDownOptions[setOptionsByStatus(status)];
    if (!permissions?.includes("CREATE_PRODUCT")) {
      options = options?.filter(
        (i: any) =>
          i.text.toLowerCase() !== "deactivate" &&
          i.text.toLowerCase() !== "activate"
      );
    }
    if (!permissions?.includes("CREATE_PRODUCT")) {
      options = options?.filter((i: any) => i.text.toLowerCase() !== "modify");
    }
    return options;
  }
};

export const handleHeaders = (headers: any, isChecker) => {
  return isChecker
    ? headers.filter((i) => i.label !== "initiator")
    : headers.filter((i) => i.label !== "reviewer");
};

export function initiateDownload(
  query,
  category,
  downloadProducts,
  downloadRequests,
  selected
) {
  if (category === StatusCategoryType.AllProducts) {
    downloadProducts({
      ...query,
      page_Size: 1000000,
      filter_by: "created_by_anyone",
    });
  } else {
    downloadRequests({
      ...query,
      page_Size: 1000000,
      filter_by: "created_by_anyone",
    });
  }
}
export function handleDownload(downloadData, isChecker, csvExporter, category) {
  try {
    if (!downloadData?.length) return;
    const requestData = downloadData.map((i) => {
      // @ts-ignore
      let obj: RequestDataProps = {
        request: i?.request || "",
        type: i?.requestType || "",
      };

      if (!isChecker) {
        obj.initiator = i?.created_By || "";
        obj.status = i?.requestStatus;
      } else {
        obj.reviewer = i?.approved_By || "";
        obj.status = i?.requestStatus;
      }

      obj["updated on"] = moment(i.updated_At).format("DD MMM YYYY, hh:mm A");

      return obj;
    });

    const productData = downloadData.map((i) => {
      // @ts-ignore
      let obj: ProductDataProps = {
        "product name": i?.productName || "",
        "product code": i?.productCode || "",
        "product type": i?.productType || "",
        state: i?.state || "",
        "updated on": moment(i.updated_At).format("DD MMM YYYY, hh:mm A"),
      };

      return obj;
    });
    csvExporter.generateCsv(
      category === StatusCategoryType.Requests
        ? ucObjectKeys(requestData)
        : ucObjectKeys(productData)
    );
  } catch (err) {
    throw "Input must be an array of objects";
  }
}

export const getSearchResult = (
  value,
  getProducts,
  getRequests,
  category,
  setSearchResults,
  selected
) => {
  if (!value.length) {
    setSearchResults([]);
    return;
  }
  if (category === StatusCategoryType.AllProducts) {
    getProducts({
      search: value,
      page: 1,
      page_Size: 25,
      filter_by: selected?.value,
    });
  } else {
    getRequests({
      search: value,
      page: 1,
      page_Size: 25,
      filter_by: selected?.value,
    });
  }
};
export const handleSearch = (value, setQuery, query) => {
  setQuery({
    ...query,
    search: value,
  });
};
export default function TableComponent({
  productData,
  requestData,
  handleRefresh,
  isLoading,
  handleSearch,
  query,
  setQuery,
  hasMore,
  fetchMoreData,
}: any) {
  const { category, setStatus, selected } = useContext(InvestmentContext);
  const { isChecker } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [options, setOptions] = React.useState({
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    title: "Product management",
    filename:
      category === StatusCategoryType?.AllProducts
        ? "dashboard_products_data"
        : "dashboard_requests_data",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  });
  const csvExporter = new ExportToCsv(options);

  const [
    getProducts,
    { data, isSuccess, isError, error, isLoading: searchLoading },
  ] = useGetPostProductsMutation();
  const [
    downloadProducts,
    { data: productDownloadData, isSuccess: productDownloadIsSuccess },
  ] = useGetPostProductsMutation();

  const [
    getRequests,
    {
      data: request,
      isSuccess: isRequestSuccess,
      isError: isRequestError,
      error: requestError,
      isLoading: isRequestLoading,
    },
  ] = useGetPostRequestsMutation();
  const [
    downloadRequests,
    { data: requestsDownloadData, isSuccess: requestsDownloadIsSuccess },
  ] = useGetPostRequestsMutation();

  const { data: initData, isSuccess: initSuccess } =
    useGetUsersPermissionsQuery({ permissions: ["CREATE_INVESTMENT_PRODUCT"] });
  const { data: reviewData, isSuccess: reviewSuccess } =
    useGetUsersPermissionsQuery({
      permissions: [
        "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
      ],
    });

  useEffect(() => {
    if (initSuccess || reviewSuccess) {
      setUsers(
        (!isChecker ? initData : reviewData)?.data?.map((i) => {
          return {
            name: i.fullname,
            value: i.id,
            id: i.id,
          };
        })
      );
    }
  }, [reviewSuccess, initSuccess, isChecker]);

  useEffect(() => {
    isSuccess &&
      category === StatusCategoryType?.AllProducts &&
      setSearchResults(
        data.results.map((i) => {
          return {
            ...i,
            name: i.productName,
            code: i.productCode,
          };
        })
      );
    isRequestSuccess &&
      category === StatusCategoryType?.Requests &&
      setSearchResults(
        request.results.map((i) => {
          return {
            ...i,
            name: i.request,
          };
        })
      );

    return () => {
      setSearchResults([]);
    };
  }, [data, request, isSuccess, isRequestSuccess]);

  useEffect(() => {
    handleProductDownloadSuccess({
      productDownloadIsSuccess,
      category,
      productDownloadData,
      isChecker,
      csvExporter,
      requestsDownloadIsSuccess,
      requestsDownloadData,
      handleDownload,
    });
  }, [productDownloadIsSuccess, requestsDownloadIsSuccess]);

  React.useEffect(() => {
    setOptions({
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Product management",
      filename:
        category === StatusCategoryType?.AllProducts
          ? "dashboard_products_data"
          : "dashboard_requests_data",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    });
    setStatus("");
  }, [category]);

  const getOptionData = (value: any, label: string) => {
    optionsDataHandler({ query, value, label, setQuery });
  };
  const onChangeDate = (value: any) => {
    setQuery({
      ...query,
      start_Date: value.startDate
        ? moment(value.startDate).format("yyyy-MM-DD")
        : null,
      end_Date: value.endDate
        ? moment(value.endDate).format("yyyy-MM-DD")
        : null,
    });
  };

  const handleDropClick = (value: any) => {};

  return (
    <section className="w-full h-full">
      {/* Table Top bar  */}
      <div className="flex justify-end gap-x-[25px] items-center mb-[27px] h-auto">
        <SearchInput
          setSearchTerm={(value) =>
            getSearchResult(
              value,
              getProducts,
              getRequests,
              category,
              setSearchResults,
              selected
            )
          }
          placeholder={`Search by product name${
            category !== StatusCategoryType.Requests ? "/code" : ""
          }`}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchLoading={searchLoading}
          handleSearch={(value) => handleSearch(value, setQuery, query)}
        />
        <div className="relative  after:content-[''] after:w-1 after:h-[80%] after:absolute after:border-r after:right-[-15px] after:top-1/2 after:translate-y-[-50%] after:border-[#E5E9EB]">
          {/* Refresh button  */}

          <button
            data-testid="refresh-btn"
            onClick={() => handleRefresh()}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiRefresh className="text-lg" /> Refresh table
          </button>
        </div>{" "}
        <div>
          {/* download button  */}{" "}
          <button
            onClick={() =>
              initiateDownload(
                query = category === StatusCategoryType.Requests? {} : query,
                category,
                downloadProducts,
                downloadRequests,
                selected
              )
            }
            data-testid="download-btn"
            className="flex gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiDownload className="text-lg" /> Download
          </button>
        </div>
      </div>

      {/* main table  */}
      <Table
        headers={
          category === StatusCategoryType?.AllProducts
            ? productHeader
            : handleHeaders(
                requestHeader.map((i) => {
                  if (i.key === "created_By" || i.key === "approved_By") {
                    i.options = users;
                  }
                  return i;
                }),
                isChecker
              )
        }
        tableRows={
          category === StatusCategoryType?.AllProducts
            ? productData
            : requestData
        }
        page={1}
        total={query.total}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
        getOptionData={getOptionData}
        isLoading={isLoading}
        dropDownOptions={DropDownOptions}
        dropDownClick={handleDropClick}
        onChangeDate={onChangeDate}
        type={category?.toLowerCase()}
        noData={
          StatusCategoryType.Requests === category
            ? "No request available"
            : "No product available"
        }
        Context={InvestmentContext}
      />
    </section>
  );
}
