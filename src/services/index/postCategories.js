import axios from "axios";
import baseURL from "../../constants/baseUrl";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export const getAllCategories = async (
    searchKeyword = "",
    page = 1,
    limit = 10
) => {
  try {
    const { data, headers } = await axios.get(
        `/api/v1/post-categories?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    console.log("axios res header ",headers)
    console.log("axios res  ",data)
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteCategory = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/post-categories/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createCategory = async ({ token, title }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
        `/api/v1/post-categories`,
        { title },
        config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateCategory = async ({ token, title, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
        `/api/v1/post-categories/${slug}`,
        { title },
        config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSingleCategory = async ({ slug }) => {
  try {
    const { data } = await axios.get(`/api/v1/post-categories/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
