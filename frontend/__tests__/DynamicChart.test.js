import { render, screen, waitFor } from "@testing-library/react";
import DynamicChart from "../components/DynamicChart";
import { validSalesData } from "../__mocks__/mockSalesData";

jest.mock("../features/sales/services/salesService", () => ({
  getSalesData: jest.fn(), 
}));

import * as salesService from "../features/sales/services/salesService";

jest.mock("../components/GenericChart", () => (props) => (
  <div data-testid="mock-chart">{JSON.stringify(props)}</div>
));

describe("DynamicChart", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<DynamicChart chartType="totalSales" />);
    expect(screen.getByText(/loading chart data/i)).toBeInTheDocument();
  });

  it("renders chart correctly on successful fetch", async () => {
    salesService.getSalesData.mockResolvedValue(validSalesData); 

    render(<DynamicChart chartType="totalSales" />);

    await waitFor(() => {
      expect(screen.getByTestId("mock-chart")).toBeInTheDocument();
    });

    const chart = screen.getByTestId("mock-chart");
    expect(chart).toHaveTextContent("Total Sales (Closed Won)");
  });

  it("renders error message on fetch failure", async () => {
    salesService.getSalesData.mockResolvedValue({
      success: false,
      error: "Failed to fetch data",
    });

    render(<DynamicChart chartType="totalSales" />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
    });
  });

  it("renders error when chartType is invalid", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    
    salesService.getSalesData.mockResolvedValue({
      success: true,
      data: [],
    });

    render(<DynamicChart chartType="invalidType" />);

    await waitFor(() => {
      expect(screen.getByText(/invalid chart type/i)).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });
});
