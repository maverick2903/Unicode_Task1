import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyD3L4K2A6cM_IK48QXDPS2g6hCkWDspNUs",
  authDomain: "hotel-website-368517.firebaseapp.com",
  projectId: "hotel-website-368517",
  storageBucket: "hotel-website-368517.appspot.com",
  messagingSenderId: "298853943653",
  appId: "1:298853943653:web:703ffa26fee6c3600ef98c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
let a = 1;

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const g_email = result.user.email;
      const g_name = result.user.displayName;
      localStorage.setItem("gmail", g_email);
      localStorage.setItem("gname", g_name);
      a = 0;
    })
    .catch((err) => {
      console.log(err);
    });
  if (a === 0) console.log("hi");
  return <Navigate to="/" />;
};

/* export const signOutWithGoogle = () => {
  signOut(auth, provider);
  localStorage.getItem("gmail");
  localStorage.getItem("gname");
}; */
