import React, { useContext, useEffect, useState } from "react";
import { ExportToCsv } from "export-to-csv";
import { HiRefresh, HiDownload } from "react-icons/hi";
import { StatusCategoryType } from "@app/constants/enums";
import moment from "moment";
import { ucObjectKeys, IndividualContext, AppContext } from "@app/utils";
import {
  useGetPostProductsMutation,
  useGetPostInvestmentMutation,
  useGetPostInvestmentRequestsMutation,
  useGetUsersPermissionsQuery,
} from "@app/api";
import SearchInput from "@app/components/SearchInput";
import Table from "@app/components/table";
import {
  IndividualDropDownOptions,
  ProductTypes,
  StatusFilterOptions,
  IndividualStatusTypes,
  IndividualTypeFilterOptions,
  individualHeader,
  overviewDrillDownIndividualHeader,
  IndividualRequestHeader,
} from "@app/constants";
import { useProductList } from "@app/hooks";
import optionsDataHandler from "@app/utils/optionsDataHandler";

interface RequestDataProps {
  request: string;
  type: string;
  initiator?: string;
  reviewer?: string;
  status: string;
  "updated on": string;
}

interface ProductDataProps {
  "customer name": string;
  "customer id": string;
  principal: string;
  "investment product": string;
  status: string;
  "updated on": string;
}

export const handleDropdown = (
  status: string,
  isChecker,
  IndividualDropDownOptions,
  setOptionsByStatus,
  locked = false,
  permissions: string[] = []
) => {
  if (!status) return [];
  if (isChecker) {
    return IndividualDropDownOptions[setOptionsByStatus(status)].filter(
      (i: any) => i.text.toLowerCase() === "view"
    );
  } else {
    let options = IndividualDropDownOptions[setOptionsByStatus(status)];
    if (!permissions?.includes("LIQUIDATE_INVESTMENT")) {
      options = options?.filter(
        (i: any) =>
          i.text.toLowerCase() !== "part liquidate" &&
          i.text.toLowerCase() !== "early liquidate"
      );
    }
    if (!permissions?.includes("BOOK_INVESTMENT")) {
      options = options?.filter(
        (i: any) => i.text.toLowerCase() !== "restructure"
      );
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
  selected,
  isOverviewDrillDown = false
) {
  if (isOverviewDrillDown) {
    downloadProducts({
      ...query,
      page_Size: 1000000,
      filter_by: "created_system_wide",
    });
    return;
  }
  if (category === StatusCategoryType?.Investments) {
    downloadProducts({
      ...query,
      page_Size: 1000000,
      filter_by: selected?.value,
    });
  } else {
    downloadRequests({
      ...query,
      page_Size: 1000000,
      filter_by: selected?.value,
    });
  }
}
export function handleDownload(
  downloadData,
  isChecker,
  csvExporter,
  category,
  isOverviewDrillDown = false
) {
  try {
    if (!downloadData?.length) return;

    const productData = downloadData.map((i) => {
      // @ts-ignore
      let obj: ProductDataProps = {
        "customer name": i?.customerName || "",
        "customer id": i?.investmentId || "",
        principal: i?.initialPrincipal || "",
        "investment product": i?.investmentProduct || "",
        status: i?.status || "",
        "updated on": moment(i.updated_At).format("DD MMM YYYY, hh:mm A"),
      };

      let overviewDrillDownObj = {
        "customer name": i?.customerName || "",
        "customer id": i?.investmentId || "",
        "principal amount": i?.initialPrincipal || "",
        tenor: i?.tenor,
        "interest rate": i?.interestRate,
        "value at maturity": i?.maturityValue || "",
        status: i?.status || "",
        "updated on": moment(i.updated_At).format("DD MMM YYYY, hh:mm A"),
      };

      return isOverviewDrillDown ? overviewDrillDownObj : obj;
    });
    // alert(isOverviewDrillDown ? 'productData' : 'req')
    csvExporter.generateCsv(ucObjectKeys(productData));
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
  selected,
  isOverviewDrillDown
) => {
  if (!value.length) {
    setSearchResults([]);
    return;
  }
  if (isOverviewDrillDown) {
    getProducts({
      search: value,
      page: 1,
      page_Size: 25,
      filter_by: "created_system_wide",
    });
    return;
  }
  if (category === StatusCategoryType?.Investments) {
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
  isOverviewDrillDown = false,
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
  const { category, setStatus, selected } = useContext(IndividualContext);
  const { isChecker } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [individualListHeaders, setIndividualListHeaders] =
    useState(individualHeader);

  const [options, setOptions] = React.useState({
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    title:
      isOverviewDrillDown || category === StatusCategoryType?.Investments
        ? "Investment Management"
        : "Product management",
    filename: isOverviewDrillDown
      ? "overview_investments_data"
      : category === StatusCategoryType?.Investments
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
  ] = useGetPostInvestmentMutation();
  const [
    downloadProducts,
    { data: productDownloadData, isSuccess: productDownloadIsSuccess },
  ] = useGetPostInvestmentMutation();

  const { fetchedProductsList, isGetProductsSuccess } = useProductList({
    query: { page: 1, page_Size: 1000000, filter_by: selected?.value },
  });

  useEffect(() => {
    if (isOverviewDrillDown) {
      setIndividualListHeaders(overviewDrillDownIndividualHeader);
    } else {
      const results = fetchedProductsList?.results;
      if (results) {
        const targetKey = "investmentProduct";
        const mappedResults = results?.map((result) => {
          return {
            id: result.id,
            name: result.productName,
            value: result.id,
          };
        });

        const updatedItems = individualHeader.map((item) => {
          if (item.key === targetKey) {
            // Update the options for the target item
            return {
              ...item,
              options: [...mappedResults],
            };
          }
          // Leave other items unchanged
          return item;
        });
        setIndividualListHeaders(updatedItems);
      }
    }
  }, [fetchedProductsList, isOverviewDrillDown]);

  const [
    getRequests,
    {
      data: request,
      isSuccess: isRequestSuccess,
      isError: isRequestError,
      error: requestError,
      isLoading: isRequestLoading,
    },
  ] = useGetPostInvestmentRequestsMutation();
  const [
    downloadRequests,
    { data: requestsDownloadData, isSuccess: requestsDownloadIsSuccess },
  ] = useGetPostInvestmentRequestsMutation();

  const { data: initData, isSuccess: initSuccess } =
    useGetUsersPermissionsQuery({ permissions: ["BOOK_INVESTMENT"] });
  const { data: reviewData, isSuccess: reviewSuccess } =
    useGetUsersPermissionsQuery({
      permissions: ["AUTHORIZE_INVESTMENT_MANAGEMENT_REQUESTS"],
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
      category === StatusCategoryType?.Investments &&
      setSearchResults(
        data.results.map((i) => {
          return {
            ...i,
            name: i.productName,
            code: i.productCode,
          };
        })
      );

    isSuccess &&
      isOverviewDrillDown &&
      setSearchResults(
        data.results.map((i) => {
          return {
            ...i,
            name: i?.customerName,
            code: i?.investmentId,
          };
        })
      );
 

    return () => {
      setSearchResults([]);
    };
  }, [data, request, isSuccess, isRequestSuccess]);

  useEffect(() => {
    if (isOverviewDrillDown) {
   
      handleDownload(
        productDownloadData?.results.map((i) => ({
          ...i,
          status: IndividualStatusTypes.find(
            (n) => n.id === i.investmentBookingStatus
          )?.type,
        })),
        isChecker,
        csvExporter,
        category,
        isOverviewDrillDown
      );
    }
    if (
      productDownloadIsSuccess &&
      category === StatusCategoryType?.Investments
    ) {
      handleDownload(
        productDownloadData?.results.map((i) => ({
          ...i,
          status: IndividualStatusTypes.find(
            (n) => n.id === i.investmentBookingStatus
          )?.type,
        })),
        isChecker,
        csvExporter,
        category
      );
    }
  }, [productDownloadIsSuccess]);

  React.useEffect(() => {
    setOptions({
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      title:
        isOverviewDrillDown || category === StatusCategoryType?.Investments
          ? "Investment Management"
          : "Product management",
      filename: isOverviewDrillDown
        ? "overview_investments_data"
        : category === StatusCategoryType?.Investments
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
              selected,
              isOverviewDrillDown
            )
          }
          placeholder={`Search by customer name${
            category !== StatusCategoryType.Requests ? "/code" : ""
          }`}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchLoading={searchLoading}
          handleSearch={(value) => handleSearch(value, setQuery, query)}
          type={category}
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
                query,
                category,
                downloadProducts,
                downloadRequests,
                selected,
                isOverviewDrillDown
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
      {/* { category === StatusCategoryType?.Investments ? 't' : 'f'} */}
      <Table
        headers={
          category === StatusCategoryType?.Investments || isOverviewDrillDown
            ? individualListHeaders
            : handleHeaders(
                IndividualRequestHeader.map((i) => {
                  if (i.key === "created_By" || i.key === "approved_By") {
                    i.options = users;
                  }
                  return i;
                }),
                isChecker
              )
        }
        tableRows={
          category === StatusCategoryType?.Investments || isOverviewDrillDown
            ? productData
            : requestData
        }
        page={1}
        total={query.total}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
        getOptionData={getOptionData}
        isLoading={isLoading}
        dropDownOptions={IndividualDropDownOptions}
        dropDownClick={handleDropClick}
        onChangeDate={onChangeDate}
        type={category?.toLowerCase()}
        noData={
          StatusCategoryType.Requests === category
            ? "No request available"
            : "No investment available"
        }
        Context={IndividualContext}
        handleRefresh={handleRefresh}
        isOverviewDrillDown={isOverviewDrillDown}
      />
    </section>
  );
}
