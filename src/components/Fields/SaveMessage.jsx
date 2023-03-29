import React from "react"
import check from "../../assets/images/check.svg"
import { customerBuilderState } from "../../atoms/CustomerBuilderAtom"
import { audienceCatBuilderState } from "../../atoms/audienceCatBuilderAtom"
import { useRecoilState } from "recoil"

const SaveMessage = ({ custBuild }) => {
  const show = useRecoilState(
    custBuild ? customerBuilderState : audienceCatBuilderState
  )[0]
  const activeShow = show.findIndex((i) => i.status === true)
  return (
    <div className="flex w-full justify-center">
      <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
        <img className="mx-2 pt-[4px] h-[85%]" src={check} alt="check" />
        <h3 className="text-white font-bold text-[15px]">
          {`Your "${show[activeShow].name}" submission was received.`}
        </h3>
      </div>
    </div>
  )
}

export default SaveMessage
