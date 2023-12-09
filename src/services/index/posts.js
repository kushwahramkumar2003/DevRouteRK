import axios from "axios";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get("/api/v1/posts");
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/v1/posts/${slug}`);
    console.log("Data : ", data);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
