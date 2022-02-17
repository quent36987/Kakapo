import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"
import {Link} from "react-router-dom"
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"
import { Image } from 'react-native'


export default function Navbar() {

  const {toggleModals} = useContext(UserContext)
  const {currentUser} = useContext(UserContext)

  const navigate = useNavigate()



  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch {
      alert("For some reasons we can't deconnect, please check your internet connexion and retry.")
    }
  }

  return (

    <nav className="navbar navbar-light bg-light px-4">
      <a className="navbar-brand" href="/">
        Kakapo
      </a>
      <div>

        { currentUser ?
          <button
          onClick={logOut}
          className="btn btn-danger ms-2">
            Log Out
          </button> : <div>
            <button
                onClick={() => toggleModals("signUp")}
                className="btn btn-primary">
              Sign Up
            </button>
            <button
          onClick={() => toggleModals("signIn")}
          className="btn btn-primary ms-2">
          Sign In
          </button> </div>
        }
      </div>
    </nav>
  )
}
