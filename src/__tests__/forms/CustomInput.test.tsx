import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomInput } from '../../components/forms';

describe("CustomInput", () => {
    it("Renders without errors", () => {
        render(<CustomInput/>)
        expect(screen.getByTestId("custom-input")).toBeInTheDocument();
    })

    it("Renders maxLength div if MaxLength is specified", () => {
        render(<CustomInput maxLength={43}/>)
        expect(screen.getByTestId("maxLength").textContent).toBe("0/43");

    })
})