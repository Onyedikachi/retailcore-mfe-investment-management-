import React from "react";

export function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex justify-end py-4 mb-10">
        <img className="w-10 h-10" alt="logo" />
      </div>
      <h1 className="font-light text-5xl mb-8 text-center">
        Investment Certificate
      </h1>
      <div>
        <h2>Dear [Customer's Name]</h2>
      </div>
    </div>
  );
}
