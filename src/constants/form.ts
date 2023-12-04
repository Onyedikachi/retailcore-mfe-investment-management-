import * as yup from "yup";
import { productNameRegex } from "./investment";

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

export const ProductInformationFormSchema = yup
  .object({
    productName: yup
      .string()
      .matches(
        productNameRegex,
        "Product name can only contain alphabets, numbers, and space characters"
      )
      .required("Product name is required")
      .min(3)
      .max(50, "Maximum of 50 chars"),
    slogan: yup.string().max(160, "Maximum of 160 chars"),
    description: yup.string().required("Product description is required"),
    startDate: yup.string(),
    endDate: yup.string(),
    currency: yup.string().required("Product currency is required"),
    customerCategory: yup.number(),
  })
  .required();

export const CustomerEligibilityCriteriaSchema = yup
  .object({
    category: yup.string(),
    ageGroupStart: yup.number(),
    ageGroupEnd: yup.number(),
    corporateCustomerType: yup.string(),
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
export const liquiditySetup = yup
  .object({
    category: yup.string(),
  })
  .required();
export const entriesAndEventsSchema = yup
  .object({
    category: yup.string(),
  })
  .required();
