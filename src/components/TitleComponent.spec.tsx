import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TitleComponent from "./TitleComponent";

describe("test TitleComponent component", () => {
  beforeEach(() => {
    render(<TitleComponent />);
  });

  it("should render title", () => {
    expect(screen.getByText(/Extend Calendars/)).toBeDefined();
  });
});
