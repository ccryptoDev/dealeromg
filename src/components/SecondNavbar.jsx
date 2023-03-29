import { useNavigate, Link, useLocation, matchPath } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../Hooks/useAuth"
import Settings from "./Settings"
// Images
import logo from "../assets/logos/logo.png"

function SecondNavbar() {
  const [userData, setUserData] = useState({})
  const history = useNavigate()
  const { pathname } = useLocation()
  const pathP = { path: "/performance" }
  const currentPathP = matchPath(pathP, pathname)
  const pathA = { path: "/target-market/audience-builder" }
  const currentPathA = matchPath(pathA, pathname)
  const pathC = { path: "/target-market/customer-builder" }
  const currentPathC = matchPath(pathC, pathname)
  const pathU = { path: "/target-market/user-builds" }
  const currentPathU = matchPath(pathU, pathname)
  const pathG = { path: "/target-market/global-builds" }
  const currentPathG = matchPath(pathG, pathname)
  const pathD = { path: "/target-market/dealer-builds" }
  const currentPathD = matchPath(pathD, pathname)
  const pathE = { path: "/campaigns/inventory-builder" }
  const pathF = { path: "/campaigns/budget" }
  const pathJ = { path: "/campaigns/xxxx" }
  const pathH = { path: "/campaigns/sold-table" }
  const pathI = { path: "/campaigns/view-inventory-builds" }
  const currentPathE = matchPath(pathE, pathname)
  const currentPathF = matchPath(pathF, pathname)
  const currentPathJ = matchPath(pathJ, pathname)
  const currentPathH = matchPath(pathH, pathname)
  const currentPathI = matchPath(pathI, pathname)
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )

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
      <div>
        <ul className="flex">
          <li
            className={`mr-6 rounded-md p-2 ${
              currentPathP?.pathname === "/performance" &&
              "active bg-[#E57200] font-bold"
            }`}
          >
            <Link to="/performance" className="text-white">
              PERFORMANCE
            </Link>
          </li>
          <li
            className={`mr-6 rounded-md p-2 ${
              (currentPathA?.pathname === "/target-market/audience-builder" ||
                currentPathC?.pathname === "/target-market/customer-builder" ||
                currentPathG?.pathname === "/target-market/global-builds" ||
                currentPathD?.pathname === "/target-market/dealer-builds" ||
                currentPathU?.pathname === "/target-market/user-builds") &&
              "active bg-[#E57200] font-bold"
            }`}
          >
            <Link to="/target-market/audience-builder" className="text-white">
              TARGET MARKET
            </Link>
          </li>
          <li className="mr-6 rounded-md p-2 text-white">OPPORTUNITY</li>
          <li
            className={`mr-6 rounded-md p-2 ${
              (currentPathE?.pathname === "/campaigns/inventory-builder" ||
                currentPathI?.pathname === "/campaigns/view-inventory-builds" ||
                currentPathF?.pathname === "/campaigns/budget" ||
                currentPathJ?.pathname === "/campaigns/xxxx" ||
                currentPathH?.pathname === "/campaigns/sold-table") &&
              "active bg-[#E57200] font-bold"
            }`}
          >
            <Link to="/campaigns/inventory-builder" className="text-white">
              CAMPAIGNS
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-auto flex flex-row justify-end space-x-8 items-center">
        <p className="font-bold">
          {userData.firstName} {userData.lastName}
        </p>
        {authPermRols[2] ? <Settings top="75px" /> : null}
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

export default SecondNavbar
