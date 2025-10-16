import React from "react";
import {Outlet} from 'react-router-dom'
import NavBar from "./Components/NavBar"

function App() {
  return (
      <>
          <NavBar />

          <div>
              <Outlet />
          </div>
      </>
  )
}

export default App
