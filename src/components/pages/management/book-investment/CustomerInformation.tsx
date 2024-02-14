import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { InputDivs } from "@app/components/pages/term-deposit/forms/accounting-entries-and-events";
import { FormUpload } from "@app/components/forms";
import CustomerInfoCard from "./CustomerInfoCard";
import { BookingCustomerInfoSchema } from "@app/constants";
import SearchInput from "@app/components/SearchInput";
import {
  useGetCustomerSearchQuery,
  useGetAccountBalanceQuery,
  useGetCustomerProfileQuery,
} from "@app/api";
import { capitalizeFirstLetter } from "@app/utils";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { CustomerDetail } from "@app/components/modals/CustomerDetail";
import { Failed } from "@app/components/modals";
import { Messages } from "@app/constants/enums";
import BottomBarLoader from "@app/components/BottomBarLoader";
import debounce from "lodash.debounce";
export const onProceed = (
  data,
  proceed,
  formData,
  setFormData,
  preCreateInvestment,
  preModifyRequest
) => {
  console.log("🚀 ~ formData:", formData);
  if (formData?.id) {
    preModifyRequest({
      ...formData,
      customerBookingInfoModel: {
        ...formData.customerBookingInfoModel,
        ...data,
      },
      isDraft: true,
    });
  } else {
    preCreateInvestment({
      ...formData,
      customerBookingInfoModel: {
        ...formData.customerBookingInfoModel,
        ...data,
      },
      isDraft: true,
    });
  }
  setFormData({
    ...formData,
    customerBookingInfoModel: { ...formData.customerBookingInfoModel, ...data },
  });

  proceed();
};

type CustomerInformationProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
  setDisabled?: any;
  isSavingDraft?: boolean;
  preModifyRequest?: any;
  preCreateInvestment?: any;
};
export const handleSearch = (value, setAccountNumber) => {
  setAccountNumber(value);
};
export default function CustomerInformation({
  formData,
  setFormData,
  proceed,
  setDisabled,
  isSavingDraft,
  preModifyRequest,
  preCreateInvestment,
}: CustomerInformationProps) {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    setError,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(BookingCustomerInfoSchema),
    defaultValues: formData.customerBookingInfoModel,
    mode: "all",
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);
  const [customersData, setCustomersData] = useState([]);
  const [accountBalance, setAccountBalance] = useState(null);
  const [validKyc, setValidKyc] = useState(null);
  const [isKycFailed, setKycFailed] = useState(false);
  const [defaultValue, setDefaultValue] = useState(
    formData?.customerBookingInfoModel?.investmentformUrl
  );
  const values = getValues();

  const {
    data,
    isSuccess,
    isError,
    error,
    isLoading: searchLoading,
  } = useGetCustomerSearchQuery(query, { skip: query?.search?.length !== 10 || !query });

  const {
    data: profileData,
    isSuccess: profileIsSuccess,
    isError: profileIsError,
    error: profileError,
    isLoading: profileLoading,
  } = useGetCustomerProfileQuery(customerData?.customerId, {
    skip: !customerData?.customerId,
  });

  const {
    data: accountData,
    isSuccess: accountIsSuccess,
    isError: accountIsError,
    error: accountError,
    isLoading,
  } = useGetAccountBalanceQuery(accountNumber, { skip: !accountNumber });

  useEffect(() => {
    if (formData?.customerBookingInfoModel?.investmentformUrl) {
      setDefaultValue(formData?.customerBookingInfoModel?.investmentformUrl);
      setValue(
        "investmentformUrl",
        formData?.customerBookingInfoModel?.investmentformUrl
      );
    }
  }, [formData?.customerBookingInfoModel?.investmentformUrl]);

  useEffect(() => {
    if (isSuccess) {
      setCustomersData(
        data.data.map((i) => {
          return {
            id: i.customerId,
            name: i.customer_products[0]?.accountNumber,
            code: `${capitalizeFirstLetter(
              i.customer_profiles[0].firstName
            )} ${capitalizeFirstLetter(
              i.customer_profiles[0].otherNames
            )} ${capitalizeFirstLetter(i.customer_profiles[0].surname)}`,
            value: i,
          };
        })
      );
    }
  }, [isError, isSuccess, searchLoading, data]);

  useEffect(() => {
    if (accountIsSuccess) {
      setAccountBalance(accountData.data);
      setFormData({
        ...formData,
        customerBookingInfoModel: {
          ...formData.customerBookingInfoModel,
          accountStatus: accountData?.data?.status,
          currencyId: accountData?.data?.currencyId,
          customerAccountLedgerId: accountData?.data?.ledgerId,
          balance: accountData?.data?.status,
        },
      });
    }

    setValue("accountStatus", accountData?.data?.status);
    setValue("balance", parseFloat(accountData?.data?.balance));
    setValue("currencyId", accountData?.data?.currencyId);
    setValue("customerAccountLedgerId", accountData?.data?.ledgerId);

    trigger("balance");
  }, [accountIsError, accountIsSuccess, isLoading, accountData]);

  useEffect(() => {
    if (accountNumber && data) {
      const foundObject = data?.data?.find((item) => {
        return (
          item.customer_products &&
          item.customer_products.some(
            (product) => product.accountNumber === accountNumber
          )
        );
      });

      setCustomerData(foundObject);
      setFormData({
        ...formData,
        customerId: foundObject?.customerId,
        customerProfile: foundObject?.customer_profiles[0],
      });
      setValue("customerId", foundObject?.customerId);
      setValue(
        "customerName",
        `${capitalizeFirstLetter(
          foundObject?.customer_profiles[0]?.firstName
        )} ${capitalizeFirstLetter(
          foundObject?.customer_profiles[0]?.otherNames
        )} ${capitalizeFirstLetter(foundObject?.customer_profiles[0]?.surname)}`
      );
      setValue("customerAccount", accountNumber);
      setValue(
        "customerAccountLedgerId",
        foundObject?.customer_products[0]?.ledgerId
      );
      trigger("customerAccount");
    }
  }, [accountNumber, data]);

  useEffect(() => {
    setDisabled(!isValid || !validKyc);
    if (isValid) {
      setFormData({
        ...formData,
        customerBookingInfoModel: values,
      });
    }
  }, [isValid, validKyc]);

  useEffect(() => {
    if (profileIsSuccess) {
      const status =
        profileData?.data?.risk_assessments

          ?.find(
            (i) =>
              i.parameter?.toLowerCase() ===
              "status of customer identity verification"
          )
          ?.parameterOption?.toLowerCase() === "passed";

      setValidKyc(status);

      if (status === false && accountNumber && profileData) {
        setKycFailed(true);
      } else {
        setKycFailed(false);
      }
    }
  }, [profileData, profileIsSuccess]);

  useEffect(() => {
    setFormData({
      ...formData,
      customerBookingInfoModel: values,
    });
  }, [isSavingDraft]);
  useEffect(() => {
    if (formData?.customerBookingInfoModel.customerAccount) {
      setAccountNumber(formData?.customerBookingInfoModel.customerAccount);
      setQuery({
        search: formData?.customerBookingInfoModel.customerAccount,
        isAccountNumber: true,
      });
    }
  }, [formData?.customerBookingInfoModel.customerAccount]);
  return (
    <form
      id="customerInformation"
      data-testid="submit-button"
      onSubmit={handleSubmit((d) =>
        onProceed(
          d,
          proceed,
          formData,
          setFormData,
          preCreateInvestment,
          preModifyRequest
        )
      )}
    >
      {" "}
      <div className="flex flex-col gap-4 px-[30px] py-5">
        <div className="flex flex-col items-start gap-y-8">
          <InputDivs
            label={"Customer account"}
            errors={errors}
            name="customerAccount"
          >
            <div className="flex gap-[15px] items-end">
              <div className="w-[360px]">
                <SearchInput
                  setSearchTerm={debounce((e) =>  setQuery({
                    search: e,
                    isAccountNumber: true,
                  }), 800)}
                  searchResults={customersData}
                  setSearchResults={() => {}}
                  searchLoading={searchLoading}
                  handleSearch={(value) => {
                    handleSearch(value, setAccountNumber);
                  }}
                  placeholder={"Search by account number"}
                  customClass="shadow-none"
                  hideBorder
                  defaultValue={accountNumber}
                  inputType="number"
                />
              </div>
              {accountBalance && (
                <div>
                  <div className="p-[10px] max-w-max rounded-lg bg-[#F9F9F9] border border-[#EBEBEB]">
                    <span className="text-base font-medium text-[#636363]">
                      Available Bal:{" "}
                      <span className="text-base font-normal text-[#636363]">
                        {currencyFormatter(
                          accountBalance.balance,
                          accountBalance?.currency
                        )}
                      </span>
                    </span>
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="balance"
                    render={({ message }) => (
                      <p className="text-red-600 text-xs">{message}</p>
                    )}
                  />
                </div>
              )}
            </div>
          </InputDivs>
          {accountNumber && (
            <div className="w-full">
              <CustomerInfoCard
                customerData={{ ...profileData?.data, accountNumber }}
                setIsOpen={setIsOpen}
                isLoading={profileLoading || isLoading}
              />
            </div>
          )}

          <InputDivs
            label={"Customer’s investment request form"}
            errors={errors}
            name="investmentformUrl"
            isCompulsory={false}
          >
            <div className="w-[360px]">
              <FormUpload
                data-testid="input"
                accept={["pdf", "jpg", "png", "jpeg"]}
                onUploadComplete={(value) => {
                  setValue("investmentformUrl", value);
                  setFormData({
                    ...formData,
                    customerBookingInfoModel: {
                      ...formData?.customerBookingInfoModel,
                      investmentformUrl: value,
                    },
                  });
                  trigger("investmentformUrl");
                }}
                defaultValue={defaultValue}
                setDefaultValue={setDefaultValue}
              />{" "}
            </div>
          </InputDivs>
        </div>
      </div>
      {isOpen && customerData && (
        <CustomerDetail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          detail={{ ...customerData?.customer_profiles[0], accountNumber }}
        />
      )}
      {isKycFailed && !profileLoading && (
        <Failed
          text={Messages.UNABLE_TO_BOOK}
          subtext={Messages.UNABLE_TO_BOOK_SUB}
          isOpen={isKycFailed}
          setIsOpen={setKycFailed}
          canRetry
        />
      )}
    </form>
  );
}
