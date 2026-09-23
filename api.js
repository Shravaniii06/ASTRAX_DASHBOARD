const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  async getTelemetry() {
    const response = await fetch(`${API_BASE_URL}/telemetry`);

    if (!response.ok) {
      throw new Error("Unable to fetch telemetry data");
    }

    return response.json();
  },

  async injectFault(type) {
    const response = await fetch(
      `${API_BASE_URL}/faults/${type}`,
      {
        method: "POST"
      }
    );

    if (!response.ok) {
      throw new Error("Unable to inject fault");
    }

    return response.json();
  }
};