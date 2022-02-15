import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"
import {Link} from "react-router-dom"
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"

export default function NavbarDown() {

  const {toggleModals} = useContext(UserContext)

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
    

            <ul class="nav justify-content-center fixed-bottom">
        <li class="nav-item">
                <a class="nav-link "  href="/actu">Actu</a> 
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/club">Club</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/bar">Bar</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled">KAKAKAKAKAKAPOO</a>
        </li>
        </ul>

   
  )
}
