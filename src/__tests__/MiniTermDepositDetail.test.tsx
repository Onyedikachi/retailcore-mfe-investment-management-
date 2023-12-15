import { render, screen } from "@testing-library/react";
import MiniTermDepositDetail from "../components/summary/MiniTermDepositDetail"

describe("MiniTermDepositDetail", () => {
    it("renders without error", () => {
        render(<MiniTermDepositDetail detail={{name: "NewName"}}/>);
        expect(screen.getByText("NewName")).toBeInTheDocument();
    })
    
    it ("Indicates new data", () => {
        render(<MiniTermDepositDetail detail={{name: "NewName"}} oldData={{name: "OldName"}}/>);
        expect(screen.getByText("New")).toHaveClass("block text-success-500 pl-[2px]")
    })
})