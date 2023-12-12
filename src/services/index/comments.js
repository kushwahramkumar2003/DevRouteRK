import axios from "axios";

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
      "/api//v1/comments",
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
