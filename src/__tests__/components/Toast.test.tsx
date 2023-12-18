import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";
import { customToast, errorToast, errorToastProps, Msg, toastProps } from "../../components/Toast";

describe('customToast', () => {

    // Calls the 'toast.info' function with the correct arguments
    it('should call toast.info with the correct arguments', () => {
      const toastInfoSpy = jest.spyOn(toast, 'info');
      customToast('Test message');
      expect(toastInfoSpy).toHaveBeenCalledWith(expect.any(Function), toastProps);
      toastInfoSpy.mockRestore();
    });

    // Renders the 'Msg' component with the correct text

    // Displays the toast notification with the correct position
    it('should display toast notification with the correct position', () => {
      const toastInfoSpy = jest.spyOn(toast, 'info');
      customToast('Test message');
      expect(toastInfoSpy).toHaveBeenCalledWith(expect.any(Function), toastProps);
      toastInfoSpy.mockRestore();
    });


   

});
describe("Msg Function", () => {
  it("returns the correct JSX with the given text", () => {
    const closeToastMock = jest.fn(); // Mock the closeToast function

    // Call the Msg function with the required props
    const result = Msg({ closeToast: closeToastMock }, "Your sample text");

    // Render the result to check if specific elements are present
    const { getByText, getByTestId } = render(result);

    // Check if the required elements are present in the rendered component
    expect(getByTestId("info-icon")).toBeInTheDocument();
    expect(getByText("System Alert")).toBeInTheDocument();
    expect(getByText("Your sample text")).toBeInTheDocument();
  });
});

describe('errorToast', () => {

    // Displays an error toast with the given text
    it('should display an error toast with the given text', () => {
      const toastErrorSpy = jest.spyOn(toast, 'error');
      const closeToast = jest.fn();
      const text = 'Sample error message';

      errorToast(text);

      expect(toastErrorSpy).toHaveBeenCalledWith(expect.any(Function), errorToastProps);
      expect(toastErrorSpy.mock.calls[0][0]({ closeToast })).toEqual(Msg({ closeToast }, text));
    });

    // Uses the 'toast.error' method to display the toast
    it('should use the \'toast.error\' method to display the toast', () => {
      const toastErrorSpy = jest.spyOn(toast, 'error');
      const closeToast = jest.fn();
      const text = 'Sample error message';

      errorToast(text);

      expect(toastErrorSpy).toHaveBeenCalledWith(expect.any(Function), errorToastProps);
    });

    // Renders the 'Msg' component with the given text
    it('should render the \'Msg\' component with the given text', () => {
      const toastErrorSpy = jest.spyOn(toast, 'error');
      const closeToast = jest.fn();
      const text = 'Sample error message';

      errorToast(text);

      expect(toastErrorSpy.mock.calls[0][0]({ closeToast })).toEqual(Msg({ closeToast }, text));
    });

 
  

});
