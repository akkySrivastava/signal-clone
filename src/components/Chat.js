import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "../css/Chat.css";
import Message from "./Message";
import { Add, EmojiEmotions, MicNone } from "@material-ui/icons";
import StyleIcon from "@material-ui/icons/Style";
import "../css/Message.css";
import { useSelector } from "react-redux";
import {
  selectChatId,
  selectChatImage,
  selectChatName,
} from "../features/chatSlice";
import db from "../firebase";
import { selectUser } from "../features/userSlice";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Chat() {
  const chatImage = useSelector(selectChatImage);
  const name = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  //console.log(name, chatId);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              message: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (chatId) {
      db.collection("chats").doc(chatId).collection("messages").add({
        user: user,
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chatHeader__left">
          {chatId ? <Avatar src={chatImage} /> : <Avatar />}

          <h5>{name}</h5>
        </div>
        <div className="chatHeader__right">
          <SearchIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <div className="chat__body">
        <div className="message__header">
          <Avatar src={chatImage} />
          <h3>{name}</h3>
        </div>
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message
              key={id}
              id={id}
              message={message.message}
              timestamp={message.timestamp}
              sender={message.user.email}
              senderName={message.user.displayName}
            />
          ))}
        </FlipMove>
      </div>
      <div className="chat__footer">
        <EmojiEmotions />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <div className="chat__footerIcons">
          <StyleIcon />
          <MicNone />
          <Add />
        </div>
      </div>
    </div>
  );
}

export default Chat;
