import { useState } from "react"
import { useRecoilState } from "recoil"
import { customerBuilderState } from "../../atoms/CustomerBuilderAtom"
import defaultValues from "../../util/defaultValuesCustBuilds"

function AudienceCatModule() {
  const setShow = useRecoilState(customerBuilderState)[1]
  const values = defaultValues
  const defaultAccordion = {
    geo: false,
    prevPurVeh: false,
    prevSerVech: false,
    nevServVeh: false,
  }
  const [accordion, setAccordion] = useState({ ...defaultAccordion })

  const statusChange = (value) => {
    const selectedValue = values.map((obj) => {
      if (obj.name === value) {
        return { ...obj, status: true }
      }
      return obj
    })
    setShow(selectedValue)
  }

  const handleChange = (name) => {
    // const acc = { ...accordion };
    Object.entries(accordion).forEach(([key, value]) => {
      if (key === name) {
        defaultAccordion[key] = !value
      }
    })
    setAccordion(defaultAccordion)
  }

  return (
    <div className="mb-2">
      {/* Geographic */}
      <h2>
        <button
          type="button"
          name="geo"
          onClick={() => handleChange("geo")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl mb-[10px]"
        >
          <span className="text-[#586283]">Geographic</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${accordion.geo ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.geo ? "" : "hidden"}>
        <div className="pl-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Zip Code Radius")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Zip Code Radius
            </li>
            {/* <li
              onClick={() => statusChange("DMA")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              DMA
            </li> */}
            <li
              onClick={() => statusChange("State")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              State
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <button
          type="button"
          name="prevPurVeh"
          onClick={() => handleChange("prevPurVeh")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl mb-[10px]"
        >
          <span className="text-[#586283]">Previously Purchased a Vehicle</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${
              accordion.prevPurVeh ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.prevPurVeh ? "" : "hidden"}>
        <div className="pl-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Date Range")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Date Range
            </li>
            <li
              onClick={() => statusChange("Vehicle Makes")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Make
            </li>
            <li
              onClick={() => statusChange("Vehicle Models")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Model
            </li>
            <li
              onClick={() => statusChange("Year")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Year
            </li>
          </ul>
        </div>
      </div>
      {/* Previously Serviced a Vehicle */}
      <h2>
        <button
          type="button"
          name="prevSerVech"
          onClick={() => handleChange("prevSerVech")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl mb-[10px]"
        >
          <span className="text-[#586283]">Previously Serviced a Vehicle</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${
              accordion.prevSerVech ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.prevSerVech ? "" : "hidden"}>
        <div className="pl-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Services in a Date Range")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Services in a Date Range
            </li>
            <li
              onClick={() => statusChange("Makes")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Make
            </li>
            <li
              onClick={() => statusChange("Models")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Model
            </li>
            <li
              onClick={() => statusChange("Vehicle Year")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Vehicle Year
            </li>
            {/* <li
              onClick={() => statusChange("Total Spend")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Total Spend
            </li>
            <li
              onClick={() => statusChange("Total Service Count")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Total Service Count
            </li> */}
            <li
              onClick={() => statusChange("Never Purchased a Vehicle")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Never Purchased a Vehicle
            </li>
            {/* <li
              onClick={() => statusChange("RO Code")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              RO Code
            </li> */}
          </ul>
        </div>
      </div>
      {/* Never Serviced a Vehicle */}
      <h2>
        <button
          type="button"
          name="nevServVeh"
          onClick={() => handleChange("nevServVeh")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl mb-[10px]"
        >
          <span className="text-[#586283]">Never Serviced a Vehicle</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${
              accordion.nevServVeh ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.nevServVeh ? "" : "hidden"}>
        <div className="pl-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("No Services in a Date Range")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              No Services in a Date Range
            </li>
            <li
              onClick={() => statusChange("Previously Purchased a Vehicle")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Previously Purchased a Vehicle
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AudienceCatModule
