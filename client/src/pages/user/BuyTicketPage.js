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

const SingleTicket = ({ ticket }) => {
  const dispatch = useDispatch();

  const handleBuyTicket = (tk) => {
    dispatch(selectItem(tk));
    dispatch(toggleItemInfo());
  };

  useEffect(() => {
    dispatch(setCategoryName(config.categoryName.TICKET));
  }, [dispatch]);

  return (
    <>
      <div className="ticket-wrapper">
        <div className="ticket-image-button">
          <img className="ticket-image" src={ticket.image} alt="Ảnh vé bơi" />
          <button
            className="button buy-button"
            onClick={handleBuyTicket.bind(this, ticket)}
          >
            Mua vé
          </button>
        </div>
        <h3>{ticket.itemName}</h3>
        <div className="ticket-order">
          <h2 className="ticket-price">
            {ticket.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h2>
          <div>{ticket.description}</div>
        </div>
      </div>
    </>
  );
};

const BuyTicketPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(itemSelector);

  useEffect(() => {
    dispatch(getItems({ itemType: "ticketDate,ticketMonth" }));
  }, [dispatch]);

  return (
    <div className="buy-ticket-page">
      {items.map((ticket) => {
        return <SingleTicket ticket={ticket} key={ticket._id} />;
      })}
    </div>
  );
};

export default BuyTicketPage;
