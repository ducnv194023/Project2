import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { itemSelector, toggleItemInfo } from "../../store/reducers/itemSlice";
import { addItemToCart } from "../../store/reducers/orderSlice";
import config from "../../config";

const ItemInfo = () => {
  // State
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState({
    _id: null,
    name: "",
    price: 0,
    quantity: 0,
    image: "",
  });

  const [startDate, setStartDate] = useState(new Date());

  // Selector
  const { itemSelected, categoryName } = useSelector(itemSelector);

  // Dispatch
  const dispatch = useDispatch();

  // Close popup
  const handleClosePopup = () => {
    dispatch(toggleItemInfo());
  };

  useEffect(() => {
    setItem(itemSelected);
    setPrice(itemSelected.price);
  }, [itemSelected]);

  useEffect(() => {
    setPrice(amount * item.price);
  }, [amount, item]);

  const plusItem = () => {
    setAmount((prev) => prev + 1);
  };

  const minusItem = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    let newItem = {
      itemId: item._id,
      itemName: item.itemName,
      itemPrice: price,
      itemQuantity: amount,
      image: item.image,
      itemType: item.itemType,
      description: item.description,
    };

    if (categoryName === config.categoryName.TICKET) {
      newItem = { ...newItem, startDate };
    }

    dispatch(addItemToCart(newItem));
    dispatch(toggleItemInfo());
  };

  return (
    <div className="order-info-bg">
      <div className="order-info-wrapper">
        <div className="order-info-header">
          <h3>Thông tin sản phẩm</h3>
          <AiOutlineClose
            className="close-button"
            title="Đóng"
            onClick={handleClosePopup}
          />
        </div>
        <div className="order-info-body">
          {/* Ảnh sản phẩm */}
          <div className="order-image-wrapper">
            <img className="order-image" src={item.image} alt="Ảnh sản phẩm" />
          </div>
          {/* Thông tin mua hàng */}
          <div className="order-info">
            <div>
              <h4 className="item-info item-name">{item.name}</h4>
              {categoryName === config.categoryName.ITEM && (
                <div className="item-info item-quantity">
                  <span>Số lượng: </span>
                  <div style={{ display: "flex" }}>
                    <div className="amount-minus" onClick={minusItem}>
                      -
                    </div>
                    <div className="amount-number">{amount}</div>
                    <div className="amount-plus" onClick={plusItem}>
                      +
                    </div>
                  </div>
                </div>
              )}
              {categoryName === config.categoryName.TICKET && (
                <div className="item-info item-start-time">
                  <span>Ngày bắt đầu: </span>
                  <div style={{ display: "flex" }}>
                    <input
                      type="date"
                      className="input-date"
                      onChange={(event) =>
                        setStartDate(event.currentTarget.value)
                      }
                    />
                  </div>
                </div>
              )}
              <div className="item-info item-total-price">
                <span>Tổng tiền: </span>
                <div style={{ color: "#2196f3" }}>
                  {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </div>
            <button className="button" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
