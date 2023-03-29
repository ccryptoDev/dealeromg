import React from "react"

import { useRecoilState } from "recoil"
import { CollapseRightBar, CollapseLeftBar } from "../../atoms/SideBars.js"

import arrowBarLeft from "../../assets/images/arrow-bar-left.svg"

const CollapsingButton = ({ side, start = "close" }) => {
  const [leftMenuCollapse, setLefttMenuCollapse] =
    useRecoilState(CollapseLeftBar)
  const handleLeftCollapse = () => {
    setLefttMenuCollapse(!leftMenuCollapse)
  }

  const [rightMenuCollapse, setRightMenuCollapse] =
    useRecoilState(CollapseRightBar)
  const handleRightCollapse = () => {
    setRightMenuCollapse(!rightMenuCollapse)
  }

  let arrowDirection = !rightMenuCollapse ? "rotate-180" : "mr-4"
  if (start === "open") {
    arrowDirection = rightMenuCollapse ? "rotate-180" : "mr-4"
  }

  if (side === "right") {
    return (
      <div className="flex-none">
        <button
          onClick={handleRightCollapse}
          className={`flex items-center justify-center w-[48px] h-[48px] my-8 bg-[#298FC2] rounded-lg ${arrowDirection}`}
        >
          <img src={arrowBarLeft} alt="collapse right menu" />
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex justify-end">
        <button
          onClick={handleLeftCollapse}
          className={`flex items-center justify-center w-[48px] h-[48px] my-8 bg-[#298FC2] rounded-lg ${
            !leftMenuCollapse ? "rotate-180 mx-4" : ""
          }`}
        >
          <img src={arrowBarLeft} alt="collapse right menu" />
        </button>
      </div>
    )
  }
}

export default CollapsingButton
