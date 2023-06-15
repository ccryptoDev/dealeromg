import { useRecoilState } from "recoil"
// Components
import BusinessProfile from "../../components/EntryPage/BusinessProfile"
import AdminPanel from "../../components/EntryPage/AdminPanel"
import { CollapseRightBar } from "../../atoms/SideBars"

import arrowbarleft from "../../assets/images/arrow-bar-left.svg"

function RightSideContainer() {
  const setCollapse = useRecoilState(CollapseRightBar)[1]
  const handleCollapse = () => {
    setCollapse(true)
  }
  return (
    <div className="sticky">
      <h2 className="font-bold text-[#586283] text-[20px]">Admin Shortcut</h2>
      <div className="flex flex-col p-[15px]">
        <div className="flex justify-between items-center mt-4 mb-4 h-[48px]">
          <button
            onClick={handleCollapse}
            type="button"
            className="flex items-center w-auto h-[40px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2.5 text-center mr-2 my-2"
          >
            <img src={arrowbarleft} alt="arrow" className="rotate-180" />
          </button>
        </div>
      </div>
      <BusinessProfile />
      <AdminPanel />
    </div>
  )
}

export default RightSideContainer
