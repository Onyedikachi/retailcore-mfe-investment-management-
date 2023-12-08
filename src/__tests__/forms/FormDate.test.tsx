import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {FormDate} from '../../components/forms'; // Adjust the import based on your project structure

describe('FormDate component', () => {
  test('should update date on date change', () => {
    const handleChangeMock = jest.fn();

    render(
      <FormDate
        inputName="testDate"
        handleChange={handleChangeMock}
        defaultValue="2023-12-31T00:00:00.000Z"
        trigger={()=> {}}
      />
    );

    // Find the date picker input
    const datePickerInput = screen.getByTestId('date-picker');

    // Simulate a user changing the date
    fireEvent.change(datePickerInput, { target: { value: '01/01/2023' } });

    // Check if the handleChange function is called with the updated date
    expect(handleChangeMock).toHaveBeenCalledWith(new Date('01/01/2023'));
  });

  test('should display error message when there is an error', () => {
    const errors = {
      testDate: { message: 'Invalid date' },
    };

    render(
      <FormDate
      trigger={()=> {}}
        inputName="testDate"
        errors={errors}
        defaultValue="2023-12-31T00:00:00.000Z"
      />
    );

    // Find the error message
    const errorMessage = screen.getByText('Invalid date');

    // Check if the error message is displayed
    expect(errorMessage).toBeInTheDocument();
  });
});
