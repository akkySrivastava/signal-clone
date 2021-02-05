import { Avatar, IconButton, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChats from "./SidebarChats";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Add } from "@material-ui/icons";
import db, { auth } from "../firebase";
import FlipMove from "react-flip-move";
import Modal from "react-modal";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [nameInput, setNameInput] = useState(null);
  const [imageInput, setImageInput] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/150px-Signal-Logo.svg.png"
  );
  const [search, setSearch] = useState(null);
  const [modal, setModal] = useState(false);

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
    if (nameInput) {
      db.collection("chats").add({
        chatName: nameInput,
        chatImage: imageInput,
      });
    }

    setNameInput(null);
    setImageInput("");
    setModal(false);
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
          <form>
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              type="text"
            />
          </form>
        </div>
        <Add
          onClick={() => setModal(true)}
          style={{ color: "gray", paddingLeft: "10px" }}
        />
        <Modal
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 500,
              height: 550,
              zIndex: "1000",
              background: "rgba(0,0,0,0.8)",
              top: "50%",
              left: "50%",
              marginTop: "-225px",
              marginLeft: "-250px",
            },
          }}
        >
          <div className="modal__info">
            <h5>HandCrafted With ❤️ By</h5>
            <h2>Code With Akky</h2>
            <h3>Add New Chat Name</h3>
            <Input
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="name__input"
              type="text"
              placeholder="Enter new Chat Name"
            />
            <h3>Add Profile Image (URL)</h3>
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="name__input"
              type="text"
              placeholder="Enter Chat Image (URL)"
            />

            <div className="modal__add">
              <IconButton onClick={addNewChat}>
                <Add style={{ fontSize: "xx-large", color: "white" }} />
              </IconButton>
            </div>
            <button onClick={() => setModal(false)}>Cancle</button>
          </div>
        </Modal>
      </div>
      <div className="sidebar__chats">
        <FlipMove>
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
        </FlipMove>
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
