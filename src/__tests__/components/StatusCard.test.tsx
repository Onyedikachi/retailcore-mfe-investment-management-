import StatusCard, { StatusButton, StatusCategoryButton, handleActiveType, handlePermission, sortOptions } from "../../components/StatusCard";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("StatusCard", () => {
    it("Renders without error", () => {
        render(<StatusCard handleChange={jest.fn()} />)
        expect(screen.getByTestId("rejected")).toBeInTheDocument();
    })

})

describe("StatusButton", () => {
    it("Renders without error", () => {
        render(<StatusButton item={{ type: "rejected" }} />)
        expect(screen.getByText("rejected")).toBeInTheDocument();

    })
    it("Shows spinner while loading", () => {
        render(<StatusButton item={{ type: "rejected" }} isLoading={true} />)
        act(() => {
            expect(screen.queryByText("rejected")).toBeInTheDocument();
            expect(screen.getByTestId("loading")).toBeInTheDocument();
        })

    })
})

describe("sortOptions", () => {
    const expectedProductsResult = [
        { id: 0, type: 'all', color: '#252C32' },
        { id: 2, type: 'active', color: '#2FB755' },
        { id: 1, type: 'inactive', color: '#AAAAAA' }
    ]
    const expectedRequestsResult = [
        { id: null, type: 'all', color: '#252C32' },
        { id: 2, type: 'approved', color: '#2FB755' },
        { id: 1, type: 'pending', color: '#3FA2F7' },
        { id: 3, type: 'rejected', color: '#CF2A2A' }
      ]

    it("Sorts and returns expected options in 'all products' category", () => {
        const result = sortOptions("all products", true);
        console.log(result)
        expect(result).toStrictEqual(expectedProductsResult);
    })

    it("Sorts and returns expected options in 'requests' category", () => {
        const result = sortOptions("requests", true);
        console.log(result)
        expect(result).toStrictEqual(expectedRequestsResult);
    })
})

describe("StatusCategoryButton", () => {
    it("Renders without error", () => {
        render(<StatusCategoryButton item={{type: 'rejected'}} category="rejected"/>)
        expect(screen.getByTestId("rejected-btn")).toHaveClass("!bg-white font-semibold text-[20px] px-4 py-[19px] text-[18px] text-[#636363] text-left flex gap-x-[5px] items-center leading-[24px] w-full capitalize border-[#D0D5DD] border-b last-of-type:border-b-0");
        expect(screen.getByTestId("rejected-btn")).toHaveTextContent("rejected");
    })
})

describe("handleActiveType", () => {
    const setStatus = jest.fn()
    it(`Sets status to "" when activeType === all `, () => {
        handleActiveType("all", setStatus);
        expect(setStatus).toBeCalledWith("");
    })

    it("Sets status according to various activeTypes", () => {
        const types = ["active", "inactive", "approved", "pending", "draft", "rejected", "in-review", "in-issue"]
        types.forEach(type => {
            handleActiveType(type, setStatus);
            expect(setStatus).toBeCalledWith(type.charAt(0).toUpperCase())
        })

    })
})