import React, { useEffect, useState } from "react";
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
  useGetRequestDetailQuery,
} from "@app/api";
import { rangeLabels, summaryLinks } from "@app/constants";
export function Container({ children }) {
  return (
    <div
      data-testid="container"
      className="rounded-[10px] border border-[#EEE] px-12 py-10"
    >
      {children}
    </div>
  );
}
export default function Summary() {
  const [searchParams] = useSearchParams();
  const { tab, type, id, process } = useParams();
  const [productId, setProductId] = useState(id);
  const category = searchParams.get("category");

  const [state, setState] = useState();
  // Fetch product data
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductDetailQuery({
    id: productId,
  });

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
  const {
    data: requestDetail,
    isLoading: requestDetailIsLoading,
    isSuccess: requestDetailIsSuccess,
  } = useGetRequestDetailQuery(
    {
      id,
    },
    { skip: category === "product" }
  );
  useEffect(() => {
    if (isError && requestDetailIsSuccess)
      setProductId(requestDetail?.data?.investementProductId);
  }, [requestDetailIsSuccess, isError]);

  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Process summary
        </h1>
        <Breadcrumbs
          links={summaryLinks.map((i) =>
            i.id === 3 ? { ...i, title: type } : i
          )}
        />
      </div>{" "}
      <div className="w-full flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
        <div className="flex-1   bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] flex flex-col gap-5">
          <div className="max-h-[600px] overflow-y-auto flex flex-col gap-5">
            <ProcessingStatusSlider
              rangeLabels={["Pending submission", "Approved"]}
              leftClass={
                rangeLabels[requestDetail?.data?.requestStatus]?.leftClass
              }
              rightClass={
                rangeLabels[requestDetail?.data?.requestStatus]?.rightClass
              }
            />
            {process === "preview" && (
              <ReviewStatus
                status={requestDetail?.data?.requestStatus}
                reason={requestDetail?.data?.reason}
                type={requestDetail?.data?.requestType}
                text={requestDetail?.data?.lastComment}
              />
            )}
            <Container>
              <ProductDetail detail={productData?.data} oldData={null} />
            </Container>
          </div>

          <Actions requestDetail={requestDetail?.data} />
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
