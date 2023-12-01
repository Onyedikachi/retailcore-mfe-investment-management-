import React from "react";

const documents = [
  {
    name: "Document",
    value: "Document",
    id: 1,
  },
  {
    name: "Document 2",
    value: "Document 2",
    id: 2,
  },
  // More people...
];

export default function SelectedRequirementsTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="max-w-[49px] py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#AAAAAA] sm:pl-6 lg:pl-8"
                  >
                    S|N
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-[#AAAAAA]"
                  >
                    DOCUMEMNTATION REQUIRED
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {documents.map((document, index) => (
                  <tr className="bg-[#F9F2F2]" key={document.id}>
                    <td className="max-w-[49px] capitalize whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-[#636363] sm:pl-6 lg:pl-8">
                      {index}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-base text-[#636363]">
                      {document.name}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <div className="flex justify-center">
                        <div className="flex items-center justify-center p-2 rounded-sm bg-white shadow-lg ">
                          <svg
                            width="11"
                            height="10"
                            viewBox="0 0 11 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_49301_99045)">
                              <path
                                d="M0.160156 2.207L2.95316 5L0.160156 7.793L2.36716 10L5.16016 7.207L7.95316 10L10.1602 7.793L7.36716 5L10.1602 2.207L7.95316 0L5.16016 2.793L2.36716 0L0.160156 2.207Z"
                                fill="#CF2A2A"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_49301_99045">
                                <rect
                                  width="10"
                                  height="10"
                                  fill="white"
                                  transform="translate(0.160156)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
