import React from "react";
import { render, waitFor , screen} from "@testing-library/react";
import ProductDetail from "../../components/modals/ProductDetail";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { investmentApi } from "../../api/investmentApi";
import { server } from "../../__mocks__/api/apiServer";
import { renderWithProviders } from "../../utils/test-util";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe("productdetail", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("ProductDetails", async () => {
    // Mock any necessary data or server responses

    // Render the component with the ApiProvider
    renderWithProviders(
      <ApiProvider api={investmentApi}>
        <ProductDetail
          isOpen={true}
          setIsOpen={jest.fn()}
          handleClick={jest.fn()}
          detail={{ id: "1" }}
        />
      </ApiProvider>
    );

    // Wait for any asynchronous operations to complete
    await waitFor(() => {
      // Your test logic with the mocked data
      expect(screen.getByTestId("product-view")).toBeInTheDocument()
    });
  });
});
