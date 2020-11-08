import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const { roomId } = useParams();
  const [roomname, setroomname] = useState("");
  const [messages, setmessages] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomname(snapshot.data().name));

        db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot => (
            setmessages(snapshot.docs.map(doc => doc.data()))
        ))
    }
  }, [roomId]);

  const Sendmessage = (e) => {
    e.preventDefault();
    console.log("you typed", input);
    
    db.collection('rooms').doc(roomId).collection('messages').add({
        message:input,
        name:user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setinput("");
  };

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerinfo">
          <h3>{roomname}</h3>
  <p>Last seen at{" "} { new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() }</p>
        </div>

        <div className="chat__headerright">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
          {messages.map(message => (
              <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
        {/* <p className={`chat__message ${true && "chat__reciever"}`}> */}
          <span className="chat__name">{message.name}</span>
          {message.message}
          <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
        </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={Sendmessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
