import { useRecoilState } from "recoil"

import {
  recordCountNumber,
  audienceCatBuilderState,
} from "../../atoms/audienceCatBuilderAtom"
import { CollapseRightBar, CollapseLeftBar } from "../../atoms/SideBars.js"
import { Map } from "../../atoms/Map.js"
import defaultValuesAudBuild from "../../util/defaultValuesAudCatBuilder"
import arrowBarLeft from "../../assets/images/arrow-bar-left.svg"
import location from "../../assets/images/location.svg"

const CollapsingButton = ({ side, start = "close", place = "noAudience" }) => {
  const [recordCount] = useRecoilState(recordCountNumber)
  const [leftMenuCollapse, setLefttMenuCollapse] =
    useRecoilState(CollapseLeftBar)
  const [, setRefreshMap] = useRecoilState(Map)

  const handleLeftCollapse = () => {
    setLefttMenuCollapse(!leftMenuCollapse)
  }

  const [rightMenuCollapse, setRightMenuCollapse] =
    useRecoilState(CollapseRightBar)
  const handleRightCollapse = () => {
    setRightMenuCollapse(!rightMenuCollapse)
  }

  const values = defaultValuesAudBuild
  const [, setShow] = useRecoilState(audienceCatBuilderState)

  const statusChange = () => {
    const selectedValue = values.map((obj) => {
      if (obj.name === "Map") {
        return { ...obj, status: true }
      }
      return obj
    })
    setShow(selectedValue)
    setRefreshMap(Math.random())
  }

  let arrowDirection = !rightMenuCollapse ? "rotate-180" : "mr-2"
  if (start === "open") {
    arrowDirection = rightMenuCollapse ? "rotate-180" : "mr-2"
  }

  if (side === "right") {
    return (
      <div className="flex justify-between">
        <button
          onClick={handleRightCollapse}
          className={`flex items-center justify-center w-[48px] h-[48px] my-8 bg-[#298FC2] rounded-lg ${arrowDirection}`}
        >
          <img src={arrowBarLeft} alt="collapse right menu" />
        </button>
        {place === "audience" &&
          rightMenuCollapse &&
          recordCount.value &&
          recordCount.value < 2000000 && (
            <button
              onClick={statusChange}
              className={`flex items-center justify-center w-[48px] h-[48px] my-8 mx-2 bg-[#298FC2] rounded-lg`}
            >
              <img src={location} width={30} height={30} alt="map" />
            </button>
          )}
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
