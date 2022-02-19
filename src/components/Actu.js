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





  const addPost = async () => {

      const collectionRef = collection(db, "post");
      const payload = { titre, message, date:(Date.now()) };

      try {
        await addDoc(collectionRef, payload);
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






  return (
    <ThemeProvider >

      <Container style={{ textAlign: "center" }}>

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
