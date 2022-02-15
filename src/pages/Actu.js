import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"

export default function Actu() {

  const {currentUser} = useContext(UserContext)

  return (
    <div className="container p-5">
      <h1 className="display-3 ">
        ACTUUUU
      </h1>
    </div>
  )
}
