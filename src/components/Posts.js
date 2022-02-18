
import { onSnapshot, collection } from "firebase/firestore";
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
    const [colors, setColors] = useState([{ titre: "Loading...", id: "initial" }]);

    useEffect(
        () =>
            onSnapshot(collection(db, "post"), (snapshot) =>
                setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })
                    )
                )
            ),
        []
    );

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