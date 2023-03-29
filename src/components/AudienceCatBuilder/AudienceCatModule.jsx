import { useState } from "react"
import { useRecoilState } from "recoil"
import { audienceCatBuilderState } from "../../atoms/audienceCatBuilderAtom"
import defaultValues from "../../util/defaultValuesAudCatBuilder"

function AudienceCatModule() {
  const setShow = useRecoilState(audienceCatBuilderState)[1]
  const values = defaultValues
  const defaultAccordion = {
    geo: false,
    veh: false,
    aut: false,
    ind: false,
    fin: false,
    hou: false,
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
    Object.entries(accordion).forEach(([key, value]) => {
      if (key === name) {
        defaultAccordion[key] = !value
      }
    })
    setAccordion(defaultAccordion)
  }

  return (
    <div className="mb-2">
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
        <div className="p-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Zip Code Radius")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Zip Code Radius
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <button
          type="button"
          name="veh"
          onClick={() => handleChange("veh")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl"
        >
          <span>Vehicles In Household</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${accordion.veh ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.veh ? "" : "hidden"}>
        <div className="p-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <div className="">
              <li
                onClick={() => statusChange("Vehicle Makes")}
                className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
              >
                Makes
              </li>
            </div>
            <li
              onClick={() => statusChange("Vehicle Models")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Models
            </li>
            <li
              onClick={() => statusChange("Vehicle Year")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Year
            </li>
            <li
              onClick={() => statusChange("Vehicle Mileage")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Mileage
            </li>
            <li
              onClick={() => statusChange("Vehicle Class")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Vehicle Class
            </li>
            <li
              onClick={() => statusChange("Vehicle Fuel")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Vehicle Fuel
            </li>
            <li
              onClick={() => statusChange("Vehicle Purchase Date")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Inferred Purchase Date
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <button
          type="button"
          name="aut"
          onClick={() => handleChange("aut")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl"
        >
          <span>Automotive Intenders</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${accordion.aut ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.aut ? "" : "hidden"}>
        <div className="p-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Brand Loyalty")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Brand Loyalty
            </li>
            <li
              onClick={() => statusChange("Purchase Likelihood")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Purchase Likelihood New
            </li>
            <li
              onClick={() => statusChange("Purchase Likelihood")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Purchase Likelihood Used
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <button
          type="button"
          name="ind"
          onClick={() => handleChange("ind")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl"
        >
          <span>Individual Demographics</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${accordion.ind ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.ind ? "" : "hidden"}>
        <div className="p-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Gender, Age & Speaks Spanish")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Gender And Age
            </li>
            <li
              onClick={() => statusChange("Gender, Age & Speaks Spanish")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Speaks Spanish
            </li>
            <li
              onClick={() => statusChange("Occupation")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Occupation
            </li>
            <li
              onClick={() => statusChange("Education Level")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Education Level
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <button
          type="button"
          name="fin"
          onClick={() => handleChange("fin")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl"
        >
          <span>Finances</span>
          <svg
            data-accordion-icon
            className={`w-6 h-6 shrink-0 ${accordion.fin ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.fin === true ? "" : "hidden"}>
        <div className="p-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() =>
                statusChange("Credit Repair Interest & Credit Report Interest")
              }
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Credit Repair Interest
            </li>
            <li
              onClick={() =>
                statusChange("Credit Repair Interest & Credit Report Interest")
              }
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Credit Report Interest
            </li>
            <li
              onClick={() =>
                statusChange("Household Income, Wealth Assets & Home Value")
              }
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              All Household Income
            </li>
            <li
              onClick={() =>
                statusChange("Household Income, Wealth Assets & Home Value")
              }
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              All Wealth Assets
            </li>
            <li
              onClick={() =>
                statusChange("Household Income, Wealth Assets & Home Value")
              }
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Home Value
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <button
          type="button"
          name="hou"
          onClick={() => handleChange("hou")}
          className="flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 rounded-xl"
        >
          <span>Household Demographics</span>
          <svg
            data-accordion-icon
            className="w-6 h-6 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
          </svg>
        </button>
      </h2>
      <div className={accordion.hou === true ? "" : "hidden"}>
        <div className="p-5">
          <ul className="list-disc pl-5 dark:text-gray-400 text-gray-500">
            <li
              onClick={() => statusChange("Household Demographics")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Length of Residence
            </li>
            <li
              onClick={() => statusChange("Household Demographics")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Veteran in the Home
            </li>
            <li
              onClick={() => statusChange("Household Demographics")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Amount of Children
            </li>
            <li
              onClick={() => statusChange("Household Demographics")}
              className="text-[#586283] list-none dark:text-blue-500 mb-[16px] cursor-pointer"
            >
              Presence of Older Teen
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AudienceCatModule
