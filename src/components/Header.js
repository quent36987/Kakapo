import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../Context";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import {Button} from "@mui/material";
import {useEffect} from "react";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db, auth} from "../firebase";
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
  const { edit, setEdit, user, perm, setPerm } = CryptoState();

  const history = useHistory();




  const isadm = async () => {
    if (!user) {
      return;
    }
    console.log(user);
      const ref = doc(db, "adm", user.uid);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const city = docSnap.data();
          console.log(city.perm);
          setPerm(city.perm == "bde")
        } else {
          console.log("No such document!");
        }
    }


    useEffect(() => {
        isadm();
    }, user);







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
