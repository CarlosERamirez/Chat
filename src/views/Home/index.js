import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Button from "../../components/Button";
import Directory from "../Directory";
import Channels from "../Channels";

const auth = firebase.auth();
const db = firebase.firestore();

export default function Register() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [doctors, setDoctors] = useState([]);
  const [doctorsIds, setDoctorsIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (loading) {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [loading]);

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("doctors")
        .orderBy("speciality")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDoctors(data);

          const doctorsIds = doctors.map((doc) => doc.uid);
          setDoctorsIds(doctorsIds);
        });

      return unsubscribe;
    }
  }, [doctors]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return "Loading...";

  return (
    <div>
      {user ? (
        <>
          <Button onClick={signOut}>Sign Out</Button>
          {doctorsIds.includes(user.uid) ? (
            <p>Bienvenido, Doctor</p>
          ) : (
            <Directory doctors={doctors} />
          )}
          <Channels />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}
