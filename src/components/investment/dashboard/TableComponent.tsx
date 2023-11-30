import React, { useContext, useState } from "react";
import { ExportToCsv } from "export-to-csv";
import { HiRefresh, HiDownload } from "react-icons/hi";
// import { RequestTable, ProductTable } from "./tables";
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
import Table from "@app/components/table";
import { ActiveFilterOptions, DropDownOptions, StatusFilterOptions, TypeFilterOptions, productFilterOptions } from "@app/constants";

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
  status: string;
  "updated on": string;
}

export const handleDropdown = (
  status: string,
  isChecker,
  DropDownOptions,
  setOptionsByStatus,
  locked = false,
  permissions = []
): string[] => {
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
      options = options.filter(
        (i: any) =>
          i.text.toLowerCase() !== "deactivate" &&
          i.text.toLowerCase() !== "activate"
      );
    }
    if (!permissions?.includes("CREATE_PRODUCT")) {
      options = options.filter((i: any) => i.text.toLowerCase() !== "modify");
    }
    return options;
  }
};

export const handleHeaders = (headers: any, isChecker) => {
  return isChecker
    ? headers.filter((i) => i.key !== "created_by")
    : headers.filter((i) => i.key !== "treated_by");
};
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

    const productData = downloadData.map((i) => {
      // @ts-ignore
      let obj: ProductDataProps = {
        "product name": i?.name || "",
        "product code": i?.code || "",
        status: handleUserView(i?.status, isChecker),
        "updated on": moment(i.updated_at).format("lll"),
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
    title: "Product management",
    filename: StatusCategoryType?.AllProducts ? "products" : "requests",
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
      title: "Product management",
      filename:
        category === StatusCategoryType?.AllProducts ? "products" : "requests",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    });
    setStatus("");
  }, [category]);

  const headers = [
    {
      label: "product name/code",
      key: "productName",
      options: [
        {
          id: 1,
          name: "",
          value: "",
        },
      ],
      hasSelect: false,
      hasDateSelect: false,
    },
    {
      label: "product type",
      key: "productType",
      options: productFilterOptions,
      hasSelect: true,
      hasDateSelect: false,
    },
    {
      label: "state",
      key: "state",
      options: ActiveFilterOptions,
      hasSelect: true,
      hasDateSelect: false,
    },
    {
      label: "updated on",
      key: "updatedOn",
      options: [
        {
          id: 1,
          name: "",
          value: "",
        },
      ],
      hasSelect: false,
      hasDateSelect: true,
    },
    {
      label: "",
      options: [],
      hasSelect: false,
      hasDateSelect: false,
      key: "actions",
    },
  ];
  const requestHeaders = [
    {
      label: "request",
      key: "request",
      options: [
        {
          id: 1,
          name: "",
          value: "",
        },
      ],
      hasSelect: false,
      hasDateSelect: false,
    },
    {
      label: "type",
      key: "type",
      options: TypeFilterOptions,
      hasSelect: true,
      hasDateSelect: false,
    },
    {
      label: "initiator",
      key: "created_by",
      options: [
        {
          id: 1,
          name: "Term deposit",
          value: "1",
        },
        {
          id: 2,
          name: "Commercial paper",
          value: "2",
        },
        {
          id: 3,
          name: "Treasurer bill",
          value: "3",
        },
      ],
      hasSelect: true,
      hasDateSelect: false,
    },
    {
      label: "reviewer",
      key: "treated_by",
      options: [
        {
          id: 1,
          name: "Term deposit",
          value: "1",
        },
        {
          id: 2,
          name: "Commercial paper",
          value: "2",
        },
        {
          id: 3,
          name: "Treasurer bill",
          value: "3",
        },
      ],
      hasSelect: true,
      hasDateSelect: false,
    },
    {
      label: "status",
      key: "status",
      options: StatusFilterOptions,
      hasSelect: true,
      hasDateSelect: false,
    },
    {
      label: "updated on",
      key: "updatedOn",
      options: [
        {
          id: 1,
          name: "",
          value: "",
        },
      ],
      hasSelect: false,
      hasDateSelect: true,
    },
    {
      label: "",
      options: [],
      hasSelect: false,
      hasDateSelect: false,
      key: "actions",
    },
  ];
  const ProductData = [
    {
      id: 1,
      productName: "Product Royal",
      productCode: "TM-01",
      description: "Leading with excellent customer search for the item",
      state: "active",
      productType: "term deposit",
      updatedOn: new Date(),
      isNew: false,
      isNameEdited: true,
      islocked: false,
      status: "A",
    },
    {
      id: 2,
      productName: "Product Sunshine",
      productCode: "TM-02",
      description: "Leading with excellent customer  search for the item",
      state: "inactive",
      status: "R",
      productType: "term deposit",
      updatedOn: new Date(),
      isNew: false,
      isNameEdited: false,
      islocked: false,
    },
    {
      id: 3,
      productName: "Product Pride",
      productCode: "TM-03",
      description: "Leading with excellent customer  search for the item",
      state: "active",
      productType: "term deposit",
      updatedOn: new Date(),
      isNew: true,
      isNameEdited: false,
      islocked: true,
      status: "I",
    },
  ];
  const requestData = [
    {
      id: 1,
      request: "Leading with excellent customer search for the item",
      state: "active",
      type: "deactivation",
      created_by: "John doe",
      treated_by: "Jane Doe",
      updatedOn: new Date(),
      isNew: false,
      isNameEdited: true,
      islocked: false,
      status: "A",
    },
    {
      id: 2,
      request: "Leading with excellent customer search for the item",
      state: "active",
      type: "modification",
      created_by: "John doe",
      treated_by: "Jane Doe",
      updatedOn: new Date(),
      isNew: false,
      isNameEdited: true,
      islocked: false,
      status: "P",
    },
    {
      id: 3,
      request: "Leading with excellent customer search for the item",
      state: "active",
      type: "creation",
      created_by: "John doe",
      treated_by: "Jane Doe",
      updatedOn: new Date(),
      isNew: false,
      isNameEdited: true,
      islocked: false,
      status: "R",
    },
  ];

  const getOptionData = (value: string, label: string) => {
    console.log(
      "🚀 ~ file: TableComponent.tsx:188 ~ getOptionData  ~ label:",
      label
    );
    console.log(
      "🚀 ~ file: TableComponent.tsx:179 ~ getOptionData  ~ value:",
      value
    );
  };
  const onChangeDate = (value: any) => {
    console.log(
      "🚀 ~ file: TableComponent.tsx:193 ~ onChangeDate ~ value:",
      value
    );
  };
  const handleDropClick = (value: any) => {
    console.log(
      "🚀 ~ file: TableComponent.tsx:197 ~ handleDropClick ~ value:",
      value
    );
    return {};
  };
  return (
    <section className="w-full h-full">
      {/* Table Top bar  */}
      <div className="flex justify-end gap-x-[25px] items-center mb-[27px] h-auto">
        <SearchInput
          setSearchTerm={setSearch}
          placeholder="Search by product name/code"
        />
        <div className="relative  after:content-[none] after:w-1 after:h-[80%] after:absolute after:border-r after:right-[-15px] after:top-1/2 after:translate-y-[-50%] after:border-[#E5E9EB]">
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
          {/* {((permissions?.includes("VIEW_ALL_PRODUCT_RECORDS") &&
            category === StatusCategoryType?.AllProducts) ||
            (permissions?.includes("VIEW_ALL_PRODUCT_REQUESTS") &&
              category === StatusCategoryType?.Requests)) && ( */}
          {/* <button
            onClick={() =>
              handleDownload(downloadData, isChecker, csvExporter, category)
            }
            data-testid="download-btn"
            className="flex gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiDownload className="text-lg" /> Download
          </button> */}
          {/* )} */}
        </div>
      </div>

      {/* main table  */}
      <Table
        headers={
          category === StatusCategoryType?.AllProducts
            ? headers
            : handleHeaders(requestHeaders, isChecker)
        }
        tableRows={
          category === StatusCategoryType?.AllProducts
            ? ProductData
            : requestData
        }
        page={1}
        total={20}
        fetchMoreData={undefined}
        hasMore={false}
        getOptionData={getOptionData}
        isLoading={false}
        dropDownOptions={DropDownOptions}
        dropDownClick={handleDropClick}
        onChangeDate={onChangeDate}
        type={category.toLowerCase()}
      />
    </section>
  );
}
