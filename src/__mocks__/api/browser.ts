// mswServer.js
import { setupWorker } from "msw";
import { handlers } from "./apiHandler";

// Create the MSW server instance
export const server = setupWorker(...handlers);

// Export the server instance for use in tests
// export { server };
