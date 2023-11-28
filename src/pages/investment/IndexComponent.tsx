import React, { useState, useEffect, useMemo } from "react";

import { InvestmentContext } from "../../utils/context";
import { StatusCategoryType } from "../../constants/enums";
import {
  TopBar,
  StatusCard,
  TableComponent,
  QuickLinks,
} from "../../components";

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
export default function IndexComponent() {
  const [category, setCategory] = useState<string>(
    StatusCategoryType?.AllBranches
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
  // toggle checker type
  // toggle create button type
  useEffect(() => {
    handleToggle(selected, setIsChecker, setHideCreate);
  }, [selected, isChecker]);

  return (
    <InvestmentContext.Provider value={value}>
      <section className=" w-full bg-[#F7F7F7] h-full min-h-[100vh] flex flex-col">
        <TopBar />
        <div className="px-8 flex gap-x-5 w-full flex-1 py-7">
          <div className="flex flex-col gap-y-7 w-calc overflow-auto">
            {/* <StatusCard /> */}

            <div className="bg-white px-[30px] py-4 border border-[#E5E9EB] rounded-lg flex-1 w-full pb-16">
              {" "}
              <TableComponent />
            </div>
          </div>
          <QuickLinks />
        </div>
      </section>
    </InvestmentContext.Provider>
  );
}
