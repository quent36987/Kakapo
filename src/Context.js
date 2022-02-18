import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "./firebase";
import { doc, getDoc} from "firebase/firestore";


    const Crypto = createContext();

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
        const [posts, setposts] = useState([]);

        /*
        const coinRef = query(collection(db, "post"));
        const unsubscribe = onSnapshot(coinRef, (querySnapshot) => {
            const cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data());
            });
            console.log('oui');
            setposts(cities);
        });*/
      /*  const coinRef = collection(db, "post");
        useEffect(() => {
            while(posts.length > 0) {
                posts.pop();
            }
                var unsubscribe = onSnapshot(coinRef, (doc) => {
                    doc.forEach((doc) => {

                        posts.push(doc.data());
                        console.log('oni');
                    });
                    console.log('onin');
                });
                return () => {
                    unsubscribe();
                };
        });*/




        useEffect(() => {

            onAuthStateChanged(auth, (user) => {
                if (user) setUser(user);
                else setUser(null);

            });
        }, []);


        return (
            <Crypto.Provider
                value={{
                    edit,
                    setEdit,
                    alert,
                    setAlert,
                    user,
                    posts,
                    perm,
                    setPerm,
                }}
            >
                {children}
            </Crypto.Provider>
        );
    };


export default Context;

export const CryptoState = () => {
  return useContext(Crypto);
};
