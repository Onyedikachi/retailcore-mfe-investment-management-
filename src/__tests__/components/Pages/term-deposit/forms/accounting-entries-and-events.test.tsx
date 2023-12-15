import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AccountingEntriesAndEvents, {
  InputDivs,
} from "../../../../../components/pages/term-deposit/forms/accounting-entries-and-events";
import { GlInput } from "../../../../../components/forms";

import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe("AccountingEntriesAndEvents", () => {
  const formD = {
    productName: "",
    slogan: "",
    description: "",
    startDate: new Date(),
    endDate: null,
    currency: "NGN",
    customerCategory: null,
  };
  it("Renders without error", () => {
    act(() => {
      render(
        <AccountingEntriesAndEvents
          proceed={jest.fn}
          formData={formD}
          setFormData={jest.fn()}
          setDisabled={jest.fn()}
          initiateDraft={false}
        />
      );
    });
    expect(screen.getByTestId("entriesandevents")).toBeInTheDocument();
    expect(screen.getAllByTestId("input-div").length).toBe(3);
  });

//   test("handleClick updates mapOptions correctly", () => {
//     // Mock necessary functions or data for the useForm hook
//     const mockUseForm = jest.fn(() => ({
//       setValue: jest.fn(),
//     }));
//     jest.mock("react-hook-form", () => ({
//       useForm: mockUseForm,
//     }));
//     const handleClick = jest.fn();
//     const mockKey = 'mockKey' 
//    const mockMenuName = 'mockMenuName'
//    const mockSubname =  'mockSubname'
//    const errors = { mockKey: { message: "Invalid input" } };

//     // Mock other necessary props
//     const mockSetMapOptions = jest.fn();
//     render(
//         <GlInput
//         handleClick={handleClick}
//         inputName={mockKey}
//         defaultValue={
//           {
//         creditBalance: 1,
//         glAccountType: 0,
//         accountName: "Account 1",
//       }
//         }
//         register={jest.fn()}
//         trigger={jest.fn()}
//         errors={errors}
//         clearFields={jest.fn()}
//         />
//       );

 
//     // const mockCondition = true
//     const menu = 
//       {
//         name: "Current Assets [ASTCAS]",
//         subMenu: [
//           { name: "Current Account balances [ASTCAS23421]" },
//           { name: "Savings Account balances [ASTCAS23422]" },
//           { name: "Cash Receipt balances [ASTCAS23423]" },
//           { name: "Current Account balances [ASTCAS23424]" },
//           { name: "Current Account balances [ASTCAS23424]" },
//         ],
//         isOpen: false,
//       }
//     ;

//     userEvent.click(screen.getByTestId("gli-input-option")); // Replace with the actual test ID
//     expect(handleClick).toHaveBeenCalledWith(mockKey, menu, mockMenuName, mockSubname);

//     expect(mockUseForm().setValue).toHaveBeenCalledWith(
//       "mockKey",
//       "mockSubname"
//     );
//     // expect(mockSetMapOptions).toHaveBeenCalledWith([
//     //   {
//     //     accountName: "mockSubname", // Replace with the expected subname
//     //     accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     //     glAccountType: 0, // Replace with the expected glAccountType
//     //   },
//     // ]);

//     // // Simulate another user interaction to test the else block
//     // userEvent.click(screen.getByTestId("another-test-id")); // Replace with another test ID

//     // // Make assertions about the updated mapOptions in the else block
//     // expect(mockSetMapOptions).toHaveBeenCalledWith([
//     //   {
//     //     accountName: "mockSubname", // Replace with the expected subname
//     //     accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     //     glAccountType: 0, // Replace with the expected glAccountType
//     //   },
//     //   {
//     //     accountName: "mockSubname", // Replace with the expected subname
//     //     accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     //     glAccountType: 1, // Replace with another expected glAccountType
//     //   },
//     // ]);
//   });
});
