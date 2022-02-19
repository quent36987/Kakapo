import React, {useState} from "react";
import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";






const EventPage = (file) => {





    const uploadFiles = (file) => {
        //
        const uploadTask = ref(storage, `image/posts/${file.name}`);

        const fi = uploadBytes(uploadTask, file).then((snapshot) => {
            console.log('Uploaded file!');
        });
        console.log(fi);


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
        </div>
    );
};

export default EventPage;
