import React, { useEffect, useState } from "react";
import { BorderlessSelect } from "@app/components/forms";
import { SelectedRequirementsTable } from "@app/components";
import { MinMaxInput, InfoLabel } from "@app/components/forms";
import { RiInformationLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerEligibilityCriteriaSchema } from "@app/constants";
import { SelectRequirements } from "@app/components/modals";
import { EntriesAndEventsSearch } from "@app/components/pages/term-deposit/forms";

export default function CustomerEligibilityCriteria({
  formData,
  setFormData,
  setDisabled,
  proceed,
}) {
  // const [chosenCategory, setChosenCategory] = useState("Individual");
  const [documents, setDocuments] = useState([
    //  {
    //   id:  1,
    //   name:  "Customer signature"
    //  },
    //  {
    //   id:  2,
    //   name:  "Document 2"
    //  },
    //  {
    //   id:  3,
    //   name:  "Document 3"
    //  },
    "Signature",
    "Document 1",
    "Document 2",
    "Document 3",
    "Document 4",
    "Document 5",
    "Document 6",
    "Document 7",
    "Document 8",
    "Document 9",
    "Document 10",
    "Document 11",
    "Document 12",
  ]);
  const [selectedRequirements, setSelectedRequirements] = useState([]);

  const [toggledRequirements, setToggledRequirements] = useState([]);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,

    setValue,
    setError: assignError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CustomerEligibilityCriteriaSchema),
    defaultValues: formData,
    // values,
  });

  const selectedCategory = watch("category");

  const handleCheckedRequirement = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (value === "all-documents") {
      isChecked
        ? setToggledRequirements(documents)
        : setToggledRequirements([]);

      return;
    }

    // If checked, add to the array; otherwise, remove it
    setToggledRequirements((prevItems) =>
      isChecked
        ? [...prevItems, value]
        : prevItems.filter((item) => item !== value)
    );
  };

  const handleRequirement = (itemToDelete) => {
    // Filter out the item to delete
    const updatedRequirement = selectedRequirements.filter(
      (item) => item !== itemToDelete
    );

    // Update the state with the new array
    setSelectedRequirements(updatedRequirement);
  };
  //update the customer eligibility
  useEffect(() => {
    setFormData({ ...formData, requireDocument: selectedRequirements });
  }, [selectedRequirements]);
  function onProceed(d: any) {
    console.log(
      "Customer - Eligibility:" +
        JSON.stringify({ ...d, requireDocument: selectedRequirements })
    );
    setFormData({ ...d, requireDocument: selectedRequirements });

    proceed();
  }

  return (
    <div>
      <form id="customereligibilitycriteria" onSubmit={handleSubmit(onProceed)}>
        <div className="flex gap-[18px]">
          {/* <div className="w-[300px]">
            <BorderlessSelect
              labelName={"Customer Category"}
              inputError={errors?.category}
              register={register}
              inputName={"category"}
              handleSelected={(value) => {
                setValue("category", value.value);
              }}
              options={[
                {
                  id: 1,
                  text: "Individual",
                  value: "Individual",
                },
                {
                  id: 2,
                  text: "Corporate",
                  value: "Corporate",
                },
              ]}
            />
          </div> */}

          <div className="flex gap-[25px]">
            <div className="w-[300px]">
              <BorderlessSelect
                labelName={"Customer Category"}
                register={register}
                inputName={"customerCategory"}
                handleSelected={(value) => {
                  setValue("customerCategory", value.value);
                }}
                defaultValue={formData.customerCategory}
                options={[
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
                ]}
              />
            </div>
            {/* {chosenCategory?.toLowerCase() == "corporate" ? ( */}
            {/* <div className="w-[300px]">
              <BorderlessSelect
                labelName={"Type of corporate customer"}
                register={register}
                inputName={"corporateCustomerType"}
                handleSelected={(value) => {
                  setValue("corporateCustomerType", value.value);
                }}
                options={[
                  {
                    id: 1,
                    text: "CustomerType1",
                    value: "CustomerType1",
                  },
                  {
                    id: 2,
                    text: "CustomerType2",
                    value: "CustomerType2",
                  },
                ]}
              />
            </div> */}
            {/* // ) : ( */}
            <div className="flex flex-col ">
              <InfoLabel label={"Age Group Eligibility"} info={"String"} />
              <div className="flex items-end gap-[25px]">
                <div className="w-[150px]">
                  <MinMaxInput
                    register={register}
                    inputName={"ageGroupMin"}
                    handleChange={(value) => {
                      setValue("ageGroupMin", value);
                    }}
                    defaultValue={formData.ageGroupMin}
                  />
                </div>
                <div className="flex items-center">-</div>
                <div className="w-[150px]">
                  <MinMaxInput
                    register={register}
                    inputName={"ageGroupMax"}
                    handleChange={(value) => {
                      setValue("ageGroupMax", value);
                    }}
                    defaultValue={formData.ageGroupMin}
                  />
                </div>
              </div>
            </div>
            {/* // )} */}
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <div
            onClick={() => setIsRequirementsOpen(true)}
            className="cursor-pointer flex items-center gap-[10px]"
          >
            <svg
              width="29"
              height="28"
              viewBox="0 0 29 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_48843_94577)">
                <circle cx="14.5605" cy="14" r="10" fill="#636363" />
              </g>
              <path
                d="M13.5615 13H7.56152V13.5V14H13.5615V20H14.0615H14.5615V14H20.5615V13.5V13H14.5615V7H14.0615H13.5615V13Z"
                stroke="white"
              />
              <defs>
                <filter
                  id="filter0_d_48843_94577"
                  x="0.560547"
                  y="0"
                  width="28"
                  height="28"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_48843_94577"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_48843_94577"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span className="font-medium text-[#636363]">
              Select requirements
            </span>
          </div>
        </div>
        <div>
          <SelectedRequirementsTable
            tableItems={selectedRequirements}
            deleteTableItem={handleRequirement}
          />
        </div>

        {isRequirementsOpen && (
          <SelectRequirements
            actionFn={() => {
              setSelectedRequirements(toggledRequirements);
              setIsRequirementsOpen(false);
            }}
            header={"Document Requirements"}
            isOpen={isRequirementsOpen}
            setIsOpen={setIsRequirementsOpen}
            onCancel={() => setIsRequirementsOpen(false)}
            onConfirm={() => setIsRequirementsOpen(false)}
          >
            <div className="flex flex-col gap-2">
              <span className=" flex items-center gap-[5px] text-[##636363] text-xs font-normal">
                <span className="text-[15px]">
                  <RiInformationLine />
                </span>
                <span>
                  Customer must provide the following selected documents before
                  the product can be assigned
                </span>
              </span>
              <div className="w-full">
                {" "}
                <EntriesAndEventsSearch
                  placeholder={"Search"}
                  options={[{ name: "Current Assets", id: "1" }]}
                />
              </div>
              <div className="flex flex-col gap-[5px]">
                <div className="p-5 max-h-[282px] overflow-y-auto">
                  <fieldset>
                    <div className="space-y-5">
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            id="doc-requirement-all"
                            aria-describedby="all-docs-description"
                            name="all-docs"
                            type="checkbox"
                            value="all-documents"
                            onChange={handleCheckedRequirement}
                            className="h-4 w-4 rounded border-gray-300  !accent-sterling-red-800 ring-0"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="doc-requirement-all"
                            className="font-normal text-base text-[#636363]"
                          >
                            All Documents
                          </label>{" "}
                        </div>
                      </div>
                    </div>
                    {documents?.map((document, index) => (
                      <div key={document} className="space-y-5 ml-[16px]">
                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id={`doc-requirement-${document}`}
                              aria-describedby="doc-requirement-description"
                              name="doc-requirement"
                              type="checkbox"
                              value={document}
                              onChange={handleCheckedRequirement}
                              checked={toggledRequirements.includes(document)}
                              className="h-4 w-4 rounded border-gray-300  !accent-sterling-red-800 ring-0"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label
                              htmlFor={`doc-requirement-${document}`}
                              className="cursor-pointer font-normal text-base text-[#636363]"
                            >
                              {document}
                            </label>{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                  </fieldset>
                </div>
                <div className="flex justify-end mb-[10px]">
                  <span className="cursor-pointer text-[#CF2A2A] text-base">
                    Add Other Document
                  </span>
                </div>
              </div>
            </div>
          </SelectRequirements>
        )}
      </form>
    </div>
  );
}
