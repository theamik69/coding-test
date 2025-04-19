import React from "react";
import { render, screen } from "@testing-library/react";
import SalesListSection from "../components/SalesListSection";

jest.mock("../components/FilterControls", () => () => (
  <div data-testid="filter-controls">Mock FilterControls</div>
));

jest.mock("../components/SalesCard", () => ({ user, index }) => (
  <div data-testid="sales-card">{user.name} - {index}</div>
));

jest.mock("../features/sales/hooks/useSalesData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useSalesData from "../features/sales/hooks/useSalesData";

describe("SalesListSection", () => {
  it("shows loading state", () => {
    useSalesData.mockReturnValue({
      filteredUsers: [],
      search: "",
      setSearch: jest.fn(),
      region: "",
      setRegion: jest.fn(),
      sortBy: "",
      setSortBy: jest.fn(),
      regions: [],
      loading: true,
      error: null,
    });

    render(<SalesListSection />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    useSalesData.mockReturnValue({
      filteredUsers: [],
      search: "",
      setSearch: jest.fn(),
      region: "",
      setRegion: jest.fn(),
      sortBy: "",
      setSortBy: jest.fn(),
      regions: [],
      loading: false,
      error: "Failed to load data",
    });

    render(<SalesListSection />);
    expect(screen.getByText("Failed to load data")).toBeInTheDocument();
  });

  it("shows 'no data' message when filteredUsers is empty", () => {
    useSalesData.mockReturnValue({
      filteredUsers: [],
      search: "",
      setSearch: jest.fn(),
      region: "",
      setRegion: jest.fn(),
      sortBy: "",
      setSortBy: jest.fn(),
      regions: [],
      loading: false,
      error: null,
    });

    render(<SalesListSection />);
    expect(screen.getByTestId("filter-controls")).toBeInTheDocument();
    expect(screen.getByText(/no sales data found/i)).toBeInTheDocument();
  });

  it("renders list of SalesCard when filteredUsers exist", () => {
    const mockUsers = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    useSalesData.mockReturnValue({
      filteredUsers: mockUsers,
      search: "",
      setSearch: jest.fn(),
      region: "",
      setRegion: jest.fn(),
      sortBy: "",
      setSortBy: jest.fn(),
      regions: [],
      loading: false,
      error: null,
    });

    render(<SalesListSection />);
    expect(screen.getByTestId("filter-controls")).toBeInTheDocument();
    expect(screen.getAllByTestId("sales-card")).toHaveLength(2);
    expect(screen.getByText("Alice - 0")).toBeInTheDocument();
    expect(screen.getByText("Bob - 1")).toBeInTheDocument();
  });
});
