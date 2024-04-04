import PreviewChargesAndTaxes from "../../../components/summary/PreviewChargesAndTaxes"
import { render, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../__mocks__/api/Wrapper"

describe('default', () => {

    // Renders the component without crashing
    it('should render the component without crashing', () => {
        renderWithProviders(<PreviewChargesAndTaxes />);
    });
});
