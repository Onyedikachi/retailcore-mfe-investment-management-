import {
  CustomerEligibilityCriteria,
  LiquiditySetup,
  PricingConfig,
  ProductInformation,
} from "@app/components/pages/term-deposit/forms";
import ProductToGLMapping from "@app/components/pages/term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  useCreateProductMutation,
  useGetRequestDetailQuery,
  useGetProductDetailQuery,
  useModifyProductMutation,
  useModifyRequestMutation,
  useGetChargesQuery,
  useGetInvestmentDetailQuery,
} from "@app/api";
import { handleDraft } from "./create-term-deposit/handleDraft";
import { useParams, useSearchParams } from "react-router-dom";
import MoneyPricingConfig from "@app/components/pages/term-deposit/forms/money-pricing-config";
import MoneyGlMapping from "@app/components/pages/term-deposit/forms/money-gl-mapping";
import CommercialChargesAndTaxes from "@app/components/pages/term-deposit/forms/gl_mapping_events/CommercialChargesAndTaxes";
import SecurityPurchaseProductInfo from "@app/components/pages/term-deposit/forms/SecurityPurchaseProductInfo";
import { AppContext } from "@app/utils";

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
  const { process, id, type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestId = searchParams.get("id");

  const { currencies, defaultCurrency } = useContext(AppContext);

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

  const [idQuery, setIdQuery] = useState("")
  const [showInputs, setShowInputs] = useState(false);

  const {
    data: securityDetailData,
    loading: securityDetailLoading,
    success: securityDetailSuccess,
  } = useGetInvestmentDetailQuery({
    id: idQuery, investmentType: "security-purchase"
  })

  const loadSecurityDetailsData = (data) => {
    // console.log(currencies)
    const newForm = {
      id: null,
      productInfo: {
        securitPurchaseId: idQuery,
        dealDate: data.dealDate,
        maturityDate: data.maturityDate,
        currency: currencies.find(i => i.text === data.currencyCode)?.id || "",
        currencyCode: data?.currencyCode,
        issuer: data.issuer,
        startDate: new Date(),
      },
      pricingConfiguration: {
        faceValue: data.faceValue,
        perAmount: data.perAmount,
        discountRate: data.discountRate || 0,
        totalConsideration: data.totalConsideration,
        interestComputationMethod: data.interestComputationMethod
      },
      "customerEligibility": {
        "ageGroupMin": 0,
        "ageGroupMax": 0,
        "requireDocument": [],
        "customerType": [],
        "customerCategory": 0
      },
    }
    setProductData({ ...productData, ...newForm })

  }

  useEffect(() => {
    if (securityDetailData && type !== 'term-deposit') {
      console.log(securityDetailData)
      loadSecurityDetailsData(securityDetailData?.data);
      setShowInputs(true)
    }
  }, [securityDetailData])

  return (
    <Fragment>
      {step === 1 && (
        <>
          {
            type === "term-deposit" ?
              <ProductInformation
                proceed={handleNav}
                formData={productData.productInfo}
                setFormData={(productInfo) =>
                  setProductData({ ...productData, productInfo: productInfo })
                }
                setDisabled={setDisabled}
                initiateDraft={initiateDraft}
                activeId={activeId}
              /> :
              <SecurityPurchaseProductInfo
                proceed={handleNav}
                formData={productData.productInfo}
                idQuery={idQuery}
                setIdQuery={setIdQuery}
                setFormData={(productInfo) =>
                  setProductData({ ...productData, productInfo: productInfo })
                }
                setDisabled={setDisabled}
                initiateDraft={initiateDraft}
                activeId={activeId}
                showInputs={showInputs}
                setShowInputs={setShowInputs}
              />
          }
        </>
      )}
      {step === 2 && (
        <>
          {type === "term-deposit" ? (
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
          ) : (
            <MoneyPricingConfig
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
        </>
      )}
      {step === 3 && (
        <>
          {type === "term-deposit" ? (
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
          ) : (
            <MoneyGlMapping
              proceed={handleNav}
              formData={productData}
              setFormData={(data, mapOptions) =>
                setProductData({
                  ...productData,
                  ...data,
                  moneyMarketProductGlMapping: mapOptions,
                })
              }
              setDisabled={setDisabled}
              initiateDraft={initiateDraft}
            />
          )}
        </>
      )}
      {step === 4 && (
        <>
          {type === "term-deposit" ? (
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
          ) : (
            <CommercialChargesAndTaxes
              proceed={handleNav}
              formData={productData}
              setFormData={(data, mapOptions) =>
                setProductData({
                  ...productData,
                  ...data,
                  // productGlMappings: mapOptions,
                })
              }
              setDisabled={setDisabled}
              initiateDraft={initiateDraft}
            />
          )}
        </>
      )}
      {step === 5 && (
        <ProductToGLMapping
          proceed={handleNav}
          formData={productData}
          setFormData={(data, mapOptions) =>
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
};
