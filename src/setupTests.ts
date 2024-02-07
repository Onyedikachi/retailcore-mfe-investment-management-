// src/setupTests.js
import "whatwg-fetch";
import { server } from "./__mocks__/api/apiServer";
import { linkApi, investmentApi, authApi, accountApi } from "@app/api";
import { store } from "@app/config/store";
// setupTests.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
configure({ adapter: new Adapter() });

const mockstore = store();

// Establish API mocking before all tests.
beforeEach(() => {
class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
    writable: true,
    value: jest.fn(),
  });

  Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
    writable: true,
    value: jest.fn().mockReturnValue({
      x: 0,
      y: 0,
    }),
  });

  Object.defineProperty(global.SVGElement.prototype, 'getComputedTextLength', {
    writable: true,
    value: jest.fn().mockReturnValue(0),
  });

  Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
    writable: true,
    value: jest.fn().mockReturnValue({
      x: 10,
      y: 10,
      inverse: () => { },
      multiply: () => { },
    }),
  });
  server.listen();
});


// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  mockstore.dispatch(linkApi.util.resetApiState());
  mockstore.dispatch(investmentApi.util.resetApiState());
  mockstore.dispatch(authApi.util.resetApiState());
  window.ResizeObserver = ResizeObserver
});

// Clean up after the tests are finished.
afterEach(() => server.close());
