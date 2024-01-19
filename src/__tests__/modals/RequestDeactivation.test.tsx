import React from "react";
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event"
import RequestDeactivation from "../../components/modals/RequestDeactivation";
import { renderWithProviders } from "../../utils/test-util";
import { useDeactivateProductMutation } from "../../api";
// import { useDeactivateProductMutation } from "../../api";

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
window.ResizeObserver = ResizeObserver;


describe('RequestDeactivation', () => {

  // Renders the component without crashing
  it('should render the component without crashing', () => {
    renderWithProviders(<RequestDeactivation isOpen={true} setIsOpen={jest.fn()} detail={{ id: "12345", name: "Product A" }} />);
  });

  // Displays the deactivation request form
  it('should display the deactivation request form', () => {
    renderWithProviders(<RequestDeactivation isOpen={true} setIsOpen={jest.fn()} detail={{ id: "12345", name: "Product A" }} />);
    const formElement = screen.getByTestId('Layout');
    expect(formElement).toBeInTheDocument();
  });

  // Allows user to input reason for deactivation
  it('should allow user to input reason for deactivation', async () => {
    jest.mock("../../api", () => {
      const reject = jest.fn()
      return {
        useDeactivateProductMutation: jest.fn().mockReturnValue({ handleReject: reject, isSuccess: false, isError: false, error: null, isLoading: false })
      }
    })
    renderWithProviders(<RequestDeactivation isOpen={true} setIsOpen={jest.fn()} detail={{ id: "12345", name: "Product A" }} />);
    const reasonInput = screen.getByTestId('reason-input') as HTMLElement;
    await userEvent.type(reasonInput, "Test reason");
    expect(reasonInput.value).toBe('Test reason');
    const submitButton = screen.getByTestId('submit-btn');
    const fileInput = screen.getByTestId('input');
    act(() => {
      fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.png', { type: 'image/png' })] } });
    })
    await userEvent.click(submitButton);
    screen.debug();
    // await cleack
  });

  // Displays an error message when the deactivation request fails
  it('should display an error message when the deactivation request fails', async () => {
    renderWithProviders(<RequestDeactivation isOpen={true} setIsOpen={jest.fn()} detail={{ id: "12345", name: "Product A" }} />);
    const submitButton = screen.getByTestId('submit-btn');
  });


  it('should display an error message when the deactivation request fails', async () => {
    jest.mock("../../api", () => {
      const reject = jest.fn()
      return {
        useDeactivateProductMutation: jest.fn().mockReturnValue({ handleReject: reject, isSuccess: false, isError: true, error: {message: "Wahala"}, isLoading: false })
      }
    })
    renderWithProviders(<RequestDeactivation isOpen={true} setIsOpen={jest.fn()} detail={{ id: "12345", name: "Product A" }} />);
    screen.debug();
  });



  // Allows user to upload supporting documents
  it('should allow user to upload supporting documents', () => {
    renderWithProviders(<RequestDeactivation isOpen={true} setIsOpen={jest.fn()} detail={{ id: "12345", name: "Product A" }} />);
    const fileInput = screen.getByTestId('input');
    act(() => {
      fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.png', { type: 'image/png' })] } });
    })
    //   expect(fileInput.files[0].name).toBe('test.png');
  });
});
