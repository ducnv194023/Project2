import axios from "axios";
import config from "../config";

// Hàm xử lý exception
const handleException = (error) => {
  throw error.response.data.message;
};

// Gọi API đăng nhập
export const loginService = async (formData) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/auth/login`,
      formData
    );
    return res.data;
  } catch (error) {
    handleException(error);
  }
};

// Gọi API đăng ký
export const regsiterService = async (formData) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/auth/register`,
      formData
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};

// Gọi API lấy user hiện tại
export const getUserService = async () => {
  try {
    const res = await axios.get(`${config.constants.API_URL}/auth`);
    return res.data.data;
  } catch (error) {
    handleException(error);
  }
};
