import React, { useState } from "react";
import { paths } from "@app/routes/paths";
import {
  ProcessingStatusSlider,
  ActivityLog,
  Actions,
  MiniTermDepositDetail,
  ProductDetail,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
export function Container({ children }) {
  return (
    <div className="rounded-[10px] border border-[#EEE] px-12 py-10">
      {children}
    </div>
  );
}
export default function Summary({ links, details, statusLabels, activities }: any) {
 
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
            <ProcessingStatusSlider rangeLabels={statusLabels} />

            <Container>
              <ProductDetail detail={details} previousDetail={details} />
            </Container>
          </div>

          <Actions />
        </div>

        <ActivityLog
          isFetching={false}
          isLoading={false}
          activities={activities}
        />
      </div>
    </div>
  );
}
