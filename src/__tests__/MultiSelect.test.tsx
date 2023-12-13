import { fireEvent, render, screen } from "@testing-library/react"
import MultiSelect from "../components/forms/MultiSelect"

describe("MultiSelect", () => {

    const options = [
        {
            name: "option 1",
            value: "option_1",
            id: "1"
        },
        {
            name: "option 2",
            value: "option_2",
            id: "2"
        }
    ]
    const getOptions = jest.fn()
    it("Renders without error", () => {
        render(<MultiSelect label="My Label" children="Test Child" getOptions={getOptions} />)
        expect(screen.getByText("Test Child")).toBeInTheDocument();
    })
    
    it("Renders options", () => {
        render(<MultiSelect label="My Label" children="Test Child" options={options} getOptions={getOptions} />)
        fireEvent.click(screen.getByText("Test Child"))
        expect(screen.getByText("option 1")).toBeInTheDocument()

        screen.debug()
    })
})