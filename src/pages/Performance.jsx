import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useRecoilState } from "recoil"

import useAuth from "../Hooks/useAuth"
// Componentes
import SecondNavbar from "../components/SecondNavbar"
import { dealerInfo } from "../atoms/DealerAtom"

function Performance() {
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const authPermRols = useAuth([""], false)
  const history = useNavigate()

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
  }, [])
  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px] h-[100vh]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <SecondNavbar />
      </div>
      <div className="absolute flex flex-row text-lg font-bold text-white top-[115px] right-[5%]">
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
      <div className="flex space-x-4 items-center justify-center">
        <Link
          to="/target-market/audience-builder"
          className="inline-block py-4 px-4 text-sm font-medium text-center rounded-lg mt-2 w-[15%]
            text-gray-600 bg-gray-50 hover:bg-[#298FC2] hover:text-white dark:text-gray-400 dark:bg-gray-800 dark:text-gray-300"
        >
          Audience Builder
        </Link>
      </div>
    </div>
  )
}

export default Performance
