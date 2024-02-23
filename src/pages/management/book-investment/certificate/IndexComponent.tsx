import React, { useContext, useMemo } from "react";
import { HiShare, HiPrinter } from "react-icons/hi";
import { PdfViewer } from "./PdfPreviewComponent";
import { usePDF } from 'react-to-pdf';
import { useParams } from 'react-router-dom';

import { useGetInvestmentCertificateQuery } from "@app/api";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { AppContext } from "@app/utils";


export default function IndexComponent() {
  const { toPDF, targetRef } = usePDF({ filename: 'certificate.pdf' });
  const { currencies } = useContext(AppContext);

  const handlePrint = () => toPDF()

  const { id } = useParams();






  const {
    data: investmentCertificateData,
    isSuccess: investmentCertificateIsSuccess,
    isError: investmentCertificateIsError,
    error: investmentCertificateError,
    isLoading,
  } = useGetInvestmentCertificateQuery({ BookingId: id }, { skip: !id });


  // const tableDetials =  


  const investmentDetailsTableData = useMemo(() => investmentCertificateData ? Object.entries(investmentCertificateData).map(([key, value]) => ({
    label: key,
    value: value ?? "",
  })) : [], [investmentCertificateData])

  const customerDetails = useMemo(() => investmentCertificateData, [investmentCertificateData])


  const formattedDate = customerDetails?.bookingDate && new Date(customerDetails?.bookingDate);
  const formattedDateTime = formattedDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const investDet = {
    accountName: "2000000032",
    accountNumber: "Annabel Thomas",
    address: null,
    amountAtMaturity: Number(99980.034).toLocaleString(),
    bookingDate: new Date("2024-01-23T12:58:51.516012Z").toLocaleDateString("en-US"),
    contractStatus: "Active",
    currency: handleCurrencyName(
      "57005ca4-ddf0-4d45-ba73-7317987a5c70",
      currencies
    ),
    customerName: "Annabel Thomas",
    interestAmount: Number(99980).toLocaleString(),
    interestRate: Number(99980).toLocaleString(),
    investmentId: "INV-LE-AN-20-00021",
    maturityDate: new Date("2024-01-23T21:41:07.533647Z").toLocaleDateString("en-US"),
    principalAmount: Number(99980).toLocaleString(),
    tenor: "1",
    liquidation: false
  }
  return (
    <div className="flex gap-x-5 w-full flex-1 p-8">
      <div className="bg-white pt-6 px-[30px] py-4 border border-[#E5E9EB] rounded-lg flex-1 w-full pb-16">
        <div className="flex justify-end gap-5">
          <button
            onClick={handlePrint}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiPrinter className="text-lg" /> Print
          </button>
          <button
            onClick={() => { }}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <HiShare className="text-lg" /> Share
          </button>
        </div>

        <div className="h-[649px]	my-auto py-10	 overflow-auto w-full">
          {/* {investmentDetailsTableData?.length && customerDetails?.customerName ? <PdfViewer ref={targetRef} customerName={customerDetails?.customerName} investmentDetailTable={investmentDetailsTableData} /> : null
          } */}

          {/* <PdfViewer ref={targetRef} investmentDetailTable={investDet} /> */}

        </div>
        <div className="flex justify-end gap-5">
          <button
            data-testid="refresh-btn"
            onClick={() => { }}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.4332 1.09184C11.4334 0.864339 11.3508 0.642467 11.197 0.457273C11.0431 0.272079 10.8257 0.132831 10.5751 0.0590163C10.3245 -0.0147986 10.0533 -0.0194868 9.79949 0.045608C9.54565 0.110703 9.32186 0.242323 9.15944 0.422049L0.267636 10.2398C0.0941762 10.4313 0 10.667 0 10.9096C0 11.1522 0.0941762 11.3879 0.267636 11.5794L9.15944 21.3972C9.32186 21.5769 9.54565 21.7085 9.79949 21.7736C10.0533 21.8387 10.3245 21.8341 10.5751 21.7602C10.8257 21.6864 11.0431 21.5472 11.197 21.362C11.3508 21.1768 11.4334 20.9549 11.4332 20.7274V16.3749C18.2659 16.497 21.5483 17.6108 23.1971 18.8217C24.7646 19.9725 25.0516 21.3263 25.3502 22.7444L25.4276 23.1099C25.4846 23.3714 25.6509 23.6059 25.8953 23.7695C26.1396 23.933 26.4451 24.0143 26.7543 23.9979C27.0635 23.9816 27.3551 23.8688 27.5742 23.6807C27.7933 23.4926 27.9248 23.2423 27.944 22.9768C28.1612 19.9791 27.8348 15.6353 25.3692 12.0016C22.976 8.47482 18.6661 5.76292 11.4332 5.4793V1.09184Z"
                fill="#CF2A2A"
              />
            </svg>
            Return to dashboard
          </button>
          <button
            data-testid="refresh-btn"
            onClick={() => { }}
            className="flex whitespace-nowrap gap-x-2 items-center bg-transparent border-none text-[#636363] text-base"
          >
            <svg
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3636 10.5H21.6364C21.9739 10.5 22.2976 10.342 22.5363 10.0607C22.775 9.77936 22.9091 9.39783 22.9091 9V7.5C22.9091 7.10217 22.775 6.72064 22.5363 6.43934C22.2976 6.15803 21.9739 6 21.6364 6H20.3636C20.0261 6 19.7024 6.15803 19.4637 6.43934C19.225 6.72064 19.0909 7.10217 19.0909 7.5V9C19.0909 9.39783 19.225 9.77936 19.4637 10.0607C19.7024 10.342 20.0261 10.5 20.3636 10.5ZM6.36364 12H12.7273C13.0648 12 13.3885 11.842 13.6272 11.5607C13.8659 11.2794 14 10.8978 14 10.5C14 10.1022 13.8659 9.72064 13.6272 9.43934C13.3885 9.15804 13.0648 9 12.7273 9H6.36364C6.02609 9 5.70237 9.15804 5.46368 9.43934C5.225 9.72064 5.09091 10.1022 5.09091 10.5C5.09091 10.8978 5.225 11.2794 5.46368 11.5607C5.70237 11.842 6.02609 12 6.36364 12ZM26.7273 0H1.27273C0.935179 0 0.611456 0.158036 0.372773 0.43934C0.13409 0.720645 0 1.10218 0 1.5V22.5C0 22.8978 0.13409 23.2794 0.372773 23.5607C0.611456 23.842 0.935179 24 1.27273 24H26.7273C27.0648 24 27.3885 23.842 27.6272 23.5607C27.8659 23.2794 28 22.8978 28 22.5V1.5C28 1.10218 27.8659 0.720645 27.6272 0.43934C27.3885 0.158036 27.0648 0 26.7273 0ZM26.7273 12.3636C26.7273 17.9618 22.1891 22.5 16.5909 22.5H13.6272H11.4148C5.7594 22.5 1.12259 18.0158 0.933333 12.3636C0.933333 6.36381 5.79715 1.5 11.797 1.5H15.8636C21.8635 1.5 26.7273 6.36381 26.7273 12.3636ZM6.36364 18H12.7273C13.0648 18 13.3885 17.842 13.6272 17.5607C13.8659 17.2794 14 16.8978 14 16.5C14 16.1022 13.8659 15.7206 13.6272 15.4393C13.3885 15.158 13.0648 15 12.7273 15H6.36364C6.02609 15 5.70237 15.158 5.46368 15.4393C5.225 15.7206 5.09091 16.1022 5.09091 16.5C5.09091 16.8978 5.225 17.2794 5.46368 17.5607C5.70237 17.842 6.02609 18 6.36364 18Z"
                fill="#CF2A2A"
              />
            </svg>
            Create new investment
          </button>
        </div>
      </div>
      <div className="bg-white pt-6 px-[30px] py-4 border border-[#E5E9EB] rounded-lg  w-[300px] pb-16">
        <div className="flex-col gap-5">
          <h1 className="text-[#747373] text-base font-medium mb-7 uppercase">
            INVESTMENT CERTIFICATE
          </h1>

          <div className="gap-3 text-sm">
            <p>Initiator</p>
            {/* <p>{customerDetails?.customerName}</p> */}
          </div>

          <div className="gap-3 text-sm mt-6">
            <p>Initiation date and time</p>
            {/* <p>{formattedDateTime}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
