import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalStorage } from "quasar";

export const firebaseConfig = {
  apiKey: "AIzaSyBQSX_iE8O9UrqfdSatwB7Zzz-cStwZtrY",
  authDomain: "education-7f550.firebaseapp.com",
  projectId: "education-7f550",
  storageBucket: "education-7f550.appspot.com",
  messagingSenderId: "753865753211",
  appId: "1:753865753211:web:2b5b36abc3b69e11c558de",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set("user", user);
  } else {
    LocalStorage.remove("user");
  }
});
