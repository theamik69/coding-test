import React from "react";
import { render, screen } from "@testing-library/react";
import DetailCard from "../components/DetailCard";

describe("DetailCard", () => {
  it("renders the title and children properly", () => {
    render(
      <DetailCard title="Test Title">
        <p>Content inside the card</p>
        <span>Another content</span>
      </DetailCard>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();

    expect(screen.getByText("Content inside the card")).toBeInTheDocument();
    expect(screen.getByText("Another content")).toBeInTheDocument();
  });

  it("applies correct styles and structure", () => {
    const { container } = render(
      <DetailCard title="Styled Title">
        <div>Testing layout</div>
      </DetailCard>
    );

    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass("rounded-2xl");
    expect(cardElement).toHaveClass("shadow-lg");

    const titleElement = screen.getByText("Styled Title");
    expect(titleElement).toHaveClass("bg-gradient-to-r");
    expect(titleElement).toHaveClass("text-white");

    expect(screen.getByText("Testing layout")).toBeInTheDocument();
  });
});
