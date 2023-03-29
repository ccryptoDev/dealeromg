import React from "react"
import defaultValuesCustBuild from "../../util/defaultValuesCustBuilds"
import defaultValuesAudBuild from "../../util/defaultValuesAudCatBuilder"
import { useRecoilState } from "recoil"
import { customerBuilderState } from "../../atoms/CustomerBuilderAtom"
import { audienceCatBuilderState } from "../../atoms/audienceCatBuilderAtom"

const SwitchFilter = ({ next, prev, custBuild }) => {
  const values = custBuild ? defaultValuesCustBuild : defaultValuesAudBuild
  const setShow = useRecoilState(
    custBuild ? customerBuilderState : audienceCatBuilderState
  )[1]
  const statusChange = (value) => {
    const selectedValue = values.map((obj) => {
      if (obj.name === value) {
        return { ...obj, status: true }
      }
      return obj
    })
    setShow(selectedValue)
  }
  return (
    <div className="flex flex-row justify-between items-center rounded-xl bg-[#E3EBF6] px-2 mt-5">
      <button
        className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
        onClick={() => statusChange(prev)}
      >
        Previous Filter
      </button>
      <button
        className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
        onClick={() => statusChange(next)}
      >
        Next Filter
      </button>
    </div>
  )
}

export default SwitchFilter
