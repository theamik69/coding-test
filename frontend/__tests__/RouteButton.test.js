import React from "react";
import { render, screen } from "@testing-library/react";
import RouteButton from "../components/RouteButton";
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/link', () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});

describe("RouteButton", () => {
  it("renders the button with correct text and link", () => {
    const href = "/dashboard";
    const name = "Go to Dashboard";

    render(<RouteButton href={href} name={name} />);

    const button = screen.getByRole("button", { name });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
  });

  it("applies the correct button styling classes", () => {
    render(<RouteButton href="/test" name="Test Button" />);

    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveClass("px-4", "py-2", "bg-blue-600", "text-white", "rounded", "hover:bg-blue-700", "transition");
  });
});
