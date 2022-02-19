import React, { useState } from "react";
import {
    Container,
    createTheme,
    ThemeProvider,
    TextField,
} from "@material-ui/core";
import { AppState } from "../Context";
import {db, storage} from "../firebase";
import { collection, addDoc  } from "firebase/firestore";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SelectButton from "./SelectButton";

import Posts from "./Posts";

import {FormControlLabel, IconButton, Input, Switch} from "@mui/material";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";




export default function Actu() {

  const { edit,setAlert } = AppState();
  const [titre, setTitre] = useState("");
  const [message, setMessage] = useState("");

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });





  const addPost = async (file) => {

      const date = Date.now();
      const collectionRef = collection(db, "post");
      const im = { image: null };

      if (file)
      {
      const uploadTask = ref(storage, `image/posts/${file.name}-${date}`);
      const fi = await uploadBytes(uploadTask, file).then((snapshot) => {
          console.log('Uploaded file!');
      });
      const test = ref(storage, `image/posts/${file.name}-${date}`);
      const url =  await  getDownloadURL(test)
          .then((url) => {
               console.log('url',url);
                im.image = url;
          })
      }

      const payload2 = { titre, message, date:(Date.now()), image:im.image };
      try {
        const uidpost =  await addDoc(collectionRef, payload2);
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
        const file = e.target[0].files[0];
        console.log(e.target[0].files[0])
        addPost(file);
    };







    return (
    <ThemeProvider theme={darkTheme} >

      <Container style={{ textAlign: "center" }}>

          <div className="App">
              <form onSubmit={formHandler}>
                  <input type="file" className="input" />
                  <button type="submit">Upload</button>
              </form>
              <hr />
          </div>

          { edit ?


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

                  <FormControlLabel control={<Switch defaultChecked  color="warning" />} label="Imporant"  />
                  <div  style={{ marginBottom: 20,marginTop:20 }}>

              </div>

          <SelectButton
              selected={false}

          > Send Post ! </SelectButton>
              </div>


                  : <> </>}

          <Posts/>
      </Container>
    </ThemeProvider>
  );
}
