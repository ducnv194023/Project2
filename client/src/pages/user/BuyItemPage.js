import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import {
  getItems,
  itemSelector,
  selectItem,
  setCategoryName,
  toggleItemInfo,
} from "../../store/reducers/itemSlice";

const SingleItem = ({ item }) => {
  // Create dispatch
  const dispatch = useDispatch();

  // Xử lý sự kiện mua hàng
  const handleBuyBtnClick = (it) => {
    // Gán item vào state
    dispatch(selectItem(it));
    // Mở popup thông tin sản phẩm
    dispatch(toggleItemInfo());
  };

  useEffect(() => {
    dispatch(setCategoryName(config.categoryName.ITEM))
  }, [dispatch])

  return (
    <>
      <div className="ticket-wrapper">
        <div className="ticket-image-button">
          <img className="ticket-image" src={item.image} alt="Ảnh item" />
          <button
            className="button buy-button"
            onClick={handleBuyBtnClick.bind(this, item)}
          >
            Mua hàng
          </button>
        </div>
        <h3>{item.itemName}</h3>
        <div className="ticket-order">
          <h2 className="ticket-price">
            {item.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
          <div>{item.description}</div>
        </div>
      </div>
    </>
  );
};

const BuyItemPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(itemSelector);

  useEffect(() => {
    dispatch(getItems({ itemType: config.itemType.SWIMMING_WARE }));
}, [dispatch]);

  return (
    <div className="buy-ticket-page">
      {items.map((item) => {
        return <SingleItem item={item} key={item._id} />;
      })}
    </div>
  );
};

export default BuyItemPage;
