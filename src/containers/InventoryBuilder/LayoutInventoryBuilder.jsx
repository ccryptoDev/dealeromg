import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CollapseRightBar, CollapseLeftBar } from "../../atoms/SideBars"
import { useRecoilState } from "recoil"
import useAuth from "../../Hooks/useAuth"
// Componentes
import SecondNavbar from "../../components/SecondNavbar"
import TabsModule from "../../components/Campaigns/TabsModule"
// Containers
import MainBodyContainer from "./MainBodyContainer"
import LeftSideContainer from "./LeftSideContainer"
import RightSideContainer from "./RightSideContainer"

import CollapsingButton from "../../components/Fields/CollapsingButton"
import resultsImg from "../../assets/images/results.png"

function LayoutInventoryBuilder() {
  const authPermRols = useAuth([""], false)
  const history = useNavigate()

  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]

  const leftMenuCollapse = useRecoilState(CollapseLeftBar)[0]

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
  }, [])

  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <SecondNavbar />
        <TabsModule />
      </div>

      <div className="flex bg-[#F5F9FF] rounded-xl min-h-screen">
        {!leftMenuCollapse ? (
          <CollapsingButton side="left" />
        ) : (
          <div className="w-[20%] p-2 bg-white mr-3 rounded-l-xl">
            <LeftSideContainer />
          </div>
        )}

        <div className="grow w-[60%] ">
          <MainBodyContainer />
        </div>

        {rightMenuCollapse ? (
          <div className="flex flex-col">
            <CollapsingButton side="right" />
            <div className="flex items-center justify-center w-[48px] h-[48px]">
              <img src={resultsImg} alt="results" />
            </div>
          </div>
        ) : (
          <div className="w-[20%] p-2 bg-white ml-3 rounded-r-xl">
            <RightSideContainer />
          </div>
        )}
      </div>
    </div>
  )
}

export default LayoutInventoryBuilder
