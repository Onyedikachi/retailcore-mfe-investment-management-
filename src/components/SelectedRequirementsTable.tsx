import React from "react";

// const documents = [
//   {
//     name: "Document",
//     value: "Document",
//     id: 1,
//   },
//   {
//     name: "Document 2",
//     value: "Document 2",
//     id: 2,
//   },
//   // More people...
// ];

type SelectedRequirementsTable = {
  tableItems: any[];
  deleteTableItem: (itemToDelete) => void;
};

export default function SelectedRequirementsTable({
  tableItems,
  deleteTableItem,
}: SelectedRequirementsTable) {

  const headers = ["s/n", "DOCUMENTATION REQUIRED", ""];
  return (
    <div data-testid="selected-requirements-table" className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {headers.map((i, idx) => (
                    <th
                      key={i + idx.toString()}
                      className="text-left relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
                    >
                      {i}
                    </th>
                  ))}
                </tr>
              </thead>
              {tableItems && tableItems?.length > 0 ? (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tableItems.map((document, index) => (
                    <tr key={document.id} className="bg-[#F9F2F2]">
                      <td className="w-[50px] capitalize whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-[#636363] sm:pl-6 lg:pl-8">
                        {index + 1}
                      </td>
                      <td data-testid="document-item" className="whitespace-nowrap px-3 py-4 text-base text-[#636363]">
                        {document.name}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                        <div className="flex justify-center">
                          <div
<<<<<<< HEAD
                           role="button" tabIndex={0}
=======
                            onKeyUp={() => { }}
>>>>>>> fix-button-accessibility
                            onClick={() => deleteTableItem(document)}
                            className="cursor-pointer flex items-center justify-center p-2 rounded-sm bg-white shadow-lg "
                          >
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
              ) : (
                <tbody>
                  {Array.from(Array(5)).map((item: any, index) => (
                    <tr
                      key={item + index.toString()}
                      className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
                    >
                      <td className="text-sm font-medium text-[#aaa] px-4 py-[6px] h-10 capitalize  truncate relative text-left">
                        {index === 0 && "No document selected"}
                      </td>
                      <td className="text-sm font-medium text-[#aaa] px-4 py-[6px] h-10 capitalize truncate relative text-left"></td>
                      <td className="text-sm font-medium text-[#aaa] px-4 py-[6px] h-10 capitalize truncate relative text-left"></td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
