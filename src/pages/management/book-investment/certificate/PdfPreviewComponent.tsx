import { forwardRef } from 'react';
import { SterlingLogo } from "@app/assets/images";

type InvestmentDetailsType = {
  label: string;
  value: string;
}

type PdfViewerType = {
  investmentDetailTable: InvestmentDetailsType[];
}

export const PdfViewer = forwardRef<HTMLDivElement, PdfViewerType>(({ investmentDetailTable }, ref) => {
  return (
    <div ref={ref}>
      <div className="max-w-[800px] mx-auto">
        <div className="flex justify-end py-4 mb-10">
          <SterlingLogo />
        </div>
        <h1 className="font-light text-5xl mb-8 text-center">
          Investment Certificate
        </h1>
        <div>
          <h2>Dear [Customer's Name]</h2>
        </div>

        <div>
          <p>
            I hope this message finds you well. This is the certificate of your
            Investment with Sterling Bank.
            <br />
            <br />
            Investment Details:.
          </p>

          <div className="p-10">
            <table className="min-w-full border border-black ">
              <tbody>
                {investmentDetailTable.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border border-black">
                      {item.label}
                    </td>
                    <td className="py-2 px-4 border border-black">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p>
            <br />
            <br /> Please note that 10% Withholding Tax is applicable on the
            interest amount upon maturity.
            <br />
            <br /> Upon pre-liquidation of this investment, interest shall be
            calculated at a penal rate to be determined by the Bank from time to
            time.
            <br />
            <br /> This is a computer generated slip and if issued without
            alteration, it does not require signature.
            <br />
            <br /> Please confirm that the investment booking details agree with
            your records. If otherwise, please contact - Head, [name of team],
            Sterling Bank Plc, nth Floor, Sterling Towers, Marina, Lagos. .
          </p>
        </div>
      </div>

      <div className="bg-gray-100 py-10 mt-10">
        <div className="max-w-[800px] mx-auto">
          <div className=" flex flex-col gap-7">
            <p className="text-center">
              If you have any questions, please email us at help@xxyyyxy.com or
              visit our FAQS, you can also chat with a real live human during
              our operating hours. They can answer questions about your account
            </p>

            <p className="text-center">
              You have received this email as a registered user of xxyyyxx.com
              You can unsubscribe from these emails here.
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
});

export default PdfViewer;
