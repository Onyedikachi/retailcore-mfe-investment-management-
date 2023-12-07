import React, { useEffect, useState } from "react";
import {
  BorderlessSelect,
  ComboSelect,
  MultiSelect,
} from "@app/components/forms";
import { Button, SelectedRequirementsTable } from "@app/components";
import { MinMaxInput, InfoLabel } from "@app/components/forms";
import { RiInformationLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomerEligibilityCriteriaSchema,
  categoryOptions,
  customerTypeOptions,
  documentOptions,
} from "@app/constants";
import { SelectRequirements } from "@app/components/modals";
import { EntriesAndEventsSearch } from "@app/components/pages/term-deposit/forms";
import { CustomerCategoryType } from "@app/constants/enums";
import MultiSelectForm from "@app/components/forms/MultiSelectForm";

export default function CustomerEligibilityCriteria({
  formData,
  setFormData,
  setDisabled,
  proceed,
}) {
<<<<<<< Updated upstream
  const [documents, setDocuments] = useState([
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Passport",
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afe6",
      name: "ID Card",
    },
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afb2",
      name: "Drivers Lisence",
    },
    // "Signature",
    // "Document 1",
    // "Document 2",
    // "Document 3",
    // "Document 4",
    // "Document 5",
    // "Document 6",
    // "Document 7",
    // "Document 8",
    // "Document 9",
    // "Document 10",
    // "Document 11",
    // "Document 12",
  ]);
  const [selectedRequirements, setSelectedRequirements] = useState([]);
=======
  const [documents, setDocuments] = useState([...documentOptions]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState([
    ...formData.requireDocument,
  ]);
>>>>>>> Stashed changes
  const [selectAll, setSelectAll] = useState(false);
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CustomerEligibilityCriteriaSchema),
    defaultValues: formData,
    // values,
  });
<<<<<<< Updated upstream

  const selectedCategory = watch("category");

=======
  const [isAdd, setIsAdd] = useState(false);
  const [newDocument, setNewDocument] = useState("");
  const values = getValues();
>>>>>>> Stashed changes
  const handleCheckedRequirement = (document) => {
    const isDocumentToggled = toggledRequirements.some(
      (d) => d.id === document.id
    );

    // If it's checked, add it to the array; if unchecked, remove it
    if (isDocumentToggled) {
      setToggledRequirements(
        toggledRequirements.filter((d) => d.id !== document.id)
      );
    } else {
      setToggledRequirements([...toggledRequirements, document]);
    }
  };

  const handleSelectAllChange = () => {
    // If "Select All" is checked, set all documents to toggledDocuments; if unchecked, clear the array
    if (selectAll) {
      setToggledRequirements([]);
    } else {
      setToggledRequirements([...documents]);
    }
    setSelectAll(!selectAll);
  };

  const deleteRequirementItem = (itemToDelete) => {
    // Filter out the item to delete
    const updatedRequirement = selectedRequirements.filter(
      (item) => item !== itemToDelete
    );

    // Update the state with the new array
    setSelectedRequirements(updatedRequirement);
  };
  const handleOptions = (val: any) => {
    setSearchQuery(val.name);
  };

  function onProceed(d: any) {
    setFormData({ ...d, requireDocument: selectedRequirements });
    proceed();
  }
 
  const watchCustomerCategory = watch("customerCategory");
  return (
    <div>
      <form id="customereligibilitycriteria" onSubmit={handleSubmit(onProceed)}>
<<<<<<< Updated upstream
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

=======
        <div className="flex gap-[18px] flex-wrap">
>>>>>>> Stashed changes
          <div className="flex gap-[25px]">
            <div className="w-[300px]">
              <BorderlessSelect
                labelName={"Customer Category"}
                register={register}
                inputName={"customerCategory"}
<<<<<<< Updated upstream
                handleSelected={(value) => {
                  setValue("customerCategory", value.value);
                }}
=======
                errors={errors}
                setValue={setValue}
>>>>>>> Stashed changes
                defaultValue={formData.customerCategory}
                options={categoryOptions}
                placeholder="Select customer category"
                clearErrors={clearErrors}
              />
            </div>
<<<<<<< Updated upstream
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
=======
            {watchCustomerCategory === CustomerCategoryType.Corporate && (
              <div className="w-[300px] flex items-center">
                <MultiSelectForm
                  labelName={"Type of corporate customer"}
                  register={register}
                  inputName={"corporateCustomerType"}
                  errors={errors}
                  setValue={setValue}
                  options={customerTypeOptions}
                  allLabel="All"
                  clearErrors={clearErrors}
                />
              </div>
            )}
            {watchCustomerCategory === CustomerCategoryType.Individual && (
              <div className="flex flex-col ">
                <InfoLabel label={"Age Group Eligibility"} info={"String"} />
                <div className="flex items-end gap-[25px]">
                  <div className="w-[150px]">
                    <MinMaxInput
                      register={register}
                      inputName={"ageGroupMin"}
                      errors={errors}
                      setValue={setValue}
                      defaultValue={formData.ageGroupMin}
                      label="Min"
                      clearErrors={clearErrors}
                    />
                  </div>
                  <div className="flex items-center">-</div>
                  <div className="w-[150px]">
                    <MinMaxInput
                      register={register}
                      inputName={"ageGroupMax"}
                      errors={errors}
                      setValue={setValue}
                      defaultValue={formData.ageGroupMin}
                      label="Max"
                      clearErrors={clearErrors}
                    />
                  </div>
>>>>>>> Stashed changes
                </div>
              </div>
            )}
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
            deleteTableItem={deleteRequirementItem}
          />
        </div>

        <div className="max-w-[527px]">
          {isRequirementsOpen && (
            <SelectRequirements
              actionFn={() => {
                setSelectedRequirements(toggledRequirements);
                setIsRequirementsOpen(false);
              }}
              header={"Documentation requirements"}
              isOpen={isRequirementsOpen}
              setIsOpen={setIsRequirementsOpen}
              onCancel={() => setIsRequirementsOpen(false)}
              onConfirm={() => setIsRequirementsOpen(false)}
              disabled={toggledRequirements.length === 0}
              hideBtn={isAdd}
            >
              {!isAdd ? (
                <div className="flex flex-col gap-2">
                  <span className=" flex items-center gap-[5px] text-[##636363] text-xs font-normal">
                    <span className="text-[15px]">
                      <RiInformationLine />
                    </span>
                    <span>
                      Customer must provide the following selected documents
                      before the product can be assigned
                    </span>
                  </span>
                  <div className="w-full">
                    {" "}
                    <EntriesAndEventsSearch
                      placeholder={"Search"}
                      handleOptions={handleOptions}
                      options={documentOptions}
                    />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <div className="p-5 max-h-[282px] overflow-y-auto">
                      <fieldset>
                        <div className="space-y-5 mb-2">
                          <div className="relative flex items-start">
                            <div className="flex h-6 items-center">
                              <input
                                aria-describedby="selectAll-description"
                                name="selectAll"
                                type="checkbox"
                                id="doc-requirement-all"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
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

                        <div className="grid gap-y-2 max-h-[298px] overflow-y-auto pr-6">
                          {documents
                            .filter((i: any) => i.name.includes(searchQuery))
                            ?.map((document, index) => (
                              <div key={document.id} className="ml-[28px]">
                                <div className="relative flex items-start">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id={`doc-requirement-${document.id}`}
                                      aria-describedby="doc-requirement-description"
                                      name="doc-requirement"
                                      type="checkbox"
                                      value={JSON.stringify(document)}
                                      onChange={() =>
                                        handleCheckedRequirement(document)
                                      }
                                      checked={toggledRequirements.some(
                                        (d) => d.id === document.id
                                      )}
                                      className="h-4 w-4 rounded border-gray-300  !accent-sterling-red-800 ring-0"
                                    />
                                  </div>
                                  <div className="ml-3 text-sm leading-6">
                                    <label
                                      htmlFor={`doc-requirement-${document.id}`}
                                      className="cursor-pointer font-normal text-base text-[#636363]"
                                    >
                                      {document.name}
                                    </label>{" "}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </fieldset>
                    </div>
                    <div className="flex justify-end mb-[10px]">
                      <span
                        onClick={() => setIsAdd(true)}
                        className="cursor-pointer text-[#CF2A2A] text-sm "
                      >
                        Add Other Document
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <input
                    data-testid="add-document"
                    className={`placeholder-[#BCBBBB] ring-0 mb-6 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
                    onChange={(e) => {
                      setNewDocument(e.target.value);
                    }}
                    value={newDocument}
                    placeholder="Enter document title"
                  />
                  <Button
                    type="button"
                    data-testid="submit-document"
                    onClick={() => {
                      if (!newDocument.length) return;
                      setDocuments([
                        ...documents,
                        { id: newDocument, name: newDocument },
                      ]);
                      setNewDocument("");
                      setIsAdd(false);
                    }}
                    className="flex mx-auto rounded-lg text-base font-medium py-[5px] h-[44px] bg-sterling-red-800 border border-sterling-red-800 text-white  px-10 disabled:border-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-[#636363]"
                  >
                    Add document
                  </Button>
                </div>
              )}
            </SelectRequirements>
          )}
        </div>
      </form>
    </div>
  );
}
