import React from "react";
import { setupStore } from "../../config/testStore";
import { renderWithProviders } from "../../utils/test-util";

describe("renderWithProviders", () => {
  // Tests that the function renders the UI with the Provider wrapper and the passed options
  it("should render the UI with the Provider wrapper and the passed options", () => {
    // Arrange
    const ui = <div>Test UI</div>;
    const preloadedState = {};
    const store = setupStore(preloadedState);
    const renderOptions = {};

    // Act
    const { store: renderedStore, container } = renderWithProviders(ui, {
      preloadedState,
      store,
      ...renderOptions,
    });

    // Assert
    expect(renderedStore).toBe(store);
    expect(container.firstChild).toHaveTextContent("Test UI");
  });

  // Tests that the function returns the store and the rendered UI
  it("should return the store and the rendered UI", () => {
    // Arrange
    const ui = <div>Test UI</div>;
    const preloadedState = {};
    const store = setupStore(preloadedState);
    const renderOptions = {};

    // Act
    const { store: renderedStore, container } = renderWithProviders(ui, {
      preloadedState,
      store,
      ...renderOptions,
    });

    // Assert
    expect(renderedStore).toBe(store);
    expect(container.firstChild).toHaveTextContent("Test UI");
  });
});
