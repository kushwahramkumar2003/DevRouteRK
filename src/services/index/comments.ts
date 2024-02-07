import axios from "axios";
import baseURL from "../../constants/baseUrl";

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export const createNewComment = async ({
  desc,
  slug,
  parent,
  replyOnUser,
  token,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "/api/v1/comments",
      {
        desc,
        slug,
        parent,
        replyOnUser,
      },
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateComment = async ({
  token,
  desc,
  check,
  commentId,
}: {
  token: string;
  commentId: string;
  check: boolean;
  desc: string;
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `/api/v1/comments/${commentId}`,
      {
        desc,
        check,
      },
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ token, commentId }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/v1/comments/${commentId}`,
      config
    );

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getAllComments = async (
  token,
  searchKeyword = "",
  page = 1,
  limit = 10
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data, headers } = await axios.get(
      `/api/v1/comments?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}}`,
      config
    );
    console.log("Headers : ", headers);
    return { data, headers };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
