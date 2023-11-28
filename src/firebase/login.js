import { auth } from ".";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify, LocalStorage } from "quasar";

const login = async (data) => {
  Loading.show();

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    LocalStorage.set("idToken", await userCredentials.user.getIdToken());
    Loading.hide();
    return userCredentials.user;
  } catch (err) {
    Loading.hide();
    Notify.create({
      type: "negative",
      message: err.message,
    });
    throw new Error(err.message);
  }
};

export default login;
