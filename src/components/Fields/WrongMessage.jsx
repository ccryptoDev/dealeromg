import React from "react"
import wrong from "../../assets/images/wrong.svg"

const WrongMessage = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="bg-[#e50000] py-2 rounded-md flex justify-center mb-4 w-[80%]">
        <img className="mx-2 mt-0.5 h-[70%]" src={wrong} alt="wrong" />
        <h3 className="text-white font-bold text-[15px]">
          {`This profile does not have a Dealervault ID or the Dealervault Connect is off.`}
        </h3>
      </div>
    </div>
  )
}

export default WrongMessage
