import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SelectedRequirementsTable from "../../components/SelectedRequirementsTable";

describe("SelectedRequirementsTable", () => {
    it("Renders without errors", () => {
        render(<SelectedRequirementsTable/>);
        expect(screen.getByTestId("selected-requirements-table")).toBeInTheDocument();
    })
    
    it("Renders selected requirement list", () => {
        const items = [
            {
                name: "Document 1",
                id: 1,
            },
            {
                name: "Document 2",
                id: 2,
            },
        ]
        render(<SelectedRequirementsTable tableItems={items} deleteTableItem={jest.fn()}/>);
        const documents = screen.queryAllByTestId("document-item");
        expect(documents.length).toBe(2);
        expect(documents.map(doc => doc.textContent)).toEqual(["Document 1", "Document 2"]);
    })
    
    it("Shows message when list is empty", () => {
        render(<SelectedRequirementsTable tableItems={[]} deleteTableItem={jest.fn()}/>);
        expect(screen.getByText("No document selected")).toBeInTheDocument();
    })
})