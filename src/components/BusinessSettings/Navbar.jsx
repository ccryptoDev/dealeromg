import React, { useEffect } from "react"
import { Link, useNavigate, matchPath, useLocation } from "react-router-dom"

import useAuth from "../../Hooks/useAuth"
import Settings from "../Settings"

// Images
import logo from "../../assets/logos/logo.png"

function SecondNavbar() {
  const [userData, setUserData] = React.useState({})
  const authPermRolsAP = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management"],
    true
  )
  const authPermRolsBS = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const history = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!authPermRolsAP[0]) {
      history("/login")
      return null
    }
    setUserData(JSON.parse(localStorage.getItem("permissionsDealerOMG")))
  }, [])

  const logOut = () => {
    localStorage.removeItem("tokenDealerOMG")
    localStorage.removeItem("permissionsDealerOMG")
    history("/login")
  }

  const pathP = { path: "/business-settings/profile" }
  const pathI = { path: "/business-settings/inventory-urls" }
  const pathCu = { path: "/business-settings/customize" }
  const pathCo = { path: "/business-settings/connect" }
  const pathH = { path: "/business-settings/hierarchy" }
  const pathA = { path: "/business-settings/alerts" }
  const pathAC = { path: "/business-settings/alert-control" }
  const currentPathP = matchPath(pathP, pathname)
  const currentPathI = matchPath(pathI, pathname)
  const currentPathCu = matchPath(pathCu, pathname)
  const currentPathCo = matchPath(pathCo, pathname)
  const currentPathH = matchPath(pathH, pathname)
  const currentPathA = matchPath(pathA, pathname)
  const currentPathAC = matchPath(pathAC, pathname)

  const pathN = { path: "/admin-panel/new-user" }
  const pathUm = { path: "/admin-panel/user-management" }
  const pathF = { path: "/admin-panel/feed-providers" }
  const pathUb = { path: "/admin-panel/user-bulk-upload" }
  const pathCus = { path: "/admin-panel/customize" }
  const pathD = { path: "/admin-panel/dealer-list" }
  const pathPm = { path: "/admin-panel/provider-management" }
  const pathSa = { path: "/admin-panel/feed-system-alerts" }
  const pathDva = { path: "/admin-panel/dv-system-alerts" }
  const currentPathN = matchPath(pathN, pathname)
  const currentPathUm = matchPath(pathUm, pathname)
  const currentPathF = matchPath(pathF, pathname)
  const currentPathUb = matchPath(pathUb, pathname)
  const currentPathCus = matchPath(pathCus, pathname)
  const currentPathD = matchPath(pathD, pathname)
  const currentPathPm = matchPath(pathPm, pathname)
  const currentPathSa = matchPath(pathSa, pathname)
  const currentPathDva = matchPath(pathDva, pathname)

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
          {authPermRolsAP[2] ? (
            <li
              className={`mr-6 rounded-md p-2 ${
                (currentPathN?.pathname === "/admin-panel/new-user" ||
                  currentPathUm?.pathname === "/admin-panel/user-management" ||
                  currentPathF?.pathname === "/admin-panel/feed-providers" ||
                  currentPathUb?.pathname === "/admin-panel/user-bulk-upload" ||
                  currentPathCus?.pathname === "/admin-panel/customize" ||
                  currentPathD?.pathname === "/admin-panel/dealer-list" ||
                  currentPathPm?.pathname ===
                    "/admin-panel/provider-management" ||
                  currentPathSa?.pathname ===
                    "/admin-panel/feed-system-alerts" ||
                  currentPathDva?.pathname ===
                    "/admin-panel/dv-system-alerts") &&
                "active bg-[#E57200] font-bold"
              }`}
            >
              <Link className="text-white" to="/admin-panel/new-user">
                ADMIN PANEL
              </Link>
            </li>
          ) : null}
          {authPermRolsBS[2] &&
          currentPathN?.pathname !== "/admin-panel/new-user" &&
          currentPathUm?.pathname !== "/admin-panel/user-management" &&
          currentPathF?.pathname !== "/admin-panel/feed-providers" &&
          currentPathUb?.pathname !== "/admin-panel/user-bulk-upload" &&
          currentPathCus?.pathname !== "/admin-panel/customize" &&
          currentPathD?.pathname !== "/admin-panel/dealer-list" &&
          currentPathPm?.pathname !== "/admin-panel/provider-management" &&
          currentPathSa?.pathname !== "/admin-panel/feed-system-alerts" &&
          currentPathDva?.pathname !== "/admin-panel/dv-system-alerts" ? (
            <>
              <li
                className={`mr-6 rounded-md p-2 ${
                  (currentPathP?.pathname === "/business-settings/profile" ||
                    currentPathI?.pathname ===
                      "/business-settings/inventory-urls" ||
                    currentPathCu?.pathname ===
                      "/business-settings/customize" ||
                    currentPathCo?.pathname === "/business-settings/connect" ||
                    currentPathH?.pathname === "/business-settings/hierarchy" ||
                    currentPathA?.pathname === "/business-settings/alerts" ||
                    currentPathAC?.pathname ===
                      "/business-settings/alert-control") &&
                  "active bg-[#E57200] font-bold"
                }`}
              >
                <Link className="text-white" to="/business-settings/profile">
                  DEALER SETTINGS
                </Link>
              </li>
              <li className=" mr-6 rounded-md p-2">
                <Link
                  className="text-white"
                  to="/target-market/audience-builder"
                >
                  MAIN MENU
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <div className="w-auto flex flex-row justify-end space-x-8 items-center">
        <p className="font-bold">
          {userData.firstName} {userData.lastName}
        </p>
        <Settings top="75px" />
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
