import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

import useAuth from "../../Hooks/useAuth"
// Componentes
import SecondNavbar from "../../components/SecondNavbar"
import TabsModule from "../../components/TabsModule"
// Containers
import RightSideContainer from "./RightSideContainer"
import MainBodyContainer from "./MainBodyContainer"

import { CollapseRightBar } from "../../atoms/SideBars"
import CollapsingButton from "../../components/Fields/CollapsingButton"

import resultsImg from "../../assets/images/results.png"

function LayoutPresetBuilds({ nameBuilds, data }) {
  const authPermRols = useAuth([""], false)
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const history = useNavigate()

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
  }, [])
  return (
    <div className="flex flex-col h-full bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <SecondNavbar />
        <TabsModule />
      </div>
      <div className="flex min-h-[80vh] bg-[#F5F9FF] rounded-xl">
        <div className="grid col-span-5 p-2  2xl:text-[14px] text-[12px] rounded-l-xl w-[80%] grow">
          <MainBodyContainer nameBuilds={nameBuilds} data={data} />
        </div>
        {rightMenuCollapse ? (
          <div className="flex flex-col">
            <CollapsingButton side="right" />
            <div className="flex items-center justify-center w-[48px] h-[48px]">
              <img src={resultsImg} alt="results" />
            </div>
          </div>
        ) : (
          <div className=" col-span-1 p-2 2xl:text-[14px] text-[12px] rounded-r-xl w-[20%] bg-[#FFFFFF]">
            <CollapsingButton side="right" />
            <RightSideContainer />
          </div>
        )}
      </div>
    </div>
  )
}

export default LayoutPresetBuilds
