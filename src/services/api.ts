import axios from "axios";

const server = import.meta.env.VITE_API_BASE_URL;

// Service untuk register
export const registerUser = async (data: any) => {
  const response = await axios.post(server + "register", data);

  if (response.status !== 201) {
    throw new Error("Register gagal");
  }

  return response;
};

// Service untuk login
export const loginUser = async (data: any) => {
  const response = await axios.post(server + "login", data);

  if (response.status !== 200) {
    throw new Error("Login gagal");
  }

  return response;
};

// Service untuk mengambil data
export const getData = async (endpoint: string, data: any) => {
  let instance = axios.create({
    baseURL: server,
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const response = await instance.get(endpoint, data);

  if (response.status !== 200) {
    throw new Error("Data gagal diambil!");
  }

  return response;
};

// Service untuk mengirim data
export const postData = async (endpoint: string, data: any) => {
  let instance = axios.create({
    baseURL: server,
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  const response = await instance.get(endpoint, data);

  if (response.status !== 201) {
    throw new Error("Data gagal dikirim!");
  }

  return response;
};
