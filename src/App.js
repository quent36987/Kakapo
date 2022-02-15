import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar'
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal"
import NavbarDown from "./components/NavbarDown";
import Actu from "./pages/Actu";
import Club from "./pages/Club";
import Bar from "./pages/Bar";

function App() {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actu" element={<Actu />} />
        <Route path="/club" element={<Club />} />
        <Route path="/bar" element={<Bar />} />
      
      </Routes>
      <NavbarDown />

    </>
  );
}

export default App;
