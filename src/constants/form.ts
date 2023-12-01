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
    name: yup
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
    productLifeCycle: yup.string(),
    currency: yup.string().required("Product currency is required"),
  })
  .required();

export const CustomerEligibilityCriteriaSchema = yup
  .object({
    category: yup.string().required("Product currency is required"),
  })
  .required();
