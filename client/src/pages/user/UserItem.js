import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import {
  itemOwner,
  itemSelector,
} from "../../store/reducers/itemSlice";

const UserItem = () => {
  const { user } = useSelector(authSelector);

  const { myItems } = useSelector(itemSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemOwner(user.id));
  }, [dispatch, user]);

  return (
    <div className="ticket-page">
      {myItems.map((item) => {
        return (
          <div className="ticket" key={item._id}>
            <div className="ticket-qr">
              <img src={item.image} width="150px" height="150px" alt="Đồ đã mua" />
            </div>
            <div className="ticket-info">
              <div>
                <b>Sản phẩm: </b>
                {item.itemName}
              </div>
              <div>
                <b>Mô tả: </b>
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserItem;
