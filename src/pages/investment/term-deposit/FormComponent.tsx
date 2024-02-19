import { AccountingEntriesAndEvents, CustomerEligibilityCriteria, LiquiditySetup, PricingConfig, ProductInformation } from "@app/components/pages/term-deposit/forms";
import ProductToGLMapping from "@app/components/pages/term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { Fragment } from "react";

export default ({ step, productData, activeId, handleNav, setProductData, setDisabled, initiateDraft }) => {
  return (
    <Fragment>
      {step === 1 && (
        <ProductInformation
          proceed={handleNav}
          formData={productData.productInfo}
          setFormData={(productInfo) =>
            setProductData({ ...productData, productInfo: productInfo })
          }
          setDisabled={setDisabled}
          initiateDraft={initiateDraft}
          activeId={activeId}
        />
      )}
      {step === 2 && (
        <CustomerEligibilityCriteria
          proceed={handleNav}
          formData={productData.customerEligibility}
          setFormData={(customerEligibility) =>
            setProductData({
              ...productData,
              productInfo: {
                ...productData.productInfo,
              },
              customerEligibility: customerEligibility,
            })
          }
          setDisabled={setDisabled}
          initiateDraft={initiateDraft}
        />
      )}
      {step === 3 && (
        <PricingConfig
          formData={productData.pricingConfiguration}
          setFormData={(pricingConfiguration) =>
            setProductData({
              ...productData,
              pricingConfiguration: pricingConfiguration,
            })
          }
          productData={productData}
          proceed={handleNav}
          setDisabled={setDisabled}
          initiateDraft={initiateDraft}
        />
      )}
      {step === 4 && (
        <LiquiditySetup
          proceed={handleNav}
          formData={productData.liquidation}
          setFormData={(liquidation) =>
            setProductData({
              ...productData,
              liquidation: liquidation,
            })
          }
          setDisabled={setDisabled}
          initiateDraft={initiateDraft}
        />
      )}
      {step === 5 && (
        <ProductToGLMapping
            proceed={handleNav}
            formData={productData}
            setFormData={({ data, mapOptions }) =>
              setProductData({
                ...productData,
                ...data,
                productGlMappings: mapOptions,
              })
            }
            setDisabled={setDisabled}
            initiateDraft={initiateDraft}
          />
      )}
    </Fragment>
  );
}