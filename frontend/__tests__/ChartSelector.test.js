import React from "react";
import { render, screen } from "@testing-library/react";
import ChartSelector from "../components/ChartSelector";

jest.mock("../components/DynamicChart", () => {
  return function MockDynamicChart({ chartType }) {
    return <div data-testid="dynamic-chart">Chart Type: {chartType}</div>;
  };
});

describe("ChartSelector", () => {
  it("renders all chart options with correct chart types", () => {
    render(<ChartSelector />);

    const chartLabels = [
      "Total Deal Value per Sales Rep",
      "Number of Deals per Sales Rep",
      "Total Deal Value per Region",
      "Number of Clients per Sales Rep",
      "Deal Status Distribution",
      "Skill Distribution",
      "Top Client Industries",
    ];

    chartLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    const charts = screen.getAllByTestId("dynamic-chart");
    expect(charts).toHaveLength(7);

    const expectedChartTypes = [
      "totalSales",
      "dealCount",
      "regionSales",
      "clientCount",
      "dealStatus",
      "skillDistribution",
      "topIndustries",
    ];

    expectedChartTypes.forEach((type) => {
      expect(screen.getByText(`Chart Type: ${type}`)).toBeInTheDocument();
    });
  });
});
