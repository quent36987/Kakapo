import React, { useState } from "react";
import {
    Container,
    createTheme,
    TextField,
    Button,
} from "@material-ui/core";
import { AppState } from "../Context";
import {db, storage} from "../firebase";
import { collection, addDoc  } from "firebase/firestore";
import Posts from "./Posts";

import {FormControlLabel, Input, Switch} from "@mui/material";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";





export default function Actu() {

  const { edit,setAlert } = AppState();
  const [titre, setTitre] = useState("");
  const [message, setMessage] = useState("");


    const [state, setState] = React.useState({
        important: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };






  const addPost = async (file) => {

      const date = Date.now();
      const collectionRef = collection(db, "post");
      const im = { image: null };

      if (file)
      {
      const uploadTask = ref(storage, `image/posts/${file.name}-${date}`);
      await uploadBytes(uploadTask, file).then((snapshot) => {
          console.log('Uploaded file!');
      });
      const test = ref(storage, `image/posts/${file.name}-${date}`);
      await  getDownloadURL(test)
          .then((url) => {
               console.log('url',url);
                im.image = url;
          })
      }

      const payload2 = { titre, message, date:(Date.now()), image:im.image, important:state.important };
      try {
        await addDoc(collectionRef, payload2);
        setAlert({
            open: true,
            message: "post published !",
            type: "success",
        });
        setTitre('');
        setMessage('');
      }
      catch (error)
      {
        setAlert({
            open: true,
            message: error.message,
            type: "error",
        });
      }
  };



    const formHandler = (e) => {

        console.log(e)
        e.preventDefault();

        const file = e.target[5].files[0];
        console.log(e.target[5].files[0])
        addPost(file);

    };




    return (
        <Container style={{ textAlign: "center" }}>

            { edit ?
                <>
                    <form onSubmit={formHandler}>
                        <div style={{ marginBottom: 30,marginTop : 10}}>
                            <TextField
                                variant="outlined"
                                label="Titre"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                fullWidth
                                style={{ marginBottom: 20,marginTop : 30 , width: "100%" }}
                            />
                            <TextField
                                variant="outlined"
                                label="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                fullWidth
                                style={{ marginBottom: 20, width: "100%" }}
                            />
                            <FormControlLabel control={
                                <Switch  color="warning"
                                         checked={state.important} onChange={handleChange} name="important"
                                />}
                                              label="Imporant"
                                             />



                            <div  style={{ marginBottom: 20,marginTop:20 }}>
                                <Input type="file" id="icon-button-file" />
                            </div>

                            <Button type="submit" variant="outlined">Send Post !</Button>
                        </div>
                    </form>
                    <hr />
                </>
                : <> </>}


            <Container maxWidth="sm">
                <Posts/>
            </Container>
        </Container>
    );
}


