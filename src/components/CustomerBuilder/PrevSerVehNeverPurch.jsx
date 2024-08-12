import { useEffect, useState } from "react"
import arrowup from "../../assets/images/arrowup.png"
import { useRecoilState } from "recoil"
import axios from "axios"
import {
  customerBuilderState,
  filtersValuesStateCB,
  SpinerCB,
  FinalWhereClsCBService,
  recordCountNumberCB,
  FinalWhereClsCBSale,
  recordCountNumberActivityCB,
} from "../../atoms/CustomerBuilderAtom"
import { bigQueryURL } from "../../util/bigQueryURL"

import SaveMessage from "../Fields/SaveMessage"
// import SwitchFilter from "../Fields/SwitchFilter"
import { dealerInfo } from "../../atoms/DealerAtom"
import defaultValues from "../../util/defaultValuesCustBuilds"

const PrevSerVehNeverPurch = () => {
  const [never, setNever] = useState(false)
  const [alert, setAlert] = useState(false)
  const [filterValues, setFilterValues] = useRecoilState(filtersValuesStateCB)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setRecordCountNumber = useRecoilState(recordCountNumberCB)[1]
  const setRecordCountActivityNumber = useRecoilState(
    recordCountNumberActivityCB
  )[1]
  const sqlSales = useRecoilState(FinalWhereClsCBSale)[0]
  const sqlService = useRecoilState(FinalWhereClsCBService)[0]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const { neverPurchased, nevSerPrevPurch, nevSerDateRange } = filterValues
  const [url, setUrl] = useState("getDealerVaultCountBothFromBigQuery")
  const setShow = useRecoilState(customerBuilderState)[1]
  const values = defaultValues

  const handleNeverSelected = (event) => {
    setNever(!never)
    setUrl(bigQueryURL(!neverPurchased, nevSerPrevPurch, nevSerDateRange).url)
  }
  const handleSubmit = () => {
    if (never) {
      setAlert(true)
    } else {
      setAlert(false)
    }
    setFilterValues({
      ...filterValues,
      neverPurchased: never,
    })
    sendRequestCount()
  }

  const sendRequestCount = () => {
    setSpiner(true)
    const bodyRequest = {
      sqlService:
        sqlService.sql === " AND 1=0" && sqlSales.sql === " AND 1=0"
          ? ""
          : sqlService.sql
          ? sqlService.sql
          : " AND 1=0",
      sqlSales:
        sqlService.sql === " AND 1=0" && sqlSales.sql === " AND 1=0"
          ? ""
          : sqlSales.sql
          ? sqlSales.sql
          : " AND 1=0",
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
  }

  useEffect(() => {
    setNever(neverPurchased)
  }, [])

  useEffect(() => {
    filterValues.neverPurchased === null && setNever(false)
  }, [filterValues.neverPurchased])

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
    <>
      <div className="flex justify-center flex-col items-center">
        {alert && filterValues.neverPurchased !== null && (
          <SaveMessage custBuild={true} />
        )}
        <div className="flex flex-col items-center w-[30%] rounded-xl p-4">
          <fieldset className="h-auto">
            <legend className="sr-only">Gender</legend>
            <h1 className="font-bold text-[#586283] text-[20px] mb-6">
              Never Purchased a Vehicle
            </h1>

            <div className="flex items-center mb-4 justify-center">
              <input
                id="never"
                checked={never}
                onChange={handleNeverSelected}
                type="checkbox"
                className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
              />
              <label
                htmlFor="never"
                className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Yes
              </label>
            </div>
          </fieldset>
          <button
            onClick={handleSubmit}
            type="button"
            className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Submit
            <img className="py-[2px] mx-2" src={arrowup} alt="arrow" />
          </button>
        </div>
      </div>
      {/* <SwitchFilter
        next={"Previously Purchased a Vehicle"}
        prev={"Vehicle Year"}
        custBuild={true}
      /> */}
      <div className="flex flex-row justify-between items-center rounded-xl bg-[#E3EBF6] px-2 mt-5">
        <button
          className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
          onClick={() => statusChange("Vehicle Year")}
        >
          Previous Filter
        </button>
      </div>
    </>
  )
}

export default PrevSerVehNeverPurch
