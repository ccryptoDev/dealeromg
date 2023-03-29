import { Link, matchPath, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../../atoms/DealerAtom"

function TabsModule() {
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const { pathname } = useLocation()
  const pathA = { path: "/campaigns/inventory-builder" }
  const pathI = { path: "/campaigns/irregular" }
  const pathD = { path: "/campaigns/sold-table" }
  const currentPathA = matchPath(pathA, pathname)
  const currentPathD = matchPath(pathD, pathname)
  const currentPathI = matchPath(pathI, pathname)
  return (
    <div className="w-full flex flex-row justify-start space-x-8 items-end">
      <ul className="ml-[150px] flex flex-rowborder-gray-200 dark:border-gray-700">
        <li className="mr-2">
          <Link
            to="/campaigns/inventory-builder"
            aria-current="page"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathA?.pathname === "/campaigns/inventory-builder" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-500`}
          >
            Inventory Builder
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/campaigns/sold-table"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathD?.pathname === "/campaigns/sold-table" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Sold
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/campaigns/irregular"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathI?.pathname === "/campaigns/irregular" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Irregular
          </Link>
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
