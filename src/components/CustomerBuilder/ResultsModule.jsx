import { useEffect, useState } from "react"
import {
  filtersValuesStateCB,
  recordCountNumberCB,
  SpinerCB,
  recordCountNumberActivityCB,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import axios from "axios"

function ResultsModule() {
  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(false)
  const dealerInfoValues = useRecoilState(dealerInfo)[0]
  const [filtersValues] = useRecoilState(filtersValuesStateCB)
  const [recordCount, setRecordCount] = useRecoilState(recordCountNumberCB)
  const [recordCountActivity, setRecordCountActivity] = useRecoilState(
    recordCountNumberActivityCB
  )
  const [spiner] = useRecoilState(SpinerCB)
  const prevPurchMakeLength =
    filtersValues.prevPurchMake !== null
      ? filtersValues.prevPurchMake.length - 1
      : 0
  const prevPurchModelLength =
    filtersValues.prevPurchModel != null
      ? filtersValues.prevPurchModel.length - 1
      : 0
  const prevSerMakeLength =
    filtersValues.prevSerMake !== null
      ? filtersValues.prevSerMake.length - 1
      : 0
  const prevSerModelLength =
    filtersValues.prevSerModel != null
      ? filtersValues.prevSerModel.length - 1
      : 0

  const firstButton = () => {
    setFirst(true)
    setSecond(false)
  }

  const secondButton = () => {
    setSecond(true)
    setFirst(false)
  }

  const getRecordCountFirst = async () => {
    const bodyRequest = {
      sqlSales: "",
      sqlService: "",
      roofTopID: dealerInfoValues.rooftopID,
    }
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getDealerVaultCountFromBigQuery`,
        bodyRequest
      )
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
      })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getDVCountDaysWithoutActivity`,
        bodyRequest
      )
      .then((res) => {
        const resBigQuery = res.data
        const noActivitySales = resBigQuery[0]?.numpid
        const noActivityService = resBigQuery[1]?.numpid
        setRecordCountActivity({
          valueSales: noActivitySales,
          valueService: noActivityService,
        })
      })
  }

  useEffect(() => {
    try {
      if (recordCount.value === null) getRecordCountFirst()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const checkKeys = () => {
    const purchaseKeys = [
      "prevPurchYear",
      "prevPurchMake",
      "prevPurchDateRange",
    ]
    const serviceKeys = [
      "neverPurchased",
      "yearRange",
      "nevSerDateRange",
      "nevSerPrevPurch",
      "prevSerMake",
      "prevSerNeverPurch",
      "prevSerTotalService",
      "prevSerTotalSpend",
      "PrevSerDateRange",
    ]
    let checkPurchase = false
    let checkService = false
    Object.keys(filtersValues).forEach((key) => {
      if (purchaseKeys.includes(key) && filtersValues[key] !== null) {
        checkPurchase = true
      }
      if (serviceKeys.includes(key) && filtersValues[key] !== null) {
        checkService = true
      }
    })
    return [checkPurchase, checkService]
  }

  const keys = checkKeys()
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
                "0"
              )}
            </li>
            <li>
              {filtersValues.prevSerTotalSpend != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Total Spend</span>{" "}
                  {`${filtersValues.prevSerTotalSpend[0]}-${filtersValues.prevSerTotalSpend[1]}`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevSerTotalService != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">Total Spend</span>{" "}
                  {`${filtersValues.prevSerTotalService[0]}-${filtersValues.prevSerTotalService[1]}`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.yearRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Purchased Year Range
                  </span>
                  {filtersValues.yearRange[0]}-{filtersValues.yearRange[1]}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevPurchYear != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Purchased Year Range
                  </span>
                  {filtersValues.prevPurchYear[0]}-
                  {filtersValues.prevPurchYear[1]}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevPurchModel != null &&
              filtersValues.prevPurchModel.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Purchased a Vehicle Model
                  </span>
                  {!(filtersValues.prevPurchModel.length > 1)
                    ? `${filtersValues.prevPurchModel[0]}`
                    : `${filtersValues.prevPurchModel[0]} and ${prevPurchModelLength}+`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevPurchMake != null &&
              filtersValues.prevPurchMake.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Purchased a Vehicle Makes
                  </span>
                  {!(filtersValues.prevPurchMake.length > 1)
                    ? `${filtersValues.prevPurchMake[0]}`
                    : `${filtersValues.prevPurchMake[0]} and ${prevPurchMakeLength}+`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevSerMake != null &&
              filtersValues.prevSerMake.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Serviced a Vehicle Makes
                  </span>
                  {!(filtersValues.prevSerMake.length > 1)
                    ? `${filtersValues.prevSerMake[0]}`
                    : `${filtersValues.prevSerMake[0]} and ${prevSerMakeLength}+`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevSerModel != null &&
              filtersValues.prevSerModel.length >= 1 ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Serviced a Vehicle Model
                  </span>
                  {!(filtersValues.prevSerModel.length > 1)
                    ? `${filtersValues.prevSerModel[0]}`
                    : `${filtersValues.prevSerModel[0]} and ${prevSerModelLength}+`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.neverPurchased != null &&
              filtersValues.neverPurchased !== false ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Never Purchased a Vehicle
                  </span>
                  Yes
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.nevSerPrevPurch != null &&
              filtersValues.nevSerPrevPurch !== false ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Never Serviced, Previously Purchased a Vehicle
                  </span>
                  Yes
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevPurchDateRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Previously Purchased a Vehicle Date Range
                  </span>
                  {`${filtersValues.prevPurchDateRange[0]} to ${filtersValues.prevPurchDateRange[1]}`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.prevPurchNewUsed != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">New/Used</span>
                  {filtersValues.prevPurchNewUsed[0] && "New"}{" "}
                  {filtersValues.prevPurchNewUsed[0] &&
                    filtersValues.prevPurchNewUsed[1] &&
                    " and "}{" "}
                  {filtersValues.prevPurchNewUsed[1] && "Used"}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.nevSerDateRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    No Services in a Date Range
                  </span>
                  {`${filtersValues.nevSerDateRange[0]} to ${filtersValues.nevSerDateRange[1]}`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {filtersValues.PrevSerDateRange != null ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    Services in a Date Range
                  </span>
                  {`${filtersValues.PrevSerDateRange[0]} to ${filtersValues.PrevSerDateRange[1]}`}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {recordCountActivity.valueSales != null && keys[0] ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    No Activity Day Count Sales
                  </span>{" "}
                  {recordCountActivity.valueSales
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              ) : (
                ""
              )}
            </li>
            <li>
              {recordCountActivity.valueService != null && keys[1] ? (
                <p className="flex flex-col mb-[16px]">
                  <span className="text-[12px] font-normal">
                    No Activity Day Count Service
                  </span>{" "}
                  {recordCountActivity.valueService
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            {filtersValues.states !== null &&
            filtersValues.states.length !== 0 ? (
              <p className="flex flex-col mb-[16px]">
                <span className="text-[12px] font-normal">State</span>
                {filtersValues.states.join(",")}
              </p>
            ) : (
              ""
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ResultsModule
