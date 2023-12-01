// src/setupTests.js
import "whatwg-fetch";
import { server } from "./__mocks__/api/apiServer";
import { linkApi, investmentApi } from "@app/api";
import { store } from "@app/config/store";
// setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockstore = store();

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  mockstore.dispatch(linkApi.util.resetApiState());
  mockstore.dispatch(investmentApi.util.resetApiState());

});

// Clean up after the tests are finished.
afterAll(() => server.close());
