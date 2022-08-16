import axios from "axios";
import config from "../config";

// Hàm xử lý exception
const handleException = (error) => {
  throw error.response.data.message;
};

// Gọi API lấy tất cả item
export const getItemsService = async (itemType) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/items/pagination`,
      itemType
    );

    return res.data.data;
  } catch (error) {
    handleException();
  }
};

// Gọi API thêm item
export const insertItemService = async (item) => {
  try {
    const res = await axios.post(`${config.constants.API_URL}/items/`, item);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    handleException(error);
  }
};

// Gọi API sửa item
export const updateItemService = async (item) => {
  try {
    var updateItem = {
      itemId: item._id,
      itemName: item.itemName,
      price: item.price,
      description: item.description,
      image: item.image,
    };
    const res = await axios.patch(
      `${config.constants.API_URL}/items/${item._id}`,
      updateItem
    );

    return res.data;
  } catch (error) {
    console.log(error);
    handleException(error);
  }
};

export const deleteItemService = async (itemId) => {
  try {
    const res = await axios.delete(
      `${config.constants.API_URL}/items/${itemId}`
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const signTicketService = async (data) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/items/sign-ticket`,
      data
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const ticketOwnerService = async (userId) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/items/owner-ticket`,
      { userId: userId }
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const signItemService = async (data) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/items/sign-swimmingwear`,
      data
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};

export const itemOwnerService = async (userId) => {
  try {
    const res = await axios.post(
      `${config.constants.API_URL}/items/owner-swimmingwear`,
      { userId: userId }
    );

    return res.data;
  } catch (error) {
    handleException(error);
  }
};
