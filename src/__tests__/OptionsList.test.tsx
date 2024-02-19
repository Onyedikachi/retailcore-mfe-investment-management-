import React from "react";
import OptionsList from "../components/forms/OptionsList";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Listbox } from "@headlessui/react";

describe('code snippet', () => {

    // Each option has a text label and an optional value
    it('should render option with text label and optional value', () => {
        const options = [
            { id: 1, text: 'Option 1', value: 'value1' },
            { id: 2, text: 'Option 2' },
            { id: 3, text: 'Option 3', value: 'value3' },
        ];

        render(
            <Listbox>
                <OptionsList options={options} />
            </Listbox>
        );

        const renderedOptions = screen.getAllByRole('option');
     
        expect(renderedOptions[0]).toHaveTextContent('Option 1');
        expect(renderedOptions[1]).toHaveTextContent('Option 2');
        expect(renderedOptions[2]).toHaveTextContent('Option 3');
    });

    // 'options' prop is undefined or null
    it('should not render any options when options prop is undefined', () => {
        render(<OptionsList options={undefined} />);

        const renderedOptions = screen.queryAllByRole('option');
        expect(renderedOptions).toHaveLength(0);
    });

    it('should not render any options when options prop is null', () => {
        render(<OptionsList options={null} />);

        const renderedOptions = screen.queryAllByRole('option');
        expect(renderedOptions).toHaveLength(0);
    });

    // 'options' prop is an empty array
    it('should not render any options when options prop is an empty array', () => {
        render(<OptionsList options={[]} />);

        const renderedOptions = screen.queryAllByRole('option');
        expect(renderedOptions).toHaveLength(0);
    });

});
