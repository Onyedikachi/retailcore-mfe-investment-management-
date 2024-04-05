import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductInformation, { handleCheckedRequirement, handleSelectAllChange, requirementDeleteHandler, addDocument } from "../components/pages/term-deposit/forms/customer-eligibilty-criteria";
import { renderWithProviders } from "../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import CustomerEligibilityCriteria from "../components/pages/term-deposit/forms/customer-eligibilty-criteria";
import React from "react";

const fData = {
  customerCategory: "",
  ageGroupMin: "",
  ageGroupMax: "",
  customerType: ""
}

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  useNavigate: jest.fn(),
  useParams: jest.fn().mockReturnValue({ process: "continue" }),
}));
const navigate = jest.fn();

describe("ProductInformation", () => {
  it("Renders without error", async () => {
    const form = renderWithProviders(<CustomerEligibilityCriteria proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={jest.fn()} initiateDraft={null} />)
    await waitFor(() => {
      expect(form).toMatchSnapshot()
    })
  })
})

describe("handleCheckedRequirements", () => {
  // Toggling a document that is not in the list of toggled requirements should add it to the list.
  it('should add document to toggled requirements when it is not already in the list', () => {
    const document = { id: 1, name: "Document 1" };
    const toggledRequirements = [{ id: 2, name: "Document 2" }];
    const setToggledRequirements = jest.fn();

    handleCheckedRequirement({ document, toggledRequirements, setToggledRequirements });

    expect(setToggledRequirements).toHaveBeenCalledWith([...toggledRequirements, document]);
  });

  // Toggling a document that is already in the list of toggled requirements should remove it from the list.
  it('should remove document from toggled requirements when it is already in the list', () => {
    const document = { id: 1, name: "Document 1" };
    const toggledRequirements = [{ id: 1, name: "Document 1" }, { id: 2, name: "Document 2" }];
    const setToggledRequirements = jest.fn();

    handleCheckedRequirement({ document, toggledRequirements, setToggledRequirements });

    expect(setToggledRequirements).toHaveBeenCalledWith(toggledRequirements.filter((d) => d.id !== document.id));
  });
})

describe("handleSelectAllChange", () => {
  // When selectAll is true, set toggledRequirements to an empty array and set selectAll to false
  // When selectAll is true, set toggledRequirements to an empty array and set selectAll to false
  it('should set toggledRequirements to an empty array and set selectAll to false when selectAll is true', () => {
    const setToggledRequirements = jest.fn();
    const documents = [
      { id: 1, name: "Document 1" },
      { id: 2, name: "Document 2" },
      { id: 3, name: "Document 3" },
    ];
    let selectAll = true;

    handleSelectAllChange({
      setToggledRequirements,
      documents,
      selectAll,
      setSelectAll: (value) => {
        selectAll = value;
      },
    });

    expect(setToggledRequirements).toHaveBeenCalledWith([]);
    expect(selectAll).toBe(false);
  });

  // When selectAll is false, set toggledRequirements to all documents and set selectAll to true
  it('should set toggledRequirements to all documents and set selectAll to true when selectAll is false', () => {
    const setToggledRequirements = jest.fn();
    const documents = [
      { id: 1, name: "Document 1" },
      { id: 2, name: "Document 2" },
      { id: 3, name: "Document 3" },
    ];
    let selectAll = false;

    handleSelectAllChange({
      setToggledRequirements,
      documents,
      selectAll,
      setSelectAll: (value) => {
        selectAll = value;
      },
    });

    expect(setToggledRequirements).toHaveBeenCalledWith(documents);
    expect(selectAll).toBe(true);
  });
})

describe("requirementDeleteHandler", () => {
  // The function correctly filters out the item to delete from the selected requirements array.
  it('should filter out the item to delete from the selected requirements array', () => {
    const itemToDelete = "document1";
    const selectedRequirements = ["document1", "document2", "document3"];
    const setSelectedRequirements = (updatedRequirements) => {
      expect(updatedRequirements).toEqual(["document2", "document3"]);
    };

    requirementDeleteHandler({ itemToDelete, selectedRequirements, setSelectedRequirements });
  });

  // The function correctly updates the state with the new array.
  it('should update the state with the new array', () => {
    const itemToDelete = "document1";
    const selectedRequirements = ["document1", "document2", "document3"];
    const setSelectedRequirements = (updatedRequirements) => {
      expect(updatedRequirements).toEqual(["document2", "document3"]);
    };

    requirementDeleteHandler({ itemToDelete, selectedRequirements, setSelectedRequirements });
  });
})


describe('addDocument', () => {

  // Adds a new document to the list of documents if the new document is not empty and does not already exist in the list
  it('should add a new document when the new document is not empty and does not already exist in the list', () => {
    // Arrange
    const newDocument = "New Document";
    const documents = [{ id: "1", name: "Document 1" }, { id: "2", name: "Document 2" }];
    const setNewDocument = jest.fn();
    const setIsAdd = jest.fn();
    const setDocuments = jest.fn();

    // Act
    addDocument({ newDocument, documents, setNewDocument, setIsAdd, setDocuments });

    // Assert
    expect(setDocuments).toHaveBeenCalledWith([...documents, { id: newDocument, name: newDocument }]);
    expect(setNewDocument).toHaveBeenCalledWith("");
    expect(setIsAdd).toHaveBeenCalledWith(false);
  });

  // Does nothing if the new document is empty
  it('should do nothing when the new document is empty', () => {
    // Arrange
    const newDocument = "";
    const documents = [{ id: "1", name: "Document 1" }, { id: "2", name: "Document 2" }];
    const setNewDocument = jest.fn();
    const setIsAdd = jest.fn();
    const setDocuments = jest.fn();

    // Act
    addDocument({ newDocument, documents, setNewDocument, setIsAdd, setDocuments });

    // Assert
    expect(setDocuments).not.toHaveBeenCalled();
    expect(setNewDocument).not.toHaveBeenCalled();
    expect(setIsAdd).not.toHaveBeenCalled();
  });
});
