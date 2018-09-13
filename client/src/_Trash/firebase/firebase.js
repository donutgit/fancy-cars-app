import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

// const config = {
//   apiKey: "AIzaSyBu2O4Hdu8i8w986hQTr1IXPM_IrylZIww",
//   authDomain: "react-burger-99366.firebaseapp.com",
//   databaseURL: "https://react-burger-99366.firebaseio.com",
//   projectId: "react-burger-99366",
//   storageBucket: "react-burger-99366.appspot.com",
//   messagingSenderId: "1057905903439"
// };

// firebase.initializeApp(config);

const config = {
  apiKey: "AIzaSyA0l4guwtimo0_RRwJkeswOy9A15ZcN4SE",
  authDomain: "autoroku-793ef.firebaseapp.com",
  databaseURL: "https://autoroku-793ef.firebaseio.com",
  projectId: "autoroku-793ef",
  storageBucket: "autoroku-793ef.appspot.com",
  messagingSenderId: "410032072248",
  key: "AIzaSyAWCR3uUK0Rp6gXarZED5puVQaD_dVcTbg"
};
firebase.initializeApp(config);

const db = firebase.database();

const auth = firebase.auth();

const storage = firebase.storage();

const dbStore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
dbStore.settings(settings);

const deleteField = firebase.firestore.FieldValue.delete();

export { db, auth, storage, dbStore, deleteField };
