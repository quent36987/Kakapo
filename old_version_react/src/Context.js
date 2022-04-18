import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = createContext();

const Context = ({children}) => {


    // pour le mode edit ;)
    const [edit, setEdit] = useState(false);
    const [perm, setPerm] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);

        });
    }, []);


    return (
        <App.Provider
            value={{
                edit,
                setEdit,
                alert,
                setAlert,
                user,
                perm,
                setPerm,
            }}
        >
            {children}
        </App.Provider>
    );
};

export default Context;

export const AppState = () => {
    return useContext(App);
};
