import { Link, matchPath, useLocation } from "react-router-dom"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../atoms/DealerAtom"

function TabsModule() {
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const { pathname } = useLocation()
  const pathA = { path: "/target-market/audience-builder" }
  const pathCB = { path: "/target-market/customer-builder" }
  const pathG = { path: "/target-market/global-builds" }
  const pathU = { path: "/target-market/user-builds" }
  const pathD = { path: "/target-market/dealer-builds" }
  const currentPathA = matchPath(pathA, pathname)
  const currentPathCB = matchPath(pathCB, pathname)
  const currentPathG = matchPath(pathG, pathname)
  const currentPathU = matchPath(pathU, pathname)
  const currentPathD = matchPath(pathD, pathname)
  return (
    <div className="w-full flex flex-row justify-start space-x-8 items-end">
      <ul className="ml-[150px] flex flex-rowborder-gray-200 dark:border-gray-700">
        <li className="mr-2">
          <Link
            to="/target-market/audience-builder"
            aria-current="page"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathA?.pathname === "/target-market/audience-builder" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-500`}
          >
            Audience Builder
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/target-market/customer-builder"
            aria-current="page"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathCB?.pathname === "/target-market/customer-builder" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-500`}
          >
            Customer Builder
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/target-market/user-builds"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathU?.pathname === "/target-market/user-builds" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            User Builds
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/target-market/dealer-builds"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathD?.pathname === "/target-market/dealer-builds" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Dealer Builds
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/target-market/global-builds"
            className={`inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg ${
              currentPathG?.pathname === "/target-market/global-builds" &&
              "active bg-[#298FC2]"
            } hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Global Builds
          </Link>
        </li>
      </ul>
      <div className="absolute flex flex-row text-lg font-bold text-white top-[105px] right-[5%]">
        {`${dealerInfoValue.businessName} - ${dealerInfoValue.zipCode}`}
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
