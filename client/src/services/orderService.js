import axios from "axios";
import config from "../config";

// Hàm xử lý exception
const handleException = (error) => {
  throw error.response.data.message;
};

export const createOrderService = async (data) => {
  try {
    const res = await axios.post(`${config.constants.API_URL}/orders`, data);
    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const payOrderService = async (orderId) => {
  try {
    const res = await axios.patch(
      `${config.constants.API_URL}/orders/pay-order`,
      { orderId: orderId }
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const updateOrderService = async (formData) => {
  try {
    const res = await axios.patch(
      `${config.constants.API_URL}/orders/:${formData.id}`,
      formData
    );
    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const getOrderService = async (formData) => {
  try {
    const res = await axios.get(
      `${config.constants.API_URL}/orders/${formData.orderId}`,
      formData
    );
    return res.data;
  } catch (error) {
    handleException(error);
  }
};
