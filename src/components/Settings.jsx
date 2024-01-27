import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate, matchPath, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../atoms/DealerAtom"
import useAuth from "../Hooks/useAuth"

const Settings = ({ top }) => {
  const authPermRolsAP = useAuth([""], false, ["super-admin", "admin"], true)
  const authPermRolsBS = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management"],
    true
  )
  const [show, setShow] = useState(false)
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const history = useNavigate()
  const { pathname } = useLocation()
  const [amountResentAlerts, setAmountResentAlerts] = useState(0)
  const pathIndex = { path: "/" }
  const currentPathIndex = matchPath(pathIndex, pathname)

  const getAlertLog = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}api/Alerts/Get?DealerID=${dealerInfoValue.dealerID}`
      )
      .then((res) => {
        const resentAlertsTmp = []
        for (let i = 0; i < res.data.length; i++) {
          if (!res.data[i].seenAt) {
            resentAlertsTmp.push(res.data[i])
          }
        }
        setAmountResentAlerts(resentAlertsTmp.length)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (dealerInfoValue.businessName !== "TestUserIOD") {
      getAlertLog()
    }
  }, [dealerInfoValue])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {(dealerInfoValue.crmCompanyID ||
          dealerInfoValue.businessName !== "TestUserIOD") &&
          currentPathIndex?.pathname !== "/" && (
            <button
              onClick={() => history("/business-settings/alerts")}
              className="bell_button--notification"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge_icon--alerts">{amountResentAlerts}</span>
            </button>
          )}
        <button
          onClick={() => setShow(!show)}
          className={`text-white bg-none ${
            show
              ? "ring-2 outline-none ring-gray-300 dark:focus:ring-blue-800"
              : ""
          } font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center`}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`z-10 ${
          show ? `absolute ml-[-40px]` : "hidden"
        } bg-white divide-y divide-gray-300 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 z-20`}
        style={{ top }}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
          {authPermRolsBS[2] &&
          (dealerInfoValue.crmCompanyID ||
            dealerInfoValue.businessName !== "TestUserIOD") ? (
            <li>
              <Link
                to="/business-settings/profile"
                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dealer Settings
              </Link>
            </li>
          ) : null}
        </ul>
        {authPermRolsAP[2] ? (
          <div className="py-1">
            <Link
              to="/admin-panel/new-user"
              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Admin Panel
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Settings
