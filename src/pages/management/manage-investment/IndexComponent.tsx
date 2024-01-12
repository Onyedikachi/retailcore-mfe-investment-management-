import React, { useEffect, useState } from "react";
import { BookInvestmentFormSteps } from "@app/constants";
import { ProductInfoInvestmentCalc } from "@app/components/management";
import { useNavigate, useParams } from "react-router-dom";
import ProductSearch from "@app/components/ProductSearch";
import { Breadcrumbs, Button } from "@app/components";
import { TableComponent } from "@app/components/pages/management/manage-investment";

export default function IndexComponent() {
  const { process, investmentType } = useParams();
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
              <span className="text-[#636363] text-base font-bold uppercase">
                Investment PRODUCTS
              </span>

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
            <div className="flex-1 border border-[#E5E9EB] rounded-lg py-[13px] px-[31px] flex-col gap-[27px]">
              <div className="">
                <TableComponent
                  handleRefresh={() => {}}
                  handleSearch={(value) => {}}
                  productData={[]}
                  requestData={[]}
                  isLoading={false}
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
