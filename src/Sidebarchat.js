import React, { useEffect, useState } from "react";
import "./Sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function Sidebarchat({ id, name, addnewchat }) {
  const [seed, setseed] = useState("");
  const [messages, setmessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const createchat = () => {
    const roomname = prompt("Please enter name for Chat room");

    if (roomname) {
      db.collection("rooms").add({
        name: roomname,
      });
    }
  };

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarchat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createchat} className="sidebarchat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default Sidebarchat;
