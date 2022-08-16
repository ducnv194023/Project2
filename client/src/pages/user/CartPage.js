import moment from "moment";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { authSelector } from "../../store/reducers/authSlice";
import { signItem, signTicket } from "../../store/reducers/itemSlice";
import {
  createOrder,
  orderSelector,
  removeItem,
} from "../../store/reducers/orderSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  // Selector
  const { cartItems, totalPrice } = useSelector(orderSelector);
  const { user } = useSelector(authSelector);

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleOrder = (event) => {
    event.preventDefault();

    cartItems.forEach((item) => {
      if (
        item.itemType === config.itemType.DATE ||
        item.itemType === config.itemType.MONTH
      ) {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.startDate);

        const newTicket = {
          itemName: item.itemName,
          price: item.itemPrice,
          image: item.image,
          userId: user.id,
          userName: user.name,
          phone: user.phone,
          itemType: item.itemType,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(
            new Date(
              item.itemType === config.itemType.DATE
                ? endDate.setDate(endDate.getDate() + 1)
                : endDate.setMonth(endDate.getMonth() + 1)
            )
          ).format("YYYY-MM-DD"),
          qrCode:
            user.phone +
            "Thời gian bắt đầu: " +
            moment(startDate).format("YYYY-MM-DD"),
          description: item.description,
        };
        dispatch(signTicket(newTicket));
      } else {
        console.log(item);
        const newItem = {
          itemName: item.itemName,
          price: item.itemPrice,
          image: item.image,
          userId: user.id,
          userName: user.name,
          phone: user.phone,
          itemType: item.itemType,
          description: item.description,
        };
        dispatch(signItem(newItem));
      }
    });

    dispatch(
      createOrder({
        orderItems: cartItems.map((item) => {
          return {
            itemId: item.itemId,
            itemName: item.itemName,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
          };
        }),
        description: "Mua",
      })
    );
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        {cartItems.length === 0 ? (
          <img
            style={{ width: "inherit" }}
            src="https://book.smartercarrentals.com/images/cart.png"
            alt="Ảnh giỏ hàng trống"
          />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>
                  <div>Sản phẩm</div>
                </th>
                <th style={{ width: "15%" }}>
                  <div>Số lượng</div>
                </th>
                <th style={{ width: "15%" }}>
                  <div>Giá tiền</div>
                </th>
                <th style={{ width: "20%" }}>
                  <div>Thời gian sử dụng</div>
                </th>
                <th style={{ width: "10%" }}>
                  <div>Xóa</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((it) => {
                return (
                  <tr key={it.itemId}>
                    <td>
                      <div className="cart-item">
                        <img
                          className="cart-item-image"
                          src={it.image}
                          alt="Ảnh đồ bơi"
                        />
                        <div>{it.itemName}</div>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>{it.itemQuantity}</td>
                    <td style={{ textAlign: "center", color: "#2196f3" }}>
                      {it.itemPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {it.startDate &&
                        moment(it.startDate).format("DD/MM/YYYY")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <AiOutlineClose
                        className="close-button"
                        onClick={handleRemoveItem.bind(this, it)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="cart-right">
        <h3>Thông tin thanh toán</h3>
        <div className="item-info item-total-price">
          <div>Tổng tiền: </div>
          <div style={{ color: "#2196f3" }}>
            {totalPrice.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
        <button
          className="button"
          style={{ width: "100%", marginTop: "12px" }}
          onClick={(e) => handleOrder(e)}
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
};

export default CartPage;
