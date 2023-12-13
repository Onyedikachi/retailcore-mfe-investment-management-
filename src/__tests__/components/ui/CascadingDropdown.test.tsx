// import React from 'react'
// import { fireEvent, render, screen, } from "@testing-library/react";
// import CascadingDropdown from "../../../components/ui/CasadingDropdown";
// import { BrowserRouter } from 'react-router-dom';

// const ddItems = [
//     {
//         label: "Option 1",
//         link: "/",
//         hasDivider: false,
//         subMenu: []
//     },
//     {
//         label: "Option 2",
//         link: "/",
//         hasDivider: true,
//         subMenu: []
//     }
// ]

// describe("CascadingDropdown", () => {
//     it("Renders without error", () => {
//         render(<CascadingDropdown label="DropdownOne" labelClass='test-class' />)
//         expect(screen.getByText("DropdownOne")).toBeInTheDocument();
//         screen.debug();
//     })
//     it("Renders without error2", () => {
//         render(
//             <CascadingDropdown label="DropdownOne" labelClass='test-class' items={ddItems} />
//         )
//         expect(screen.getByText("DropdownOne")).toBeInTheDocument();
//         fireEvent.click(screen.getByText("DropdownOne"));
//         screen.debug();
//     })
// })