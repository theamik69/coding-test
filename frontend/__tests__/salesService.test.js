import { getSalesData } from "../features/sales/services/salesService";
import { mockSalesData  } from "../__mocks__/mockSalesData";

describe("getSalesData", () => {
  beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return data when fetch is successful", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockSalesData),
    });

    const result = await getSalesData();
    expect(result).toEqual({ success: true, data: mockSalesData });
  });

  it("should return 404 error message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await getSalesData();
    expect(result).toEqual({ success: false, error: "Data not found (404)." });
  });

  it("should return 400 error message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 400,
    });

    const result = await getSalesData();
    expect(result).toEqual({ success: false, error: "Bad request (400). Please check the request format." });
  });

  it("should return 422 error message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 422,
    });

    const result = await getSalesData();
    expect(result).toEqual({ success: false, error: "Unprocessable entity (422). Some data is missing or invalid." });
  });

  it("should return 500 error message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getSalesData();
    expect(result).toEqual({ success: false, error: "Internal server error (500). Please try again later." });
  });

  it("should return default error for unknown status", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 418,
    });

    const result = await getSalesData();
    expect(result).toEqual({ success: false, error: "Unexpected error (418). Please try again." });
  });

  it("should handle fetch exceptions", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await getSalesData();
    expect(result).toEqual({ success: false, error: "Failed to fetch deal data. Please try again." });
  });
});
