import React, { useState, useEffect, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext, IndividualContext } from "@app/utils/context";
import { StatusCategoryType } from "@app/constants/enums";
import { StatusCard, QuickLinks } from "@app/components";
import TableComponent from "@app/components/pages/management/manage-investment/TableComponent";
import {
  useGetPostInvestmentMutation,
  useGetPostInvestmentRequestsMutation,
  useGetInvestmentStatsQuery,
  useGetInvestmentRequestStatsQuery,
  useGetSystemAlertQuery,
} from "@app/api";
import {
  IndividualStatusTypes,
  ManagementCategories,
  ProductTypes,
  StatusFilterOptions,
  StatusTypes,
  TypeFilterOptions,
  SpecificCategory,
  InvestmentBookingRequestType,
  IndividualTypeFilterOptions,
  CustomerCategoryType,
  MoneyMarketCategory,
} from "@app/constants";
import { sortTabStatus } from "@app/utils/sortTabStatus";
import { useParams, useSearchParams } from "react-router-dom";
import { errorToast } from "@app/components/Toast";
import { handleRequestStatus } from "@app/pages/investment/IndexComponent";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";

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
    investmentProducts_In: null,

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
  currencies,
}) => {
  if (query.page === 1) {
    setProductData([]);
  }

  if (isSuccess && data.results.length) {
    setProductData((prevData) => [
      ...prevData.concat(
        data.results.map((i) => ({
          ...i,
          principal: `${currencyFormatter(
            i?.principal, // i.currencyCode
            "ngn"
          )}`,
          initialPrincipal: `${currencyFormatter(
            i?.initialPrincipal,
            // i.currencyCode
            "ngn"
          )}`,
          state: IndividualStatusTypes.find((n) => n.id === i.state)?.type,
          productType: ProductTypes.find((n) => n.id === i.productType)?.name,
          moneyMarketType: MoneyMarketCategory[i.moneyMarketCategory],
          totalConsideration: currencyFormatter(
            i?.totalConsideration,
            // i.currencyCode
            "ngn"
          ),
          nameObject: {
            name: i?.issuer,
            code: i?.code,
          },
        }))
      ),
    ]);

    setHasMore(!!data?.next);
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
  setRequestData,
  tab
) => {
  if (category === StatusCategoryType?.Investments) {
    setProductData([]);
    getProducts({
      ...query,
      page: 1,
      filter_by: selected?.value,
      bookingType: CustomerCategoryType[tab],
    });
    prodStatRefetch(query);
  } else {
    setRequestData([]);
    getRequests({
      ...query,
      page: 1,
      filter_by: selected?.value,
      bookingType: CustomerCategoryType[tab],
    });
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
export default function Individual() {
  const { tab } = useParams();
  const { isChecker, setIsChecker, currencies } = useContext(AppContext);
  const [category, setCategory] = useState<string>(
    StatusCategoryType?.Investments
  );
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const productId = searchParams.get("productId");
  const preview = searchParams.get("preview");
  const [selected, setSelected] = useState<any>(null);
  const [specificCategory, setSpecificCategory] = useState<string>(
    SpecificCategory.individual
  );
  const [, setHideCreate] = useState(false);
  const [status, setStatus] = useState("");
  const [dateData, setDateData] = useState({ to: null, from: null });
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [initiator, setInitiator] = useState("");
  const [detail, setDetail] = useState<any>(null);
  const [isIndividualDetailOpen, setIndividualDetailOpen] = useState(false);
  const [duration, setDuration] = useState("");
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState({
    // filter_by: selected?.value,
    status_In: null,
    search: "",
    investmentProducts_In: null,
    start_Date: null,
    end_Date: null,
    page: 1,
    page_Size: 15,
    productType_In: null,
    requestType_In: null,
    initiator_In: null,
    approvers_In: null,
    total: 0,
    customerCategory: 0,
    bookingType: CustomerCategoryType[tab],
    type: tab,
  });
  const value = useMemo(
    () => ({
      specificCategory,
      setSpecificCategory,
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
      isIndividualDetailOpen,
      setIndividualDetailOpen,
      detail,
      setDetail,
    }),
    [
      specificCategory,
      setSpecificCategory,
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
      isIndividualDetailOpen,
      setIndividualDetailOpen,
      detail,
      setDetail,
    ]
  );

  useEffect(() => {
    handleToggle(selected, setIsChecker, setHideCreate);
  }, [selected, isChecker]);

  const [getProducts, { data, isSuccess, isError, error, isLoading }] =
    useGetPostInvestmentMutation();


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

  const {
    data: prodStatData,
    refetch: prodStatRefetch,
    isFetching: prodStatLoading,
  } = useGetInvestmentStatsQuery(
    {
      filter_by: selected?.value,
      bookingType: CustomerCategoryType[tab],
      type: tab,
    },
    {
      skip: category !== StatusCategoryType?.Investments,
    }
  );

  const {
    data: requestStatData,
    refetch: requestRefetch,
    isFetching: requestStatLoading,
  } = useGetInvestmentRequestStatsQuery(
    {
      filter_by: selected?.value,
      bookingType: CustomerCategoryType[tab],
      type: tab,
    },
    {
      skip: category !== StatusCategoryType.Requests,
    }
  );

  function fetch() {
    if (category === StatusCategoryType?.Investments) {
      getProducts({
        ...query,
        page: 1,
        filter_by: selected?.value,
        bookingType: CustomerCategoryType[tab],
        type: tab,
      });
    } else {
      getRequests({
        ...query,
        page: 1,
        filter_by: selected?.value,
        bookingType: CustomerCategoryType[tab],
        type: tab,
      });
    }
  }

  React.useEffect(() => {
    setQuery({
      ...query,
      page: 1,
      type: tab,
    });

    fetch();
  }, [
    selected,
    query.search,
    query.status_In,
    query.investmentProducts_In,
    query.productType_In,
    query.start_Date,
    query.end_Date,
    query.requestType_In,
    query.initiator_In,
    query.approvers_In,
    query.bookingType,
    tab,
  ]);
  useEffect(() => {
    setCategory(
      queryCategory === "requests"
        ? StatusCategoryType.Requests
        : StatusCategoryType?.Investments
    );
  }, [queryCategory]);
  useEffect(() => {
    setCategory(StatusCategoryType?.Investments);
  }, [tab]);
  const { data: systemAlertData, isSuccess: systemAlertDataSuccess } =
    useGetSystemAlertQuery();

  useEffect(() => {
    if (systemAlertDataSuccess) {
      errorToast(systemAlertData);
    }
  }, [systemAlertDataSuccess]);

  useEffect(() => {
    handleProductStatus({
      query,
      setProductData,
      isSuccess,
      data,
      setHasMore,
      currencies,
    });
  }, [data, isSuccess, isError, query]);
  useEffect(
    () =>
      handleRequestStatus({
        query,
        setRequestData,
        setHasMore,
        request,
        isRequestSuccess,
        typeOptions: IndividualTypeFilterOptions,
      }),
    [request, isRequestSuccess, isRequestError, query]
  );

  useEffect(() => {
    if (preview === "search_product") {
      setDetail({ id: productId });
      setIndividualDetailOpen(true);
    }
  }, [preview, productId]);

  const fetchMoreData = () => {
    setQuery((prevQuery) => {
      const updatedPage = prevQuery.page + 1;
      if (category === StatusCategoryType?.Investments) {
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
    <IndividualContext.Provider value={value}>
      <div className="flex gap-x-5 w-full flex-1">
        <div className="flex flex-col gap-y-7 w-calc overflow-auto">
          <StatusCard
            StatusCategories={ManagementCategories}
            categoryType1={StatusCategoryType?.Investments}
            categoryType2={StatusCategoryType?.Requests}
            data={prodStatData}
            requests={requestStatData}
            handleChange={({ selected, activeType }) =>
              handleChange(selected, activeType, setQuery, query, category)
            }
            isLoading={requestStatLoading || prodStatLoading}
            Context={IndividualContext}
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
                  setRequestData,
                  tab
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
              tab={tab}
            />
          </div>
        </div>
        <QuickLinks />
      </div>
    </IndividualContext.Provider>
  );
}
