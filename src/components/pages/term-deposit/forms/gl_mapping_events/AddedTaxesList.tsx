import { useEffect } from "react";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default ({ selectedTaxes, setFormData, values, event, taxes,setValue }) => {
  console.log("🚀 ~ selectedTaxes:", selectedTaxes)
  const removeTax = (option) => {
    const new_taxes = [...selectedTaxes];
    new_taxes.splice(
      new_taxes.indexOf(new_taxes.find((id) => id === option)),
      1
    );
    const new_values = { ...values };
    new_values[event].applicableTaxes = new_taxes;
    setValue(event, new_values[event]);
    setFormData(new_values);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   console.log("taxes = ", taxes);
  //   console.log(
  //     taxes.data.records.filter((item) =>
  //       selectedTaxes.find((id) => id === item.tax_id)
  //     ),
  //     selectedTaxes
  //   );
  // }, [taxes, selectedTaxes]);

  return (
    <table className="w-full max-w-[700px] mt-6 text-left">
      <thead className="bg-white border-b border-[#C2C9D1]/30">
        <tr>
          <th className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 before:content-[''] before:w-1 before:h-[18px] before:absolute before:border-r before:left-0 before:top-1/2 before:translate-y-[-50%] before:border-[#AAAAAA]/75  border-b border-[#C2C9D1]/30 whitespace-nowrap">
            <span className="">Tax</span>
          </th>
          <th className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 before:content-[''] before:w-1 before:h-[18px] before:absolute before:border-r before:left-0 before:top-1/2 before:translate-y-[-50%] before:border-[#AAAAAA]/75  border-b border-[#C2C9D1]/30 whitespace-nowrap">
            <span className="">Value</span>
          </th>
          <th className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5  border-b border-[#C2C9D1]/30 whitespace-nowrap"></th>
        </tr>
      </thead>
      <tbody>
        {taxes?.data?.records
          .filter((item) => selectedTaxes.find((id) => id === item.tax_id))
          .map((item) => {
            return (
              <tr
                key={item.tax_id}
                className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
              >
                <td className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative">
                  <span className=" capitalize">{item.name}</span>
                </td>
                <td className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative">
                  <span className="">{item?.tax_values?.[0]?.tax_amount}</span>
                </td>
                <td className="text-base font-medium text-[#636363] px-4 py-5 flex flex-row gap-x-4 justify-end">
                  <span
                    onClick={() => setSearchParams({ tax: item.tax_id })}
                    className="h-[30px] w-[30px] shadow-md bg-white flex justify-center items-center rounded-md"
                  >
                    <FaEye className="text-danger-500" />
                  </span>
                  <span
                    onClick={() => removeTax(item.tax_id)}
                    className="h-[30px] w-[30px] shadow-md bg-white   flex justify-center items-center rounded-md"
                  >
                    <FaTimes className="text-danger-500" />
                  </span>
                </td>
              </tr>
            );
          })}
      </tbody>
      <div></div>
    </table>
  );
};
