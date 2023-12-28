import axios from "axios";
import { toast } from "react-hot-toast";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get("/api/v1/post-categories");
    console.log("Data : ", data);
    return data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message);
    }
    toast.error(error.message);
    throw new Error(error.message);
  }
};
