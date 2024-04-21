import React, { useContext, useEffect, useState } from "react";
import {
    ProcessingStatusSlider,
    ActivityLog,
    Actions,
    MiniTermDepositDetail,
    BookingDetail,
    ReviewStatus,
    InvestmentCalculation,
} from "@app/components/summary";
import { Breadcrumbs, Loader, Button } from "@app/components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    useModifyInvestmentMutation,
    useModifyInvestmentRequestMutation,
    useCreateInvestmentMutation,
    useGetGlClassQuery,
    useGetAccountsQuery,
    useGetSecurityPurchaseRequestActivityLogQuery,
    useGetSecurityPurchaseActivityLogQuery,
} from "@app/api";
import { Confirm, Failed, Success } from "@app/components/modals";

import { Messages, Prompts } from "@app/constants/enums";
import { AppContext } from "@app/utils";
import { summaryLinks } from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import moment from "moment";
import { interestCapitalizationMethodOptions, intervalOptions } from "./FacilityDetails";
export function Container({ children }) {
    return (
        <div className="rounded-[10px] border border-[#EEE] px-12 py-10">
            {children}
        </div>
    );
}

export const handleSuccessMessage = (
    isSuccess,
    setSuccessText,
    setIsSuccessOpen,
    setSubText,
    role,
    text = "",
    process,
    investmentType
) => {
    setSuccessText(
        role === "superadmin"
            ? process === "create"
                ? Messages.BOOKING_CREATE_SUCCESS
                : Messages.BOOKING_MODIFY_SUCCESS
            : Messages.ADMIN_BOOKING_CREATE_SUCCESS
    )
    if (text) {
        setSubText(text);
    }
    setIsSuccessOpen(true);
};

export const handleErrorMessage = (
    error,
    modifyError,
    modifyRequestError,
    isError,
    setFailedText,
    setFailedSubtext,
    setFailed
) => {
    setFailedText(
        isError
            ? Messages.ADMIN_BOOKING_CREATE_FAILED
            : Messages.ADMIN_BOOKING_MODIFY_FAILED
    );
    setFailedSubtext(
        error?.message?.message ||
        modifyError?.message?.message ||
        modifyRequestError?.message?.message ||
        error?.message?.Message ||
        modifyError?.message?.Message ||
        modifyRequestError?.message?.Message
    );
    setFailed(true);
};

export const cancelProcess = (process, setConfirmText, setIsConfirmOpen) => {
    if (process === "create") {
        setConfirmText(Prompts.CANCEL_INVESTMENT_CREATION);
    }
    if (process === "modify" || process === "withdraw_modify") {
        setConfirmText(Prompts.CANCEL_INVESTMENT_MODIFICATION);
    }
    if (process === "verdict" || process === "continue") {
        setConfirmText(Prompts.CANCEL_PROCESS);
    }
    setIsConfirmOpen(true);
    return;
};

export const submitForm = (
    formData,
    modifyProduct,
    modifyRequest,
    createRequest,
    process,
    id,
    previousData,
    investmentType
) => {
    if (process === "modify") {
        modifyProduct({
            ...formData,
            isDraft: false,
            id,
            recentlyUpdatedMeta: previousData ? JSON.stringify(previousData) : null, investmentType
        });
    }
    if (
        process === "withdraw_modify" ||
        process === "continue" ||
        (process === "create" && formData?.id)
    ) {
        modifyRequest({
            ...formData,
            isDraft: false,
            id: formData.id || id,
            recentlyUpdatedMeta: previousData ? JSON.stringify(previousData) : null,
            investmentType
        });
    }

    if ((process === "create" || process === "clone") && !formData?.id) {
        createRequest({ ...formData, isDraft: false, investmentType });
    }

    // navigate(paths.INVESTMENT_DASHBOARD);
};

export default function ({
    formData,
    productDetail,
    previousData = null,
}: any) {
    const { role, currencies } = useContext(AppContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { investmentType, process } = useParams();
    const id = searchParams.get("id");
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [successText, setSuccessText] = useState("");
    const [subText, setSubText] = useState("");
    const [failedSubText, setFailedSubtext] = useState("");
    const [isFailed, setFailed] = useState(false);
    const [failedText, setFailedText] = useState("");
    const [state, setState] = useState();
    const [entriesData, setEntriesData] = useState(null);

    const { data: activityData, isLoading: activityIsLoading } =
        useGetSecurityPurchaseActivityLogQuery({ id: id }, { skip: !id });
    const { data: activityRequestData, isLoading: activityRequestIsLoading } =
        useGetSecurityPurchaseRequestActivityLogQuery(
            { id: id },
            { skip: !id }
        );
    const [
        createRequest,
        { isLoading: createRequestLoading, isSuccess, isError, reset, error, data: reqData },
    ] = useCreateInvestmentMutation();

    const { data: glClass, isLoading } = useGetGlClassQuery();


    const {
        data: ledgerData,
        isFetching: ledgerIsLoading,
        isSuccess: ledgerIsSuccess,
        isError: ledgerIsError,
        refetch,
    } = useGetAccountsQuery(
        {
            Q: "",
            currencyCode: formData?.facilityDetailsModel?.currencyCode,
        }
    );

    const [
        modifyProduct,
        {
            isLoading: modifyLoading,
            isSuccess: modifySuccess,
            isError: modifyIsError,
            error: modifyError,
        },
    ] = useModifyInvestmentMutation();
    const [
        modifyRequest,
        {
            isLoading: modifyRequestLoading,
            isSuccess: modifyRequestSuccess,
            isError: modifyRequestIsError,
            error: modifyRequestError,
        },
    ] = useModifyInvestmentRequestMutation();

    const handleModify = () => {
        navigate(-1);
    };
    const handleCancel = () =>
        cancelProcess(process, setConfirmText, setIsConfirmOpen);

    const handleSubmit = () =>
        submitForm(
            formData,
            modifyProduct,
            modifyRequest,
            createRequest,
            process,
            id,
            previousData,
            investmentType
        );
    useEffect(() => {
        if (isSuccess || modifySuccess || modifyRequestSuccess) {
            let text;
            if (investmentType === "security-purchase") {
                text = reqData?.message || "Good"
            }
            else if (process === "create" && role === "superadmin") {
                text = `${currencyFormatter(
                    formData?.facilityDetailsModel?.principal,
                    handleCurrencyName(productDetail?.productInfo?.currency, currencies)
                )} will be deducted from ${formData?.transactionSettingModel?.accountForLiquidation
                    }, once approval is granted`;
                setSubText(text);
            }

            handleSuccessMessage(
                isSuccess,
                setSuccessText,
                setIsSuccessOpen,
                setSubText,
                role,
                text,
                process,
                investmentType
            );
        }

        if (isError || modifyIsError || modifyRequestIsError) {
            handleErrorMessage(
                error,
                modifyError,
                modifyRequestError,
                isError,
                setFailedText,
                setFailedSubtext,
                setFailed
            );
        }
    }, [
        isSuccess,
        isError,
        error,
        modifySuccess,
        modifyIsError,
        modifyError,
        modifyRequestError,
        modifyRequestIsError,
        modifyRequestSuccess,
    ]);



    const links = [
        {
            id: 1,
            title: "Investment Management",
            url: "/investment-management/overview",
        },
        {
            id: 2,
            title: "book new Investment",
            url: "/investment-management/individual",
        },
        {
            id: 3,
            title: investmentType,
            url: `/investment-management/${investmentType}`,
        },
        {
            id: 4,
            title: "Process summary",
            url: "#",
        },
    ];
    return (
        <div data-testid="preview" className="flex flex-col min-h-[100vh] ">
            <div className="px-[37px] py-[11px] bg-white">
                <h1 className="text-[#747373] text-[24px] font-bold mb-7 uppercase">
                    Process summary
                </h1>
                <Breadcrumbs
                    links={links.map((i) =>
                        i.id === 3 ? { ...i, title: investmentType } : i
                    )}
                />
            </div>{" "}
            <div className="w-full flex gap-6 h-full px-[37px] py-[30px] bg-[#F7F7F7]">
                <div className="flex-1   bg-[#ffffff] rounded-md px-[100px] pt-[54px] pb-[49px] flex flex-col gap-5">
                    <div className="max-h-[600px] overflow-y-auto flex flex-col gap-5">
                        <ProcessingStatusSlider
                            rangeLabels={["Pending submission", "Approved"]}
                            rightClass="opacity-50"
                        />
                        {process === "preview" && (
                            <ReviewStatus status={"r"} reason={"r"} type={""} text="failed" />
                        )}
                        <Container>
                            <div>
                                <h3 className="text-[#636363] text-[18px] font-semibold mb-[56px]">
                                    Security Purchase Details
                                </h3>
                                <div className="grid gap-y-[56px]">
                                    <div className="flex flex-col">
                                        <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
                                            Facility Details
                                        </h4>
                                        <div className="grid grid-cols-1 gap-[25px] px-12">
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Money Market Category
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    {productDetail.facilityDetailsModel?.category || ' - '}
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Issuer
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    {productDetail.facilityDetailsModel?.issuer || ' - '}
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Description
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {productDetail.facilityDetailsModel?.description || ' - '}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Deal Date
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {moment(productDetail.facilityDetailsModel?.dealDate).format(
                                                            "DD MMM YYYY"
                                                        )}{" "}
                                                        -{" "}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Maturity Date
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {moment(productDetail.facilityDetailsModel?.maturityDate).format(
                                                            "DD MMM YYYY"
                                                        )}{" "}
                                                        -{" "}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Currency
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {handleCurrencyName(productDetail.facilityDetailsModel?.currency, currencies)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Discount Rate
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {productDetail.facilityDetailsModel?.discountRate || '-'}
                                                        {productDetail.facilityDetailsModel?.discountRate && "%"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Face Value
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {handleCurrencyName(productDetail.facilityDetailsModel?.currency, currencies)}
                                                        {productDetail.facilityDetailsModel?.faceValue || '-'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Total Consideration
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {productDetail.facilityDetailsModel?.totalConsideration}
                                                        {handleCurrencyName(productDetail.facilityDetailsModel?.currency, currencies)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Interest Capitalization Method
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    <span className="">
                                                        {
                                                            interestCapitalizationMethodOptions.find(i => i.id ===
                                                                productDetail.facilityDetailsModel?.interestCapitalizationMethod)
                                                                ?.text
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                productDetail.facilityDetailsModel?.securityPurchaseIntervals &&
                                                <div className=" flex gap-[54px]">
                                                    <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                        Specify Interval
                                                    </div>
                                                    <div className="w-full text-base font-normal text-[#636363]">
                                                        <span className="">
                                                            {productDetail.facilityDetailsModel?.securityPurchaseIntervals}
                                                            {
                                                                intervalOptions.find(i => i.id ===
                                                                    productDetail.facilityDetailsModel?.securityPurchaseIntervals)
                                                                    ?.text
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-y-[56px] mt-[56px]">
                                    <div className="flex flex-col">
                                        <h4 className="text-[#636363] text-[16px] font-medium mb-[27px]">
                                            Account Entries
                                        </h4>
                                        <div className="grid grid-cols-1 gap-[25px] px-12">
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    Credit Ledger
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    {ledgerData?.value?.items?.find(i => i.accountNo === productDetail.accountingEntries?.creditLedger)?.accountName || " - "}
                                                </div>
                                            </div>
                                            <div className=" flex gap-[54px]">
                                                <div className="w-[300px]   text-base font-medium text-[#636363]">
                                                    DebitLedger
                                                </div>
                                                <div className="w-full text-base font-normal text-[#636363]">
                                                    {ledgerData?.value?.items?.find(i => i.accountNo === productDetail.accountingEntries?.debitLedger)?.accountName || " - "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <Actions
                        handleCancel={handleCancel}
                        handleModify={handleModify}
                        handleSubmit={handleSubmit}
                    />
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
            {isSuccessOpen && (
                <Success
                    text={successText}
                    isOpen={isSuccessOpen}
                    setIsOpen={setIsSuccessOpen}
                    canCreate={process === "create"}
                    subtext={subText}
                />
            )}
            {isConfirmOpen && (
                <Confirm
                    text={confirmText}
                    subtext={subText}
                    isOpen={isConfirmOpen}
                    setIsOpen={setIsConfirmOpen}
                    onConfirm={() => {
                        setIsConfirmOpen(false);
                        navigate(
                            `/investment-management/${investmentType}?category=requests`
                        );
                    }}
                    onCancel={() => {
                        setIsConfirmOpen(false);
                    }}
                />
            )}
            {isFailed && (
                <Failed
                    text={failedText}
                    subtext={failedSubText}
                    isOpen={isFailed}
                    setIsOpen={setFailed}
                    canRetry
                />
            )}
            <Loader
                isOpen={createRequestLoading || modifyLoading || modifyRequestLoading}
                text={"Submitting"}
            />
        </div>
    );
}
