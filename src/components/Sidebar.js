import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChats from "./SidebarChats";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Add } from "@material-ui/icons";
import db, { auth } from "../firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .orderBy("chatName", "asc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            chatName: doc.data(),
          }))
        )
      );
  }, []);

  const addNewChat = () => {
    const chatName = prompt("Enter new Chat Name");
    const chatImage = prompt("Enter image url");
    db.collection("chats").add({
      chatName: chatName,
      chatImage: chatImage,
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={() => auth.signOut()}
          src={user.photo}
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
        <Add
          onClick={addNewChat}
          style={{ color: "gray", paddingLeft: "10px" }}
        />
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, chatName }) => (
          <SidebarChats
            key={id}
            id={id}
            name={chatName.chatName}
            chatImage={
              chatName.chatImage
                ? chatName.chatImage
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/150px-Signal-Logo.svg.png"
            }
          />
        ))}
      </div>
      <div className="sidebar__notes">
        <div className="sidebar__notesIcon">
          <div className="sidebar__note">
            <SpeakerNotesIcon />
          </div>
          <p>Note to Self</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
