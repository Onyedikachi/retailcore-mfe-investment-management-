import { render } from "@testing-library/react"
import {renderWithProviders} from "../../__mocks__/api/Wrapper"
import ProductDetail from "../../components/modals/ProductDetail"

describe("ProductDetail", () => {
    it("Renders without crashing", () => {
        const val = renderWithProviders(<ProductDetail detail={{id : "5677"}}/>);
        expect(val).toMatchSnapshot();
    })
})