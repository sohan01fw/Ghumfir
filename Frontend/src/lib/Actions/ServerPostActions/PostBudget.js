//posting itineriesDetails to backend server
import axios from "axios";
import { SERVER_URL } from "../../../utils/exportItem";
export const postBudget = async (itiId, Budget) => {
  try {
    const xValue = await axios.post(
      `${SERVER_URL}/api/budget/create/${itiId}`,
      { Budget: Budget }
    );
    const res = xValue.data.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
//post expenses
export const postExpenses = async (itiId, value, text) => {
  try {
    const xValue = await axios.post(
      `${SERVER_URL}/api/budget/create/${itiId}`,
      { name: text, cost: value }
    );

    const res = xValue.data.data;
    return res;
  } catch (error) {
    console.log(error);
  }
};
