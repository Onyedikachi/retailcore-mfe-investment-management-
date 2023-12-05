import React, { useState, useEffect, useMemo } from "react";

import { InvestmentContext } from "../../utils/context";
import { StatusCategoryType } from "../../constants/enums";
import {
  TopBar,
  StatusCard,
  TableComponent,
  QuickLinks,
} from "../../components";
import {
  useGetPostProductsMutation,
  useGetPostRequestsMutation,
  useGetProductStatsQuery,
  useGetRequestStatsQuery,
} from "@app/api";
import {
  ProductTypes,
  StatusFilterOptions,
  StatusTypes,
  TypeFilterOptions,

} from "@app/constants";
import { sortTabStatus } from "@app/utils/sortTabStatus";

export function handleToggle(selected, setIsChecker, setHideCreate) {
  if (
    selected?.text?.toLowerCase().includes("approved") ||
    selected?.text?.toLowerCase().includes("sent")
  ) {
    setIsChecker(true);
    setHideCreate(true);
  } else {
    setIsChecker(false);
    setHideCreate(false);
  }
}

export const handleChange = (
  selected,
  activeType,
  setQuery,
  query,
  category
) => {
  setQuery({
    ...query,
    page: 1,
    filter_by: selected,
    status_In:
      activeType === "all" ? null : [sortTabStatus(activeType, category)],
  });
};
export const handleRefresh = (
  category,
  query,
  getRequests,
  getProducts,
  prodStatRefetch,
  requestRefetch
) => {
  if (category === StatusCategoryType.AllProducts) {
    getProducts({ ...query, page: 1 });
    prodStatRefetch(query);
  } else {
    getRequests({ ...query, page: 1 });
    requestRefetch(query);
  }
};

export const handleSearch = (value, query, setQuery) => {
  setQuery({
    ...query,
    page: 1,
    search: value,
  });
};
export default function IndexComponent() {
  const [category, setCategory] = useState<string>(
    StatusCategoryType?.AllProducts
  );

  const [selected, setSelected] = useState<any>("");
  const [isChecker, setIsChecker] = useState(false);
  const [, setHideCreate] = useState(false);
  const [status, setStatus] = useState("");
  const [dateData, setDateData] = useState({ to: null, from: null });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [initiator, setInitiator] = useState("");
  const [duration, setDuration] = useState("");
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [query, setQuery] = useState({
    filter_by: "",
    status_In: [],
    search: "",
    start_Date: null,
    end_Date: null,
    page: 1,
    page_Size: 15,
    productType_In: null,
    requestType_In: null,
    initiator_In: null,
  });
  const value = useMemo(
    () => ({
      selected,
      setSelected,
      isChecker,
      setIsChecker,
      category,
      setCategory,
      setStatus,
      status,
      dateData,
      setDateData,
      search,
      setSearch,
      type,
      setType,
      initiator,
      setInitiator,
      setDuration,
      duration,
      isRefreshing,
      setRefreshing,
    }),
    [
      selected,
      setSelected,
      isChecker,
      setIsChecker,
      category,
      setCategory,
      setStatus,
      status,
      dateData,
      setDateData,
      search,
      setSearch,
      type,
      setType,
      initiator,
      setInitiator,
      setDuration,
      duration,
      isRefreshing,
      setRefreshing,
    ]
  );

  useEffect(() => {
    handleToggle(selected, setIsChecker, setHideCreate);
  }, [selected, isChecker]);

  const [getProducts, { data, isSuccess, isError, error, isLoading }] =
    useGetPostProductsMutation();

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

  const {
    data: prodStatData,
    refetch: prodStatRefetch,
    isLoading: prodStatLoading,
  } = useGetProductStatsQuery(query, {
    skip: category !== StatusCategoryType.AllProducts,
  });

  const {
    data: requestStatData,
    refetch: requestRefetch,
    isLoading: requestStatLoading,
  } = useGetRequestStatsQuery(query, {
    skip: category !== StatusCategoryType.Requests,
  });

  React.useEffect(() => {
    if (category === StatusCategoryType.AllProducts) {
      getProducts({ ...query, page: 1 });
      prodStatRefetch({ ...query, page: 1 });
    } else {
      getRequests({ ...query, page: 1 });
      requestRefetch({ ...query, page: 1 });
    }
  }, [
    category,
    query.filter_by,
    query.search,
    query.status_In,
    query.productType_In,
    query.start_Date,
    query.end_Date,
    query.requestType_In,
    query.initiator_In
  ]);

  useEffect(() => {
    isSuccess &&
      setProductData(
        data.results.map((i) => {
          return {
            ...i,
            state: StatusTypes.find((n) => n.id === i.state).type,
            productType: ProductTypes.find((n) => n.id === i.productType).name,
          };
        })
      );
    isRequestSuccess &&
      setRequestData(
        request.results.map((i) => {
          return {
            ...i,
            requestStatus: StatusFilterOptions.find(
              (n) => n.value === i.requestStatus
            ).name,
            requestType: TypeFilterOptions.find(
              (n) => n.value === i.requestType
            ).name,
          };
        })
      );

    return () => {
      setProductData([]);
      setRequestData([]);
    };
  }, [data, request, isSuccess, isRequestSuccess, isError, isRequestError]);

  return (
    <InvestmentContext.Provider value={value}>
      <section className=" w-full bg-[#F7F7F7] h-full min-h-[100vh] flex flex-col">
        <TopBar />
        <div className="px-8 flex gap-x-5 w-full flex-1 py-7">
          <div className="flex flex-col gap-y-7 w-calc overflow-auto">
            <StatusCard
              data={prodStatData}
              requests={requestStatData}
              handleChange={({ selected, activeType }) =>
                handleChange(selected, activeType, setQuery, query, category)
              }
              isLoading={requestStatLoading || prodStatLoading}
            />

            <div className="bg-white px-[30px] py-4 border border-[#E5E9EB] rounded-lg flex-1 w-full pb-16">
              {" "}
              <TableComponent
                handleRefresh={() =>
                  handleRefresh(
                    category,
                    query,
                    getRequests,
                    getProducts,
                    prodStatRefetch,
                    requestRefetch
                  )
                }
                handleSearch={(value) => handleSearch(value, query, setQuery)}
                productData={productData}
                requestData={requestData}
                isLoading={isLoading || isRequestLoading}
                query={query}
                setQuery={setQuery}
              />
            </div>
          </div>
          <QuickLinks />
        </div>
      </section>
    </InvestmentContext.Provider>
  );
}
