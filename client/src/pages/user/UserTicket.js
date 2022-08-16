import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../store/reducers/authSlice";
import {
  itemSelector,
  ticketOwner,
} from "../../store/reducers/itemSlice";
import { QRCodeSVG } from "qrcode.react";
import moment from "moment";

const UserTicket = () => {
  const { user } = useSelector(authSelector);

  const { myTickets } = useSelector(itemSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ticketOwner(user.id));
  }, [dispatch, user]);

  return (
    <div className="ticket-page">
      {myTickets.map((ticket) => {
        return (
          <div className="ticket" key={ticket._id}>
            <div className="ticket-qr">
              <QRCodeSVG value={ticket.qrCode} size={96} />
            </div>
            <div className="ticket-info">
              <div>
                <b>Tên người mua: </b>
                {ticket.userName}
              </div>
              <div>
                <b>Số điện thoại: </b>
                {ticket.phone}
              </div>
              <div>
                <b>Ngày bắt đầu: </b>
                {moment(ticket.startDate).format("DD-MM-YYYY")}
              </div>
              <div>
                <b>Ngày kết thúc: </b>
                {moment(ticket.endDate).format("DD-MM-YYYY")}
              </div>
              <div>
                <b>Trạng thái: </b>
                {ticket.status === "activated"
                  ? "Đang sử dụng"
                  : ticket.status === "not_yet_activated"
                  ? "Chưa hoạt động"
                  : "Không hoạt động"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserTicket;
