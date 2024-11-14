import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password) => {
    e.preventDefault();
    try {
        if (!email || !password) return alert("Provide All Fields.");
        store.dispatch(userLogin({ email, password }));
    }
    catch (err) {
        console.log(err);
    }
};

export const handleRegister = (e, email, name, password) => {
    e.preventDefault();
    try {
        console.log("here");
        store.dispatch(userRegister({ e, email, password, name }));
    }
    catch (err) {
        console.log(err);
    }
};