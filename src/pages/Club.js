import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"

export default function Club() {

  const {currentUser} = useContext(UserContext)

  return (
    <div className="container p-5">
      <h1 className="display-3 ">
        CLUBB
      </h1>
    </div>
  )
}
