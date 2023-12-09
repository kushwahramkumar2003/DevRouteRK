import axios from "axios";

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("/api/v1/users/register", {
      name,
      email,
      password,
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post("/api/v1/users/login", {
      email,
      password,
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getUserProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/v1/users/profile", config);

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ token, userData }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      "/api/v1/users/updateProfile",
      userData,
      config
    );

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateProfilePicture = async ({ token, formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      "/api/v1/users/updateProfilePicture",
      formData,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
