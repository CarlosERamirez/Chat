import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import Message from "./Message";
import Div from "../../components/Div"
import { useSelector } from "react-redux";

const db = firebase.firestore();

export default function Channel({ chat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { uid, displayName, photoURL, email } = useSelector(
    (state) => state.firebase.auth
  );

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const filtered = data.filter((doc) => chat.id === doc.chatId);

          setMessages(filtered);
        });

      return unsubscribe;
    }
  }, [chat.id]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
        email,
        chatId: chat.id
      });
    }
    setNewMessage('')
  };

  return (
    <Div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <Message {...msg} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="type a message..."
        />
        <button type="submit" disabled={!newMessage}>
          Enviar
        </button>
      </form>
    </Div>
  );
}
