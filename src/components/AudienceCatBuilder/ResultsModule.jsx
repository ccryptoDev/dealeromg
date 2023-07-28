import { useState, useEffect } from "react"
import axios from "axios"
import {
  filtersValuesState,
  recordCountNumber,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"

function ResultsModule() {
  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(false)
  const [filtersValues] = useRecoilState(filtersValuesState)
  const [recordCount] = useRecoilState(recordCountNumber)
  const [spiner] = useRecoilState(Spiner)
  const [recordCountFirst, setRecordCountFirst] = useState(0)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  // const [show] = useRecoilState(audienceCatBuilderState)
  const makesLenght =
    filtersValues.makes !== null ? filtersValues.makes.length - 1 : 0
  const modelsLenght =
    filtersValues.models != null ? filtersValues.models.length - 1 : 0
  const vehicleClassesLenght =
    filtersValues.vehicleClasses != null
      ? filtersValues.vehicleClasses.length - 1
      : 0
  const fuelTypesLenght =
    filtersValues.fuelTypeCodes != null
      ? filtersValues.fuelTypeCodes.length - 1
      : 0
  const ocuppationLenght =
    filtersValues.ocupationCodes != null
      ? filtersValues.ocupationCodes.length - 1
      : 0
  let QtyLessLikely = 0
  let QtyMostLikely = 0
  if (filtersValues.brandLoyalty !== null) {
    const lessLikely = []
    const mostLikely = []
    for (let i = 0; i < filtersValues.brandLoyalty.length; i++) {
      if (filtersValues.brandLoyalty[i].status === "Less Likely To Purchase") {
        lessLikely.push(filtersValues.brandLoyalty[i].name)
      } else if (
        filtersValues.brandLoyalty[i].status === "Most Likely To Purchase"
      ) {
        mostLikely.push(filtersValues.brandLoyalty[i].name)
      }
    }
    QtyLessLikely = lessLikely.length
    QtyMostLikely = mostLikely.length
  }

  const firstButton = () => {
    setFirst(true)
    setSecond(false)
  }

  const secondButton = () => {
    setSecond(true)
    setFirst(false)
  }

  const getRecordCountFirst = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
      {
        sql: "",
        sqlSales: "",
        sqlService: "",
        roofTopID: dealerInfoValue.rooftopID,
      }
    )

    const resBigQuery = res.data[0]
    setRecordCountFirst(
      resBigQuery.numpid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    )
  }

  useEffect(() => {
    try {
      getRecordCountFirst()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="scrollbarHideClass flex flex-col max-h-[60vh] overflow-y-scroll">
      <ul className="flex flex-row border-b border-gray-200 dark:border-gray-700">
        <li className="mr-2">
          <button
            onClick={firstButton}
            className={
              first
                ? "inline-block py-2 px-4 text-sm font-bold text-center text-white bg-[#48578F] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-2 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            Selected Data
          </button>
        </li>
        <li className="mr-2">
          <button
            onClick={secondButton}
            className={
              second
                ? "inline-block py-2 px-4 text-sm font-bold text-center text-white bg-[#48578F] rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "inline-block py-2 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }
          >
            Selected Geo
          </button>
        </li>
      </ul>
      {first ? (
        <div className="mt-4">
          <ul className="text-[#586283] text-[16px] font-bold">
            <li className="flex flex-col mb-[16px]">
              <span className="text-[12px] font-normal">Record Count</span>
              {recordCount.value != null && spiner === false ? (
                recordCount.value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              ) : spiner === true ? (
                <div>
                  <svg
                    role="status"
                    className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-[#586283]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="text-[10px] font-normal">Calculating..</span>
                </div>
              ) : (
                recordCountFirst
              )}
            </li>
            <li>
              {filtersValues.teenagerDriver != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Presence of Driving Age Teenager
                  </span>{" "}
                  Yes
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.childrens != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Amount of Children
                  </span>{" "}
                  {filtersValues.childrens.map((item, index) => {
                    return (
                      <div className="flex flex-col" key={index}>
                        {item}
                      </div>
                    )
                  })}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.veteranInHome != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Veteran In Home
                  </span>{" "}
                  Yes
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.lenghtResidence != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Length of Residence
                  </span>{" "}
                  {filtersValues.lenghtResidence[0]} Years -{" "}
                  {filtersValues.lenghtResidence[1]} Years
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.homeValues != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Home Value</span> $
                  {filtersValues.homeValues[0]},000-$
                  {filtersValues.homeValues[1]},000
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.allWealthAssests != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    All Wealth Assets
                  </span>{" "}
                  ${filtersValues.allWealthAssests[0]},000-$
                  {filtersValues.allWealthAssests[1]},000
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.householdIncome != null ? (
                <p className="flex flex-col mb-[16px]">
                  <p className="text-[12px] font-normal">Household Income</p> $
                  {filtersValues.householdIncome[0]},000-$
                  {filtersValues.householdIncome[1]},000
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.creditReportInterest != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Credit Report Interest
                  </span>{" "}
                  {filtersValues.creditReportInterest.map((item, index) => {
                    return (
                      <div className="flex flex-col" key={index}>
                        {item}
                      </div>
                    )
                  })}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.creditRepairInterest != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Credit Repair Interest
                  </span>{" "}
                  {filtersValues.creditRepairInterest.map((item, index) => {
                    return (
                      <div className="flex flex-col" key={index}>
                        {item}
                      </div>
                    )
                  })}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.educationLevel != null &&
              filtersValues.educationLevel.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Education Level
                  </span>{" "}
                  {filtersValues.educationLevel.map((item, index) => {
                    return (
                      <div className="flex flex-col" key={index}>
                        {item}
                      </div>
                    )
                  })}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.ocupationCodes != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Occupation</span>
                  {filtersValues.ocupationCodes[0]} and {ocuppationLenght}+
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.speakSpanish != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Speaks Spanish
                  </span>
                  Yes
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.ageRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Age Range</span>
                  {filtersValues.ageRange[0]} Years -{filtersValues.ageRange[1]}{" "}
                  Years
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.genders != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Gender</span>
                  {filtersValues.genders.map((item, index) => (
                    <div className="flex flex-row" key={index}>
                      <p>{item}</p>
                    </div>
                  ))}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.newMarketScoreRange != null ||
              filtersValues.usedMarketScoreRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Purchase Likelihood
                  </span>{" "}
                  {filtersValues.newMarketScoreRange != null ? (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-normal">New</span>
                      <span>
                        {filtersValues.newMarketScoreRange.join(", ")}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  {filtersValues.usedMarketScoreRange != null ? (
                    <div className="flex flex-col">
                      <span className="text-[9px] font-normal">Used</span>
                      <span>
                        {filtersValues.usedMarketScoreRange.join(", ")}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.brandLoyalty != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Brand Loyalty</span>{" "}
                  <span className="text-[9px] font-normal">Less Likely</span>
                  {QtyLessLikely}
                  <span className="text-[9px] font-normal">Most Likely</span>
                  {QtyMostLikely}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.inferredPurchasedDates != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Inferred Purchase Date
                  </span>{" "}
                  {filtersValues.inferredPurchasedDates.map((item, index) => {
                    return (
                      <div className="flex flex-col" key={index}>
                        {item}
                      </div>
                    )
                  })}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.fuelTypeCodes != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Vehicle Fuel</span>
                  {filtersValues.fuelTypeCodes[0]} and {fuelTypesLenght}+
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.vehicleClasses != null &&
              vehicleClassesLenght >= 0 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Vehicle Class</span>
                  {filtersValues.vehicleClasses[0]}{" "}
                  {vehicleClassesLenght > 0 && `and ${vehicleClassesLenght}+`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.mileageCodeList != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Mileage Range</span>{" "}
                  {filtersValues.mileageCodeList[0]},000-
                  {filtersValues.mileageCodeList[1]},000
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.yearRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Year Range</span>
                  {filtersValues.yearRange[0]}-{filtersValues.yearRange[1]}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.models != null &&
              filtersValues.models.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Models</span>
                  {filtersValues.models[0]} and {modelsLenght}+
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.makes != null &&
              filtersValues.makes.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Makes</span>
                  {filtersValues.makes[0]} and {makesLenght}+
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {recordCount.amountExcludeService ||
              recordCount.amountExcludeSales ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Auto Service Count
                  </span>{" "}
                  {recordCount.amountExcludeSales ||
                    recordCount.amountExcludeService}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.excludeSales ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Auto Purchase Year Range
                  </span>{" "}
                  {`Last ${filtersValues.excludeSales} Years`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.excludeService ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Auto Service Year Range
                  </span>{" "}
                  {`Last ${filtersValues.excludeService} Years`}
                </p>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
      {second ? (
        <div className="mt-4">
          <ul className="text-[#586283] text-[16px] font-bold">
            <li>
              {filtersValues.zipCodeCenter != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Starting Zip Code
                  </span>{" "}
                  {filtersValues.zipCodeCenter}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.zipCodeRadius != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Radius</span>{" "}
                  {filtersValues.zipCodeRadius} Miles
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.zipCodesCount != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Zip Code Count
                  </span>
                  {filtersValues.zipCodesCount}
                </p>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ResultsModule
