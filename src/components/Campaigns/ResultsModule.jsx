import { useState } from "react"
import { useRecoilState } from "recoil"
import {
  resultValuesInvBuilder,
  valuesInventoryBuilder,
} from "../../atoms/InventoryBuilderAtom.js"

function ResultsModule() {
  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(false)
  const [showCount, setShowCount] = useState(false)
  const filterValues = useRecoilState(resultValuesInvBuilder)[0]
  const filterLoadValues = useRecoilState(valuesInventoryBuilder)[0]

  const firstButton = () => {
    setFirst(true)
    setSecond(false)
  }

  const secondButton = () => {
    setSecond(true)
    setFirst(false)
  }

  const handleChangeCount = () => {
    setShowCount(!showCount)
  }

  return (
    <div className="scrollbarHideClass flex flex-col max-h-[60vh] overflow-y-scroll">
      <ul className="flex flex-row border-b w-full border-gray-200 dark:border-gray-700">
        <li className="mr-2">
          <button
            onClick={firstButton}
            className={
              first
                ? "inline-block py-2 px-2 text-sm font-bold text-center text-white bg-[#48578F] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-2 px-2 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            Selection
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={secondButton}
            className={
              second
                ? "inline-block py-2 px-2 text-sm font-bold text-center text-white bg-[#48578F] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-2 px-2 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            Make/Models
          </button>
        </li>
      </ul>
      {first ? (
        <div className="mt-4">
          <h2>
            <button
              type="button"
              name="count"
              onClick={handleChangeCount}
              className={
                showCount
                  ? "flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-white dark:bg-gray-800 bg-white dark:hover:bg-gray-800 rounded-xl mb-[10px]"
                  : "flex items-center justify-between p-5 w-full font-medium text-left text-gray-500 dark:text-white dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-800 rounded-xl mb-[10px]"
              }
            >
              <span className="text-[#586283] px-1">Count:</span>
              <svg
                data-accordion-icon
                className={
                  showCount ? "w-6 h-6 shrink-0 rotate-180" : "w-6 h-6 shrink-0"
                }
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
              </svg>
            </button>
          </h2>
          <div className={showCount === true ? "" : "hidden"}>
            <div className="px-10">
              {filterValues.typeList?.length > 0 &&
              filterValues.typeList !== null &&
              filterValues.typeList !== filterLoadValues.typeList ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[18px] text-[#586283] font-bold">
                    Type
                  </span>{" "}
                  {`${filterValues.typeList?.join(", ")}`}
                </p>
              ) : (
                ""
              )}
              {filterValues.minDaysOnLot !== null &&
              filterValues.maxDaysOnLot !== null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[18px] text-[#586283] font-bold">
                    Dol
                  </span>{" "}
                  {`${filterValues.minDaysOnLot} to ${filterValues.maxDaysOnLot} Days`}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="px-10">
            {filterValues.vehicleStyleList !== null &&
            filterValues.vehicleStyleList.length > 0 ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Vehicle Style
                </span>{" "}
                {`${filterValues.vehicleStyleList}`}
              </p>
            ) : (
              ""
            )}
            {filterValues.minYear !== null && filterValues.maxYear !== null ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Vehicle Years
                </span>{" "}
                {`${filterValues.minYear} to ${filterValues.maxYear}`}
              </p>
            ) : (
              ""
            )}
            {filterValues.minDealerPrice !== null &&
            filterValues.maxDealerPrice !== null ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Vehicle Price
                </span>{" "}
                {`$ ${filterValues.minDealerPrice} to $ ${filterValues.maxDealerPrice}`}
              </p>
            ) : (
              ""
            )}
            {filterValues.minMileage !== null &&
            filterValues.maxMileage !== null ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Vehicle Mileage
                </span>{" "}
                {`${filterValues.minMileage} to ${filterValues.maxMileage} `}
              </p>
            ) : (
              ""
            )}
            {filterValues.minImageCount !== null &&
            filterValues.minImageCount !== undefined &&
            filterValues.maxImageCount !== null &&
            filterValues.maxImageCount !== undefined ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Image Count
                </span>{" "}
                {`${filterValues.minImageCount} to ${filterValues.maxImageCount} `}
              </p>
            ) : (
              ""
            )}
            {filterValues.minViews !== null &&
            filterValues.maxViews !== null ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Image Count
                </span>{" "}
                {`${filterValues.minViews} to ${filterValues.maxViews} `}
              </p>
            ) : (
              ""
            )}
            <h1>
              <span className="text-[18px] text-[#586283] font-bold mr-2">
                Inventory Refill
              </span>
              <br />
              Dynamic
            </h1>
          </div>
          <div className="mt-7 px-7">
            <h2 className="text-[#586283]">Exclusions:</h2>
            <div className="px-4 my-7"></div>
          </div>
        </div>
      ) : (
        ""
      )}
      {second ? (
        <div className="mt-4">
          <div className="px-5">
            {filterValues.makeList?.length > 0 ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Make
                </span>{" "}
                {`${filterValues.makeList.join(", ")}`}
              </p>
            ) : (
              ""
            )}
            {filterValues.modelList?.length > 0 ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[18px] text-[#586283] font-bold">
                  Make
                </span>{" "}
                {`${filterValues.modelList.join(", ")}`}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ResultsModule
