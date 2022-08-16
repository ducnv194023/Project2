import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../../components";
import config from "../../config";
import {
  deleteItem,
  getItems,
  itemSelector,
  selectItem,
  setCategoryName,
  setEditMode,
  toggleAddItem,
} from "../../store/reducers/itemSlice";

const TicketsPage = () => {
  // Dispatch, selector
  const dispatch = useDispatch();

  const { items, isShowAddItem } = useSelector(itemSelector);

  const handleAddItem = (item) => {
    dispatch(setEditMode(config.editMode.ADD));
    openPopup(item);
  };

  const handleEditItem = (item) => {
    dispatch(selectItem(item));
    dispatch(setEditMode(config.editMode.EDIT));
    openPopup(item);
  };

  const openPopup = (item) => {
    dispatch(setCategoryName(config.categoryName.TICKET));
    dispatch(selectItem(item));
    dispatch(toggleAddItem());
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  useEffect(() => {
    dispatch(getItems({ itemType: "ticketDate,ticketMonth" }));
  }, []);

  return (
    <div className="manage-ticket-page">
      <div className="manage-header">
        <h2>Danh sách vé bơi</h2>
        <button className="button" onClick={handleAddItem.bind(this, {})}>
          Thêm mới vé bơi
        </button>
      </div>
      <div className="manage-table">
        {items.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>
                  <div>Tên sản phẩm</div>
                </th>
                <th style={{ width: "20%" }}>
                  <div>Giá bán</div>
                </th>
                <th style={{ width: "20%" }}>
                  <div>Loại vé</div>
                </th>
                <th style={{ width: "20%" }}>
                  <div>Mô tả</div>
                </th>
                <th style={{ width: "20%" }}>
                  <div>Thao tác</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="cart-item">
                      <div className="cart-item">
                        <img
                          className="cart-item-image"
                          src={item.image}
                          alt="Hình ảnh đồ bơi"
                        />
                        <div>{item.itemName}</div>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", color: "#2196f3" }}>
                      {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.itemType === config.itemType.DATE
                        ? "Vé ngày"
                        : "Vé tháng"}
                    </td>
                    <td>{item.description}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="button"
                        style={{ minWidth: "fit-content", marginRight: "12px" }}
                        onClick={handleEditItem.bind(this, item)}
                      >
                        Sửa
                      </button>
                      <button
                        className="button button-danger"
                        style={{ minWidth: "fit-content" }}
                        onClick={handleDeleteItem.bind(this, item._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div>Chưa có vé bơi nào</div>
        )}
      </div>
      {isShowAddItem && <AddItem />}
    </div>
  );
};

export default TicketsPage;
