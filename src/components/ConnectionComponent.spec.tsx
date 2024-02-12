import { render, screen } from "@testing-library/react";
import ConnectionsComponent from "./ConnectionComponent";

describe("test Connections component", () => {
  beforeEach(() => {
    render(<ConnectionsComponent />);
  });

  it("should render connections", () => {
    expect(
      screen.getByText(
        /Please fill your credential to extend calendar in system./
      )
    ).toBeDefined();
  });
});
