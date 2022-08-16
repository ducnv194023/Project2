import React from "react";
import { useSelector } from "react-redux";
import { ItemInfo } from "../../components";
import { itemSelector } from "../../store/reducers/itemSlice";

const Content = (props) => {
  const { isShowItemInfo } = useSelector(itemSelector);
  return (
    <div className="content">
      {props.children}
      {isShowItemInfo && <ItemInfo />}
    </div>
  );
};

export default Content;
