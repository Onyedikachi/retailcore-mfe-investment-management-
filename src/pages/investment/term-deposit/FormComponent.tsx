import {
  CustomerEligibilityCriteria,
  LiquiditySetup,
  PricingConfig,
  ProductInformation,
} from "@app/components/pages/term-deposit/forms";
import ProductToGLMapping from "@app/components/pages/term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { Fragment, useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useGetRequestDetailQuery,
  useGetProductDetailQuery,
  useModifyProductMutation,
  useModifyRequestMutation,
  useGetChargesQuery,
} from "@app/api";
import { handleDraft } from "./create-term-deposit/handleDraft";
import { useParams, useSearchParams } from "react-router-dom";

export default ({
  step,
  productData,
  activeId,
  handleNav,
  setProductData,
  setDisabled,
  initiateDraft,
}: any) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { process, id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("id");
  
  useEffect(() => {
    if (
      productData?.liquidation?.early_LiquidationPenalty === 4 &&
      productData?.liquidation?.early_SpecificCharges?.length
    ) {
      setProductData({
        ...productData,
        earlyLiquidationChargesAndTaxes: {
          ...productData.earlyLiquidationChargesAndTaxes,
          applicableCharges:
            productData?.liquidation?.early_SpecificCharges?.map((i) => i.id) ||
            [],
        },
      });
    }
    if (
      productData?.liquidation?.part_LiquidationPenalty === 4 &&
      productData?.liquidation?.part_SpecificCharges?.length
    ) {
      setProductData({
        ...productData,
        partLiquidationChargesAndTaxes: {
          ...productData.partLiquidationChargesAndTaxes,
          applicableCharges:
            productData?.liquidation?.part_SpecificCharges?.map((i) => i.id) ||
            [],
        },
      });
    }
  }, [
    productData?.liquidation?.part_LiquidationPenalty,
    productData?.liquidation?.early_LiquidationPenalty,
    productData?.liquidation?.part_SpecificCharges,
    productData?.liquidation?.early_SpecificCharges,
  ]);

  const [createProduct, { data, isSuccess }] = useCreateProductMutation();
  const [modifyProduct] = useModifyProductMutation();
  const [modifyRequest] = useModifyRequestMutation();

  useEffect(() => {
    // const autosave = setInterval(() => {
    if (
      productData?.productInfo.currency &&
      productData?.productInfo.productName &&
      productData?.productInfo.description
    ) {
      handleDraft({
        productData,
        process,
        id: id || requestId || productData?.id,
        modifyRequest,
        setIsConfirmOpen,
        modifyProduct,
        createProduct,
      });
    }

    // }, 10 * 1000000);
    // return () => {
    //   clearInterval(autosave);
    // };
  }, [step]);

  useEffect(() => {
    if (isSuccess) {
      setProductData({
        ...productData,
        id: data.data,
      });
    }
  }, [isSuccess]);

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
          setFormData={(mapOptions) =>
            setProductData({
              ...productData,
              productGlMappings: mapOptions,
            })
          }
          setDisabled={setDisabled}
          initiateDraft={initiateDraft}
        />
      )}
    </Fragment>
  );
};
