import { db } from "./firebase";

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () => db.ref("users").once("value");

export const onceGetUser = id => db.ref(`users/${id}`).once("value");

//export const addCarToPoll = (nomination, data) => db.ref(`poll/${nomination}`).push({ data });
export const addCarToPoll = (nomination, id, data) => db.ref(`nominations/${nomination}/${id}`).set({ data });

export const getCard = () => db.ref("nominations").once("value");