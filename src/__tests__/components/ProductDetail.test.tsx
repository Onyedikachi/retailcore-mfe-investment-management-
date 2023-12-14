import React from "react";
import ProductDetail from "../../components/modals/ProductDetail";
import { render } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-util";

describe("ProductDetail", () => {
    // beforeEach(() => {
    //     jest
    //         .spyOn(require("../../api/"), "u")
    //     // jest
    //     //     .spyOn(require("react-router-dom"), "useSearchParams")
    //     //     .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "" })]);
    // });
    it('should render correctly when isOpen is true', () => {
        // Arrange
        const isOpen = true;
        const setIsOpen = jest.fn();

        // Act
        renderWithProviders(
            <ProductDetail isOpen={isOpen} setIsOpen={setIsOpen} detail={{ id: "6789" }} />
        );

        // Assert
        expect(screen.getByTestId('product-view')).toBeInTheDocument();
    });
})