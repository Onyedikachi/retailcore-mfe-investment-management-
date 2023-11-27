// mswServer.js
import { setupServer } from "msw/node";
import { handlers } from "./apiHandler";

// Create the MSW server instance
export const server = setupServer(...handlers);

// Export the server instance for use in tests
// export { server };
