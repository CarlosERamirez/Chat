import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Button from "../../components/Button";
import Channel from "./Channel";

const auth = firebase.auth();
const db = firebase.firestore();

export default function Chat({user=null}) {
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button onClick={signOut}>Sign Out</Button>
      <Channel user={user} db={db}></Channel>
    </>
  );
}
