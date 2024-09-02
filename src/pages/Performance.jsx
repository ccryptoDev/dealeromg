import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"

// Componentes
import SecondNavbar from "../components/SecondNavbar"
import { dealerInfo } from "../atoms/DealerAtom"

function Performance() {
  const [dealerInfoValue] = useRecoilState(dealerInfo)

  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px] h-[4250px]">
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
      <div className="flex space-x-4 items-center justify-center w-full mt-16">
        <iframe
          src={dealerInfoValue.dashThisURL}
          title="DashThis"
          width="100%"
          height="4050px"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default Performance
