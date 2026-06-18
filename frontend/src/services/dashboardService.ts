import api from "../api/api";
import { DashboardResponse } from "../types";

export const getDashboard =
  async (): Promise<DashboardResponse> => {

    const response = await api.get<DashboardResponse>(
      "/dashboard"
    );

    return response.data;
};