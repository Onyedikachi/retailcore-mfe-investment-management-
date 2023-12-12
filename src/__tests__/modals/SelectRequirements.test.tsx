import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import { SelectRequirements } from "../../components/modals";
import React from "react";
import { act } from "react-dom/test-utils";

describe ("SelectRequirements", () => {

    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      }

    it("Does not show when 'isOpen' == false", async() => {
        render(<SelectRequirements isOpen={false}/>);
        const val = await screen.queryByTestId("select-requirement-modal");
        expect(val).toBe(null)
    })
    it("Shows when 'isOpen' == true", () => {
        render(<SelectRequirements header="SampleHeader" isOpen={true}/>);
        act(() => {
            const modal = screen.getByTestId("select-requirement-modal");
            expect(modal).toBeInTheDocument();
            expect(screen.getByText("SampleHeader")).toBeInTheDocument();
        })
    })
    window.ResizeObserver = ResizeObserver;
    it("Displays child component", () => {
        render(<SelectRequirements  header="SampleHeader" isOpen={true} children={(<span>SampleChild</span>)}/>);
        act(() => {
            expect(screen.getByText("SampleChild")).toBeInTheDocument();
        })
    })
    it("Clicking close button closes modal", () => {
        let val = true;
        render(<SelectRequirements setIsOpen={() => val=false}  header="SampleHeader" isOpen={val} children={(<span>SampleChild</span>)}/>);
        const closeButton = screen.getByTestId("cancel-btn");
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        act(() => {
            // screen.debug();
        })
    })

})