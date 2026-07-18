import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../components/ui/Button";

describe("Button", () => {
  it("is keyboard accessible and respects disabled state", async () => {
    const action = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={action}>Save idea</Button>);
    await user.tab();
    expect(screen.getByRole("button", { name: "Save idea" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(action).toHaveBeenCalledOnce();
  });
});
