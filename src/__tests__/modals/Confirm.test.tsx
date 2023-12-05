// // Confirm.test.js

// import React from "react";
// import { render, fireEvent, waitFor, screen } from "@testing-library/react";
// import { Confirm } from "../../components/modals";
// import { act } from "react-dom/test-utils";

// class ResizeObserver {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// }

// describe("Confirm Modal", () => {
//   window.ResizeObserver = ResizeObserver;
//   let props;
//   beforeEach(() => {
//     props = {
//       isOpen: true,
//       setIsOpen: jest.fn(),
//       onConfirm: jest.fn(),
//       setReason: jest.fn(),
//       onCancel: jest.fn(),
//       subtext: "text",
//     };
//   });
//   it("renders without crashing", () => {
//    act(() => {
//     render(
//       <Confirm
//         isOpen={false}
//         setIsOpen={jest.fn()}
//         text={""}
//         onConfirm={jest.fn()}
//       />
//     );
//   });
//   });

//   it("matches snapshot", () => {
//     const { asFragment } = render(
//       <Confirm
//         isOpen={false}
//         setIsOpen={function (isOpen: boolean): void {
//           throw new Error("Function not implemented.");
//         }}
//         text={""}
//         onConfirm={function (): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//     );
//     expect(asFragment()).toMatchSnapshot();
//   });

//   test("closes modal when cancel clicked", async () => {
//     render(<Confirm {...props} />);
//     fireEvent.click(await screen.findByTestId("cancel-btn"));

//     await waitFor(() => expect(props.setIsOpen).toHaveBeenCalledWith(false));
//   });
//   test("closes modal when cancel clicked", async () => {
//     render(<Confirm {...props} />);

//     fireEvent.click(await screen.findByTestId("cancel-btn-2"));
//     await waitFor(() => expect(props.setIsOpen).toHaveBeenCalledWith(false));
//   });

//   test("calls onConfirm when form submitted",async  () => {
//     render(<Confirm {...props} />);
//     expect(screen.getByText("text")).toBeInTheDocument();
//     fireEvent.click(await screen.findByTestId("submit-btn"));
//     expect(props.onConfirm).toHaveBeenCalled();
//   });
// });
