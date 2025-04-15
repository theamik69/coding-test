
export async function getSalesData() {
    try {
      const response = await fetch("http://localhost:8000/api/data");
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching sales data:", error);
      return [];
    }
  }
  