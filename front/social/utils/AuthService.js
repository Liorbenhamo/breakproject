import axios from "axios";

axios.defaults.withCredentials = true;

export const signup = async (information) => {
  console.log(information);
  return axios.post(`http://localhost:3000/users/add`, information);
};

export const login = async (credentials) => {
  return axios.post(`http://localhost:3000/users/login`, credentials);
};

export const logout = async () => {
  try {
    await axios.get(`http://localhost:3000/users/logout`, {
      withCredentials: true,
    });
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const takeusers = async () => {
  return axios.get(`http://localhost:3000/users`);
};
export const updateuser = async (newdata) => {
  return axios.patch(`http://localhost:3000/users/edit`, newdata);
};

export const postcreate = async (postdata) => {
  return axios.post("http://localhost:3000/posts/add", postdata);
};
export const allposts = async () => {
  return axios.get("http://localhost:3000/posts");
};
export const addcomment = async (comment) => {
  return axios.post("http://localhost:3000/posts/addcomment", comment);
};
export const addlike = async (likes) => {
  console.log(likes);
  return axios.post("http://localhost:3000/posts/addlike", likes);
};
export const takeuser = async (id) => {
  console.log(id);
  return axios.get(`http://localhost:3000/users/takeuser/${id}`, id);
};
