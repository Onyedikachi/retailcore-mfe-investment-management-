import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Rejection, { handleSuccess } from "../../components/modals/Rejection";
import { renderWithProviders } from "../../utils/test-util";

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
 
  
describe('handleSuccess', () => {

    // Sets the options for the ProductSearch component with the data from branchMembersData.
    it('should set options for ProductSearch component when userIsSuccess is true and branchMembersData is not null or undefined', () => {
      // Arrange
      const userIsSuccess = true;
      const setUsers = jest.fn();
      const branchMembersData = {
        data: [
          { fullname: 'John Doe', id: 1 },
          { fullname: 'Jane Smith', id: 2 },
        ],
      };

      // Act
      handleSuccess(userIsSuccess, setUsers, branchMembersData);

      // Assert
      expect(setUsers).toHaveBeenCalled();
    });

    // If userIsSuccess is false, setUsers should not be called.
    it('should not call setUsers when userIsSuccess is false', () => {
      // Arrange
      const userIsSuccess = false;
      const setUsers = jest.fn();
      const branchMembersData = {
        data: [
          { fullname: 'John Doe', id: 1 },
          { fullname: 'Jane Smith', id: 2 },
        ],
      };

      // Act
      handleSuccess(userIsSuccess, setUsers, branchMembersData);

      // Assert
      expect(setUsers).not.toHaveBeenCalled();
    });


    // If branchMembersData is an empty array, setUsers should be called with an empty array.
    it('should call setUsers with an empty array when branchMembersData is an empty array', () => {
      // Arrange
      const userIsSuccess = true;
      const setUsers = jest.fn();
      const branchMembersData = { data: [] };

      // Act
      handleSuccess(userIsSuccess, setUsers, branchMembersData);

      // Assert
      expect(setUsers).toHaveBeenCalledWith([]);
    });
});


describe('Rejection', () => {

    // Renders the component with the correct UI and props
    it('should render the Rejection modal with the correct UI and props', () => {
      // Initialize the necessary props and state
      const isOpen = true;
      const setIsOpen = jest.fn();
      const onConfirm = jest.fn();
      const setReason = jest.fn();
      const reason = "Test reason";
      const setRouteTo = jest.fn();
      const creatorId = "12345";

      // Render the Rejection component
      renderWithProviders(
        <Rejection
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={onConfirm}
          setReason={setReason}
          reason={reason}
          setRouteTo={setRouteTo}
          creatorId={creatorId}
        />
      );

      // Assert that the Rejection modal is rendered with the correct UI and props
      expect(screen.getByTestId("Layout")).toBeInTheDocument();
      expect(screen.getByText("Rejection")).toBeInTheDocument();
      expect(screen.getByLabelText("Provide reason for rejection")).toBeInTheDocument();
      expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    });

    // Displays the correct title and labels for the form inputs
    it('should display the correct title and labels for the form inputs', () => {
      // Initialize the necessary props and state
      const isOpen = true;
      const setIsOpen = jest.fn();
      const onConfirm = jest.fn();
      const setReason = jest.fn();
      const reason = "Test reason";
      const setRouteTo = jest.fn();
      const creatorId = "12345";

      // Render the Rejection component
      renderWithProviders(
        <Rejection
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={onConfirm}
          setReason={setReason}
          reason={reason}
          setRouteTo={setRouteTo}
          creatorId={creatorId}
        />
      );

      // Assert that the correct title and labels are displayed for the form inputs
      expect(screen.getByText("Rejection")).toBeInTheDocument();
      expect(screen.getByLabelText("Provide reason for rejection")).toBeInTheDocument();
    });
});
