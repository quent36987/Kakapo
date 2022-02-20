import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import InfoEvent from "./Pages/InfoEvent";
import Header from "./components/Header";
import Alert from "./components/Alert";
import EventPage from "./Pages/EventPage";
import BarPage from "./Pages/BarPage";
import Header2 from "./components/Header2";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#c7aca6",
    color:"#718145",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header2 />
        <Route path="/" component={Homepage} exact />
        <Route path="/event/" component={EventPage} exact />
        <Route path="/bar/" component={BarPage} exact />
        <Route path="/event/:id" component={InfoEvent} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
