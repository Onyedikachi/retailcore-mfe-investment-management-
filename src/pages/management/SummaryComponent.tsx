import React, { useEffect, useState } from "react";
import { paths } from "@app/routes/paths";
import {
  ProcessingStatusSlider,
  ActivityLog,
  Actions,
  MiniTermDepositDetail,
  BookingDetail,
  ReviewStatus,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import {
  useGetInvestmentDetailQuery,
  useGetProductDetailQuery,
  useGetInvestmentActivityLogQuery,
  useGetInvestmentRequestDetailQuery,
  useGetInvestmentRequestActivityLogQuery,
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
  const [detail, setDetail] = useState(null);
  const process_type = searchParams.get("process_type");
  const booking_id = searchParams.get("booking_id");
  const product_id = searchParams.get("product_id");
  const request_id = searchParams.get("request_id");
  const [state, setState] = useState();

  // Fetch product data
  const {
    data: investmentData,
    isSuccess,
    isError,
  } = useGetInvestmentDetailQuery({
    id: process_type === "booking" ? productId : booking_id || id,
  });

  const {
    data: productDetail,
  } = useGetProductDetailQuery(
    {
      id:
        investmentData?.data?.facilityDetailsModel?.investmentProductId ||
        detail?.facilityDetailsModel?.investmentProductId ||
        product_id,
    },
    {
      skip:
        !investmentData?.data?.facilityDetailsModel?.investmentProductId &&
        detail?.facilityDetailsModel?.investmentProductId &&
        !product_id,
    }
  );

  // Fetch activity data based on the category
  const { data: activityData, isLoading: activityIsLoading } =
    useGetInvestmentActivityLogQuery(
      { bookingId: id },
      { skip: category === "request" }
    );

  // Fetch activity request data based on the category
  const { data: activityRequestData, isLoading: activityRequestIsLoading } =
    useGetInvestmentRequestActivityLogQuery(
      { bookingrequestId: id },
      { skip: !id }
    );

  const {
    data: requestDetail,
    isLoading: requestDetailIsLoading,
    isSuccess: requestDetailIsSuccess,
  } = useGetInvestmentRequestDetailQuery({
    id: request_id || id,
  });

  useEffect(() => {
    if (isError && requestDetailIsSuccess)
      setProductId(requestDetail?.data?.investementBookingId);
    if (requestDetail?.data?.metaInfo) {
      const data = JSON.parse(requestDetail?.data?.metaInfo);
      setDetail(data);
    }
  }, [requestDetailIsSuccess, isError]);

  const links = [
    {
      id: 1,
      title: "Investment Management",
      url: "/investment-management/overview",
    },
    {
      id: 2,
      title: "Booking",
      url: `/investment-management/${type}`,
    },

    {
      id: 3,
      title: "Process summary",
      url: `#`,
    },
  ];
  return (
    <div className="flex flex-col min-h-[100vh] ">
      <div className="px-[37px] py-[11px] bg-white">
        <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
          Process summary
        </h1>
        <Breadcrumbs
          links={links.map((i) => (i.id === 2 ? { ...i, title: type } : i))}
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
              <BookingDetail
                detail={
                  process_type?.includes("liquidation")
                    ? investmentData?.data
                    : detail || investmentData?.data
                }
                oldData={null}
                type={type}
                productDetail={productDetail?.data}
              />
            </Container>
          </div>

          <Actions requestDetail={requestDetail?.data} />
        </div>

        <ActivityLog
          isFetching={false}
          isLoading={activityIsLoading || activityRequestIsLoading}
          activities={
            activityData?.results.length
              ? activityData?.results
              : activityRequestData?.results
          }
        />
      </div>
    </div>
  );
}
