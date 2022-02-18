import { useEffect, useState } from "react";
import {
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { CryptoState } from "../Context";

const InfoEvent = ({ id }) => {
  const [historicData] = useState();
  const { currency } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  const RecupData = async () => {
    // set les info ?
  };

  useEffect(() => {
    // chargement des donne
  }, [ currency]);



  return (
      <div className={classes.container}>
        {!historicData ? (
            <CircularProgress
                style={{ color: "gold" }}
                size={250}
                thickness={1}
            />
        ) : (
            <>
              <h2>evement : {id}</h2>
            </>
        )}
      </div>
  );
};

export default InfoEvent;
