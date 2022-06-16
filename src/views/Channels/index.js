import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import Channel from "../Channel";

const db = firebase.firestore();

export default function Channels() {
  const [chats, setChats] = useState([]);
  const { uid } = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("chats")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const filtered = data.filter(
            (doc) => uid === doc.patient || uid === doc.doctor
          );
          setChats(filtered);
        });

      return unsubscribe;
    }
  }, [uid]);


  return (
    <div>
      <h1>Chats</h1>
      <ul>
        {chats.map((chat) => {
          return (
            <li>
              <h2>Chat</h2>
              <Channel key={chat.id} chat={chat} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
