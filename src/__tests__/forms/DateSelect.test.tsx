import { fireEvent, render, screen } from "@testing-library/react";
import { DateSelect } from "../../components/forms";

describe("DateSelect", () => {
    const onChangeDate = jest.fn();
    it ("renders without errors", () => {
        render(<DateSelect onChangeDate={onChangeDate}>Set Date</DateSelect>);
        expect(screen.getByText("Set Date")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Set Date"))
    })
    
    it("Shows datePicker on button click", () => {
        render(<DateSelect onChangeDate={onChangeDate}>Set Date</DateSelect>);

        fireEvent.click(screen.getByText("Set Date"))
        let days = screen.queryAllByRole("option")
        console.log(days.length)

    })
})