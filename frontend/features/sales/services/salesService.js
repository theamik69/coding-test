export async function getSalesData() {
  try {
    const response = await fetch("http://localhost:8000/api/data");

    if (!response.ok) {
      switch (response.status) {
        case 404:
          return { success: false, error: "Data not found (404)." };
        case 400:
          return { success: false, error: "Bad request (400). Please check the request format." };
        case 422:
          return { success: false, error: "Unprocessable entity (422). Some data is missing or invalid." };
        case 500:
          return { success: false, error: "Internal server error (500). Please try again later." };
        default:
          return { success: false, error: `Unexpected error (${response.status}). Please try again.` };
      }
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return { success: false, error: "Failed to fetch deal data. Please try again." };
  }
}
