import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

import useAuth from "../../Hooks/useAuth"
import businessprofile from "../../assets/images/business-profile-dark.svg"

function AdminPanel() {
  // const [feature, setFeature] = useState(0);
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management"],
    true
  )
  const history = useNavigate()

  // useEffect(() => {
  //   if (feature === '1') history('/admin-panel/new-user');
  // }, [feature]);

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
  }, [])
  return (
    <>
      {authPermRols[2] ? (
        <div className="p-[20px] bg-[#F5F9FF] rounded-md">
          <div className="flex space-x-3 mb-4">
            <img
              src={businessprofile}
              alt="bussines profile gray"
              className="h-[20px] w-[18px]"
            />
            <h1 className="font-bold mb-2 text-[#586283] text-[16px]">
              Admin Panel
            </h1>
          </div>
          <div className="flex flex-col">
            <Link
              to="/admin-panel/new-user"
              className="w-full text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center mb-2"
            >
              Create User Account
            </Link>
            <Link
              to="/admin-panel/user-management"
              className="w-full text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center mb-2"
            >
              Manage User Accounts
            </Link>
            <Link
              to="/admin-panel/feed-providers"
              className="w-full text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center mb-2"
            >
              Manage Feed Providers
            </Link>
            <Link
              to="/admin-panel/feed-system-alerts"
              className="w-full text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center mb-2"
            >
              Feed System Alerts
            </Link>
            <Link
              to="/admin-panel/dv-system-alerts"
              className="w-full text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center mb-2"
            >
              DV System Alerts
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AdminPanel
