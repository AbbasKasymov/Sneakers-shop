import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-SyhieBxcFRC_4f8Fvkpkh5waCrilAuM",
  authDomain: "individual-hak.firebaseapp.com",
  projectId: "individual-hak",
  storageBucket: "individual-hak.appspot.com",
  messagingSenderId: "134848439272",
  appId: "1:134848439272:web:6465a6db577f52ee34ba5d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
