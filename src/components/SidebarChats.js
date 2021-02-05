import { Avatar } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/SidebarChats.css";
import { selectChatId, setChatInfo } from "../features/chatSlice";
import db from "../firebase";
import * as timeago from "timeago.js";

const SidebarChats = forwardRef(({ id, name, chatImage }, ref) => {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);

  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setLastMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      ref={ref}
      className="sidebarChat"
      onClick={() =>
        dispatch(
          setChatInfo({
            chatId: id,
            name: name,
            chatImage: chatImage,
          })
        )
      }
    >
      <Avatar src={chatImage} />
      <div className="sidebarChatInfo">
        <small>{timeago.format(lastMessage[0]?.timestamp?.toDate())}</small>
        <h5>{name}</h5>
        <p>{lastMessage[0]?.message}</p>
      </div>
    </div>
  );
});

export default SidebarChats;
