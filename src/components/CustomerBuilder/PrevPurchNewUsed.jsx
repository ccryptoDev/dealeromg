import { useEffect, useState } from "react"
import arrowup from "../../assets/images/arrowup.png"
import { useRecoilState } from "recoil"
import axios from "axios"
import {
  recordCountValuesStateCB,
  filtersValuesStateCB,
  SpinerCB,
  FinalWhereClsCBService,
  recordCountNumberCB,
  recordCountNumberActivityCB,
  FinalWhereClsCBSale,
} from "../../atoms/CustomerBuilderAtom"
import { bigQueryURL } from "../../util/bigQueryURL"
import { createSQLListSentence } from "../AudienceCatBuilder/utils"

import SaveMessage from "../Fields/SaveMessage"
import SwitchFilter from "../Fields/SwitchFilter"
import { dealerInfo } from "../../atoms/DealerAtom"

const PrevPurchNewUsed = () => {
  const [newVehicle, setNewVehicle] = useState(false)
  const [usedVehicle, setUsedVehicle] = useState(false)
  const [alert, setAlert] = useState(false)
  const [filterValues, setFilterValues] = useRecoilState(filtersValuesStateCB)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setRecordCountNumber = useRecoilState(recordCountNumberCB)[1]
  const setRecordCountActivityNumber = useRecoilState(
    recordCountNumberActivityCB
  )[1]
  const sqlService = useRecoilState(FinalWhereClsCBService)[0]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesStateCB
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBSale)
  const { neverPurchased, nevSerPrevPurch, nevSerDateRange } = filterValues

  const handleSubmit = () => {
    setAlert(true)
    let stringCondition = ""
    if (!usedVehicle && newVehicle) {
      stringCondition = "'New', 'N'"
    }
    if (usedVehicle && !newVehicle) {
      stringCondition = "'Used', 'U'"
    }
    if (usedVehicle && newVehicle) {
      stringCondition = "'Used', 'U', 'New', 'N'"
    }
    sendRequestCount(stringCondition)
    setFilterValues({
      ...filterValues,
      prevPurchNewUsed: stringCondition ? [newVehicle, usedVehicle] : null,
    })
    setRecordRequest({
      ...recordRequest,
      prevPurchNewUsed: stringCondition || null,
    })
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const sqlClean = { sql: AdWhereClsAM.sql.replace(" AND 1=0", "") }
    const url = bigQueryURL(
      neverPurchased,
      nevSerPrevPurch,
      nevSerDateRange
    ).url
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "prevPurchNewUsed",
      "NewUsed",
      filterValues,
      recordRequest,
      sqlClean,
      false,
      null,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    const bodyRequest = {
      sqlSales: WhereClsAM,
      sqlService: sqlService.sql,
      roofTopID: dealerInfoValue.rooftopID,
    }
    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, bodyRequest)
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCountNumber({ value: recordCountNumber })
        setSpiner(false)
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
        setRecordCountActivityNumber({
          valueSales: noActivitySales,
          valueService: noActivityService,
        })
        setSpiner(false)
      })
    return WhereClsAM
  }

  useEffect(() => {
    if (
      filterValues.prevPurchNewUsed !== null &&
      filterValues.prevPurchNewUsed !== undefined
    ) {
      console.log(filterValues.prevPurchNewUsed)
      setNewVehicle(filterValues.prevPurchNewUsed[0])
      setUsedVehicle(filterValues.prevPurchNewUsed[1])
    }
  }, [])

  useEffect(() => {
    if (filterValues.prevPurchNewUsed === null) {
      setNewVehicle(false)
      setUsedVehicle(false)
    }
  }, [filterValues.prevPurchNewUsed])

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        {alert && filterValues.condition !== null && (
          <SaveMessage custBuild={true} />
        )}
        <div className="flex flex-col items-center w-[70%] rounded-xl p-4">
          <fieldset className="h-auto">
            <legend className="sr-only">New/Used</legend>
            <div className="flex justify-center">
              <h1 className="font-bold text-[#586283] text-[24px]">New/Used</h1>
            </div>
            <h2 className="text-gray-900 text-[14px]">
              Vehicles that identified as new or used at the time of the sale
            </h2>

            <div className="flex items-center mb-4 justify-center mt-10 flex-col">
              <div>
                <input
                  id="new"
                  checked={newVehicle}
                  onChange={() => setNewVehicle(!newVehicle)}
                  type="checkbox"
                  className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                />
                <label
                  htmlFor="new"
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New
                </label>
              </div>
              <div className="mt-7">
                <input
                  id="used"
                  checked={usedVehicle}
                  onChange={() => setUsedVehicle(!usedVehicle)}
                  type="checkbox"
                  className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                />
                <label
                  htmlFor="used"
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Used
                </label>
              </div>
            </div>
          </fieldset>
          <button
            onClick={handleSubmit}
            type="button"
            className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-5"
          >
            Submit
            <img className="py-[2px] mx-2" src={arrowup} alt="arrow" />
          </button>
        </div>
      </div>
      <SwitchFilter
        next={"No Services in a Date Range"}
        prev={"Year"}
        custBuild={true}
      />
    </>
  )
}

export default PrevPurchNewUsed
