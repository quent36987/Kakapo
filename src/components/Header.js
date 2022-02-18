import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { AppState } from "../Context";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import {Button} from "@mui/material";
import {useEffect} from "react";

import {db} from "../firebase";
import { doc, getDoc} from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 2,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  title2 : {
    flex : 1,
    color: "darkgreen",
    fontFamily: "cursive",
    fontWeight: "lighter",
    cursor: "pointer",
  }
}));


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#152",
    },
    type: "dark",

  },
});

function Header() {
  const classes = useStyles();
  const { edit, setEdit, user, perm, setPerm } = AppState();

  const history = useHistory();


  async function isadm() {
    if (!user || perm) {
      return;
    }
    console.log('user :' , user);
    const ref = doc(db, "adm", user.email);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const city = docSnap.data();
      setPerm(city.perm === "bde");
      setEdit(false);
    }
  }


    useEffect(() => {
        isadm();
    });




  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>

            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              Kakapo
            </Typography>

            <Typography
                onClick={() => history.push(`/event`)}
                variant="h6"
                className={classes.title2}
            >
              Evenement
            </Typography>
            <Typography
                onClick={() => history.push(`/bar`)}
                variant="h6"
                className={classes.title2}
            >
              bar
            </Typography>

            { perm ? <Button onClick={() => setEdit(!edit)}> Edit </Button> : <></> }



            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}


export default Header;
