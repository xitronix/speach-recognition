import { auth } from ".";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loading, Notify } from "quasar";

const register = async (data) => {
  Loading.show();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    updateProfile(userCredential.user, {
      displayName: data.first_name + " " + data.last_name,
    });

    Loading.hide();
    return userCredential.user;
  } catch (err) {
    Loading.hide();
    Notify.create({
      type: "negative",
      message: err.message,
    });
    throw Error(err.message);
  }
};

export default register;
