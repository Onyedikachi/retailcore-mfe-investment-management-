import Icon from "@app/components/ui/Icon";

import { BookInvestmentButton } from "@app/components";
import { useContext, useState } from "react";
import SearchInput from "@app/components/SearchInput";
import { Overview, Individual } from "@app/components/pages";
import { useGetPostProductsMutation } from "@app/api";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "@app/utils";

export const handleSearch = (value, setQuery, query) => {
  setQuery({
    ...query,
    search: value,
  });
};
export const getSearchResult = (value, getProducts, setSearchResults) => {
  if (!value.length) {
    setSearchResults([]);
    return;
  }

  getProducts({
    search: value,
    page: 1,
    page_Size: 25,
  });
};
export default function Dashboard() {
  //   useEffect(() => {
  //     loadSimulator()
  //   }, [])
  //create array of tabs
  const { permissions } = useContext(AppContext);
  const { tab } = useParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const dashboardTabs = ["overview", "individual", "corporate"];
  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0]);

  const [
    getProducts,
    { data, isSuccess, isError, error, isLoading: searchLoading },
  ] = useGetPostProductsMutation();

  return (
    <div className="h-full w-full">
      <div className="bg-white px-4 sm:px-6 lg:px-8 border-[#E5E9EB] border-b">
        <div className="pb-[57px] flex items-center gap-9 pt-[52px]">
          <span className="text-[38px] font-bold text-[#636363]">
            Investment Management
          </span>

          <BookInvestmentButton
            disabled={!permissions.includes("BOOK_INVESTMENT")}
          >
            <div className="flex h-[32px] items-center gap-[8px] rounded-[6px] bg-sterling-red-800 px-3 py-[4px] text-white ">
              <span className="p-[5px]">
                <Icon icon="eva:plus-fill" />
              </span>
              <span className="text-sm font-semibold text-[#F6F8F9]">
                Book Investment
              </span>
            </div>
          </BookInvestmentButton>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex gap-[32px] ">
            {dashboardTabs.map((item) => (
              <div
                role="button"
                tabIndex={0}
                data-testid={`${item}-tab`}
                onClick={() => navigate(`/investment-management/${item}`)}
                onKeyDown={() => { }}
                key={item}
                className={`${item == tab || (item == "overview" && !tab)
                    ? "text-[20px] font-semibold text-[#252C32]"
                    : "text-[16px] font-normal text-[#636363]"
                  } flex cursor-pointer flex-col justify-between gap-[6px] capitalize`}
              >
                <div></div>
                <span>{item}</span>
                <div
                  className={`${item == tab || (item == "overview" && !tab)
                      ? "h-[3px] w-full rounded-lg bg-sterling-red-800 shadow-lg"
                      : "h-[1.5px] w-full rounded-lg bg-[#DDE2E4] shadow-lg"
                    } `}
                ></div>
              </div>
            ))}
          </div>{" "}
          <div>
            <SearchInput
              setSearchTerm={(value) =>
                getSearchResult(value, getProducts, setSearchResults)
              }
              placeholder={`Search by product name`}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              hideBorder
              // searchLoading={searchLoading}
              handleSearch={(value) => handleSearch(value, setQuery, query)}
            />
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F7] px-4 sm:px-6 lg:px-8 py-[30px] max-h-[100vh] overflow-y-auto">
        {(tab?.toLowerCase() == "overview" || !tab) && <Overview />}
        {/* {tab?.toLowerCase() == "corporate" && <Corporate />} */}
        {(tab?.toLowerCase() == "individual" ||
          tab?.toLowerCase() == "corporate") && <Individual tab={tab} />}
      </div>
    </div>
  );
}
