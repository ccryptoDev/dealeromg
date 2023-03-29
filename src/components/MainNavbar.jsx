import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import Settings from "./Settings"
// Images
import logo from "../assets/logos/logo.png"

function MainNavbar() {
  const history = useNavigate()
  const [userData, setUserData] = useState({})

  const logOut = () => {
    localStorage.removeItem("tokenDealerOMG")
    localStorage.removeItem("permissionsDealerOMG")
    history("/login")
  }

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("permissionsDealerOMG")))
  }, [])

  return (
    <div className="mt-2 w-full flex flex-row justify-between items-center">
      <Link to="/">
        <img
          className="h-[auto] w-[275px] cursor-pointer"
          src={logo}
          alt="Dealer OMG Logo"
        />
      </Link>
      <div className="w-auto flex flex-row justify-end space-x-8 items-center">
        <p className="font-bold">
          {userData.firstName} {userData.lastName}
        </p>
        <Settings top="105px" />
        <button
          onClick={logOut}
          className="flex flex-row justify-between text-white bg-[#E57200] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default MainNavbar
