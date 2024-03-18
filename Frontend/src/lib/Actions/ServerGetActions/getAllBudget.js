import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";

export const getAllBudget = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/budget/getAll/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
