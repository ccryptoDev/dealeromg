import React, { useState, useEffect } from "react"
import axios from "axios"
import arrowup from "../../assets/images/arrowup.png"
import { useRecoilState } from "recoil"
import {
  customerBuilderState,
  filtersValuesStateCB,
  FinalWhereClsCBService,
  SpinerCB,
  recordCountNumberCB,
  FinalWhereClsCBSale,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import SaveMessage from "../Fields/SaveMessage"
import defaultValues from "../../util/defaultValuesCustBuilds"
import { bigQueryURL } from "../../util/bigQueryURL"

const NevSerPrevPurch = () => {
  const setShow = useRecoilState(customerBuilderState)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [never, setNever] = useState(false)
  const [alert, setAlert] = useState(false)
  const [filterValues, setFilterValues] = useRecoilState(filtersValuesStateCB)
  const sqlSales = useRecoilState(FinalWhereClsCBSale)[0]
  const sqlService = useRecoilState(FinalWhereClsCBService)[0]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const setRecordCount = useRecoilState(recordCountNumberCB)[1]
  const { neverPurchased, nevSerPrevPurch } = filterValues
  const [url, setUrl] = useState("getDealerVaultCountBothFromBigQuery")
  const values = defaultValues

  const statusChange = (value) => {
    const selectedValue = values.map((obj) => {
      if (obj.name === value) {
        return { ...obj, status: true }
      }
      return obj
    })
    setShow(selectedValue)
  }

  const handleNeverSelected = (event) => {
    setNever(!never)
    setUrl(bigQueryURL(neverPurchased, !nevSerPrevPurch).url)
  }

  const handleSubmit = () => {
    if (never) {
      setAlert(true)
    } else {
      setAlert(false)
    }
    setFilterValues({
      ...filterValues,
      nevSerPrevPurch: never,
    })
    sendRequestCount()
  }

  useEffect(() => {
    setNever(nevSerPrevPurch)
  }, [])

  useEffect(() => {
    filterValues.nevSerPrevPurch === null && setNever(false)
  }, [filterValues.nevSerPrevPurch])

  const sendRequestCount = () => {
    setSpiner(true)
    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, {
        sqlService:
          sqlService.sql === " AND 1=0" && sqlSales.sql === " AND 1=0"
            ? ""
            : sqlService.sql,
        sqlSales:
          sqlService.sql === " AND 1=0" && sqlSales.sql === " AND 1=0"
            ? ""
            : sqlSales.sql,
        roofTopID: dealerInfoValue.rooftopID,
      })
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        {alert && filterValues.nevSerPrevPurch !== null && (
          <SaveMessage custBuild={true} />
        )}
        <div className="flex flex-col items-center w-[30%] rounded-xl p-4">
          <fieldset className="h-auto">
            <legend className="sr-only">Gender</legend>
            <h1 className="font-bold text-[#586283] text-[20px] mb-6">
              Previously Purchased a Vehicle
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
      <div className="flex flex-row justify-between items-center rounded-xl bg-[#E3EBF6] px-2 mt-5">
        <button
          className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
          onClick={() => statusChange("No Service in a Date Range")}
        >
          Previous Filter
        </button>
      </div>
    </>
  )
}

export default NevSerPrevPurch
