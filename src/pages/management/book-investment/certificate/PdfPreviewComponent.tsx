// import  SterlingLogo from "@app/assets/images/SterlingLogo";
import {
  useGetCurrenciesQuery,
  useGetCustomerProfileQuery,
  useGetInvestmentDetailQuery,
  useGetWideChargesQuery,
  useGetApplicableTaxesQuery,
} from "@app/api";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { forwardRef, useContext, useEffect, useState } from "react";
import { AppContext } from "@app/utils";
import { useParams } from "react-router-dom";
import { Interval } from "@app/constants";
import { currencyFormatter, numberFormatter } from "@app/utils/formatCurrency";

type PdfInvestType = {
  accountName: string;
  accountNumber: string;
  address: string;
  amountAtMaturity: string;
  bookingDate: string;
  contractStatus: string;
  currency: string;
  customerName: string;
  interestAmount: string;
  interestRate: string;
  investmentId: string;
  maturityDate: string;
  principalAmount: string;
  tenor: string;
  liquidation: boolean;
};

const taxChargeDataOptions = [
  {
    header: "Principal Deposit",
    key: "principalDepositChargesAndTaxes",
  },
  {
    header: "Part Liquidation",
    key: "partLiquidationChargesAndTaxes",
  },
  {
    header: "Early Liquidation",
    key: "earlyLiquidationChargesAndTaxes",
  },
  {
    header: "Maturity Liquidation",
    key: "investmentLiquidationChargesAndTaxes",
  },
];
export const PdfViewer = forwardRef<any, any>(
  ({ investmentDetailTable, productDetail },ref) => {
    const { currencies } = useContext(AppContext);
    const [taxData, setTaxData] = useState(null);
    const { id } = useParams();

    const { data: investmentQueryData, isLoading: investmentDetailLoading } =
      useGetInvestmentDetailQuery({ id: id });
    const {
      data: taxes,
      isLoading: taxesLoading,
      isSuccess: taxesSuccess,
    } = useGetApplicableTaxesQuery();
    const { data: charges, isSuccess: chargeSuccess } =
      useGetWideChargesQuery();
    useEffect(() => {
      if (!productDetail || !taxChargeDataOptions) return;

      const applicableChargesIds = taxChargeDataOptions?.flatMap(
        (item) => productDetail[item.key]?.applicableCharges || []
      );

      const applicableTaxesIds = taxChargeDataOptions?.flatMap(
        (item) => productDetail[item.key]?.applicableTaxes || []
      );

      const applicableCharges = charges?.data?.active?.records?.filter(
        (charge) => applicableChargesIds.includes(charge.charge_id)
      );

      const applicableTaxes = taxes?.data?.records?.filter((tax) =>
        applicableTaxesIds.includes(tax.tax_id)
      );


      if (!applicableChargesIds.length && !applicableTaxesIds.length) return;
      const appCharges = applicableCharges?.map((charge) => {
        const textChargeValues = charge.charge_value?.map(
          (value) =>
            `${
              value.charge_amount_type?.toLowerCase() === "percent"
                ? `${value.charge_amount}%`
                : `${currencyFormatter(value.charge_amount, charge.currency)} `
            } ${value.charge_type}`
        );

        return textChargeValues;
      });

      const appTax = applicableTaxes?.map((tax) => {
        const textTaxValues = tax.tax_values?.map(
          (value) =>
            `${
              value.tax_amount_type?.toLowerCase() === "percent"
                ? `${value.tax_amount}%`
                : `${currencyFormatter(value.tax_amount, tax.currency)} `
            } ${value.tax_type}`
        );

        return textTaxValues;
      });
      const textData = [...(appTax || []), ...(appCharges || [])]?.flat().join(", ");

      setTaxData(textData);
    }, [productDetail, taxesSuccess, chargeSuccess]);

    return (
      <div ref={ref} className="p-6">
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-end py-4 mb-10">
            <svg
              width="91"
              height="126"
              viewBox="0 0 91 126"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_20438_236807)">
                <circle cx="44.5" cy="44.5" r="44.5" fill="#991111" />
                <g filter="url(#filter1_i_20438_236807)">
                  <ellipse
                    cx="57.5508"
                    cy="24.2227"
                    rx="13.2383"
                    ry="13.2383"
                    fill="white"
                  />
                </g>
              </g>
              <path
                d="M8.92578 117.338C8.92578 117.045 8.88021 116.785 8.78906 116.557C8.70443 116.329 8.55143 116.12 8.33008 115.932C8.10872 115.743 7.79622 115.561 7.39258 115.385C6.99544 115.202 6.48763 115.017 5.86914 114.828C5.19206 114.62 4.56706 114.389 3.99414 114.135C3.42773 113.874 2.93294 113.575 2.50977 113.236C2.08659 112.891 1.75781 112.497 1.52344 112.055C1.28906 111.605 1.17188 111.088 1.17188 110.502C1.17188 109.923 1.29232 109.395 1.5332 108.92C1.7806 108.445 2.12891 108.035 2.57812 107.689C3.03385 107.338 3.57096 107.068 4.18945 106.879C4.80794 106.684 5.49154 106.586 6.24023 106.586C7.29492 106.586 8.20312 106.781 8.96484 107.172C9.73307 107.562 10.3223 108.087 10.7324 108.744C11.1491 109.402 11.3574 110.128 11.3574 110.922H8.92578C8.92578 110.453 8.82487 110.04 8.62305 109.682C8.42773 109.317 8.12826 109.031 7.72461 108.822C7.32747 108.614 6.82292 108.51 6.21094 108.51C5.63151 108.51 5.14974 108.598 4.76562 108.773C4.38151 108.949 4.09505 109.187 3.90625 109.486C3.71745 109.786 3.62305 110.124 3.62305 110.502C3.62305 110.769 3.6849 111.013 3.80859 111.234C3.93229 111.449 4.12109 111.651 4.375 111.84C4.62891 112.022 4.94792 112.195 5.33203 112.357C5.71615 112.52 6.16862 112.676 6.68945 112.826C7.47721 113.061 8.16406 113.321 8.75 113.607C9.33594 113.887 9.82422 114.206 10.2148 114.564C10.6055 114.923 10.8984 115.329 11.0938 115.785C11.2891 116.234 11.3867 116.745 11.3867 117.318C11.3867 117.917 11.2663 118.458 11.0254 118.939C10.7845 119.415 10.4395 119.822 9.99023 120.16C9.54753 120.492 9.01367 120.749 8.38867 120.932C7.77018 121.107 7.08008 121.195 6.31836 121.195C5.63477 121.195 4.96094 121.104 4.29688 120.922C3.63932 120.74 3.04036 120.463 2.5 120.092C1.95964 119.714 1.52995 119.245 1.21094 118.686C0.891927 118.119 0.732422 117.458 0.732422 116.703H3.18359C3.18359 117.165 3.26172 117.559 3.41797 117.885C3.58073 118.21 3.80534 118.477 4.0918 118.686C4.37826 118.887 4.71029 119.037 5.08789 119.135C5.47201 119.232 5.88216 119.281 6.31836 119.281C6.89128 119.281 7.36979 119.2 7.75391 119.037C8.14453 118.874 8.4375 118.646 8.63281 118.354C8.82812 118.061 8.92578 117.722 8.92578 117.338ZM21.1641 110.434V112.152H15.207V110.434H21.1641ZM16.9258 107.846H19.2793V118.08C19.2793 118.406 19.3249 118.656 19.416 118.832C19.5137 119.001 19.6471 119.115 19.8164 119.174C19.9857 119.232 20.1842 119.262 20.4121 119.262C20.5749 119.262 20.7311 119.252 20.8809 119.232C21.0306 119.213 21.151 119.193 21.2422 119.174L21.252 120.971C21.0566 121.029 20.8288 121.081 20.5684 121.127C20.3145 121.173 20.0215 121.195 19.6895 121.195C19.1491 121.195 18.6706 121.101 18.2539 120.912C17.8372 120.717 17.5117 120.401 17.2773 119.965C17.043 119.529 16.9258 118.949 16.9258 118.227V107.846ZM30.6387 121.195C29.8574 121.195 29.151 121.068 28.5195 120.814C27.8945 120.554 27.3607 120.193 26.918 119.73C26.4818 119.268 26.1465 118.725 25.9121 118.1C25.6777 117.475 25.5605 116.801 25.5605 116.078V115.688C25.5605 114.861 25.681 114.112 25.9219 113.441C26.1628 112.771 26.498 112.198 26.9277 111.723C27.3574 111.241 27.8652 110.873 28.4512 110.619C29.0371 110.365 29.6719 110.238 30.3555 110.238C31.1107 110.238 31.7715 110.365 32.3379 110.619C32.9043 110.873 33.373 111.231 33.7441 111.693C34.1217 112.149 34.4017 112.693 34.584 113.324C34.7728 113.956 34.8672 114.652 34.8672 115.414V116.42H26.7031V114.73H32.543V114.545C32.5299 114.122 32.4453 113.725 32.2891 113.354C32.1393 112.982 31.9082 112.683 31.5957 112.455C31.2832 112.227 30.8665 112.113 30.3457 112.113C29.9551 112.113 29.6068 112.198 29.3008 112.367C29.0013 112.53 28.7507 112.768 28.5488 113.08C28.347 113.393 28.1908 113.77 28.0801 114.213C27.9759 114.649 27.9238 115.141 27.9238 115.688V116.078C27.9238 116.54 27.9857 116.97 28.1094 117.367C28.2396 117.758 28.4284 118.1 28.6758 118.393C28.9232 118.686 29.2227 118.917 29.5742 119.086C29.9258 119.249 30.3262 119.33 30.7754 119.33C31.3418 119.33 31.8464 119.216 32.2891 118.988C32.7318 118.76 33.1159 118.438 33.4414 118.021L34.6816 119.223C34.4538 119.555 34.1576 119.874 33.793 120.18C33.4284 120.479 32.9824 120.723 32.4551 120.912C31.9342 121.101 31.3288 121.195 30.6387 121.195ZM42.0664 112.445V121H39.7129V110.434H41.959L42.0664 112.445ZM45.2988 110.365L45.2793 112.553C45.1361 112.527 44.9798 112.507 44.8105 112.494C44.6478 112.481 44.485 112.475 44.3223 112.475C43.9186 112.475 43.5638 112.533 43.2578 112.65C42.9518 112.761 42.6947 112.924 42.4863 113.139C42.2845 113.347 42.1283 113.601 42.0176 113.9C41.9069 114.2 41.8418 114.535 41.8223 114.906L41.2852 114.945C41.2852 114.281 41.3503 113.666 41.4805 113.1C41.6107 112.533 41.806 112.035 42.0664 111.605C42.3333 111.176 42.6654 110.84 43.0625 110.6C43.4661 110.359 43.9316 110.238 44.459 110.238C44.6022 110.238 44.7552 110.251 44.918 110.277C45.0872 110.303 45.2142 110.333 45.2988 110.365ZM52.293 106V121H49.9297V106H52.293ZM60.3906 110.434V121H58.0273V110.434H60.3906ZM57.8711 107.66C57.8711 107.302 57.9883 107.006 58.2227 106.771C58.4635 106.531 58.7956 106.41 59.2188 106.41C59.6354 106.41 59.9642 106.531 60.2051 106.771C60.446 107.006 60.5664 107.302 60.5664 107.66C60.5664 108.012 60.446 108.305 60.2051 108.539C59.9642 108.773 59.6354 108.891 59.2188 108.891C58.7956 108.891 58.4635 108.773 58.2227 108.539C57.9883 108.305 57.8711 108.012 57.8711 107.66ZM68.3027 112.689V121H65.9492V110.434H68.166L68.3027 112.689ZM67.8828 115.326L67.1211 115.316C67.1276 114.568 67.2318 113.881 67.4336 113.256C67.6419 112.631 67.9284 112.094 68.293 111.645C68.6641 111.195 69.1068 110.85 69.6211 110.609C70.1354 110.362 70.7083 110.238 71.3398 110.238C71.8477 110.238 72.3066 110.31 72.7168 110.453C73.1335 110.59 73.4883 110.814 73.7812 111.127C74.0807 111.439 74.3086 111.846 74.4648 112.348C74.6211 112.842 74.6992 113.451 74.6992 114.174V121H72.3359V114.164C72.3359 113.656 72.2611 113.256 72.1113 112.963C71.9681 112.663 71.7565 112.452 71.4766 112.328C71.2031 112.198 70.8613 112.133 70.4512 112.133C70.0475 112.133 69.6862 112.217 69.3672 112.387C69.0482 112.556 68.778 112.787 68.5566 113.08C68.3418 113.373 68.1758 113.712 68.0586 114.096C67.9414 114.48 67.8828 114.89 67.8828 115.326ZM86.8691 110.434H89.0078V120.707C89.0078 121.658 88.806 122.465 88.4023 123.129C87.9987 123.793 87.4355 124.298 86.7129 124.643C85.9902 124.994 85.1536 125.17 84.2031 125.17C83.7995 125.17 83.3503 125.111 82.8555 124.994C82.3672 124.877 81.8919 124.688 81.4297 124.428C80.974 124.174 80.5931 123.839 80.2871 123.422L81.3906 122.035C81.7682 122.484 82.1849 122.813 82.6406 123.021C83.0964 123.23 83.5749 123.334 84.0762 123.334C84.6165 123.334 85.0755 123.233 85.4531 123.031C85.8372 122.836 86.1335 122.546 86.3418 122.162C86.5501 121.778 86.6543 121.309 86.6543 120.756V112.826L86.8691 110.434ZM79.6914 115.834V115.629C79.6914 114.828 79.7891 114.099 79.9844 113.441C80.1797 112.777 80.4596 112.208 80.8242 111.732C81.1888 111.251 81.6315 110.883 82.1523 110.629C82.6732 110.368 83.2624 110.238 83.9199 110.238C84.6035 110.238 85.1862 110.362 85.668 110.609C86.1562 110.857 86.5632 111.212 86.8887 111.674C87.2142 112.13 87.4681 112.676 87.6504 113.314C87.8392 113.946 87.9792 114.649 88.0703 115.424V116.078C87.9857 116.833 87.8424 117.523 87.6406 118.148C87.4388 118.773 87.1719 119.314 86.8398 119.77C86.5078 120.225 86.0977 120.577 85.6094 120.824C85.1276 121.072 84.5579 121.195 83.9004 121.195C83.2559 121.195 82.6732 121.062 82.1523 120.795C81.638 120.528 81.1953 120.154 80.8242 119.672C80.4596 119.19 80.1797 118.624 79.9844 117.973C79.7891 117.315 79.6914 116.602 79.6914 115.834ZM82.0449 115.629V115.834C82.0449 116.316 82.0905 116.765 82.1816 117.182C82.2793 117.598 82.4258 117.966 82.6211 118.285C82.8229 118.598 83.0768 118.845 83.3828 119.027C83.6953 119.203 84.0632 119.291 84.4863 119.291C85.0397 119.291 85.4922 119.174 85.8438 118.939C86.2018 118.705 86.4753 118.389 86.6641 117.992C86.8594 117.589 86.9961 117.139 87.0742 116.645V114.877C87.0352 114.493 86.9538 114.135 86.8301 113.803C86.7129 113.471 86.5534 113.181 86.3516 112.934C86.1497 112.68 85.8958 112.484 85.5898 112.348C85.2839 112.204 84.9225 112.133 84.5059 112.133C84.0827 112.133 83.7148 112.224 83.4023 112.406C83.0898 112.589 82.8327 112.839 82.6309 113.158C82.4355 113.477 82.2891 113.848 82.1914 114.271C82.0938 114.695 82.0449 115.147 82.0449 115.629Z"
                fill="#666666"
              />
              <defs>
                <filter
                  id="filter0_d_20438_236807"
                  x="0"
                  y="0"
                  width="89"
                  height="89"
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
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_20438_236807"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_20438_236807"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_i_20438_236807"
                  x="44.3125"
                  y="10.9844"
                  width="26.4766"
                  height="30.4766"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_20438_236807"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <h1 className="font-light text-5xl mb-8 text-center">
            Investment Certificate
          </h1>
          <div>
            <h2>Dear {investmentDetailTable?.customerName}</h2>
          </div>

          <div>
            <p>
              I hope this message finds you well. This is the certificate of
              your Investment with Sterling Bank.
              <br />
              <br />
              Investment Details:.
            </p>

            <div className="p-10">
              <table className="min-w-full border border-black ">
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      A/C Number
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.accountNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Account Name
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.customerName || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Investment ID
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.investmentId || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">Address</td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.address || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Booking Date
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {`${new Date(
                        investmentDetailTable?.bookingDate
                      ).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Maturity Date
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {`${new Date(
                        investmentDetailTable?.maturityDate
                      ).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">Tenor</td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.tenor}{" "}
                      {
                        Interval[
                          investmentQueryData?.data?.facilityDetailsModel
                            ?.tenorUnit
                        ]
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Interest Rate
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.interestRate || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Interest Amount
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {numberFormatter(investmentDetailTable?.interestAmount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Principal Amount
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {numberFormatter(investmentDetailTable?.principalAmount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Amount at Maturity
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {numberFormatter(investmentDetailTable?.amountAtMaturity)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">Currency</td>
                    <td className="py-2 px-4 text-left border border-black">
                      {handleCurrencyName(
                        investmentDetailTable.currency,
                        currencies
                      ) || investmentDetailTable.currency}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-black">
                      Contract Status
                    </td>
                    <td className="py-2 px-4 text-left border border-black">
                      {investmentDetailTable?.contractStatus || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {taxData && (
              <p className="mb-2">
                {" "}
                Please note that <span className="capitalize">
                  {taxData}
                </span>{" "}
                is applicable on the interest amount upon maturity.
              </p>
            )}
            <p className="mb-2">
              {" "}
              {investmentDetailTable?.liquidation && (
                <p>
                  <br />
                  <br /> Upon pre-liquidation of this investment, interest shall
                  be calculated at a penal rate to be determined by the Bank
                  from time to time.
                </p>
              )}
            </p>
            <p className="mb-2">
              This is a computer generated slip and if issued without
              alteration, it does not require signature.
            </p>
            <p className="mb-2">
              Please confirm that the investment booking details agree with your
              records. If otherwise, please contact - Head, [name of team],
              Sterling towers, 20 Marina, Lagos, Nigeria 100221.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 py-10 mt-10 text-sm">
          <div className="max-w-[800px] mx-auto">
            <div className=" flex flex-col gap-7">
              <p className="text-center">
                If you have any questions, please email us at
                <a href="mailto:contact@sterling.ng">contact@sterling.ng</a> or
                visit our FAQS, you can also chat with a real live human during
                our operating hours. They can answer questions about your
                account
              </p>

              <p className="text-center">
                You have received this email as a registered user of
                sterlingholdco.ng You can unsubscribe from these emails here.
              </p>

              <div className="justify-center items-center flex gap-4">
                <a href="/">Head Office</a>
                <a href="/">How it Works</a>
                <a href="/">FAQs</a>
                <a href="/">T&Cs</a>
              </div>

              <p className="text-center">
                2261 Market Street #4667 Victoria Island, NG 110001 All rights
                reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PdfViewer;
