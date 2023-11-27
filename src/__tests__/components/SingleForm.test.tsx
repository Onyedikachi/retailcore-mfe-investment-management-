import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import SingleForm, {
  handleName,
  handleValidatingName,
} from "../../components/SingleForm";
import { useValidateNameMutation } from "../../api";
import { renderWithProviders } from "../../utils/test-util";
import { useParams, useLocation } from "../../__mocks__/react-router-dom";
import { store } from "../../config/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "branc111h_modify", // Change these values as needed for your test cases
   
  }),
}));

describe("SingleForm", () => {
  const formData = {
    name: "Test",
    description: "",
    draft: false,
    code: "",
    type: "single",
  };

  // Tests that the component renders with default props
  it("should render the component with default props", () => {
    renderWithProviders(
      <SingleForm
        formData={formData}
        errors={null}
        register={() => {}}
        clearErrors={jest.fn()}
        setNameLoading={jest.fn()}
        setError={jest.fn()}
        error={""}
        setValue={jest.fn()}
        watch={jest.fn()}
        setDisabled={jest.fn()}
        uploadData={[{ name: "Test" }]}
        setLocationError={jest.fn()}
        index={0}
        assignError={jest.fn()}
      />
    );
  });
});

describe("handleValidatingName", () => {
  // Tests that handleValidatingName sets isNameOkay to false and setError to nameError message when nameIsError is true
  it("should set isNameOkay to false and setError to nameError message when nameIsError is true", () => {
    const setIsNameOkay = jest.fn();
    const setError = jest.fn();
    const nameError = { message: { data: { name: ["error message"] } } };
    handleValidatingName(
      false,
      setIsNameOkay,
      true,
      setError,
      nameError,
      jest.fn(),
      50
    );
    expect(setIsNameOkay).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalled();
  });

  // Tests that handleValidatingName handles null nameError gracefully and does not throw errors
  it("should handle null nameError gracefully and not throw errors", () => {
    const setIsNameOkay = jest.fn();
    const setError = jest.fn();
    handleValidatingName(
      false,
      setIsNameOkay,
      true,
      setError,
      null,
      jest.fn(),
      50
    );
    expect(setIsNameOkay).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith(undefined);
  });

  // Tests that handleValidatingName handles null nameError.data gracefully and does not throw errors
  it("should handle null nameError.data gracefully and not throw errors", () => {
    const setIsNameOkay = jest.fn();
    const setError = jest.fn();
    const nameError = { message: {} };
    handleValidatingName(
      false,
      setIsNameOkay,
      true,
      setError,
      nameError,
      jest.fn(),
      50
    );
    expect(setIsNameOkay).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith(undefined);
  });

  // Tests that handleValidatingName calls setIsNameOkay with the correct arguments
  it("should call setIsNameOkay with the correct arguments", () => {
    const setIsNameOkay = jest.fn();
    const setError = jest.fn();
    handleValidatingName(
      true,
      setIsNameOkay,
      false,
      setError,
      null,
      jest.fn(),
      40
    );
    expect(setIsNameOkay).toHaveBeenCalledWith(true);
  });

  // Tests that handleValidatingName calls setError with the correct arguments
  it("should call setError with the correct arguments", () => {
    const setIsNameOkay = jest.fn();
    const setError = jest.fn();
    const nameError = { message: { data: { name: ["error message"] } } };
    handleValidatingName(
      false,
      setIsNameOkay,
      true,
      setError,
      nameError,
      jest.fn(),
      50
    );
    expect(setError).toHaveBeenCalled();
  });
});

describe("handleName", () => {
  // Tests that the function sets the error message to an empty string, sets isNameOkay to false, and setsDisabled to true when the length of the branch name is less than or equal to 3 characters
  it("should set error message, isNameOkay, and setDisabled when branch name length is less than or equal to 3 characters", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "abc";
    const formData = {};
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const uploadData = [];
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      uploadData,
      setCurrentName,
      jest.fn(),
      500,
      "1",
      "h87t78t68g"
    );

    // Assert
    expect(setError).toHaveBeenCalledWith("");
    expect(setIsNameOkay).toHaveBeenCalledWith(false);
    expect(setDisabled).toHaveBeenCalledWith(true);
  });

  // Tests that the function sets the error message to "Branch name is not available, Please choose another", sets isNameOkay to false, and setsDisabled to true when the branch name is in the list of existing branch names
  it("should set error message, isNameOkay, and setDisabled when branch name is in the list of existing branch names", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "existingName";
    const formData = {};
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const uploadData = [{ name: "existingName" }];
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      // @ts-ignore
      uploadData,
      setCurrentName,
      jest.fn(),
      500,
      1,
      "h87t78t68g"
    );

    // Assert
    expect(setError).toHaveBeenCalledWith(
      "Branch name is not available, Please choose another"
    );
    expect(setIsNameOkay).toHaveBeenCalledWith(false);
    expect(setDisabled).toHaveBeenCalledWith(true);
  });
});
