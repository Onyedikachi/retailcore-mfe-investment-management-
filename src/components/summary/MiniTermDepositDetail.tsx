import { useState, useEffect } from "react";

export default function MiniTermDepositDetail({ detail, oldData }: any) {
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
            {oldData && oldData?.name !== detail.name && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {oldData?.name}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.name}{" "}
              {oldData && oldData?.name !== detail?.name && (
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
            {oldData && oldData?.slogan !== detail.slogan && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {oldData?.slogan}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.slogan}{" "}
              {oldData && oldData?.slogan !== detail?.slogan && (
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
            {oldData && oldData?.description !== detail.description && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {oldData?.description}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.description}{" "}
              {oldData && oldData?.description !== detail?.description && (
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
            {oldData && oldData?.currency !== detail.currency && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {oldData?.currency}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.currency}{" "}
              {oldData && oldData?.currency !== detail?.currency && (
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
            {oldData && oldData?.tenure !== detail.tenure && (
              <span className="block  line-through mb-2 text-[#aaa]">
                {" "}
                {oldData?.tenure}
              </span>
            )}
            <span className="flex itmes-center">
              {" "}
              {detail?.tenure}{" "}
              {oldData && oldData?.tenure !== detail?.tenure && (
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
            {oldData &&
              oldData?.productLifeCycle !== detail.productLifeCycle && (
                <span className="block  line-through mb-2 text-[#aaa]">
                  {" "}
                  {oldData?.productLifeCycle}
                </span>
              )}
            <span className="flex itmes-center">
              {" "}
              {detail?.productLifeCycle}{" "}
              {oldData &&
                oldData?.productLifeCycle !== detail?.productLifeCycle && (
                  <span className="block text-success-500 pl-[2px]"> New</span>
                )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
