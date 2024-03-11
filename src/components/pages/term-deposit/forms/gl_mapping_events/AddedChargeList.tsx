import { useEffect } from "react";
import { FaEdit, FaEye, FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export default ({ selectedCharges, setValues, values, event, charges, setValue }) => {
  const removeCharge = (option) => {
    const new_charges = [...selectedCharges];
    new_charges.splice(
      new_charges.indexOf(new_charges.find((id) => id === option)),
      1
    );

    const new_values = { ...values };
    new_values[event].applicableCharges = new_charges;
    setValue(event, new_values[event]);
    setValues(new_values);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <table className="w-full max-w-[700px] mt-6 text-left">
      <thead className="bg-white border-b border-[#C2C9D1]/30">
        <tr>
          <th className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 before:content-[''] before:w-1 before:h-[18px] before:absolute before:border-r before:left-0 before:top-1/2 before:translate-y-[-50%] before:border-[#AAAAAA]/75  border-b border-[#C2C9D1]/30 whitespace-nowrap">
            <span>CHARGE</span>
          </th>

          <th className="relative uppercase font-bold text-sm text-[#AAAAAA] px-4 py-5 border-b border-[#C2C9D1]/30 whitespace-nowrap"></th>
        </tr>
      </thead>
      <tbody>
        {charges?.data?.records
          .filter((item) => selectedCharges.find((id) => id === item.charge_id))
          .map((item, index) => {
            return (
              <tr
                key={item.charge_id}
                className="bg-[#DB353905] border-b border-[#C2C9D1]/30 last-of-type:border-none"
              >
                <td className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative">
                  {" "}
                  {item.name}
                </td>
                <td className="text-base font-medium text-[#636363] px-4 py-5 capitalize max-w-[290px] truncate relative flex flex-row justify-end gap-x-4">
                  <span
                   role="button" tabIndex={0}
                  onClick={() => setSearchParams((prevParams: URLSearchParams) => {
                    const updatedParams = new URLSearchParams(prevParams);
                    updatedParams.set('charge', item.charge_id);
                    return updatedParams;
                })}
                

                    className="h-[30px] w-[30px] shadow-md bg-white flex justify-center items-center rounded-md"
                  >
                    <FaEye className="text-danger-500" />
                  </span>
                  <span
                    role="button" tabIndex={0}
                    onClick={() => removeCharge(item.charge_id)}
                    className="h-[30px] w-[30px] shadow-md bg-white   flex justify-center items-center rounded-md"
                  >
                    <FaTimes className="text-danger-500" />
                  </span>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
