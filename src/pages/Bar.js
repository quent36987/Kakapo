import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"

export default function Bar() {

  const {currentUser} = useContext(UserContext)

  return (
    <div className="container p-5">
      <h1 className="display-3 ">
        AA BOIREEEEEE
      </h1>
    </div>
  )
}
