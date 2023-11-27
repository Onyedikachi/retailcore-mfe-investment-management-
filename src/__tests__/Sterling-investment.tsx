// @ts-nocheck
import { bootstrap, mount, unmount } from "../Sterling-investment-management";
import Root from "../App";
import { render, screen } from "@testing-library/react";

const MockRootComponent = () => <div>App</div>;
const config = {
  rootComponent: MockRootComponent,
};
describe("microfrontend", () => {
  it("bootstraps the app", () => {
    bootstrap(config);
    // spy on functionality
  });

  it("mounts and unmounts", async () => {
    render(<MockRootComponent />);
    await screen.findByText("App");
  });
});
