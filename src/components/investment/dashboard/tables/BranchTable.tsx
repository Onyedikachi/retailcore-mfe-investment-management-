// import React, {
//   useState,
//   useContext,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";
// import moment from "moment";
// import { BsFunnel } from "react-icons/bs";
// import { FaBars } from "react-icons/fa";
// import InfiniteScroll from "react-infinite-scroll-component";


// import {
//   ProductTableHeaders,
//   DropDownOptions,
//   ActiveFilterOptions,
//   DateFilterOptions,
// } from "../../../../constants";
// import DropDown from "../../../DropDown";
// import { MultiSelect, DateSelect } from "../../../forms";
// import {
//   Confirm,
//   DeactivationRequest,
//   Success,
//   ProductDetail,
//   Failed,
// } from "../../../modals";
// import { AppContext, InvestmentContext } from "@app/utils/context";
// import { toast } from "react-toastify";
// import { Loader } from "@app/components";
// import { useNavigate } from "react-router-dom";
// import BottomBarLoader from "@app/components/BottomBarLoader";
// import { removeNullEmptyKeys } from "@app/utils/removeNullFromObj";
// import { handleColorState } from "@app/utils/handleColorState";
// import { Messages, Prompts } from "@app/constants/enums";
// import debounce from "lodash.debounce";

// interface ProductDataProps {
//   [x: string]: any;
//   id: any;
//   branchName: string;
//   branchCode: string;
//   location?: string;
//   description: string;
//   state: string;
//   updatedOn: Date;
//   isNew?: boolean;
//   isNameEdited?: boolean;
// }

// // Extract Dropdown component for reusability
// export const DropdownButton = ({ options, handleClick }: any) => {
//   return (
//     <DropDown options={options} handleClick={handleClick}>
//       <FaBars className="text-sterling-red-800" />
//     </DropDown>
//   );
// };
// export const handleDropdown = (
//   status: string,
//   isChecker,
//   DropDownOptions,
//   setOptionsByStatus,
//   locked = false,
//   permissions = []
// ): string[] => {
//   if (locked)
//     return DropDownOptions[setOptionsByStatus(status)].filter(
//       (i: any) => i.text.toLowerCase() === "view"
//     );
//   if (!status) return [];
//   if (isChecker) {
//     return DropDownOptions[setOptionsByStatus(status)].filter(
//       (i: any) => i.text.toLowerCase() === "view"
//     );
//   } else {
//     let options = DropDownOptions[setOptionsByStatus(status)];
//     if (!permissions?.includes("CREATE_PRODUCT")) {
//       options = options.filter(
//         (i: any) =>
//           i.text.toLowerCase() !== "deactivate" &&
//           i.text.toLowerCase() !== "activate"
//       );
//     }
//     if (!permissions?.includes("CREATE_PRODUCT")) {
//       options = options.filter((i: any) => i.text.toLowerCase() !== "modify");
//     }
//     return options;
//   }
// };

// export const setOptionsByStatus = (status) => {
//   switch (status) {
//     case "P":
//       return "inactive";
//     case "A":
//       return "active";
//     case "R":
//       return "inactive";
//     case "D":
//       return "inactive";
//     case "I":
//       return "inactive";
//   }
// };

// export function handleProductUserView(value: string) {
//   switch (value) {
//     case "P":
//       return "inactive";
//     case "D":
//       return "inactive";
//     case "R":
//       return "inactive";
//     case "A":
//       return "active";
//     case "I":
//       return "inactive";
//     default:
//       return value;
//   }
// }

// export const handleClick = (
//   e: any,
//   item: any,
//   setConfirmText,
//   setSubText,
//   setDetail,
//   setStatType,
//   setIsConfirmOpen,
//   setProductView
// ) => {
//   //e is the menu option text, e.g "View"
//   setConfirmText("");
//   setSubText("");
//   setDetail(item);
//   setStatType(e.toLowerCase());

//   if (e.toLowerCase() === "deactivate") {
//     setConfirmText(
//       `This branch currently has 4 users assigned, do you want to deactivate it?`
//     );
//     setSubText(
//       "Users assigned to the branch will be deactivated along with the branch and will no longer have access to the system."
//     );
//     setIsConfirmOpen(true);
//   }
//   if (e.toLowerCase() === "activate") {
//     setConfirmText(Prompts.PRODUCT_ACTIVATE);
//     setIsConfirmOpen(true);
//   }
//   if (e.toLowerCase() === "view") {
//     setProductView(true);
//   }

//   if (e.toLowerCase() === "modify") {
//     setConfirmText(Prompts.PRODUCT_MODIFY);
//     setIsConfirmOpen(true);
//   }
// };

// export const handleDeactivationRequest = (detail, deactivateProduct, reason) => {
//   if (!reason || !detail?.id) return;
//   deactivateProduct({ id: detail?.id, reason });
// };

// export const handleConfirm = (
//   setIsConfirmOpen,
//   statType,
//   setIsDeactivationOpen,
//   activateProduct,
//   detail,
//   navigate
// ) => {
//   setIsConfirmOpen(false);
//   if (statType === "deactivate") {
//     setIsDeactivationOpen(true);
//   }
//   if (statType === "activate") {
//     activateProduct({ id: detail?.id, branchid: detail?.id });
//   }
//   if (statType === "modify") {
//     // @ts-ignore
//     navigate(
//       `/branch-management/modify/branch_modify/${detail?.id}/${detail?.code}`
//     );
//   }
// };

// // ProductTable component
// function ProductTable({
//   refresh,
//   setDownloadData,
//   setRefresh,
// }: {
//   refresh: boolean;
//   setDownloadData: (e: any) => void;
//   setRefresh?: (e: any) => void;
// }): React.JSX.Element {
//   const { isChecker, selected, search, status } = useContext(InvestmentContext);
//   const { role, permissions } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reason, setReason] = useState("");
//   const [isFailed, setFailed] = useState(false);
//   const [failedSubText, setFailedSubtext] = useState("");
//   const [failedText, setFailedText] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
//   const [isProductView, setProductView] = useState(false);
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
//   const [confirmText, setConfirmText] = useState("");
//   const [subText, setSubText] = useState("");
//   const [successText, setSuccessText] = useState("");
//   const [statType, setStatType] = useState("");
//   const [detail, setDetail] = useState<ProductDataProps | null>(null);
//   const [hasMore, setHasMore] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [duration, setDuration] = useState<{
//     id: number;
//     name: string;
//     value: number;
//   } | null>({ id: 1, name: "all", value: 0 });
//   const [pageParams, setPageParams] = useState<any>({
//     count: 0,
//     limit: 15,
//   });

//   const [queryParams, setQueryParams] = useState({
//     page: 1,
//     page_size: 15,
//     filter_by: "created_by_me",
//     status__in: [],
//     start_date: null,
//     end_date: null,
//     initiator: [],
//     q: "",
//   });
//   const initialLoad = useRef(false);
//   const [branchData, setProductData] = useState([]);
//   const [
//     getPostProductes,
//     { data: tableData, isLoading, isSuccess: getIsSuccess },
//   ] = useGetPostProductesMutation();

//   function fetchData(page) {
//     getPostProductes({ ...removeNullEmptyKeys(queryParams), page });
//   }
//   const [
//     activateProduct,
//     {
//       isLoading: ActivateProductLoading,
//       isSuccess: ActivateProductIsSuccess,
//       isError: ActivateProductIsError,
//       error: ActivateProductError,
//     },
//   ] = useActivateProductMutation();

//   const [
//     deactivateProduct,
//     {
//       isLoading: DeactivateProductLoading,
//       isSuccess: DeactivateProductIsSuccess,
//       isError: DeactivateProductIsError,
//       error: DeactivateProductError,
//     },
//   ] = useDeactivateProductMutation();

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     if (!initialLoad.current) return;
//     if (currentPage === 1) {
//       fetchData(1);
//     } else {
//       setCurrentPage(1);
//     }
//   }, [queryParams]);

//   useEffect(() => {
//     if (!initialLoad.current) return;

//     if (refresh) {
//       if (currentPage !== 1) {
//         setCurrentPage(1);
//       } else {
//         fetchData(1);
//       }

//       setRefresh(false);
//     }
//   }, [refresh]);

//   useEffect(() => {
//     setQueryParams({
//       ...queryParams,
//       status__in: selectedOptions?.map((i) => i.value) || [],
//       q: search || "",
//       filter_by: selected?.value || "",
//       start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
//       end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
//     });
//   }, [selected, search, selectedOptions, startDate, endDate]);

//   useEffect(() => {
//     setQueryParams({
//       ...queryParams,

//       status__in: status ? [status] : [],
//     });
//   }, [status]);

//   useEffect(() => {
//     if (duration?.value) {
//       setEndDate(moment()); // Get the current date and time
//       setStartDate(moment().subtract(duration?.value, "days")); // Add the specified duration to the start date
//     }
//     return () => {
//       setStartDate(null);
//       setEndDate(null);
//     };
//   }, [duration]);

//   useEffect(() => {
//     if (ActivateProductIsSuccess) {
//       setSuccessText(
//         role === "superadmin"
//           ? Messages.PRODUCT_ACTIVATE_SUCCESS
//           : Messages.ADMIN_PRODUCT_ACTIVATE_SUCCESS
//       );
//       setIsSuccessOpen(true);
//       fetchData(1);
//     }
//     if (DeactivateProductIsSuccess) {
//       setSuccessText(
//         role === "superadmin"
//           ? Messages.PRODUCT_DEACTIVATE_SUCCESS
//           : Messages.ADMIN_PRODUCT_DEACTIVATE_SUCCESS
//       );
//       setIsDeactivationOpen(false);
//       setIsSuccessOpen(true);
//       fetchData(1);
//     }
//     if (ActivateProductIsError || DeactivateProductIsError) {
//       ActivateProductIsError &&
//         setFailedSubtext(ActivateProductError?.message?.Msg);
//       ActivateProductIsError &&
//         setFailedText(
//           role === "superadmin"
//             ? Messages.PRODUCT_ACTIVATE_FAILED
//             : Messages.ADMIN_PRODUCT_ACTIVATE_FAILED
//         );
//       DeactivateProductIsError &&
//         setFailedSubtext(DeactivateProductError?.message?.Msg);
//       DeactivateProductIsError &&
//         setFailedText(
//           role === "superadmin"
//             ? Messages.PRODUCT_DEACTIVATE_FAILED
//             : Messages.ADMIN_PRODUCT_DEACTIVATE_FAILED
//         );
//       setFailed(true);
//     }
//     // reset()
//   }, [
//     ActivateProductIsError,
//     ActivateProductIsSuccess,
//     DeactivateProductIsError,
//     DeactivateProductIsSuccess,
//   ]);

//   // Update the useEffect that watches `tableData` to update the `reqData` state with the fetched data
//   useEffect(() => {
//     if (getIsSuccess) {
//       initialLoad.current = true;
//       const res = tableData?.data?.results;
//       if (!tableData?.data?.next) {
//         setHasMore(false);
//       } else {
//         setHasMore(true);
//       }
//       // When fetching the first page, reset the reqData state with the new data
//       if (currentPage === 1) {
//         setProductData(res);
//         setPageParams({
//           ...pageParams,
//           count: tableData?.data?.count,
//           limit: pageParams.limit,
//         });
//       } else {
//         initialLoad.current = true;
//         // When fetching subsequent pages, concatenate the new data to the existing data
//         setProductData([...branchData, ...res]);
//       }
//     }
//   }, [tableData, currentPage, getIsSuccess]);

//   useEffect(() => {
//     branchData && setDownloadData([...branchData]);

//     return () => {
//       setDownloadData([]);
//     };
//   }, [branchData]);
//   // Fetch more data when the user reaches the end of the page
//   function fetchMoreData() {
//     if (branchData.length === pageParams?.count) {
//       setHasMore(false);
//     }
//     if (hasMore) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   }

//   return (
//     <section className="w-full overflow-auto h-full">
//       {isProductView && (
//         <ProductDetail
//           handleClick={(e, item) =>
//             handleClick(
//               e,
//               item,
//               setConfirmText,
//               setSubText,
//               setDetail,
//               setStatType,
//               setIsConfirmOpen,
//               setProductView
//             )
//           }
//           detail={detail}
//           isOpen={isProductView}
//           setIsOpen={setProductView}
//         />
//       )}
//       <InfiniteScroll
//         dataLength={branchData?.length}
//         next={fetchMoreData}
//         hasMore={hasMore}
//         loader={""}
//       >
//         <div className="w-full min-h-[500px] max-h-[700px] overflow-auto">
//           <table className="w-full relative">
//             <thead
//               className={`${
//                 branchData?.length > 0 ? "sticky" : "relative"
//               } top-0 bg-white border-b border-[#C2C9D1]/30 z-[10]`}
//             >
//               <tr>
//                 {ProductTableHeaders.map(({ text, hasFilter }) => (
//                   <th
//                     key={text}
//                     className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none border-b border-[#C2C9D1]/30 whitespace-nowrap"
//                   >
//                     <div className="relative flex items-center gap-x-20 justify-between">
//                       <span className="relative">{text}</span>

//                       {hasFilter && (
//                         <span>
//                           {text.toLowerCase() === "state" && (
//                             <MultiSelect
//                               options={ActiveFilterOptions}
//                               setSelectedOptions={setSelectedOptions}
//                               selectedOptions={selectedOptions}
//                             >
//                               <span className="w-4 h-4 flex items-center justify-center">
//                                 <BsFunnel />
//                               </span>
//                             </MultiSelect>
//                           )}
//                           {text.toLowerCase() === "updated on" && (
//                             <DateSelect
//                               options={DateFilterOptions}
//                               startDate={startDate}
//                               setStartDate={setStartDate}
//                               endDate={endDate}
//                               setEndDate={setEndDate}
//                               duration={duration}
//                               setDuration={setDuration}
//                             >
//                               <span className="w-4 h-4 flex items-center justify-center">
//                                 <BsFunnel />
//                               </span>
//                             </DateSelect>
//                           )}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             {branchData?.length > 0 && !isLoading && (
//               <tbody>
//                 {branchData.map((item: any, index) => (
//                   <tr
//                     key={item.id + index}
//                     className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
//                   >
//                     <td className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate">
//                       <span className="relative">{item.name} </span>
//                     </td>
//                     <td className="text-base font-medium text-[#636363] px-4 py-5  uppercase">
//                       {item.code}
//                     </td>
//                     <td className="text-base font-medium text-[#636363] px-4 py-5  max-w-[284px] truncate capitalize">
//                       {item?.city}, {item?.state}, {item?.country}
//                     </td>
//                     <td className="text-base font-medium text-[#636363] px-4 py-5  max-w-[284px] truncate">
//                       {item.description || "-"}
//                     </td>

//                     <td className="text-base font-medium text-[#636363] px-4 py-5">
//                       <span
//                         className={`font-medium px-2 py-[1px] rounded capitalize relative ${handleColorState(
//                           item.status
//                         )}`}
//                       >
//                         {handleProductUserView(item.status)}
//                       </span>
//                     </td>
//                     <td className="text-base font-medium text-[#636363] px-4 py-5">
//                       {moment(item.updated_at).format("lll")}
//                     </td>

//                     <td className=" px-4 py-6">
//                       <DropdownButton
//                         options={handleDropdown(
//                           item.status,
//                           isChecker,
//                           DropDownOptions,
//                           setOptionsByStatus,
//                           item.islocked,
//                           permissions
//                         )}
//                         handleClick={(e: any) =>
//                           handleClick(
//                             e,
//                             item,
//                             setConfirmText,
//                             setSubText,
//                             setDetail,
//                             setStatType,
//                             setIsConfirmOpen,
//                             setProductView
//                           )
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             )}
//           </table>

//           {isLoading && <BottomBarLoader />}
//           {!branchData?.length && !isLoading && (
//             <div className="text-sm text-center p-10 opacity-80">
//               No data available
//             </div>
//           )}
//         </div>
//       </InfiniteScroll>
//       {isConfirmOpen && (
//         <Confirm
//           text={confirmText}
//           subtext={subText}
//           isOpen={isConfirmOpen}
//           setIsOpen={setIsConfirmOpen}
//           onConfirm={() =>
//             handleConfirm(
//               setIsConfirmOpen,
//               statType,
//               setIsDeactivationOpen,
//               activateProduct,
//               detail,
//               navigate
//             )
//           }
//         />
//       )}
//       {isSuccessOpen && (
//         <Success
//           text={successText}
//           isOpen={isSuccessOpen}
//           setIsOpen={setIsSuccessOpen}
//         />
//       )}
//       {isFailed && (
//         <Failed
//           text={failedText}
//           subtext={failedSubText}
//           canRetry
//           isOpen={isFailed}
//           setIsOpen={setFailed}
//         />
//       )}
//       <Loader
//         isOpen={ActivateProductLoading || DeactivateProductLoading}
//         text="Submitting"
//         setIsOpen={function (e: any): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       {isDeactivationOpen && (
//         <DeactivationRequest
//           isOpen={isDeactivationOpen}
//           setIsOpen={setIsDeactivationOpen}
//           detail={detail}
//           onConfirm={() =>
//             handleDeactivationRequest(detail, deactivateProduct, reason)
//           }
//           setReason={setReason}
//         />
//       )}
//     </section>
//   );
// }

// export default ProductTable;
