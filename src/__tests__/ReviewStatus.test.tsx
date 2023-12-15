import { render, screen } from "@testing-library/react";
import ReviewStatus from "../components/summary/ReviewStatus"

describe("ReviewStatus", () => {
    it("Renders without error", () => {
        render(<ReviewStatus status={1} text="Success"/>);
        expect(screen.getByText("Success")).toBeInTheDocument();
    })
    
    it("Render for rejection case", () => {
        render(<ReviewStatus status={3} text="Failed" reason="Something went wrong"/>);
        expect(screen.getByText("Failed")).toBeInTheDocument();
        expect(screen.getByText("Something went wrong")).toHaveClass("text-[#636363] text-base");
    })
})