import * as yup from "yup";
import uuid from "react-uuid";
import { productNameRegex } from "./investment";
import { CustomerCategoryType } from "./enums";
import { InterestRateRangeType } from "./testenums";
import { convertToDays } from "@app/utils/convertToDays";
import { ValidationError } from "yup";

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
    customerCategory: yup
      .number()
      .typeError("Select a category")
      .required("Select a category"),
    ageGroupMin: yup.number().typeError("Invalid value").min(0, "Min of  0"),
    ageGroupMax: yup
      .number()
      .typeError("Invalid value")
      .nullable()
      .min(1, "Min of  0")
      .test("min-less-than-max", "Must be greater than Min", function (value) {
        const ageGroupMin = this.parent.ageGroupMin;
        return (
          value === null ||
          value === undefined ||
          value === 0 ||
          ageGroupMin === undefined ||
          value > ageGroupMin
        );
      }),

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

const interestRateConfigModelSchema = yup.object().shape({
  min: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded"),
  // .transform((originalValue, originalObject) =>
  //   originalValue === undefined
  //     ? originalValue
  //     : parseFloat(originalValue?.toFixed(2))
  // ),
  max: yup
    .number()
    .typeError("Invalid value")
    .max(100, "Maximum value exceeded")

    .nullable()
    .when("$interestRateRangeType", {
      is: (val) => val == InterestRateRangeType.VaryByPrincipal,
      then: (schema) => schema.required().moreThan(yup.ref("min")),
      otherwise: (schema) => schema.nullable(),
    }),
  tenorMin: yup
    .number()
    .typeError("Invalid value")
    .when("$interestRateRangeType", {
      is: (category) => {
        InterestRateRangeType.VaryByTenor === parseInt(category, 10);
      },
      then: yup.number().required("Required").typeError("Invalid value"),
      otherwise: yup.number().typeError("Invalid value").nullable(),
    }),

  tenorMax: yup
    .number()
    .typeError("Invalid value")
    .when("$interestRateRangeType", {
     
      is: (category) => {
        InterestRateRangeType.VaryByTenor === parseInt(category, 10);
      },
      then: yup
        .number()
        .typeError("Invalid value")
        .test(
          "max-less-than-min",
          "Max must be greater than Min",
          function (value) {
            const tenorMin = this.parent.tenorMin;
            return (
              value === undefined || tenorMin === undefined || value > tenorMin
            );
          }
        ),
      otherwise: yup.number().typeError("Invalid value").nullable(),
    }),
  tenorMinUnit: yup
    .number()
    .typeError("Invalid value")
    .when("$interestRateRangeType", {
      is: InterestRateRangeType.VaryByTenor,
      then: yup.number().required("Required").typeError("Invalid value"),
      otherwise: yup.number().typeError("Invalid value").nullable(),
    }),

  tenorMaxUnit: yup
    .number()
    .typeError("Invalid value")
    .when("$interestRateRangeType", {
      is: InterestRateRangeType.VaryByTenor,
      then: yup.number().required("Required").typeError("Invalid value"),
      otherwise: yup.number().typeError("Invalid value").nullable(),
    }),

  principalMin: yup
    .number()
    .typeError("Invalid value")
    .when("$interestRateRangeType", {
      is: InterestRateRangeType.VaryByPrincipal,
      then: yup.number().typeError("Invalid value").required("Required"),
      otherwise: yup.number().typeError("Invalid value").nullable(),
    }),

  principalMax: yup
    .number()
    .typeError("Invalid value")
    .when("$interestRateRangeType", {
      is: (category) => {
        InterestRateRangeType.VaryByPrincipal === parseInt(category, 10);
      },
      then: yup
        .number()
        .typeError("Invalid value")
        .test(
          "max-less-than-min",
          "Max must be greater than Min",
          function (value) {
            const principalMin = this.parent.principalMin;
            return (
              value === undefined ||
              principalMin === undefined ||
              value > principalMin
            );
          }
        ),
      otherwise: yup.number().typeError("Invalid value").nullable(),
    }),
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
    .required("Min is required")
    .test("min-less-than-max", "Must be greater than Min", function (value) {
      const applicableTenorMax = this.resolve(yup.ref("applicableTenorMax"));
      const applicableTenorMinUnit = this.resolve(
        yup.ref("applicableTenorMinUnit")
      );
      const applicableTenorMaxUnit = this.resolve(
        yup.ref("applicableTenorMaxUnit")
      );

      return (
        value === undefined ||
        applicableTenorMax === undefined ||
        convertToDays(value, applicableTenorMinUnit) <
          convertToDays(applicableTenorMax, applicableTenorMaxUnit)
      );
    }),
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
    .test({
      test: function (value) {
        const rateType = this.parent.interestRateRangeType;
        let errors = [];

        for (let i = 1; i < value.length; i++) {
          const prev = value[i - 1];
          const current = value[i];

          if (rateType < 2) {
            if (
              prev?.max !== undefined &&
              current?.min !== undefined &&
              current.min <= prev.max
            ) {
              errors.push(
                new ValidationError(
                  "Must be greater than previous slab",
                  current,
                  `interestRateConfigModels[${i}].min`
                )
              );
            }

            if (
              current?.min !== undefined &&
              current?.max !== undefined &&
              current.max < current.min
            ) {
              errors.push(
                new ValidationError(
                  "Must be greater than min",
                  current,
                  `interestRateConfigModels[${i}].max`
                )
              );
            }
            

            if (rateType === 0) {
              if (
                prev?.principalMax !== undefined &&
                current?.principalMin !== undefined &&
                current.principalMin <= prev.principalMax
              ) {
                errors.push(
                  new ValidationError(
                    "Must be greater than previous slab",
                    current,
                    `interestRateConfigModels[${i}].principalMin`
                  )
                );
              }

              if (
                current?.principalMin !== undefined &&
                current?.principalMax !== undefined &&
                current.principalMax < current.principalMin
              ) {
                errors.push(
                  new ValidationError(
                    "Must be greater than min",
                    current,
                    `interestRateConfigModels[${i}].principalMax`
                  )
                );
              }
            }

            if (rateType === 1) {
              if (
                prev?.tenorMax !== undefined &&
                current?.tenorMin !== undefined &&
                current.tenorMin <= prev.tenorMax
              ) {
                errors.push(
                  new ValidationError(
                    "Must be greater than previous slab",
                    current,
                    `interestRateConfigModels[${i}].tenorMin`
                  )
                );
              }

              if (
                current?.tenorMin !== undefined &&
                current?.tenorMax !== undefined &&
                current.tenorMax < current.tenorMin
              ) {
                errors.push(
                  new ValidationError(
                    "Must be greater than min",
                    current,
                    `interestRateConfigModels[${i}].tenorMax`
                  )
                );
              }
            }
          }

   
          if (errors.length > 0) {
            return new ValidationError(errors);
          }
        }
        return true;
      },
    }),
});

export const liquiditySetupSchema = yup
  .object({
    part_AllowPartLiquidation: yup.boolean().typeError("Invalid value"),
    part_MaxPartLiquidation: yup
      .number()
      .typeError("Invalid value")
      .when("part_AllowPartLiquidation", {
        is: true,
        then: (schema) => schema.required("Provide value"),
        otherwise: (schema) => schema.nullable(),
      }),
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

export const glMappingSchema = yup.object({
  TermDepositLiabilityAccount: yup
    .string()
    .required("Term Deposit liability account is required"),
  InterestAccrualAccount: yup
    .string()
    .required("Interest accrual account is required"),
  InterestExpenseAccount: yup
    .string()
    .required("Interest expense account is required"),
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
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
  },
  {
    id: 2,
    text: "Partnership",
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
  },
  {
    id: 3,
    text: "Religous body",
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
  },
  {
    id: 4,
    text: "Club/Association",
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
  },
  {
    id: 2,
    text: "Trust",
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
  },
  {
    id: 2,
    text: "Public entry",
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
  },
  {
    id: 2,
    text: "SME",
    value: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "string",
      amount: 0,
    },
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
