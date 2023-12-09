import React, { useState } from "react";
import { paths } from "@app/routes/paths";
import {
  ProcessingStatusSlider,
  ActivityLog,
  Actions,
  MiniTermDepositDetail,
  ProductDetail,
  ReviewStatus,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  useGetProductActivityLogQuery,
  useGetProductDetailQuery,
  useGetProductRequestActivityLogQuery,
} from "@app/api";
export function Container({ children }) {
  return (
    <div className="rounded-[10px] border border-[#EEE] px-12 py-10">
      {children}
    </div>
  );
}
export default function Summary() {
  const [searchParams] = useSearchParams();
  const { tab, type, id } = useParams();
  console.log("🚀 ~ file: Summary.tsx:28 ~ Summary ~ id:", id)
  const category = searchParams.get("category");
  const links = [
    {
      id: 1,
      title: "Product Factory",
      url: "/product-factory/dashboard/deposit",
    },
    {
      id: 2,
      title: "Investment",
      url: "/product-factory/investment",
    },
    {
      id: 3,
      title: type,
      url: "#",
    },
    {
      id: 4,
      title: "Process summary",
      url: "#",
    },
  ];

  const staticDetails = {
    name: "Term deposit 1",
    slogan: "We deposit",
    description: "We really deposit",
    currency: "NGN",
    tenure: "12 years",
    productLifeCycle: "",
  };

  const [state, setState] = useState();
  // Fetch product data
  const { data: productData, isLoading } = useGetProductDetailQuery({ id });

  // Fetch activity data based on the category
  const { data: activityData, isLoading: activityIsLoading } =
    useGetProductActivityLogQuery(
      { productid: id },
      { skip: category === "request" }
    );

  // Fetch activity request data based on the category
  const { data: activityRequestData, isLoading: activityRequestIsLoading } =
    useGetProductRequestActivityLogQuery(
      { productrequestId: id },
      { skip: category === "product" }
    );

  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Process summary
        </h1>
        <Breadcrumbs links={links} />
      </div>{" "}
      <div className="w-full flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
        <div className="flex-1   bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] flex flex-col gap-5">
          <div className="max-h-[600px] overflow-y-auto flex flex-col gap-5">
            <ProcessingStatusSlider
              rangeLabels={["Pending submission", "Approved"]}
            />
            <ReviewStatus status={"r"} reason={"r"} type={""} text="failed" />
            <Container>
              <ProductDetail
                detail={productData?.data}
                oldData={productData?.data}
              />
            </Container>
          </div>

          <Actions />
        </div>

        <ActivityLog
          isFetching={false}
          isLoading={activityIsLoading || activityRequestIsLoading}
          activities={activityData?.results || activityRequestData?.results}
        />
      </div>
    </div>
  );
}
