import { Fragment } from "react"
import FacilityDetails from "./FacilityDetails"
import AccountingEntries from "./AccountingEntries"

export default ({
    step,
    handleNav,
    formData,
    setFormData,
    setDisabled,
    isSavingDraft,
    setProductDetail,
    productDetail,
    detailLoading,
    preModifyRequest,
    preCreateInvestment
}) => {
    return (
        <Fragment>
            {
                !detailLoading &&
                <span>
                    {
                        step === 1 ?
                            <FacilityDetails
                                proceed={handleNav}
                                formData={formData}
                                setFormData={setFormData}
                                setDisabled={setDisabled}
                                isSavingDraft={isSavingDraft}
                                setProductDetail={setProductDetail}
                                productDetail={productDetail}
                                detailLoading={detailLoading}
                                preModifyRequest={preModifyRequest}
                            /> :
                            <AccountingEntries
                                proceed={handleNav}
                                formData={formData}
                                setFormData={setFormData}
                                setDisabled={setDisabled}
                                isSavingDraft={isSavingDraft}
                                setProductDetail={setProductDetail}
                                productDetail={productDetail}
                                detailLoading={detailLoading}
                                preModifyRequest={preModifyRequest}
                            />
                    }

                </span>
            }
        </Fragment>
    )
}

{/* <CustomerInformation
            proceed={handleNav}
            formData={formData}
            setFormData={setFormData}
            setDisabled={setDisabled}
            isSavingDraft={isSavingDraft}
            preModifyRequest={preModifyRequest}
            preCreateInvestment={preCreateInvestment}
          /> */}