import React, { useContext, useState } from "react";
import { ExportToCsv } from "export-to-csv";
import { HiRefresh, HiDownload } from "react-icons/hi";
// import { RequestTable, BranchTable } from "./tables";
import { StatusCategoryType } from "../../../constants/enums";
import moment from "moment";
import {
  getRequestType,
  ucObjectKeys,
  InvestmentContext,
  handleUserView,
  AppContext,
} from "@app/utils";
import SearchInput from "@app/components/SearchInput";

interface RequestDataProps {
  request: string;
  type: string;
  initiator?: string;
  reviewer?: string;
  status: string;
  "updated on": string;
}

interface BranchDataProps {
  "branch name": string;
  "branch code": string;
  status: string;
  "updated on": string;
}

export function handleDownload(downloadData, isChecker, csvExporter, category) {
  try {
    if (!downloadData?.length) return;
    const requestData = downloadData.map((i) => {
      // @ts-ignore
      let obj: RequestDataProps = {
        request: i?.description || "",
        type: getRequestType(i?.request_type) || "",
      };

      if (!isChecker) {
        obj.initiator = i?.created_by || "";
        obj.status = handleUserView(i?.status, isChecker);
      } else {
        obj.reviewer = i?.created_by || "";
        obj.status = handleUserView(i?.status, isChecker);
      }

      obj["updated on"] = moment(i.updated_at).format("lll");

      return obj;
    });

    const branchData = downloadData.map((i) => {
      // @ts-ignore
      let obj: BranchDataProps = {
        "branch name": i?.name || "",
        "branch code": i?.code || "",
        status: handleUserView(i?.status, isChecker),
        "updated on": moment(i.updated_at).format("lll"),
      };

      return obj;
    });
    csvExporter.generateCsv(
      category === StatusCategoryType.Requests
        ? ucObjectKeys(requestData)
        : ucObjectKeys(branchData)
    );
  } catch (err) {
    throw "Input must be an array of objects";
  }
}

export default function TableComponent() {
  const { category, setStatus, setSearch, isChecker } =
    useContext(InvestmentContext);
  const { permissions } = useContext(AppContext);
  const [refresh, setRefresh] = useState(false);
  const [downloadData, setDownloadData] = useState<any[]>([]);
  const [options, setOptions] = React.useState({
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    title: "Branch management",
    filename: StatusCategoryType?.AllBranches ? "branches" : "requests",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  });

  const csvExporter = new ExportToCsv(options);

  React.useEffect(() => {
    setOptions({
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: false,
      title: "Branch management",
      filename:
        category === StatusCategoryType?.AllBranches ? "branches" : "requests",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    });
    setStatus("");
  }, [category]);

  return (
    <section className="w-full h-full">
      {/* Table Top bar  */}
      <div className="flex justify-end gap-x-[25px] items-center mb-[27px] h-auto">
        <SearchInput setSearchTerm={setSearch} />
        <div className="relative  after:content-[''] after:w-1 after:h-[80%] after:absolute after:border-r after:right-[-15px] after:top-1/2 after:translate-y-[-50%] after:border-[#E5E9EB]">
          {/* Refresh button  */}

          <button
            data-testid="refresh-btn"
            onClick={() => setRefresh(!refresh)}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiRefresh className="text-lg" /> Refresh table
          </button>
        </div>{" "}
        <div>
          {/* download button  */}{" "}
          {((permissions?.includes("VIEW_ALL_BRANCH_RECORDS") &&
            category === StatusCategoryType?.AllBranches) ||
            (permissions?.includes("VIEW_ALL_BRANCH_REQUESTS") &&
              category === StatusCategoryType?.Requests)) && (
            <button
              onClick={() =>
                handleDownload(downloadData, isChecker, csvExporter, category)
              }
              data-testid="download-btn"
              className="flex gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
            >
              <HiDownload className="text-lg" /> Download
            </button>
          )}
        </div>
      </div>

      {/* main table  */}

      {/* {category === StatusCategoryType?.AllBranches ? (
        <div data-testid="branch-table" className="h-full">
          <BranchTable
            refresh={refresh}
            setRefresh={setRefresh}
            setDownloadData={setDownloadData}
          />
        </div>
      ) : (
        <div data-testid="request-table" className="h-full">
          <RequestTable
            refresh={refresh}
            setRefresh={setRefresh}
            setDownloadData={setDownloadData}
          />
        </div>
      )} */}
    </section>
  );
}
