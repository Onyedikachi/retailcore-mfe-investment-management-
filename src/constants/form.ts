import * as yup from "yup";
import { productNameRegex } from "./investment";
import { CustomerCategoryType } from "./enums";

export const FormSchema = yup
  .object({
    name: yup
      .string()
      .matches(
        productNameRegex,
        "Product name can only contain alphabets, numbers, and space characters"
      )
      .required("Product name is required")
      .min(3)
      .max(50, "Maximum of 50 chars"),
    description: yup.string().nullable(),
    draft: yup.boolean(),
    type: yup.string().required(),
    code: yup.string().nullable(),
    number: yup.string().required("Provide a street number"),
    streetname: yup.string().required("Provide a street name"),
    city: yup.string().required("Provide a city"),
    country: yup.string().required("Provide a country"),
    state: yup.string().required("Provide a state"),
    lga: yup.string().nullable(),
    postalcode: yup.string().typeError("Provide a valid zip code").nullable(),
  })
  .required();

export const ProductInformationFormSchema = yup.object({
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
  startDate: yup.date().nullable().required("Start date is required"),
  endDate: yup.date().nullable(),
  currency: yup.string().required("Select a currency"),
});

export const CustomerEligibilityCriteriaSchema = yup
  .object({
    customerCategory: yup.number().required("Select a category"),
    ageGroupStart: yup.number(),
    ageGroupEnd: yup.number(),
    corporateCustomerType: yup.array().when("customerCategory", {
      is: CustomerCategoryType.Corporate,
      then: yup
        .array()
        .required("Corporate customer type is required")
        .min(1, "At least one corporate customer type is required"),
      otherwise: yup.array(),
    }),
  })
  .required();

export const pricingConfigSchema = yup
  .object({
    applicableTenorMin: yup.number(),
    applicableTenorMinDays: yup.number(),
    applicableTenorMax: yup.number(),
    applicableTenorMaxDays: yup.number(),
    applicablePrincipalMin: yup.number(),
    applicablePrincipalMax: yup.number(),
    applicablePrincipalMinDays: yup.number(),
    applicablePrincipalMaxDays: yup.number(),
    varyOption: yup.string(),
    applicableInterestMin: yup.number(),
    applicableInterestMax: yup.number(),
    interestComputation: yup.string(),
    tenorRateRanges: yup.array().of(
      yup.object().shape({
        minRange: yup.number(),
        maxRange: yup.number(),
        tenorFrom: yup.number(),
        tenorFromType: yup.string(),
        tenorTo: yup.number(),
        tenorToType: yup.string(),
      })
    ),
    principalRateRanges: yup.array().of(
      yup.object().shape({
        minRange: yup.number(),
        maxRange: yup.number(),
        amountFrom: yup.number(),

        amountTo: yup.number(),
      })
    ),
  })
  .required();
export const liquiditySetupSchema = yup
  .object({
    part_AllowPartLiquidation: yup.boolean(),
    part_MaxPartLiquidation: yup.number(),
    part_RequireNoticeBeforeLiquidation: yup.boolean(),
    part_NoticePeriod: yup.number(),
    part_NoticePeriodUnit: yup.number(),
    part_LiquidationPenalty: yup.string(),
    early_AllowEarlyLiquidation: yup.boolean(),
    early_RequireNoticeBeforeLiquidation: yup.boolean(),
    early_NoticePeriod: yup.number(),
    early_NoticePeriodUnit: yup.number(),
    early_LiquidationPenalty: yup.string(),
    early_LiquidationPenaltyPercentage: yup.number(),
  })
  .required();
export const entriesAndEventsSchema = yup
  .object({
    category: yup.string(),
  })
  .required();

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
    id: 2,
    text: "Religous body",
    value: "Religous body",
  },
  {
    id: 2,
    text: "Club/Association",
    value: "Club/Association",
  },
  {
    id: 2,
    text: "Trust",
    value: "trust",
  },
  {
    id: 2,
    text: "Public entry",
    value: "public entry",
  },
  {
    id: 2,
    text: "SME",
    value: "sme",
  },
];

export const documentOptions = [
  {
    id: "Customer Photo",
    name: "Customer Photo",
  },
  {
    id: "Signature",
    name: "Signature",
  },

  {
    id: "Valid Identification document",
    name: "Valid Identification document",
  },
  {
    id: "Proof of residential address",
    name: "Proof of residential address",
  },
];
export const liquidationTypes = [
  {
    label: "Allow Part Liquidation",
  },
  {
    label: "Allow Early Liquidation",
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
  applicableInterestRange: "Interest Range",
  interestComputation: "Interest Computation",
 
  allowPartLiquidation: "Allow part",
  allowEarlyLiquidation: "AllowEarly",
};
