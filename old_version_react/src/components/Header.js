import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";
import AuthModal from "./Authentication/AuthModal";
import {AppState} from "../Context";
import {signOut} from "firebase/auth";
import {auth, db} from "../firebase";
import {doc, getDoc} from "firebase/firestore";
import {useEffect} from "react";


const pages = [ ['Actualité', '/' ],['événement', '/event'], ['Bar','/bar'], ['Club', '/club']];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {edit, setEdit, user, perm, setPerm, setAlert} = AppState();

    const logOut = () => {
        signOut(auth);
        setPerm(null);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull !",
        });

    };

    const clicSettings = (event) => {
        console.log('event' ,event);
        if (event === settings[3])
            logOut();
    }
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


    const history = useHistory();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar  position="static" style={{background:'#573232'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        style={{
                            color: "gold",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                        onClick={() => history.push('/')}
                    >
                        KAKAPO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => history.push(page[1])} >{page[0]}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        style={{
                            color: "gold",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                        onClick={() => history.push('/')}
                    >
                        KAKAPO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() =>
                                {
                                    handleCloseNavMenu();
                                    history.push(page[1]);
                                }
                            }
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page[0]}
                            </Button>
                        ))}
                    </Box>

                    { perm ? <Button onClick={() => setEdit(!edit)}> Edit </Button> : <></> }
                    {user ?

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        style={{
                                            height: 38,
                                            width: 38,
                                            marginLeft: 15,
                                            cursor: "pointer",
                                            backgroundColor: "#EEBC1D",
                                        }}
                                        src={user.photoURL}
                                        alt={user.displayName || user.email}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting}  onClick={handleCloseUserMenu} >
                                        <Typography  onClick={() => clicSettings(setting)}  textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        :
                        <AuthModal />

                    }



                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
