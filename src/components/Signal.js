import React from "react";
import "../css/Signal.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function Signal() {
  return (
    <div className="signal">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Signal;
