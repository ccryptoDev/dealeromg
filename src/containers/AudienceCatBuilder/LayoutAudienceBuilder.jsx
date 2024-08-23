import { useRecoilState } from "recoil"

// Componentes
import SecondNavbar from "../../components/SecondNavbar"
import TabsModule from "../../components/TabsModule"
// Containers
import RightSideContainer from "./RightSideContainer"
import LeftSideContainer from "./LeftSideContainer"
import MainBodyContainer from "./MainBodyContainer"

import { CollapseRightBar, CollapseLeftBar } from "../../atoms/SideBars"
import CollapsingButton from "../../components/Fields/CollapsingButton"

import categoryImg from "../../assets/images/categories.png"
import resultsImg from "../../assets/images/results.png"

function LayoutAudienceBuilder() {
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const leftMenuCollapse = useRecoilState(CollapseLeftBar)[0]

  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <SecondNavbar />
        <TabsModule />
      </div>
      <div className="flex  bg-[#F5F9FF] rounded-xl">
        {!leftMenuCollapse ? (
          <div className="flex flex-col">
            <CollapsingButton side="left" />
            <div className="flex items-center justify-center w-[48px] h-[48px] rounded-lg mx-4">
              <img src={categoryImg} alt="category" />
            </div>
          </div>
        ) : (
          <div className="p-2 2xl:text-[14px] text-[12px] w-[20%] bg-[#FFFFFF] rounded-l-xl">
            <CollapsingButton side="left" />
            <LeftSideContainer />
          </div>
        )}

        <div className="grid col-span-4 p-2 2xl:text-[14px] text-[12px] min-h-[85vh] w-[60%] grow">
          <MainBodyContainer />
        </div>
        {!rightMenuCollapse ? (
          <div className="flex flex-col">
            <CollapsingButton side="right" start="open" place="audience" />
            <div className="flex items-center justify-center w-[48px] h-[48px]">
              <img src={resultsImg} alt="results" />
            </div>
          </div>
        ) : (
          <div className="p-2 2xl:text-[14px] text-[12px] w-[20%] bg-[#FFFFFF] rounded-r-xl">
            <CollapsingButton side="right" start="open" place="audience" />
            <RightSideContainer />
          </div>
        )}
      </div>
    </div>
  )
}

export default LayoutAudienceBuilder
