import { useState, useEffect } from "react";

export default function ProductDetail({ detail, previousDetail }: any) {
  const [isNewDescription, setDescription] = useState(false);

  return (
    <div className="flex flex-col">
      <p className="text-[#636363] text-[18px] font-semibold mb-[62px]">
        Term Deposit Product Details
      </p>
      <p className="text-[#636363] text-[16px] font-medium mb-[27px]">
        Product Information
      </p>
      <div className="grid grid-cols-1 gap-[25px] px-12">
        <div className=" flex gap-[54px]">
          <div className="w-[300px]   text-base font-medium text-[#636363]">
            Product Name
          </div>
          <div className="w-full text-base font-normal text-[#636363]">
            {previousDetail && previousDetail?.name !== detail.name && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {previousDetail?.name}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.name}{" "}
              {previousDetail && previousDetail?.name !== detail?.name && (
                <span className="block text-success-500 pl-[2px]"> New</span>
              )}
            </span>
          </div>
        </div>
        <div className=" flex gap-[54px]">
          <div className="w-[300px]   text-base font-medium text-[#636363]">
            Slogan
          </div>
          <div className="w-full text-base font-normal text-[#636363]">
            {previousDetail && previousDetail?.slogan !== detail.slogan && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {previousDetail?.slogan}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.slogan}{" "}
              {previousDetail && previousDetail?.slogan !== detail?.slogan && (
                <span className="block text-success-500 pl-[2px]"> New</span>
              )}
            </span>
          </div>
        </div>

        <div className=" flex gap-[54px]">
          <div className="w-[300px]   text-base font-medium text-[#636363]">
            Product Description
          </div>
          <div className="w-full text-base font-normal text-[#636363]">
            {previousDetail && previousDetail?.description !== detail.description && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {previousDetail?.description}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.description}{" "}
              {previousDetail && previousDetail?.description !== detail?.description && (
                <span className="block text-success-500 pl-[2px]"> New</span>
              )}
            </span>
          </div>
        </div>
        <div className=" flex gap-[54px]">
          <div className="w-[300px]   text-base font-medium text-[#636363]">
            Product Currency
          </div>
          <div className="w-full text-base font-normal text-[#636363]">
            {previousDetail && previousDetail?.currency !== detail.currency && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {previousDetail?.currency}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.currency}{" "}
              {previousDetail && previousDetail?.currency !== detail?.currency && (
                <span className="block text-success-500 pl-[2px]"> New</span>
              )}
            </span>
          </div>
        </div>

        <div className=" flex gap-[54px]">
          <div className="w-[300px]   text-base font-medium text-[#636363]">
            Tenure
          </div>
          <div className="w-full text-base font-normal text-[#636363]">
            {previousDetail && previousDetail?.tenure !== detail.tenure && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {previousDetail?.tenure}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.tenure}{" "}
              {previousDetail && previousDetail?.tenure !== detail?.tenure && (
                <span className="block text-success-500 pl-[2px]"> New</span>
              )}
            </span>
          </div>
        </div>

        <div className=" flex gap-[54px]">
          <div className="w-[300px]   text-base font-medium text-[#636363]">
            Product life cycle
          </div>
          <div className="w-full text-base font-normal text-[#636363]">
            {previousDetail &&
              previousDetail?.productLifeCycle !== detail.productLifeCycle && (
                <span className="block  line-through mb-2 text-[#aaa]">
                  {" "}
                  {previousDetail?.productLifeCycle}
                </span>
              )}
            <span className="flex itmes-center">
              {" "}
              {detail?.productLifeCycle}{" "}
              {previousDetail &&
                previousDetail?.productLifeCycle !== detail?.productLifeCycle && (
                  <span className="block text-success-500 pl-[2px]"> New</span>
                )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
