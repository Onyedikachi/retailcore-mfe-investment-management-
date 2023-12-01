import moment from "moment";
import React from "react";
interface ILogProps {
  isFetching: boolean;
  isLoading: boolean;
  activities: Array<any>;
}
export default function ActivityLog({
  isFetching,
  activities,
  isLoading,
}: ILogProps) {
  return (
    <div
      data-testid="activity-timestamp"
      className="border border-[#E5E9EB] max-w-[377px] w-full px-[14px] rounded-lg bg-[#ffffff]"
    >
      <div className="pt-[30px] pb-[19px] border-b border-[#cccccc] ">
        <span className="text-[#636363] font-medium text-[20px] uppercase">
          Activity log
        </span>
      </div>

      {isLoading && (
        <span className="mt-[25px] mb-[56px] font-normal text-sm text-[#AAA]">
          Loading
        </span>
      )}

      {!isLoading && activities && (
        <div className="flex flex-col">
          {activities.length == 0 && (
            <span className="mt-[25px] mb-[56px] font-normal text-sm text-[#AAA]">
              No activity found
            </span>
          )}

          {activities.length > 0 && (
            <div className="flex flex-col py-[25px] gap-y-14">
              <ul className="grid gap-y-10 overflow-hidden">
                {activities.map((item: any, index: number) => (
                  <li
                    key={`-${index.toString()}-index`}
                    className="flex gap-x-[27px] items-center group min-h-[56px]"
                  >
                    <div
                      className={`relative ${
                        index !== activities.length - 1
                          ? "before:content-[''] before:absolute before:h-[100px] before:w-[1px] before:border-l before:z-[1] before:left-1/2 before:translate-x-[-50%] before:border-[#AAAAAA]"
                          : "" // If it's the last item, don't apply the before content
                      } ${
                        activities[activities.length - 1].description
                          .toLowerCase()
                          .includes("pending") &&
                        index === activities.length - 2
                          ? "before:border-dashed"
                          : ""
                      } `}
                    >
                      {item.description.toLowerCase().includes("pending") ? (
                        <svg
                          width="25"
                          height="26"
                          viewBox="0 0 25 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_45812_713696)">
                            <circle
                              cx="12.5"
                              cy="13"
                              r="12"
                              fill="white"
                              stroke="#AAAAAA"
                            />
                            <circle
                              cx="12.3438"
                              cy="13.1562"
                              r="8.34375"
                              fill="white"
                              stroke="#AAAAAA"
                              stroke-width="0.5"
                            />
                            <rect
                              x="0.5"
                              y="1"
                              width="24"
                              height="24"
                              stroke="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_45812_713696">
                              <rect
                                y="0.5"
                                width="25"
                                height="25"
                                rx="12.5"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="z-[2] relative"
                        >
                          <circle cx="12.5" cy="12.5" r="12.5" fill="#2FB755" />
                          <circle
                            cx="12.3438"
                            cy="12.6562"
                            r="8.34375"
                            fill="white"
                            stroke="#AAAAAA"
                            strokeWidth="0.5"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[#636363] font-normal text-sm">
                        {item?.description}
                      </p>
                      {item?.created_at && (
                        <p className="text-[#AAA] font-normal text-xs">
                          {moment(item?.created_at).format("lll")}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
