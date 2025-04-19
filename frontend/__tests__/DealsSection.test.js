import { render, screen, waitFor } from "@testing-library/react";
import { getSalesData } from "../features/sales/services/salesService";
import DealsSection from "../components/DealsSection";
import { validSalesData, failedSalesData } from "../__mocks__/mockSalesData";

jest.mock("../features/sales/services/salesService", () => ({
  getSalesData: jest.fn(),
}));

describe("DealsSection", () => {

  beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state initially", () => {
    render(<DealsSection />);

    expect(screen.getByText(/Loading deals.../i)).toBeInTheDocument();
  });

  it("should display deals correctly when data is fetched successfully", async () => {
    getSalesData.mockResolvedValue(validSalesData);
  
    render(<DealsSection />);

    await waitFor(() => expect(getSalesData).toHaveBeenCalledTimes(1));
  
    expect(screen.getByText(/All Deals by Status/i)).toBeInTheDocument();
  
    const totals = await screen.findAllByText(/Total:\s\$\d{1,3}(,\d{3})*(\.\d{2})?/);
    expect(totals).toHaveLength(3); 
    expect(totals[0]).toHaveTextContent("$445,000.00"); 
    expect(totals[1]).toHaveTextContent("$400,000.00");
    expect(totals[2]).toHaveTextContent("$390,000.00"); 

    expect(screen.getByText("Acme Corp — $120,000.00")).toBeInTheDocument();
    expect(screen.getAllByText("by Alice")).toHaveLength(3);
    expect(screen.getByText("Gamma Inc — $75,000.00")).toBeInTheDocument();
    expect(screen.getAllByText("by Bob")).toHaveLength(3);
  });

  it("should handle error state when data fetch fails", async () => {
    getSalesData.mockResolvedValue(failedSalesData);

    render(<DealsSection />);

    await waitFor(() => expect(getSalesData).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
  });

  it("should display 'No deals' when there are no deals in any category", async () => {
    getSalesData.mockResolvedValue({
      success: true,
      data: [
        {
          "id": 1,
          "name": "Alice",
          "role": "Senior Sales Executive",
          "region": "North America",
          "skills": ["Negotiation", "CRM", "Client Relations"],
          "deals": [],
          "clients": [
            { "name": "Acme Corp", "industry": "Manufacturing", "contact": "alice@acmecorp.com" },
            { "name": "Beta Ltd", "industry": "Retail", "contact": "contact@betaltd.com" }
          ]
        },
        {
          "id": 2,
          "name": "Bob",
          "role": "Sales Representative",
          "region": "Europe",
          "skills": ["Lead Generation", "Presentation", "Negotiation"],
          "deals": [],
          "clients": [
            { "name": "Gamma Inc", "industry": "Tech", "contact": "info@gammainc.com" },
            { "name": "Delta LLC", "industry": "Finance", "contact": "support@deltallc.com" }
          ]
        },
        {
          "id": 3,
          "name": "Charlie",
          "role": "Account Manager",
          "region": "Asia-Pacific",
          "skills": ["Customer Service", "Sales Strategy", "Data Analysis"],
          "deals": [],
          "clients": [
            { "name": "Epsilon Ltd", "industry": "Healthcare", "contact": "contact@epsilonltd.com" },
            { "name": "Zeta Corp", "industry": "Finance", "contact": "sales@zetacorp.com" }
          ]
        },
        {
          "id": 4,
          "name": "Dana",
          "role": "Business Development Manager",
          "region": "South America",
          "skills": ["Strategic Partnerships", "Negotiation", "Market Analysis"],
          "deals": [],
          "clients": [
            { "name": "Eta Co", "industry": "Energy", "contact": "info@etaco.com" },
            { "name": "Theta Inc", "industry": "Telecommunications", "contact": "sales@thetainc.com" }
          ]
        },
        {
          "id": 5,
          "name": "Eve",
          "role": "Regional Sales Manager",
          "region": "Middle East",
          "skills": ["Relationship Building", "Negotiation", "Market Expansion"],
          "deals": [],
          "clients": [
            { "name": "Iota Ltd", "industry": "Hospitality", "contact": "contact@iotaltd.com" },
            { "name": "Kappa LLC", "industry": "Retail", "contact": "info@kappallc.com" }
          ]
        }
      ],
    });
    
  
    render(<DealsSection />);

    await waitFor(() => expect(getSalesData).toHaveBeenCalledTimes(1));

    const noDealsElements = screen.getAllByText(/No deals/i);
    expect(noDealsElements).toHaveLength(3); 
  });
});
