import React from "react";
import AddedChargeList from "../../../../../../components/pages/term-deposit/forms/gl_mapping_events/AddedChargeList"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", category: "investments", tab: "" })]),
    useParams: jest.fn().mockReturnValue({ process: "continue" }),
    useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));

describe("AddedChargeList", () => {

    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "5678" })]);

        jest.spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ process: "create" })
    });
    // Renders a div with class 'flex flex-col w-full mt-6'
    // Renders a div with class 'flex flex-col w-full mt-6'
    it('should render a div with class \'flex flex-col w-full mt-6\'', () => {
        render(<AddedChargeList selectedCharges={[]} setFormData={jest.fn()} values={{}} event="" charges={{ data: { records: [] } }} />);
        expect(screen).toMatchSnapshot();
    });

    // selectedCharges is empty
    it('should update the applicableCharges value when removing a charge', () => {
        const selectedCharges = ['charge1', 'charge2'];
        const setFormData = jest.fn();
        const values = { event: { applicableCharges: selectedCharges } };
        const event = 'event';
        const charges = { data: { records: [{ charge_id: 'charge1', name: 'Charge 1' }, { charge_id: 'charge2', name: 'Charge 2' }] } };

        render(<AddedChargeList selectedCharges={selectedCharges} setFormData={setFormData} values={values} event={event} charges={charges} />);

        expect(screen.getByText("Charge 1"))
        expect(screen.getByText("Charge 2"))
    });
})