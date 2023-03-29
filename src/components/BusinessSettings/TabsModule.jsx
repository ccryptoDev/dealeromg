import { Link, useLocation, matchPath } from "react-router-dom"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../../atoms/DealerAtom"

function TabsModule() {
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const { pathname } = useLocation()

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

  return (
    <div className="w-full flex flex-row justify-start space-x-8 items-end">
      <ul className="ml-[150px] flex flex-rowborder-gray-200 dark:border-gray-700">
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathP?.pathname === "/business-settings/profile"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/profile">Profile</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathI?.pathname === "/business-settings/inventory-urls"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/inventory-urls">Inventory Files</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathCu?.pathname === "/business-settings/customize"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/customize">Customize</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathCo?.pathname === "/business-settings/connect"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/connect">Connect</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathH?.pathname === "/business-settings/hierarchy"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/hierarchy">Hierarchy</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathA?.pathname === "/business-settings/alerts"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/alerts">Alerts</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathAC?.pathname === "/business-settings/alert-control"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/business-settings/alert-control">Alert Control</Link>
          </p>
        </li>
      </ul>
      <div className="absolute flex flex-row text-lg font-bold text-white top-[105px] right-[5%]">
        {dealerInfoValue.businessName}
        <Link to="/business-settings/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer m-[4px] h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default TabsModule
