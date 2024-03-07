import React, { useEffect, useState } from "react";
import { BorderlessSelect } from "@app/components/forms";
import { FormToolTip, ProductSearch } from "@app/components";
import { toolTips } from "@app/constants";
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
import { CustomerCategoryType } from "@app/constants/enums";
import MultiSelectForm from "@app/components/forms/MultiSelectForm";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useGetFormDocumentsQuery, useGetFormTypeQuery } from "@app/api";
import uuid from "react-uuid";

export const handleCheckedRequirement = ({
  document,
  toggledRequirements,
  setToggledRequirements,
}) => {
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

export const requirementDeleteHandler = ({
  itemToDelete,
  selectedRequirements,
  setSelectedRequirements,
}) => {
  // Filter out the item to delete
  const updatedRequirement = selectedRequirements.filter(
    (item) => item !== itemToDelete
  );

  // Update the state with the new array
  setSelectedRequirements(updatedRequirement);
};

export const handleSelectAllChange = ({
  setToggledRequirements,
  documents,
  selectAll,
  setSelectAll,
}) => {
  // If "Select All" is checked, set all documents to toggledDocuments; if unchecked, clear the array
  if (selectAll) {
    setToggledRequirements([]);
  } else {
    setToggledRequirements([...documents]);
  }
  setSelectAll(!selectAll);
};

export default function CustomerEligibilityCriteria({
  formData,
  setFormData,
  setDisabled,
  proceed,
  initiateDraft,
}) {
  const { process } = useParams();
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [toggledRequirements, setToggledRequirements] = useState([]);
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    trigger,
    setValue,
    resetField,
    setError: assignError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CustomerEligibilityCriteriaSchema),
    defaultValues: formData,
    // values,
  });
  const watchCustomerCategory = watch("customerCategory");
  const watchageGroupMin = watch("ageGroupMin");
  const watchageGroupMax = watch("ageGroupMax");
  const selectedCategory = watch("category");

  const [isAdd, setIsAdd] = useState(false);
  const [newDocument, setNewDocument] = useState("");
  const values = getValues();

  const deleteRequirementItem = (itemToDelete) => {
    requirementDeleteHandler({
      itemToDelete,
      selectedRequirements,
      setSelectedRequirements,
    });
  };
  const handleOptions = (val: any) => {
    setSearchQuery(val.name);
  };

  // Api calls

  const {
    data: formTypeData,
    isLoading: typeLoading,
    isSuccess: typeSuccess,
  } = useGetFormTypeQuery(
    watchCustomerCategory === 0 ? "individualLegacy" : "smeLegacy",
    { skip: watchCustomerCategory === null }
  );
  const {
    data: documentList,
    isLoading: docLoading,
    isSuccess: docSuccess,
  } = useGetFormDocumentsQuery(formTypeData?.data?._id, {
    skip: !formTypeData?.data?._id,
  });

  useEffect(() => {
    if (docSuccess) {
      setDocuments(
        documentList?.data?.map((i) => ({ name: i.title, id: uuid() }))
      );
    }
  }, [documentList, docSuccess, docLoading]);

  function onProceed(d: any) {
    setFormData({
      ...d,
      customerCategory: d.customerCategory,
      requireDocument: selectedRequirements,
    });
    proceed();
  }
  useEffect(() => {
    setDisabled(!isValid);
  }, [values]);

  useEffect(() => {
    if (formData) {
      Object.entries(formData).forEach(([name, value]) =>
        setValue(name, value)
      );

      if (formData?.requireDocument && formData?.requireDocument.length) {
        setSelectedRequirements(formData?.requireDocument);

        trigger();
      }
    }
  }, [setValue, formData, setSelectedRequirements]);

  useEffect(() => {
    const fieldsToRegister = ["ageGroupMin", "ageGroupMax", "customerType"];

    fieldsToRegister.forEach((fieldName) => {
      clearErrors(fieldName);
      // resetField(fieldName, { keepError: false });
    });
  }, [watchCustomerCategory]);

  useEffect(() => {
    trigger("ageGroupMax");
  }, [watchageGroupMin]);

  useEffect(() => {
    trigger("ageGroupMin");
  }, [watchageGroupMax]);
  useEffect(() => {
    if (watchCustomerCategory !== null) {
      trigger();
    }
  }, [watchCustomerCategory]);

  useEffect(() => {
    if (initiateDraft) {
      setFormData({ ...values, requireDocument: selectedRequirements });
    }
  }, [initiateDraft]);
  return (
    <div>
      <form id="customereligibilitycriteria" onSubmit={handleSubmit(onProceed)}>
        <div className="flex gap-[18px] flex-wrap">
          <div className="flex gap-[25px]">
            <div className="w-[300px]">
              <BorderlessSelect
                labelName={"Customer Category"}
                register={register}
                inputName={"customerCategory"}
                errors={errors}
                setValue={setValue}
                defaultValue={formData?.customerCategory}
                options={categoryOptions}
                placeholder="Select customer category"
                clearErrors={clearErrors}
                requiredField={true}
                tip={toolTips.customerCategory}
              />
            </div>
            {watchCustomerCategory === CustomerCategoryType.Corporate && (
              <div className="w-[300px] flex items-center">
                <MultiSelectForm
                  labelName={"Type of corporate customer"}
                  register={register}
                  inputName={"customerType"}
                  defaultValue={formData?.customerType}
                  errors={errors}
                  setValue={setValue}
                  options={customerTypeOptions}
                  allLabel="All"
                  clearErrors={clearErrors}
                  trigger={trigger}
                />
              </div>
            )}
            {watchCustomerCategory === CustomerCategoryType.Individual && (
              <div className="flex flex-col ">
                <InfoLabel label={"Age Group Eligibility"} info={"String"} />
                <div className="flex items-end gap-[25px]">
                  <div className="w-[180px]">
                    <MinMaxInput
                      register={register}
                      inputName={"ageGroupMin"}
                      errors={errors}
                      setValue={setValue}
                      defaultValue={formData?.ageGroupMin}
                      label="Min"
                      clearErrors={clearErrors}
                      trigger={trigger}
                      type="number"
                    />
                  </div>
                  <div className="flex items-center">-</div>
                  <div className="w-[180px]">
                    <MinMaxInput
                      register={register}
                      inputName={"ageGroupMax"}
                      errors={errors}
                      setValue={setValue}
                      defaultValue={formData?.ageGroupMax}
                      label="Max"
                      clearErrors={clearErrors}
                      trigger={trigger}
                      type="number"
                      placeholder="Unspecified"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* // )} */}
          </div>
        </div>
        <div className="flex justify-end mt-10">
          <button
            type="button"
            disabled={
              watchCustomerCategory === null || docLoading || typeLoading
            }
            onClick={() => setIsRequirementsOpen(true)}
            className="cursor-pointer flex items-center gap-[10px] disabled:opacity-60 disabled:cursor-not-allowed"
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
          </button>
        </div>
        {!docLoading && !typeLoading ? (
          <div>
            <SelectedRequirementsTable
              tableItems={selectedRequirements || []}
              deleteTableItem={deleteRequirementItem}
            />
          </div>
        ) : (
          <div className="text-xs text-center py-6 text-gray-500 relative flex itemx-center justify-center gap-x-1">
            Fetching document list...
            <span className="spinner-border h-4 w-4 border-t border-gray-500 rounded-full animate-spin"></span>
          </div>
        )}

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
                      <FormToolTip tip={toolTips.requirements} />
                    </span>
                    <span>
                      Customer must provide the following selected documents
                      before the product can be assigned
                    </span>
                  </span>
                  <div className="w-full">
                    {" "}
                    <div className="relative w-full flex items-center border-b border-[#AAAAAA] gap-x-1">
                      <button className="w-8 h-8 p-1 flex items-center justify-center">
                        <FaSearch className="text-[#48535B]" />
                      </button>
                      <input
                        onChange={(e) =>
                          setSearchQuery(e.target.value.toLowerCase())
                        }
                        value={searchQuery}
                        type="search"
                        data-testid="search"
                        placeholder="Search"
                        className={` flex-1 bg-transparent peer placeholder:text-base h-8 py-2 pl-1 pr-4 placeholder:text-[#AAAAAA] outline-none  w-full `}
                      />
                    </div>
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
                                onChange={() =>
                                  handleSelectAllChange({
                                    documents,
                                    selectAll,
                                    setSelectAll,
                                    setToggledRequirements,
                                  })
                                }
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

                        <div className="grid gap-y-2  pr-6">
                          {documents
                            .filter((i: any) =>
                              i.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                            )
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
                                        handleCheckedRequirement({
                                          document,
                                          toggledRequirements,
                                          setToggledRequirements,
                                        })
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

                      if (
                        documents.find(
                          (doc) =>
                            doc.name.toLowerCase() === newDocument.toLowerCase()
                        )
                      ) {
                        setNewDocument("");
                        setIsAdd(false);
                        return;
                      }
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
