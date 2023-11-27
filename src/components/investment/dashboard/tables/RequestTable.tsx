// import React, { useState, useContext, useEffect, useRef } from "react";

// import { BsFunnel } from "react-icons/bs";
// import { FaBars, FaEye } from "react-icons/fa";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

// import {
//   RequestTableHeaders,
//   StatusFilterOptions,
//   CheckerStatusFilterOptions,
//   TypeFilterOptions,
//   DateFilterOptions,
// } from "../../../../constants";

// import DropDown from "../../../DropDown";
// import Button from "../../../Button";
// import { MultiSelect, ComboSelect, DateSelect } from "../../../forms";
// import { Confirm, DeactivationRequest, Failed, Success } from "../../../modals";
// import {
//   useGetRequestsMutation,
//   useDeleteRequestMutation,
// } from "../../../../api";
// import { AppContext, InvestmentContext } from "@app/utils/context";
// import { getRequestType } from "@app/utils/requestType";
// import { toast } from "react-toastify";
// import Loader from "@app/components/Loader";
// import BottomBarLoader from "@app/components/BottomBarLoader";
// import { removeNullEmptyKeys } from "@app/utils/removeNullFromObj";
// import { handleColorState, handleDropdown, handleUserView } from "@app/utils";
// import { Messages, Prompts } from "@app/constants/enums";

// export function handleReviewNav(item: any, navigate) {
//   if (item.request_type === "BULK_CREATE") {
//     navigate(
//       `/branch-management/bulk-branch-creation-review/${item.id}/review`
//     );
//     return;
//   }
//   if (item.request_type === "CREATE") {
//     navigate(`/branch-management/branch-creation-review/${item.id}/review`);
//     return;
//   }
//   if (item.request_type === "DEACTIVATE") {
//     navigate(`/branch-management/branch-deactivation-review/${item.id}/review`);
//     return;
//   }
//   if (item.request_type === "CHANGE") {
//     navigate(`/branch-management/branch-modification-review/${item.id}/review`);
//     return;
//   }
//   navigate(`/branch-management/branch-creation-review/${item.id}/review`);
// }

// export function handleViewNav(item: any, navigate) {
//   if (item.request_type === "BULK_CREATE") {
//     const routeState = "Bulk Branch Creation Review";
//     navigate(
//       `/branch-management/bulk-branch-creation-view/summary/${item.id}/view?status=show`,
//       { state: routeState }
//     );
//     return;
//   }
//   if (item.request_type === "CREATE") {
//     const routeState = "Branch Creation Review";
//     navigate(
//       `/branch-management/branch-creation-view/summary/${item.id}/view`,
//       {
//         state: routeState,
//       }
//     );
//     return;
//   }

//   navigate(
//     `/branch-management/branch-modification-view/summary/${item.id}/view_only`
//   );
// }

// export function handleClick(
//   e: any,
//   item: any,
//   setConfirmText,
//   setIsConfirmOpen,
//   setSubText,
//   setStatType,
//   setDetail,
//   navigate
// ) {
//   setConfirmText("");
//   setSubText("");
//   setStatType(e.toLowerCase());
//   setDetail(item);

//   if (e.toLowerCase() === "view") {
//     navigate(
//       `/branch-management/request/summary/${item.id}/view?${
//         item.meta && item?.meta?.name ? `oldvalue=${item?.meta.name}` : ""
//       }${
//         item?.request_type?.toLowerCase() === "create" &&
//         item?.status?.toLowerCase() === "p"
//           ? "&state=pending-creation-view"
//           : ""
//       }`
//     );
//   }
//   if (e.toLowerCase() === "withdraw & delete request") {
//     setConfirmText(Prompts.BRANCH_WITHDRAW_DELETE);

//     setIsConfirmOpen(true);
//   }
//   if (e.toLowerCase() === "delete request") {
//     setConfirmText(Prompts.BRANCH_DELETE);

//     setIsConfirmOpen(true);
//   }
//   if (e.toLowerCase() === "withdraw & modify") {
//     setConfirmText(Prompts.BRANCH_WITHDRAW_MODIFY);
//     setIsConfirmOpen(true);
//   }
//   if (e.toLowerCase() === "continue request" || e.toLowerCase() === "modify") {
//     navigate(
//       `/branch-management/request/continue/${
//         item?.request_type.toLowerCase().includes("create")
//           ? "request_create"
//           : "request_modify"
//       }/${item?.request_type === "BULK_CREATE" ? "bulk" : "single"}/${
//         item?.id
//       }/${item?.branches[0]?.id}?type=${e.toLowerCase() === "modify" ? "issue" : "draft"}&branchId=${item?.branches[0]?.id}`
//     );
//   }
// }
// export function handleDeactivationRequest(
//   setSuccessText,
//   setIsDeactivationOpen,
//   setIsSuccessOpen,
//   role
// ) {
//   setSuccessText(
//     role === "superadmin"
//       ? Messages.BRANCH_DEACTIVATE_SUCCESS
//       : Messages.ADMIN_BRANCH_DEACTIVATE_SUCCESS
//   );
//   setIsDeactivationOpen(false);
//   setIsSuccessOpen(true);
// }
// export function handleConfirm(
//   statType,
//   setIsConfirmOpen,
//   deleteRequest,
//   setSuccessText,
//   navigate,
//   detail
// ) {
//   setIsConfirmOpen(false);
//   if (statType === "withdraw & delete request") {
//     deleteRequest(detail?.id);

//     setSuccessText(Messages.BRANCH_WITHDRAW_DELETE_SUCCESS);
//   }
//   if (statType === "delete request") {
//     deleteRequest(detail?.id);
//     setSuccessText(Messages.BRANCH_DELETE_SUCCESS);
//   }
//   if (statType === "withdraw & modify") {
//     navigate(
//       `/branch-management/request/modify/${
//         detail?.request_type === "BULK_CREATE" ? "bulk" : "single"
//       }/${detail?.id}/${detail?.branches[0]?.id}?type=pending`
//     );
//   }
// }

// export default function RequestTable({
//   refresh,
//   setDownloadData,
//   setRefresh,
// }: {
//   refresh: boolean;
//   setDownloadData: (e: any) => void;
//   setRefresh?: (e: any) => void;
// }): React.JSX.Element {
//   interface RequestDataProps {
//     [x: string]: any;
//     branches: any;
//     name: any;
//     id: any;
//     request: string;
//     type: string;
//     initiator: string;
//     status: string;
//     updatedOn: Date;
//     request_type: string;
//   }
//   const navigate = useNavigate();
//   const [reason, setReason] = useState("");
//   const {
//     isChecker,
//     selected,
//     search,
//     status,
//     setRefreshing,
//     isRefreshing,
//     role,
//   } = useContext(InvestmentContext);
//   const { permissions } = useContext(AppContext);
//   const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
//   const [selectedType, setSelectedType] = useState<any[]>([]);
//   const [sinitiator, setInitiator] = useState<any[]>([]);
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
//   const [confirmText, setConfirmText] = useState("");
//   const [subText, setSubText] = useState("");
//   const [successText, setSuccessText] = useState("");
//   const [isFailed, setFailed] = useState(false);
//   const [failedSubText, setFailedSubtext] = useState("");
//   const [failedText, setFailedText] = useState("");
//   const [statType, setStatType] = useState("");
//   const [detail, setDetail] = useState<RequestDataProps | null>(null);
//   const [filteredRequestHeader, setFilteredRequestHeader] = useState<any>([]);
//   const [reqData, setReqData] = useState([]);
//   const [hasMore, setHasMore] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [duration, setDuration] = useState<{
//     id: number;
//     name: string;
//     value: number;
//   } | null>(null);
//   const [pageParams, setPageParams] = useState<any>({
//     count: 0,
//     limit: 15,
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const [queryParams, setQueryParams] = useState({
//     page: 1,
//     page_size: 15,
//     filter_by: "created_by_me",
//     status__in: [],
//     request_type__in: [],
//     start_date: null,
//     end_date: null,
//     initiator: [],
//     q: "",
//   });

//   // Fetch more data when the user reaches the end of the page
//   function fetchMoreData() {
//     if (reqData.length === pageParams?.count) {
//       setHasMore(false);
//     }
//     // Increment the page number
//     if (hasMore) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   }

//   const [
//     getRequests,
//     { data: requestsData, isLoading, isSuccess: getIsSuccess },
//   ] = useGetRequestsMutation();

//   function fetchData(page) {
//     getRequests({ ...removeNullEmptyKeys(queryParams), page });
//   }

//   const [
//     deleteRequest,
//     {
//       isSuccess: deleteIsSuccess,
//       isError: deleteIsError,
//       error: deleteError,
//       isLoading: deleteLoading,
//     },
//   ] = useDeleteRequestMutation();

//   const requestLoad = useRef(false);

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     if (!requestLoad.current) return;
//     if (currentPage === 1) {
//       fetchData(1);
//     } else {
//       setCurrentPage(1);
//     }
//   }, [queryParams]);

//   useEffect(() => {
//     if (!requestLoad.current) return;

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
//     if (getIsSuccess) {
//       requestLoad.current = true;
//       const res = requestsData?.data?.results;

//       if (!requestsData?.data?.next || reqData.length === pageParams?.count) {
//         setHasMore(false);
//       } else {
//         setHasMore(true);
//       }

//       // When fetching the first page, reset the reqData state with the new data
//       if (currentPage === 1) {
//         setReqData(res);
//         setPageParams({
//           ...pageParams,
//           count: requestsData?.data?.count,
//           page_size: pageParams.limit,
//         });
//       } else {
//         // When fetching subsequent pages, concatenate the new data to the existing data
//         setReqData([...reqData, ...res]);
//         requestLoad.current = true;
//       }
//     }
//   }, [requestsData, currentPage, getIsSuccess]);

//   useEffect(() => {
//     reqData && setDownloadData([...reqData]);

//     return () => {
//       setDownloadData([]);
//     };
//   }, [reqData]);

//   useEffect(() => {
//     if (deleteIsSuccess) {
//       fetchData(1);
//       setRefreshing(!isRefreshing);
//       setIsSuccessOpen(true);
//     }
//     if (deleteIsError) {
//       statType === "delete request"
//         ? setFailedText(
//             `${Messages.BRANCH_DELETE_FAILED} ${detail?.description} request`
//           )
//         : setFailedText(
//             `${Messages.BRANCH_WITHDRAW_DELETE_FAILED} ${detail?.description} request`
//           );
//       setFailedSubtext(deleteError?.message?.Msg);
//       setFailed(true);
//     }
//   }, [deleteIsError, deleteIsSuccess]);

//   useEffect(() => {
//     const initiator = RequestTableHeaders.filter((i) => i.text !== "reviewer");
//     const reviewer = RequestTableHeaders.filter((i) => i.text !== "initiator");

//     setFilteredRequestHeader(!isChecker ? initiator : reviewer);
//   }, [isChecker]);

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
//     setReqData([]);
//     setQueryParams({
//       ...queryParams,
//       initiator: sinitiator,
//       status__in: selectedStatus?.map((i) => i.value) || [],
//       q: search || "",
//       filter_by: selected?.value || "",
//       request_type__in: selectedType?.map((i) => i.value) || [],
//       start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
//       end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
//     });
//   }, [
//     selected,
//     search,
//     selectedType,
//     selectedStatus,
//     sinitiator,
//     startDate,
//     endDate,
//   ]);
//   useEffect(() => {
//     setReqData([]);
//     setQueryParams({
//       ...queryParams,

//       status__in: status ? [status] : [],
//     });
//   }, [status]);

//   return (
//     <section className="w-full">
//       <div className="">
//         <div className="">
//           <InfiniteScroll
//             dataLength={reqData?.length}
//             next={fetchMoreData}
//             hasMore={hasMore}
//             loader={""}
//           >
//             <div className="w-full overflow-auto min--h-[500px] max-h-[700px]">
//               <table className="w-full relative">
//                 <thead
//                   className={`${
//                     reqData?.length > 0 ? "sticky" : "relative"
//                   } top-0 bg-white border-b border-[#C2C9D1]/30 z-[10]`}
//                 >
//                   <tr>
//                     {filteredRequestHeader?.map(
//                       (item: { text: string; hasFilter: boolean }) => (
//                         <th
//                           key={item.text}
//                           className="border-b border-[#C2C9D1]/30 last-of-type:border-none relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 after:content-[''] after:w-1 after:h-[18px] after:absolute after:border-r after:left-0 after:top-1/2 after:translate-y-[-50%] after:border-[#AAAAAA]/75 first-of-type:after:content-none last-of-type:after:content-none  whitespace-nowrap"
//                         >
//                           <div className="flex items-center gap-x-20 justify-between">
//                             <span className="relative">{item.text} </span>

//                             {item.hasFilter && (
//                               <span>
//                                 {item.text.toLowerCase() === "status" && (
//                                   <MultiSelect
//                                     options={
//                                       isChecker
//                                         ? CheckerStatusFilterOptions
//                                         : StatusFilterOptions
//                                     }
//                                     setSelectedOptions={setSelectedStatus}
//                                     selectedOptions={selectedStatus}
//                                   >
//                                     <span className="w-4 h-4 flex items-center justify-center">
//                                       <BsFunnel />
//                                     </span>
//                                   </MultiSelect>
//                                 )}
//                                 {item.text.toLowerCase() === "type" && (
//                                   <MultiSelect
//                                     options={TypeFilterOptions}
//                                     setSelectedOptions={setSelectedType}
//                                     selectedOptions={selectedType}
//                                   >
//                                     <span className="w-4 h-4 flex items-center justify-center">
//                                       <BsFunnel />
//                                     </span>
//                                   </MultiSelect>
//                                 )}
//                                 {item.text.toLowerCase() === "initiator" && (
//                                   <ComboSelect
//                                     setSelOptions={setInitiator}
//                                     selOptions={sinitiator}
//                                   >
//                                     <span className="w-4 h-4 flex items-center justify-center">
//                                       <BsFunnel />
//                                     </span>
//                                   </ComboSelect>
//                                 )}
//                                 {item.text.toLowerCase() === "reviewer" && (
//                                   <ComboSelect
//                                     setSelOptions={setInitiator}
//                                     selOptions={sinitiator}
//                                   >
//                                     <span className="w-4 h-4 flex items-center justify-center">
//                                       <BsFunnel />
//                                     </span>
//                                   </ComboSelect>
//                                 )}
//                                 {item.text.toLowerCase() === "updated on" && (
//                                   <DateSelect
//                                     options={DateFilterOptions}
//                                     startDate={startDate}
//                                     setStartDate={setStartDate}
//                                     endDate={endDate}
//                                     setEndDate={setEndDate}
//                                     duration={duration}
//                                     setDuration={setDuration}
//                                   >
//                                     <span className="w-4 h-4 flex items-center justify-center">
//                                       <BsFunnel />
//                                     </span>
//                                   </DateSelect>
//                                 )}
//                               </span>
//                             )}
//                           </div>
//                         </th>
//                       )
//                     )}
//                   </tr>
//                 </thead>

//                 {reqData?.length > 0 && !isLoading && (
//                   <tbody className="z-10">
//                     {reqData?.map((item: any, index: number) => (
//                       <tr
//                         key={item.id + index}
//                         className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
//                       >
//                         <td className="text-base font-medium text-[#636363] px-4 py-5  capitalize max-w-[290px] truncate  min-w-[200px]">
//                           <span className="relative">{item.description}</span>
//                         </td>
//                         <td className="text-base font-medium text-[#636363] px-4 py-5  capitalize">
//                           {getRequestType(item.request_type)}
//                         </td>
//                         <td className="text-base font-medium text-[#636363] px-4 py-5  max-w-[284px] truncate capitalize">
//                           {!isChecker
//                             ? item.created_by
//                             : item.treated_by || "-"}
//                         </td>
//                         <td className="text-base font-medium text-[#636363] px-4 py-5 ">
//                           <span
//                             onClick={() => handleViewNav(item, navigate)}
//                             className={`font-medium px-2 py-[1px] rounded capitalize relative flex gap-x-[6px] cursor-pointer items-center max-w-max ${handleColorState(
//                               item.status
//                             )}`}
//                           >
//                             {handleUserView(item.status, isChecker)}
//                             <FaEye />
//                           </span>
//                         </td>
//                         <td className="text-base font-medium text-[#636363] px-4 py-5 ">
//                           {moment(item.updated_at).format("lll")}
//                         </td>

//                         <td className="px-4 py-2">
//                           {!isChecker ? (
//                             <DropDown
//                               options={handleDropdown(
//                                 item.status,
//                                 item.request_type,
//                                 permissions
//                               )}
//                               handleClick={(e) =>
//                                 handleClick(
//                                   e,
//                                   item,
//                                   setConfirmText,
//                                   setIsConfirmOpen,
//                                   setSubText,
//                                   setStatType,
//                                   setDetail,
//                                   navigate
//                                 )
//                               }
//                             >
//                               <FaBars className="text-sterling-red-800" />
//                             </DropDown>
//                           ) : (
//                             <>
//                               {item?.status.toLowerCase() == "p" ? (
//                                 <Button
//                                   onClick={() =>
//                                     handleReviewNav(item, navigate)
//                                   }
//                                   className="px-[7px] py-[6px] text-sm font-normal bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] text-[#636363]"
//                                 >
//                                   Review
//                                 </Button>
//                               ) : (
//                                 <Button
//                                   onClick={() => handleViewNav(item, navigate)}
//                                   className="px-[7px] py-[6px] text-sm font-normal bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] text-[#636363]"
//                                 >
//                                   View
//                                 </Button>
//                               )}
//                             </>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 )}
//               </table>
//               {isLoading && <BottomBarLoader />}
//               {!reqData?.length && !isLoading && (
//                 <div className="text-sm text-center p-10 opacity-80">
//                   No data available
//                 </div>
//               )}
//             </div>
//           </InfiniteScroll>
//         </div>
//       </div>
//       <Loader isOpen={deleteLoading} text="Submitting" />
//       {isConfirmOpen && (
//         <Confirm
//           text={confirmText}
//           subtext={subText}
//           isOpen={isConfirmOpen}
//           setIsOpen={setIsConfirmOpen}
//           onConfirm={() =>
//             handleConfirm(
//               statType,
//               setIsConfirmOpen,
//               deleteRequest,
//               setSuccessText,
//               navigate,
//               detail
//             )
//           }
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
//       {isSuccessOpen && (
//         <Success
//           text={successText}
//           isOpen={isSuccessOpen}
//           setIsOpen={setIsSuccessOpen}
//         />
//       )}
//       {isDeactivationOpen && (
//         <DeactivationRequest
//           isOpen={isDeactivationOpen}
//           setIsOpen={setIsDeactivationOpen}
//           detail={detail}
//           onConfirm={() =>
//             handleDeactivationRequest(
//               setSuccessText,
//               setIsDeactivationOpen,
//               setIsSuccessOpen,
//               role
//             )
//           }
//           setReason={setReason}
//         />
//       )}
//     </section>
//   );
// }
