import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { FormUpload } from "@app/components/forms";
import CustomerInfoCard from "./CustomerInfoCard";
import { AccountStatus, BookingCustomerInfoSchema } from "@app/constants";
import SearchInput from "@app/components/SearchInput";
import {
  useGetCustomerSearchQuery,
  // useGetAccountDataByIdQuery,
  useGetCustomerProfileQuery,
  useGetAccountDataByIdQuery,
} from "@app/api";
import { AppContext, capitalizeFirstLetter } from "@app/utils";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { CustomerDetail } from "@app/components/modals/CustomerDetail";
import { Failed } from "@app/components/modals";
import { Messages } from "@app/constants/enums";
import BottomBarLoader from "@app/components/BottomBarLoader";
import debounce from "lodash.debounce";
import { InputDivs } from "../../term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { useParams } from "react-router-dom";
export const onProceed = (
  data,
  proceed,
  formData,
  setFormData,
  preCreateInvestment,
  preModifyRequest
) => {
  if (formData?.id) {
    preModifyRequest({
      ...formData,
      customerBookingInfoModel: {
        ...formData?.customerBookingInfoModel,
        ...data,
      },
      isDraft: true,
    });
  } else {
    preCreateInvestment({
      ...formData,
      customerBookingInfoModel: {
        ...formData?.customerBookingInfoModel,
        ...data,
      },
      isDraft: true,
    });
  }
  setFormData({
    ...formData,
    customerBookingInfoModel: { ...formData?.customerBookingInfoModel, ...data },
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
  const { currencies } = useContext(AppContext);
  const { investmentType } = useParams();
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
  } = useGetCustomerSearchQuery(query, {
    skip: query?.search?.length !== 10 || !query,
  });

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
  } = useGetAccountDataByIdQuery(accountNumber, { skip: !accountNumber });

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
            code:
              investmentType === "individual"
                ? `${capitalizeFirstLetter(
                    i.customer_profiles[0].firstName
                  )} ${capitalizeFirstLetter(
                    i.customer_profiles[0].otherNames
                  )} ${capitalizeFirstLetter(i.customer_profiles[0].surname)}`
                : i.customer_profiles[0]?.companyNameBusiness,
            value: i,
          };
        })
      );
    }
  }, [isError, isSuccess, searchLoading, data]);

  useEffect(() => {
    const currencyId = currencies.find(
      (i) =>
        i?.text?.toLowerCase() === accountData?.value?.currencyCode?.toLowerCase()
      
    )?.value;

    if (accountIsSuccess) {
      setAccountBalance(accountData.value);
      setFormData({
        ...formData,
        customerBookingInfoModel: {
          ...formData?.customerBookingInfoModel,
          accountStatus: AccountStatus[accountData?.value?.accountStatus],
          currencyId,
          currencyCode:accountData?.value?.currencyCode,
          customerAccountLedgerId: accountData?.value?.accountUUID,
          balance: accountData?.value?.clearedBalance,
        },
      });
    }

    setValue("accountStatus", AccountStatus[accountData?.value?.accountStatus]);
    setValue("balance", parseFloat(accountData?.value?.clearedBalance));
    setValue("currencyId", currencyId);
    setValue("currencyCode", accountData?.value?.currencyCode);
    setValue("customerAccountLedgerId", accountData?.value?.accountUUID);

    trigger("balance");
  }, [accountIsError, accountIsSuccess, isLoading, accountData]);

  useEffect(() => {
    if (accountNumber && data) {
      console.log("touchdown")
      const foundObject = data?.data?.find((item) => {
        return (
          item.customer_products &&
          item.customer_products.some(
            (product) => product.accountNumber === accountNumber
          )
        );
      });
      const businessName =
      foundObject?.customer_profiles?.[0]?.companyNameBusiness;
    const individualName = `${capitalizeFirstLetter(
      foundObject?.customer_profiles?.[0]?.firstName
    )} ${capitalizeFirstLetter(
      foundObject?.customer_profiles?.[0]?.otherNames
    )} ${capitalizeFirstLetter(foundObject?.customer_profiles?.[0]?.surname)}`;
  
      setCustomerData(foundObject);
      setFormData({
        ...formData,
        customerId: foundObject?.customerId,
        customerProfile: foundObject?.customer_profiles[0],
      });
      setValue("customerId", foundObject?.customerId);
      setValue(
        "customerName", investmentType === "individual" ? individualName : businessName
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
        profileData?.data?.approvalStatus.toLowerCase() === "approved";

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
        customerType: investmentType === "individual" ? "Individual" : "SME",
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
                  setSearchTerm={debounce(
                    (e) =>
                      setQuery({
                        search: e,
                        isAccountNumber: true,
                        customerType:
                          investmentType === "individual"
                            ? "Individual"
                            : "SME",
                      }),
                    500
                  )}
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
                          accountBalance.clearedBalance,
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
                investmentType={investmentType}
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
                accept={["jpg", "jpeg", "png", "pdf", "docx"]}
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
