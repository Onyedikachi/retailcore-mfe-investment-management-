import React, { useContext, useEffect, useMemo, useState } from "react";
import { BookInvestmentFormSteps } from "@app/constants";
import { ProductInfoInvestmentCalc } from "@app/components/management";
import { useNavigate, useParams } from "react-router-dom";
import ProductSearch from "@app/components/ProductSearch";
import { Breadcrumbs, Button } from "@app/components";
import { TableComponent } from "@app/components/pages/management/manage-investment";
import { useGetPostInvestmentMutation } from "@app/api";
import { sortTabStatus } from "@app/utils/sortTabStatus";
import { StatusCategoryType } from "@app/constants/enums";
import { ucObjectKeys, IndividualContext, AppContext } from "@app/utils";

export const handleRefresh = (query, fetch, setIndividualInvestments) => {
  setIndividualInvestments([]);
  fetch();
};
export default function IndexComponent() {
  const { category } = useContext(IndividualContext);
  const { process, investmentType } = useParams();
  const [investmentsList, setInvestmentsList] = useState([]);
  const [individualListOpen, setIndividualListOpen] = useState(false);
  const [corporateListOpen, setCorporateListOpen] = useState(false);
  const [individualInvestments, setIndividualInvestments] = useState([
    "Stem-Life Investments",
    "Federal Grant Investments",
  ]);
  const [corporateInvestments, setCorporateInvestments] = useState([
    "A Commercial Paper",
    "School Paper",
  ]);
  const [hasMore, setHasMore] = useState(true);
  const setStatusFilter = (investmentType) => {
    const status =
      investmentType.toLowerCase() == "all investments"
        ? "all"
        : investmentType.toLowerCase() == "liquidated investments"
        ? "liquidated"
        : investmentType.toLowerCase() == "active investments"
        ? "active"
        : "all";
    return status;
  };

  const [query, setQuery] = useState({
    // filter_by: selected?.value,
    status_In:
      setStatusFilter(investmentType) == "all"
        ? null
        : [
            sortTabStatus(
              setStatusFilter(investmentType),
              StatusCategoryType?.Investments
            ),
          ],
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
  const navigate = useNavigate();

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/product-factory/investment/management/overview",
    },
    {
      id: 2,
      title: "Overview",
      url: "/product-factory/investment/management/overview",
    },
    {
      id: 3,
      title: investmentType,
      url: `/product-factory/investment/management/products/${investmentType}`,
    },
  ];

  const [
    getInvestmentProducts,
    { data: investmentProducts, isSuccess, isError, error, isLoading },
  ] = useGetPostInvestmentMutation();
  function handleLinks(links, process) {
    return links;
  }
  const fetchMoreData = () => {
    setQuery((prevQuery) => {
      return {
        ...prevQuery,
      };
    });
  };

  function fetch() {
    getInvestmentProducts({
      ...query,
      page: 1,
      filter_by: "created_system_wide",
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setInvestmentsList(investmentProducts?.results);
      // console.log("🚀 ~ useEffect ~ investmentProducts:", investmentProducts?.results)
    }
  }, [investmentProducts, isSuccess]);

  useEffect(() => {
    fetch();
  }, [
    query.search,
    query.status_In,
    query.productType_In,
    query.start_Date,
    query.end_Date,
    query.requestType_In,
    query.initiator_In,
    query.approvers_In,
  ]);

  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Investment Management
        </h1>
        <Breadcrumbs links={handleLinks(links, process)} />
      </div>
      {/* {productData.productInfo.productName} */}
      <div className="">
        <div className="flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
          <div className="flex w-full bg-[#ffffff] rounded-md px-[24px] pt-[30px] pb-[49px] gap-3 ">
            <div className="border border-[#E5E9EB] rounded-lg py-6 px-3 min-w-[243px] flex flex-col gap-[26px]">
              <h2 className="text-[#636363] text-base font-bold uppercase">
                Investment PRODUCTS
              </h2>

              <div>
                {" "}
                <ProductSearch placeholder="Search" options={[]} />
              </div>

              <div>
                <div className="flex flex-col gap-[17px]">
                  <div className="flex gap-2 items-start">
                    <div
                      onClick={() => setIndividualListOpen(!individualListOpen)}
                      className={`cursor-pointer ${
                        individualListOpen ? "transform rotate-45" : ""
                      }`}
                    >
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.39453 3.3533L6.39453 12.9744C6.39453 13.263 6.69922 13.4241 6.90723 13.2454L12.4854 8.43485C12.645 8.29715 12.645 8.03202 12.4854 7.89286L6.90723 3.08231C6.69922 2.9036 6.39453 3.06473 6.39453 3.3533Z"
                          fill="#555555"
                        />
                      </svg>
                    </div>
                    <div className="cursor-pointer flex flex-col gap-2">
                      <span
                        onClick={() =>
                          setIndividualListOpen(!individualListOpen)
                        }
                        className="text-sm text-[#636363] font-normal"
                      >
                        Individual Investments
                      </span>
                      {individualListOpen && (
                        <ul>
                          {individualInvestments.map((item, index) => (
                            <li
                              className="mb-[9px] text-xs text-[#636363] font-normal"
                              key={index}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div
                      onClick={() => setCorporateListOpen(!corporateListOpen)}
                      className={`cursor-pointer ${
                        corporateListOpen ? "transform rotate-45" : ""
                      }`}
                    >
                      <svg
                        width="15"
                        height="16"
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.39453 3.3533L6.39453 12.9744C6.39453 13.263 6.69922 13.4241 6.90723 13.2454L12.4854 8.43485C12.645 8.29715 12.645 8.03202 12.4854 7.89286L6.90723 3.08231C6.69922 2.9036 6.39453 3.06473 6.39453 3.3533Z"
                          fill="#555555"
                        />
                      </svg>
                    </div>
                    <div className="cursor-pointer flex flex-col gap-2">
                      <span
                        onClick={() => setCorporateListOpen(!corporateListOpen)}
                        className="text-sm text-[#636363] font-normal"
                      >
                        Corporate Investments
                      </span>
                      {corporateListOpen && (
                        <ul>
                          {corporateInvestments.map((item, index) => (
                            <li
                              className="mb-[9px] text-xs text-[#636363] font-normal"
                              key={index}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto  flex-1 border border-[#E5E9EB] rounded-lg py-[13px] px-[31px] flex-col gap-[27px]">
              <div className=" max-w-full">
                <TableComponent
                  isOverviewDrillDown={true}
                  handleRefresh={() => {
                    handleRefresh(query, fetch, setIndividualInvestments);
                    setQuery({ ...query, page: 1 });
                  }}
                  handleSearch={(value) => {}}
                  productData={investmentsList}
                  // productData={useMemo(() => productData, [productData])}

                  requestData={[]}
                  isLoading={isLoading}
                  query={query}
                  setQuery={setQuery}
                  hasMore={hasMore}
                  fetchMoreData={fetchMoreData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
