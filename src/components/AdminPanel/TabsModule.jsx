import { Link, useLocation, matchPath } from "react-router-dom"

function TabsModule() {
  const { pathname } = useLocation()

  const pathN = { path: "/admin-panel/new-user" }
  const pathUm = { path: "/admin-panel/user-management" }
  const pathF = { path: "/admin-panel/feed-providers" }
  const pathPm = { path: "/admin-panel/provider-management" }
  const pathSa = { path: "/admin-panel/feed-system-alerts" }
  const pathDva = { path: "/admin-panel/dv-system-alerts" }
  const currentPathN = matchPath(pathN, pathname)
  const currentPathUm = matchPath(pathUm, pathname)
  const currentPathF = matchPath(pathF, pathname)
  const currentPathPm = matchPath(pathPm, pathname)
  const currentPathSa = matchPath(pathSa, pathname)
  const currentPathDva = matchPath(pathDva, pathname)

  return (
    <div className="w-full flex flex-row justify-start space-x-8 items-end">
      <ul className="ml-[150px] flex flex-rowborder-gray-200 dark:border-gray-700">
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathN?.pathname === "/admin-panel/new-user"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/admin-panel/new-user">New User</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathUm?.pathname === "/admin-panel/user-management"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/admin-panel/user-management">User Management</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathF?.pathname === "/admin-panel/feed-providers"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/admin-panel/feed-providers">Feed Provider</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathPm?.pathname === "/admin-panel/provider-management"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/admin-panel/provider-management">
              Provider Management
            </Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathSa?.pathname === "/admin-panel/feed-system-alerts"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/admin-panel/feed-system-alerts">Feed System Alerts</Link>
          </p>
        </li>
        <li className="mr-2 cursor-pointer">
          <p
            className={
              currentPathDva?.pathname === "/admin-panel/dv-system-alerts"
                ? "inline-block py-4 px-4 text-sm font-medium text-center text-white bg-[#298FC2] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-4 px-4 text-sm font-medium text-center text-white rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            <Link to="/admin-panel/dv-system-alerts">DV System Alerts</Link>
          </p>
        </li>
      </ul>
    </div>
  )
}

export default TabsModule
