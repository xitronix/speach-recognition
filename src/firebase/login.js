import { auth } from ".";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loading, Notify } from "quasar";

const login = async (data) => {
  Loading.show();

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
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
