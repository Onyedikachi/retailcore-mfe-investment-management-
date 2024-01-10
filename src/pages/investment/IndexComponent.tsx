import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext, InvestmentContext } from "../../utils/context";
import { StatusCategoryType } from "../../constants/enums";
import {
  TopBar,
  StatusCard,
  TableComponent,
  QuickLinks,
} from "@app/components";
import {
  useGetPostProductsMutation,
  useGetPostRequestsMutation,
  useGetProductStatsQuery,
  useGetRequestStatsQuery,
  useGetSystemAlertQuery,
} from "@app/api";
import {
  FactoryCategories,
  ProductTypes,
  StatusFilterOptions,
  StatusTypes,
  TypeFilterOptions,
} from "@app/constants";
import { sortTabStatus } from "@app/utils/sortTabStatus";
import { useSearchParams } from "react-router-dom";
import { errorToast } from "@app/components/Toast";

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

    status_In:
      activeType === "all" ? null : [sortTabStatus(activeType, category)],
  });
};

export const handleProductStatus = ({
  query,
  setProductData,
  isSuccess,
  data,
  setHasMore,
}) => {
  if (query.page === 1) {
    setProductData([]);
  }

  if (isSuccess && data.results.length) {
    setProductData((prevData) => [
      ...prevData.concat(
        data.results.map((i) => ({
          ...i,
          state: StatusTypes.find((n) => n.id === i.state)?.type,
          productType: ProductTypes.find((n) => n.id === i.productType)?.name,
        }))
      ),
    ]);

    setHasMore(!!data?.next);
  }
};
export const handleRequestStatus = ({
  query,
  setRequestData,
  setHasMore,
  isRequestSuccess,
  request,
}) => {
  if (query.page === 1) {
    setRequestData([]);
  }

  if (isRequestSuccess && request.results.length) {
    setRequestData((prevData) => [
      ...prevData.concat(
        ...request.results.map((i) => ({
          ...i,
          requestStatus: StatusFilterOptions.find(
            (n) => n.value === i.requestStatus
          )?.name,
          requestType: TypeFilterOptions.find((n) => n.value === i.requestType)
            ?.name,
        }))
      ),
    ]);

    setHasMore(!!request?.next);
  }
};

export const handleRefresh = (
  category,
  query,
  getRequests,
  getProducts,
  prodStatRefetch,
  requestRefetch,
  selected,
  setProductData,
  setRequestData
) => {
  if (category === StatusCategoryType.AllProducts) {
    setProductData([]);
    getProducts({ ...query, page: 1, filter_by: selected?.value });
    prodStatRefetch(query);
  } else {
    setRequestData([]);
    getRequests({ ...query, page: 1, filter_by: selected?.value });
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
  const { isChecker, setIsChecker } = useContext(AppContext);
  const [category, setCategory] = useState<string>(
    StatusCategoryType?.AllProducts
  );
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const productId = searchParams.get("productId");
  const preview = searchParams.get("preview");
  const [selected, setSelected] = useState<any>(null);

  const [, setHideCreate] = useState(false);
  const [status, setStatus] = useState("");
  const [dateData, setDateData] = useState({ to: null, from: null });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [initiator, setInitiator] = useState("");
  const [detail, setDetail] = useState<any>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [duration, setDuration] = useState("");
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState({
    // filter_by: selected?.value,
    status_In: null,
    search: "",
    start_Date: null,
    end_Date: null,
    page: 1,
    page_Size: 15,
    productType_In: null,
    requestType_In: null,
    initiator_In: null,
    approvers_In: null,
    total: 0,
  });
  const value = useMemo(
    () => ({
      selected,
      setSelected,

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
      isDetailOpen,
      setDetailOpen,
      detail,
      setDetail,
    }),
    [
      selected,
      setSelected,

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
      isDetailOpen,
      setDetailOpen,
      detail,
      setDetail,
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
    isFetching: prodStatLoading,
  } = useGetProductStatsQuery(
    { filter_by: selected?.value },
    {
      skip: category !== StatusCategoryType.AllProducts,
    }
  );

  const {
    data: requestStatData,
    refetch: requestRefetch,
    isFetching: requestStatLoading,
  } = useGetRequestStatsQuery(
    { filter_by: selected?.value },
    {
      skip: category !== StatusCategoryType.Requests,
    }
  );

  React.useEffect(() => {
    setQuery({
      ...query,
      page: 1,
    });

    if (category === StatusCategoryType.AllProducts) {
      getProducts({ ...query, page: 1, filter_by: selected?.value });
    } else {
      getRequests({ ...query, page: 1, filter_by: selected?.value });
    }
  }, [
    selected,
    query.search,
    query.status_In,
    query.productType_In,
    query.start_Date,
    query.end_Date,
    query.requestType_In,
    query.initiator_In,
    query.approvers_In,
  ]);
  useEffect(() => {
    setCategory(
      queryCategory === "requests"
        ? StatusCategoryType.Requests
        : StatusCategoryType.AllProducts
    );
  }, [queryCategory]);

  useEffect(
    () =>
      handleProductStatus({
        query,
        setProductData,
        isSuccess,
        data,
        setHasMore,
      }),
    [data, isSuccess, isError, query]
  );
  useEffect(
    () =>
      handleRequestStatus({
        query,
        setRequestData,
        setHasMore,
        isRequestSuccess,
        request,
      }),
    [request, isRequestSuccess, isRequestError, query]
  );

  const { data: systemAlertData, isSuccess: systemAlertDataSuccess } =
    useGetSystemAlertQuery();

  useEffect(() => {
    if (systemAlertDataSuccess) {
      errorToast(systemAlertData);
    }
  }, [systemAlertDataSuccess]);

  useEffect(() => {
    if (preview === "search_product") {
      setDetail({ id: productId });
      setDetailOpen(true);
    }
  }, [preview, productId]);

  const fetchMoreData = () => {
    setQuery((prevQuery) => {
      const updatedPage = prevQuery.page + 1;
      if (category === StatusCategoryType.AllProducts) {
        getProducts({
          ...prevQuery,
          page: updatedPage,
          filter_by: selected?.value,
        });
      } else {
        getRequests({
          ...prevQuery,
          page: updatedPage,
          filter_by: selected?.value,
        });
      }
      return {
        ...prevQuery,
        page: updatedPage,
      };
    });
  };

  return (
    <InvestmentContext.Provider value={value}>
      <section className=" w-full bg-[#F7F7F7] h-full min-h-[100vh] flex flex-col">
        <TopBar />
        <div className="px-8 flex gap-x-5 w-full flex-1 py-7">
          <div className="flex flex-col gap-y-7 w-calc overflow-auto">
            <StatusCard
              StatusCategories={FactoryCategories}
              categoryType1={StatusCategoryType.AllProducts}
              categoryType2={StatusCategoryType.Requests}
              data={prodStatData}
              requests={requestStatData}
              handleChange={({ selected, activeType }) =>
                handleChange(selected, activeType, setQuery, query, category)
              }
              isLoading={requestStatLoading || prodStatLoading}
              Context={InvestmentContext}
            />

            <div className="bg-white px-[30px] py-4 border border-[#E5E9EB] rounded-lg flex-1 w-full pb-16">
              {" "}
              <TableComponent
                handleRefresh={() => {
                  handleRefresh(
                    category,
                    query,
                    getRequests,
                    getProducts,
                    prodStatRefetch,
                    requestRefetch,
                    selected,
                    setProductData,
                    setRequestData
                  );
                  setQuery({ ...query, page: 1 });
                }}
                handleSearch={(value) => handleSearch(value, query, setQuery)}
                productData={useMemo(() => productData, [productData])}
                requestData={useMemo(() => requestData, [requestData])}
                isLoading={isLoading || isRequestLoading}
                query={query}
                setQuery={setQuery}
                hasMore={hasMore}
                fetchMoreData={fetchMoreData}
              />
            </div>
          </div>
          <QuickLinks />
        </div>
      </section>
    </InvestmentContext.Provider>
  );
}
