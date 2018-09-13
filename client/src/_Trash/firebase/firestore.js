import { dbStore as firestore } from "./firebase";

export const doCreateUserProfile = userData =>
  firestore
    .collection("userbase")
    .doc("users")
    .update(userData)