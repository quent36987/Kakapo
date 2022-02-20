import {
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
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

import {db} from "../firebase";
import { doc, getDoc} from "firebase/firestore";
import {Tooltip} from "chart.js";



const useStyles = makeStyles((theme) => ({
  title: {
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


const pages = [['Evenement', '/event'], ['Bar','/bar'], ['Club', '/club']];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {


  const classes = useStyles();
  const {edit, setEdit, user, perm, setPerm} = AppState();

  const history = useHistory();


  async function isadm() {
    if (!user || perm) {
      return;
    }
    console.log('user :', user);
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


  /*

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

   */



  return (


      <AppBar  color='transparent' position="static"  >
        <Container maxWidth="xl" >
          <Toolbar >
            <div className="left">
            <Typography
                variant="h6"
                noWrap
                component="div"
                onClick={() => history.push(`/`)}
                className={classes.title}
                //sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Kakapo
            </Typography>
            <Box
                  sx={{ flexGrow: 1 , display: { xs: 'none', md: 'flex'} }}
            >

              {pages.map((page) => (
                  <Button
                      key={page}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      onClick={() => history.push(page[1])}
                  >
                    {page[0]}
                  </Button>
              ))}

            </Box>
            </div>

            <div className="right">
            { perm ? <Button onClick={() => setEdit(!edit)}> Edit </Button> : <></> }
            {user ? <UserSidebar /> : <AuthModal />}
            </div>

          </Toolbar>

        </Container>
      </AppBar>



  );
}


export default Header;
