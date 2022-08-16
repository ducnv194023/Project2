import React, { useEffect, useState } from "react";
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

const ItemsPage = () => {
  // Selector, dispatch
  const { items, isShowAddItem } = useSelector(itemSelector);
  const dispatch = useDispatch();

  // Handle event
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
    dispatch(setCategoryName(config.categoryName.ITEM));
    dispatch(selectItem(item));
    dispatch(toggleAddItem());
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  useEffect(() => {
    dispatch(getItems({ itemType: config.itemType.SWIMMING_WARE }));
  }, []);

  return (
    <div className="manage-ticket-page">
      <div className="manage-header">
        <h2>Danh sách đồ bơi</h2>
        <button
          className="button"
          onClick={handleAddItem.bind(this, {
            itemType: config.itemType.SWIMMING_WARE,
          })}
        >
          Thêm mới sản phẩm
        </button>
      </div>
      <div className="manage-table">
        {items.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>
                  <div>Tên sản phẩm</div>
                </th>
                <th style={{ width: "20%" }}>
                  <div>Giá bán</div>
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
          <div>Chưa có đồ bơi nào</div>
        )}
      </div>
      {isShowAddItem && <AddItem />}
    </div>
  );
};

export default ItemsPage;
