import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import {
  insertItem,
  itemSelector,
  toggleAddItem,
  updateItem,
} from "../../store/reducers/itemSlice";

const AddItem = () => {
  // UseState
  const [item, setItem] = useState({});

  const { itemSelected, editMode, categoryName, itemError } =
    useSelector(itemSelector);

  // Dispatch
  const dispatch = useDispatch();

  // Handle event
  const handleClosePopup = () => {
    dispatch(toggleAddItem());
  };

  const handleSaveItem = () => {
    if (editMode === config.editMode.ADD) {
      dispatch(insertItem(item));
    } else if (editMode === config.editMode.EDIT) {
      dispatch(updateItem(item));
    }
  };

  useEffect(() => {
    setItem(itemSelected);
  }, [itemSelected]);

  return (
    <div className="add-item-bg">
      <div className="add-item-wrapper">
        <div className="add-item-header">
          <h3>Thông tin sản phẩm</h3>
          <AiOutlineClose
            className="close-button"
            title="Đóng"
            onClick={handleClosePopup}
          />
        </div>
        <div className="add-item-body">
          <div className="input-group">
            <label className="input-label">Tên sản phẩm</label>
            <input
              className="input-text"
              type="text"
              name="itemName"
              placeholder="Tên sản phẩm"
              autoComplete="off"
              value={item.itemName || ""}
              onChange={(event) =>
                setItem({
                  ...item,
                  [event.currentTarget.name]: event.currentTarget.value,
                })
              }
            />
          </div>
          <div className="input-group">
            <label className="input-label">Giá sản phẩm</label>
            <input
              className="input-text"
              type="text"
              name="price"
              placeholder="Giá sản phẩm"
              autoComplete="off"
              value={item.price || ""}
              onChange={(event) =>
                setItem({
                  ...item,
                  [event.currentTarget.name]: parseInt(
                    event.currentTarget.value
                  ),
                })
              }
            />
          </div>
          <div className="input-group">
            <label className="input-label">Mô tả sản phẩm</label>
            <textarea
              name="description"
              placeholder="Mô tả sản phẩm"
              rows="4"
              value={item.description || ""}
              onChange={(event) =>
                setItem({
                  ...item,
                  [event.currentTarget.name]: event.currentTarget.value,
                })
              }
            />
          </div>
          {categoryName === config.categoryName.TICKET && (
            <div className="input-group">
              <label className="input-label">Loại vé</label>
              <select
                className="input-text"
                type="text"
                name="itemType"
                value={item.itemType || ""}
                onChange={(event) =>
                  setItem({
                    ...item,
                    [event.currentTarget.name]: event.currentTarget.value,
                  })
                }
              >
                <option value="">-- Chọn loại vé --</option>
                <option value={config.itemType.DATE}>Vé ngày</option>
                <option value={config.itemType.MONTH}>Vé tháng</option>
              </select>
            </div>
          )}
          <div className="input-group">
            <label className="input-label">Hình ảnh sản phẩm</label>
            <input
              className="input-text"
              type="text"
              name="image"
              placeholder="Link ảnh sản phẩm"
              value={item.image || ""}
              onChange={(event) =>
                setItem({
                  ...item,
                  [event.currentTarget.name]: event.currentTarget.value,
                })
              }
            />
          </div>
          {itemError && <div className="login-error">{itemError}</div>}
          <div className="update-button">
            <button onClick={handleSaveItem} className="button">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
