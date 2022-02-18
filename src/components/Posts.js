import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./../firebase";

const Dot = ({ color }) => {
    const style = {
        height: 25,
        width: 25,
    };
    return <h2 style={style}>{color}</h2>;
};

export default function Posts() {

    const [colors, setColors] = useState([]);

    useEffect(() => {
        console.log('recuperation des posts');
        const collectionRef = collection(db, "post");
        const q = query(collectionRef, orderBy("date", "desc"));
        const unsub = onSnapshot(q, (snapshot) =>
            setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        ));
        return unsub;
    }, []);


    return (
        <div className="root">
            <ul>

                {colors.map((color) => (
                    <li key={color.id}>
                        <Dot color={color.titre} /> {color.message}
                    </li>
                ))}
            </ul>
        </div>

    );
}