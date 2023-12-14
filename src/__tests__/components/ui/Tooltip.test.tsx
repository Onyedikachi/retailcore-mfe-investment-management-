import { render, screen } from "@testing-library/react"
import Tooltip from "../../../components/ui/Tooltip"

describe("Tooltip", () => {
    it("Should render without error", () => {
        render(<Tooltip title={"title"}/>)
        expect(screen.getByTestId("tooltip")).toHaveTextContent("title");
    })
})