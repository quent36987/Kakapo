import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper, Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../Context";
import {db} from "../firebase";
import { collection, addDoc  } from "firebase/firestore";
import ReactHtmlParser from "react-html-parser";
import SelectButton from "./SelectButton";
import Posts from "./Posts";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Actu() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { symbol, coins, edit,setAlert,posts } = CryptoState();

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();
  const history = useHistory();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };




    const [titre, setTitre] = useState("");
    const [message, setMessage] = useState("");




  const addvaleur = async () => {

      const collectionRef = collection(db, "post");


      const payload = { titre, message, date:(Date.now()) };

try {
    const docRef = await addDoc(collectionRef, payload);

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


const butonadd = async () => {


      addvaleur();


      return;
    }



  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>


          <Posts/>

          { edit ?
              <>
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
          <SelectButton
              onClick={ () => butonadd()}
              selected={false}

          > Send Post ! </SelectButton>
              </> : <> </>}

      </Container>
    </ThemeProvider>
  );
}
