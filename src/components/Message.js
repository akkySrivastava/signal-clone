import React from "react";
import { useSelector } from "react-redux";
import "../css/Message.css";
import { selectUser } from "../features/userSlice";

function Message({ id, message, timestamp, sender, senderName }) {
  const user = useSelector(selectUser);
  return (
    <div className="message">
      <div
        className={`${
          user.email === sender ? `message__info` : `message__infoSender`
        }`}
      >
        <div className="message__content">
          {user.email === sender ? null : <span>{senderName}</span>}
          <p>{message}</p>
          <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
      </div>
    </div>
  );
}

export default Message;
