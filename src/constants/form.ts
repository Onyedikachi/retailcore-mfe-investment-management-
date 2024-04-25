import * as yup from "yup";
import uuid from "react-uuid";
import { IntervalOptions, productNameRegex } from "./investment";
import { CustomerCategoryType } from "./enums";
import { InterestRateRangeType } from "./testenums";
import { convertToDays } from "@app/utils/convertToDays";
import { ValidationError } from "yup";
import { currencyFormatter } from "@app/utils/formatCurrency";

export const ProductInformationFormSchema = yup.object({
  securitPurchaseId: yup.string(),
  type: yup.string(),
  code: yup.string(),
  issuer: yup.string().when("type", {
    is: (val) => val !== "term-deposit",
    then: (schema) => schema.required("Issuer is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  productName: yup
    .string()
    .required("Product name is required")
    .matches(
      productNameRegex,
      "Product name can only contain alphabets, numbers, and space characters"
    )
    .min(3, "Minimum of 4 chars")
    .max(50, "Maximum of 50 chars"),
  slogan: yup.string().max(160, "Maximum of 160 chars").nullable(),
  description: yup
    .string()
    .required("Product description is required")
    .min(4, "Minimum of 4 chars")
    .max(250, "Maximum of 250 chars"),
  startDate: yup.date().nullable().required("Date is required"),
  endDate: yup.date().when("type", {
    is: (val) => val !== "term-deposit",
    then: (schema) => schema.required("Maturity date is required"),
    otherwise: (schema) => schema.nullable(),
  }),
  currency: yup.string().required("Select a currency"),
  currencyCode: yup.string(),
});
export const SecurityProductInformationFormSchema = yup.object({
  productName: yup
    .string()
    .required("Product name is required")
    .matches(
      productNameRegex,
      "Product name can only contain alphabets, numbers, and space characters"
    )
    .min(3, "Minimum of 4 chars")
    .max(50, "Maximum of 50 chars"),
  slogan: yup.string().max(160, "Maximum of 160 chars").nullable(),
  description: yup
    .string()
    .required("Product description is required")
    .min(4, "Minimum of 4 chars")
    .max(250, "Maximum of 250 chars"),
});
export const SecurityPricingSchema = yup.object().shape({
  discountRate: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")
    .required(),
  perAmount: yup.number().required(),
  faceValue: yup.number().required(),
  totalConsideration: yup.mixed().required(),
  interestComputationMethod: yup.number().integer().required(),
});

export const BookingCustomerInfoSchema = yup.object().shape({
  customerId: yup.string().uuid().required("Select a customer account"),
  customerName: yup.string().required("Select a customer account"),
  customerAccount: yup.string().required("Select a customer account"),
  investmentformUrl: yup.string(),
  customerAccountLedgerId: yup.string(),
  relationshipOfficerId: yup.string().required("Select a relationship officer"),
  relationshipOfficerName: yup
    .string()
    .required("Select a relationship officer"),
  balance: yup
    .number()
    .typeError("Invalid value")
    .nullable()
    .min(1, "Insufficient balance")
    .required(),
});

export const BondsProductFacilityDetailsModelSchema = yup.object().shape({
  investmentProductId: yup.string().uuid().required("Select an investment"),
  investmentPurpose: yup.string().required(),
  availableVolume: yup.number().required(),
  tenor: yup
    .number()
    .typeError("Invalid value")
    .integer()
    .positive()
    .min(yup.ref("tenorMin"), "Tenor is too short")
    .max(yup.ref("tenorMax"), "Tenor is too long")
    .nullable()
    .required("Tenor is required"),
  faceValue: yup.number().required(),
  cleanPrice: yup.number().required(),
  dirtyPrice: yup.number().required(),
  totalConsideration: yup.number().required(),
  couponRate: yup.number().required(),
  principal: yup
    .number()
    .typeError("Invalid value")
    .positive()
    .min(yup.ref("prinMin"), "Principal is too small")
    .max(yup.ref("prinMax"), "Principal is too large")
    .nullable()
    .required("Principal is required"),
  capitalizationMethod: yup.number().integer().min(0).max(4).required(),
  interval: yup
    .number()
    .integer()
    .min(0)
    .max(4)
    .when("capitalizationMethod", {
      is: 1,
      then: (schema) => schema.required(),
    }),
  tenorMin: yup.number().typeError("Invalid value").nullable(),
  tenorMax: yup.number().typeError("Invalid value").integer().nullable(),
  prinMin: yup.number().typeError("Invalid value").integer().nullable(),
  prinMax: yup.number().typeError("Invalid value").integer().nullable(),
  intMin: yup.number().typeError("Invalid value").nullable(),
  intMax: yup.number().typeError("Invalid value").nullable(),
});
export const FacilityDetailsModelSchema = yup.object().shape({
  investmentProductId: yup.string().uuid().required("Select an investment"),
  investmentPurpose: yup.string(),
  tenor: yup
    .number()
    .typeError("Invalid value")
    .integer()
    .positive()
    .min(yup.ref("tenorMin"), "Tenor is too short")
    .max(yup.ref("tenorMax"), "Tenor is too long")
    .nullable()
    .required("Tenor is required"),
  principal: yup
    .number()
    .typeError("Invalid value")
    .positive()
    .min(yup.ref("prinMin"), "Principal is too small")
    .max(yup.ref("prinMax"), "Principal is too large")
    .nullable()
    .required("Principal is required"),
  interestRate: yup
    .number()
    .typeError("Invalid value")
    .positive()
    .min(yup.ref("intMin"), "Interest rate is too low")
    .max(yup.ref("intMax"), "Interest rate is too high")
    .nullable()
    .required("Interest is required"),
  capitalizationMethod: yup.number().integer().min(0).max(4).required(),
  tenorMin: yup.number().typeError("Invalid value").nullable(),
  tenorMax: yup.number().typeError("Invalid value").integer().nullable(),
  prinMin: yup.number().typeError("Invalid value").integer().nullable(),
  prinMax: yup.number().typeError("Invalid value").integer().nullable(),
  intMin: yup.number().typeError("Invalid value").nullable(),
  intMax: yup.number().typeError("Invalid value").nullable(),
});

export const FacilityDetailsModelSchema2 = yup.object().shape({
  moneyMarketCategory: yup.number().integer().nullable().required(),
  issuer: yup.string().max(50).required(),
  description: yup.string().max(250).required(),
  dealDate: yup.date().nullable().required(),
  maturityDate: yup.date().nullable().required(),
  currencyCode: yup.string().required(),
  discountRate: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")
    .required(),
  perAmount: yup.number().required(),
  faceValue: yup.number().required(),
  totalConsideration: yup.mixed().required(),
  interestComputationMethod: yup.number().integer().required(),
  capitalizationMethod: yup.number().required(),
  securityPurchaseIntervals: yup
    .number()
    .nullable()
    .when("capitalizationMethod", {
      is: 1,
      then: (schema) => schema.required(),
    }),
});

export const accountingEntriesSchema = yup.object().shape({
  debitLedger: yup.string().required(),
  creditLedger: yup.string().required(),
});

export const TransactionSettingModelSchema = yup.object().shape({
  accountForLiquidation: yup
    .string()
    .typeError("Select an account")
    .required("Select an account"),
  accountForInterest: yup
    .string()
    .typeError("Select an account")
    .required("Select an account"),
  accountForLiquidationLedgerId: yup.string().required("Ledger id is required"),
  notifyCustomerOnMaturity: yup.boolean().required("Required"),
  rollOverAtMaturity: yup.boolean().required("Required"),
  rollOverOption: yup.number().integer().min(0).max(2).required("Required"),
  startDateOption: yup.number().integer().min(0).max(1),
  startDate: yup
    .date()
    .typeError("Select a date")
    .when("startDateOption", {
      is: (val) => parseInt(val, 10) === 1,
      then: (schema) => schema.required("Date is required"),
      otherwise: (schema) => schema.nullable(),
    }),
});

export const CustomerEligibilityCriteriaSchema = yup
  .object({
    customerCategory: yup
      .number()
      .typeError("Select a category")
      .required("Select a category"),
    ageGroupMin: yup
      .number()
      .typeError("Invalid value")
      .nullable()
      .when("customerCategory", {
        is: CustomerCategoryType.Individual,
        then: yup
          .number()
          .typeError("Invalid value")
          .required("Required")
          .min(0, "Min of 0")
          .test("min-less-than-max", "Must be less than Max", function (value) {
            const ageGroupMax = this.parent.ageGroupMax;

            // Only run the validation if ageGroupMax is greater than 0
            if (ageGroupMax > 0) {
              return (
                value === null ||
                value === undefined ||
                value === 0 ||
                ageGroupMax === undefined ||
                value < ageGroupMax
              );
            }

            // Return true if ageGroupMax is not greater than 0
            return true;
          }),
        otherwise: yup.number().typeError("Invalid value").nullable(),
      }),
    ageGroupMax: yup
      .mixed()
      .nullable()
      .when(["customerCategory", "ageGroupMin"], {
        is: (cat, min) =>
          cat === CustomerCategoryType.Individual && min !== undefined,
        then: yup
          .mixed()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .nullable()
          .test(
            "min-less-than-max",
            "Must be greater than Min",
            function (value) {
              const ageGroupMin = this.parent.ageGroupMin;
              if (value >= 1) {
                return (
                  value === null ||
                  value === undefined ||
                  value === 0 ||
                  ageGroupMin === undefined ||
                  value > ageGroupMin
                );
              }

              // If value is less than 1, consider it invalid
              return true;
            }
          ),
        otherwise: yup.number().typeError("Invalid value").nullable(),
      }),

    customerType: yup.array().when("customerCategory", {
      is: CustomerCategoryType.Corporate,
      then: yup
        .array()
        .required("Corporate customer type is required")
        .min(1, "At least one corporate customer type is required"),
      otherwise: yup.array(),
    }),
  })
  .required();

const interestRateConfigModelSchema = yup.object().shape({
  min: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")
    .nullable(),
  max: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")
    .nullable(),
  tenorMin: yup.number().typeError("Invalid value").nullable(),
  tenorMax: yup.number().typeError("Invalid value").nullable(),
  tenorMinUnit: yup.number().typeError("Invalid value").nullable(),
  tenorMaxUnit: yup.number().typeError("Invalid value").nullable(),
  principalMin: yup.number().typeError("Invalid value").nullable(),
  principalMax: yup.number().typeError("Invalid value").nullable(),
});

export const pricingConfigSchema = yup.object({
  interestRateRangeType: yup.number().integer().required(),
  applicableTenorMax: yup
    .number()
    .typeError("Invalid value")
    .required("Max is required")
    .test("min-less-than-max", "Must be greater than Min", function (value) {
      const applicableTenorMin = this.resolve(yup.ref("applicableTenorMin"));
      const applicableTenorMinUnit = this.resolve(
        yup.ref("applicableTenorMinUnit")
      );
      const applicableTenorMaxUnit = this.resolve(
        yup.ref("applicableTenorMaxUnit")
      );

      return (
        value === undefined ||
        applicableTenorMin === undefined ||
        convertToDays(value, applicableTenorMaxUnit) >
          convertToDays(applicableTenorMin, applicableTenorMinUnit)
      );
    }),

  applicableTenorMin: yup
    .number()
    .typeError("Invalid value")
    .required("Min is required"),

  applicablePrincipalMin: yup
    .number()
    .typeError("Invalid value")
    .required("Min is required"),

  applicablePrincipalMax: yup
    .number()
    .typeError("Invalid value")
    .required("Max is required")
    .test(
      "max-less-than-min",
      "Max must be greater than Min",
      function (value) {
        const applicablePrincipalMin = this.parent.applicablePrincipalMin;
        return (
          value === undefined ||
          applicablePrincipalMin === undefined ||
          value > applicablePrincipalMin
        );
      }
    ),

  interestRateMin: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")
    .nullable()

    .when("interestRateRangeType", {
      is: InterestRateRangeType.DonotVary,
      then: (schema) => schema.required("Min is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  interestRateMax: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")
    .nullable()

    .when("interestRateRangeType", {
      is: InterestRateRangeType.DonotVary,
      then: (schema) =>
        schema
          .required("Max is required")
          .test(
            "min-less-than-max",
            "Must be greater than Min",
            function (value) {
              const interestRateMin = this.parent.interestRateMin;
              return (
                value === undefined ||
                interestRateMin === undefined ||
                value > interestRateMin
              );
            }
          ),
      otherwise: (schema) => schema.nullable(),
    }),

  interestRateConfigModels: yup
    .array()
    .of(interestRateConfigModelSchema)
    .test("slab-validation", function (value) {
      const rateType = this.parent.interestRateRangeType;
      const appPrinMin = this.parent.applicablePrincipalMin;

      const appTenorMin = this.parent.applicableTenorMin;
      const appTenorMinUnit = this.parent.applicableTenorMinUnit;
      const appPrinMax = this.parent.applicablePrincipalMax;
      const appTenorMax = this.parent.applicableTenorMax;
      const appTenorMaxUnit = this.parent.applicableTenorMaxUnit;
      let errors = [];

      for (let i = 0; i < value.length; i++) {
        const prev = value[i - 1];
        const current = value[i];
        const last = value[value.length - 1];
        const first = value[0];

        if (rateType < 2) {
          if (
            [current?.min, current?.max].some(
              (val) => val === undefined || isNaN(val) || val === null
            )
          ) {
            const newerror = new ValidationError(
              "Invalid value",
              current,
              `interestRateConfigModels[${i}].${
                current?.min === undefined ||
                isNaN(current?.min) ||
                current?.min === null
                  ? "min"
                  : "max"
              }`
            );

            errors.push(newerror);
          }
          if (
            prev?.max !== undefined &&
            current?.min !== undefined &&
            current.min <= prev.max
          ) {
            errors.push(
              new ValidationError(
                "Min value must be greater than the previous slab's max value.",
                current,
                `interestRateConfigModels[${i}].min`
              )
            );
          }

          if (
            current?.min !== undefined &&
            current?.max !== undefined &&
            current.max <= current.min
          ) {
            errors.push(
              new ValidationError(
                "Max value must be greater than the min value.",
                current,
                `interestRateConfigModels[${i}].max`
              )
            );
          }
          // Vary by principal starts here
          if (rateType === 0) {
            if (
              [current?.principalMax, current?.principalMin].some(
                (val) => val === undefined || isNaN(val) || val === null
              )
            ) {
              const newerror = new ValidationError(
                "Invalid value",
                current,
                `interestRateConfigModels[${i}].${
                  current?.principalMin === undefined ||
                  isNaN(current?.principalMin) ||
                  current?.principalMin === null
                    ? "principalMin"
                    : "principalMax"
                }`
              );

              errors.push(newerror);
            }
            if (
              prev?.principalMax !== undefined &&
              current?.principalMin !== undefined &&
              current.principalMin <= prev.principalMax
            ) {
              errors.push(
                new ValidationError(
                  "Principal min value must be greater than the previous slab's max principal value.",
                  current,
                  `interestRateConfigModels[${i}].principalMin`
                )
              );
            }

            if (
              current?.principalMin !== undefined &&
              current?.principalMax !== undefined &&
              current.principalMax <= current.principalMin
            ) {
              errors.push(
                new ValidationError(
                  "Principal max value must be greater than the min principal value.",
                  current,
                  `interestRateConfigModels[${i}].principalMax`
                )
              );
            }

            if (
              appPrinMax !== undefined &&
              last?.principalMax !== undefined &&
              last.principalMax > appPrinMax
            ) {
              errors.push(
                new ValidationError(
                  `Max principal is ${currencyFormatter(appPrinMax)}`,
                  last,
                  `interestRateConfigModels[${value.length - 1}].principalMax`
                )
              );
            }
            if (
              appPrinMax !== undefined &&
              last?.principalMin !== undefined &&
              last.principalMin >= appPrinMax
            ) {
              errors.push(
                new ValidationError(
                  `Min principal must be less than ${currencyFormatter(
                    appPrinMax
                  )}`,
                  last,
                  `interestRateConfigModels[${value.length - 1}].principalMin`
                )
              );
            }

            if (
              appPrinMin !== undefined &&
              first?.principalMin !== undefined &&
              first.principalMin != appPrinMin
            ) {
              errors.push(
                new ValidationError(
                  `Min principal must be ${currencyFormatter(appPrinMin)}`,
                  first,
                  `interestRateConfigModels[${0}].principalMin`
                )
              );
            }
          }
          // Vary by tenor starts here
          if (rateType === 1) {
            if (
              [current?.tenorMax, current?.tenorMin].some(
                (val) => val === undefined || isNaN(val) || val === null
              )
            ) {
              const newerror = new ValidationError(
                "Invalid value",
                current,
                `interestRateConfigModels[${i}].${
                  current?.tenorMin === undefined ||
                  isNaN(current?.tenorMin) ||
                  current?.tenorMin === null
                    ? "tenorMin"
                    : "tenorMax"
                }`
              );

              errors.push(newerror);
            }

            if (
              prev?.tenorMax !== undefined &&
              current?.tenorMin !== undefined &&
              convertToDays(current.tenorMin, current.tenorMinUnit) <=
                convertToDays(prev.tenorMax, prev.tenorMaxUnit)
            ) {
              errors.push(
                new ValidationError(
                  "Tenor min value must be greater than the previous slab's max tenor value.",
                  current,
                  `interestRateConfigModels[${i}].tenorMin`
                )
              );
            }

            if (
              current?.tenorMin !== undefined &&
              current?.tenorMax !== undefined &&
              convertToDays(current.tenorMax, current.tenorMaxUnit) <=
                convertToDays(current.tenorMin, current.tenorMinUnit)
            ) {
              errors.push(
                new ValidationError(
                  "Tenor max value must be greater than the min tenor value.",
                  current,
                  `interestRateConfigModels[${i}].tenorMax`
                )
              );
            }

            if (
              appTenorMax !== undefined &&
              last?.tenorMax !== undefined &&
              convertToDays(last.tenorMax, last.tenorMaxUnit) >
                convertToDays(appTenorMax, appTenorMaxUnit)
            ) {
              errors.push(
                new ValidationError(
                  `Max tenor  is ${appTenorMax} ${
                    IntervalOptions[appTenorMaxUnit - 1].text
                  }`,
                  last,
                  `interestRateConfigModels[${value.length - 1}].tenorMax`
                )
              );
            }

            if (
              appTenorMax !== undefined &&
              last?.tenorMin !== undefined &&
              convertToDays(last.tenorMin, last.tenorMinUnit) >=
                convertToDays(appTenorMax, appTenorMaxUnit)
            ) {
              errors.push(
                new ValidationError(
                  `Min tenor must be less than ${appTenorMax} ${
                    IntervalOptions[appTenorMaxUnit - 1].text
                  }`,
                  last,
                  `interestRateConfigModels[${value.length - 1}].tenorMin`
                )
              );
            }

            if (
              appTenorMin !== undefined &&
              first?.tenorMin !== undefined &&
              convertToDays(first.tenorMin, first.tenorMinUnit) !=
                convertToDays(appTenorMin, appTenorMinUnit)
            ) {
              errors.push(
                new ValidationError(
                  `Min tenor must be ${appTenorMin} ${
                    IntervalOptions[appTenorMinUnit - 1].text
                  }`,
                  first,
                  `interestRateConfigModels[${0}].tenorMin`
                )
              );
            }
          }
        }
      }

      if (errors.length > 0) {
        return new ValidationError(errors);
      }

      return true;
    }),
});

export const liquiditySetupSchema = yup
  .object({
    allowPrincipalWithdrawal: yup.boolean().typeError("Invalid value"),
    withdrawalPenalty: yup
      .number()
      .typeError("Invalid value")
      .when("allowPrincipalWithdrawal", {
        is: true,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      }),
    part_AllowPartLiquidation: yup.boolean().typeError("Invalid value"),
    part_MaxPartLiquidation: yup
      .number()
      .typeError("Invalid value")
      .when("part_AllowPartLiquidation", {
        is: true,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      })
      .max(100, "Value exceeded"),
    part_RequireNoticeBeforeLiquidation: yup
      .boolean()
      .typeError("Invalid value"),
    part_NoticePeriod: yup
      .number()
      .typeError("Invalid value")
      .max(10, "Max of 10 days")
      .when("part_RequireNoticeBeforeLiquidation", {
        is: true,
        then: (schema) => schema.required("Provide a notice period"),
        otherwise: (schema) => schema.nullable(),
      }),
    part_NoticePeriodUnit: yup
      .number()
      .typeError("Invalid value")
      .when("part_RequireNoticeBeforeLiquidation", {
        is: true,
        then: (schema) => schema.required("Choose a duration"),
        otherwise: (schema) => schema.nullable(),
      }),
    part_LiquidationPenalty: yup.number().typeError("Invalid value"),
    part_LiquidationPenaltyPercentage: yup
      .number()
      .typeError("Invalid value")
      .max(100, "Value exceeded")
      .when("part_LiquidationPenalty", {
        is: (val) => parseInt(val, 10) === 2,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      }),
    part_SpecialInterestRate: yup
      .number()
      .typeError("Invalid value")
      .max(100, "Value exceeded")
      .when("part_LiquidationPenalty", {
        is: (val) => parseInt(val, 10) === 3,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      }),

    early_AllowEarlyLiquidation: yup.boolean().typeError("Invalid value"),
    early_RequireNoticeBeforeLiquidation: yup
      .boolean()
      .typeError("Invalid value"),
    early_NoticePeriod: yup
      .number()
      .typeError("Invalid value")
      .max(7, "Max of 7 days")
      .when("early_RequireNoticeBeforeLiquidation", {
        is: (val) => val === true,
        then: (schema) => schema.required("Provide a notice period"),
        otherwise: (schema) => schema.nullable(),
      }),
    eary_SpecialInterestRate: yup
      .number()
      .typeError("Invalid value")
      .max(100, "Value exceeded")
      .when("early_LiquidationPenalty", {
        is: (val) => parseInt(val, 10) === 3,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      }),
    early_NoticePeriodUnit: yup
      .number()
      .typeError("Invalid value")
      .when("early_RequireNoticeBeforeLiquidation", {
        is: true,
        then: (schema) => schema.required("Choose a duration"),
        otherwise: (schema) => schema.nullable(),
      }),
    early_LiquidationPenalty: yup.number().typeError("Invalid value"),
    early_LiquidationPenaltyPercentage: yup
      .number()
      .typeError("Invalid value")
      .max(100, "Value exceeded")
      .when("early_LiquidationPenalty", {
        is: (val) => parseInt(val, 10) === 2,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      }),
  })
  .required();

export const LiquidationSchema = yup.object({
  investementBookingId: yup.string().required(),
  reason: yup.string().required("Provide a reason"),
  documentUrl: yup.string(),
  notify: yup.boolean().required(),
  amounttoLiquidate: yup
    .number()
    .typeError("Invalid value")
    .integer()
    .positive()
    .max(yup.ref("maxAmount"), "Exceeded max amount")
    .nullable(),
  maxAmount: yup.number(),
});
export const TopUpSchema = yup.object({
  investementBookingId: yup.string().required(),
  reason: yup.string().required("Provide a reason"),
  documentUrl: yup.string(),
  notify: yup.boolean().required(),
  topUpUnit: yup.number(),
  amounttoTopUp: yup
    .number()
    .typeError("Invalid value")
    .integer()
    .positive()
    .max(yup.ref("maxAmount"), "Exceeded max amount")
    .nullable(),
  maxAmount: yup.number(),
});

export const treasuryBillglMappingSchema = yup.object({
  TermDepositLiabilityLedger: yup
    .string()
    .required("Term Deposit liability account is required"),
  InterestAccrualLedger: yup
    .string()
    .required("Interest accrual account is required"),
  InterestExpenseLedger: yup
    .string()
    .required("Interest expense account is required"),
});

export const chargesAndTaxesSchema = {
  TermDepositLiabilityLedger: yup
    .string()
    .required("Term Deposit liability account is required"),
  InterestAccrualLedger: yup
    .string()
    .required("Interest accrual account is required"),
  InterestExpenseLedger: yup
    .string()
    .required("Interest expense account is required"),
  principalDepositChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
  partLiquidationChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
  earlyLiquidationChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
  investmentLiquidationChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
};

export const glMappingSchema = yup.object({
  TermDepositLiabilityAccount: yup
    .string()
    .required("Term Deposit liability account is required"),
  PrepaidAssetLedger: yup
    .string()
    .required("Prepaid Asset Ledger account is required"),
  InterestAccrualAccount: yup
    .string()
    .required("Interest accrual account is required"),
  InterestExpenseAccount: yup
    .string()
    .required("Interest expense account is required"),
  principalDepositChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
  partLiquidationChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
  earlyLiquidationChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
  investmentLiquidationChargesAndTaxes: yup.object().shape({
    applicableCharges: yup.array().of(yup.string()),
    applicableTaxes: yup.array().of(yup.string()),
  }),
});

export const currencyOptions = [
  {
    id: 1,
    text: "NGN",
    value: "NGN",
  },
  {
    id: 2,
    text: "USD",
    value: "USD",
  },
];

export const categoryOptions = [
  {
    id: 1,
    text: "Individual",
    value: 0,
  },
  {
    id: 2,
    text: "Corporate",
    value: 1,
  },
];

export const customerTypeOptions = [
  {
    id: 1,
    text: "Limited liability company",
    value: "Limited liability company",
  },
  {
    id: 2,
    text: "Partnership",
    value: "Partnership",
  },
  {
    id: 3,
    text: "Religous body",
    value: "Religous body",
  },

  {
    id: 4,
    text: "SME",
    value: "SME",
  },
];

export const documentOptions = [
  {
    id: uuid(),
    name: "Customer Photo",
  },
  {
    id: uuid(),
    name: "Signature",
  },

  {
    id: uuid(),
    name: "Valid Identification document",
  },
  {
    id: uuid(),
    name: "Proof of residential address",
  },
];
export const liquidationTypes = [
  {
    label: "Allow Part Liquidation",
    value: "part_AllowPartLiquidation",
  },
  {
    label: "Allow Early Liquidation",
    value: "early_AllowEarlyLiquidation",
  },
  {
    label: "Allow Principal Withdrawal",
    value: "allowPrincipalWithdrawal",
  },
];

export const toolTips = {
  productName:
    "Choose a unique name for this product. You cannot reuse an existing name",
  lifeCycle:
    "Specify the lifecycle of the product. Leave either field blank if undefined.Specify the lifecycle of the product. Leave either field blank if undefined.",
  currency: "Select applicable transaction currency for this product.",
  customerCategory:
    "Select the customer category for which this product will be applied to.",
  ageGroup:
    "Select the customer age group for which this product will be applied to. Leave either field blank if undefined.",
  requirements:
    "Select the documents that are required for a customer to provide before they can be assigned this product",
  applicableTenor:
    "The allowed investment maturity duration at the point of booking the product for a customer",
  applicablePrincipal:
    "The allowed investment amount at the point of booking the product for the customer",
  applicableInterestRange:
    "Specify the percentage a which interest will be charged on the loan amount",
  interestComputation:
    "<div><p>30E/360: Counts the days from the calendar, but also introduces some changes on the months with 31 and 28 days.</p><p>Actual/360: Computes the interest daily by counting the number of days in the calendar, but using a fixed 360-day year length.</p><p>Actual/365: Calculates the interest daily by counting the number of days in the calendar and using a fixed 365-day year length</p></div>",

  allowPartLiquidation:
    "Allows customers to access their investment funds without fully cashing out their investment.",
  allowEarlyLiquidation:
    "Allows for withdrawing or closing the investment before its predetermined maturity date",
  allowPrincipalWithdrawal:
    "Allows customers to access their investment funds without fully cashing out their investments",
  description: "Enter a description for this loan product",
  issuer: "",
  securitPurchaseId: "",
  faceValue: "",
  totalConsideration: "",
  discountRate: "",
  perAmount: "",
};
