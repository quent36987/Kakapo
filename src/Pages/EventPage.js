import React, {useState} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";






const EventPage = (file) => {



    const [progress, setProgress] = useState(0);

    const uploadFiles = (file) => {
        //
        const uploadTask = ref(storage, `files/${file.name}`);

        uploadBytes(uploadTask, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    };

    const formHandler = (e) => {
        console.log(e)
        e.preventDefault();
        const file = e.target[0].files[0];
        console.log(e.target[0].files[0])
        uploadFiles(file);
    };






    return (
        <div className="App">
            <form onSubmit={formHandler}>
                <input type="file" className="input" />
                <button type="submit">Upload</button>
            </form>
            <hr />
            <h2>Uploading done {progress}%</h2>
        </div>
    );
};

export default EventPage;
