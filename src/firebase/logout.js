import { signOut } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { auth } from ".";

const logout = async () => {
  Loading.show();
  try {
    await signOut(auth);
    Loading.hide();
  } catch (error) {
    Loading.hide();
    Notify.create({
      type: "negative",
      message: error.message,
    });
    throw new Error(error.message);
  }
};

export default logout;
