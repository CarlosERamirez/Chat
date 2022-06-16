import React from "react";
import firebase from "firebase/compat/app";
import Button from "../../components/Button";
import DoctorCard from "./DoctorCard";
import { useSelector } from "react-redux";
import Div from "../../components/Div";

const db = firebase.firestore();

export default function Directory({doctors}) {
  const { uid } = useSelector((state) => state.firebase.auth);


  const handleCrearChat = (doctor) => {
    if (db) {
      db.collection("chats").add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        doctor: doctor.uid,
        patient: uid
      });
    }
  };

  return (
    <Div>
      <h1>Directorio Médico</h1>
      <ul>
        {doctors.map((doctor) => {
          return (
            <li>
              <DoctorCard doctor={doctor} />
              <Button onClick={() => handleCrearChat(doctor)}>Chatear</Button>
            </li>
          );
        })}
      </ul>
    </Div>
  );
}
