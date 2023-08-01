import { useRecoilState } from "recoil"
import axios from "axios"
import {
  filtersValuesStateCB,
  SpinerCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  recordCountValuesStateCB,
  recordCountNumberCB,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import RangeDateLabel from "./RangeDateLabel"
import { useState, useEffect } from "react"
import SaveMessage from "../Fields/SaveMessage"
import SwitchFilter from "../Fields/SwitchFilter"
import { createSQLDateSentence } from "../AudienceCatBuilder/utils"
import { bigQueryURL } from "../../util/bigQueryURL"

const PrevPurchVehiDateRange = () => {
  const [alert, setAlert] = useState(false)
  const [filterValues, setFiltersValues] = useRecoilState(filtersValuesStateCB)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBSale)
  const sqlService = useRecoilState(FinalWhereClsCBService)[0]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const setRecordCount = useRecoilState(recordCountNumberCB)[1]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesStateCB
  )
  const { neverPurchased, nevSerPrevPurch, nevSerDateRange } = filterValues
  const [days, setDays] = useState([
    {
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000 * 730),
      endDate: new Date(),
      key: "selection",
    },
  ])

  const handleReset = () => {
    setDays([
      {
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000 * 730),
        endDate: new Date(),
        key: "selection",
      },
    ])
    setFiltersValues({ ...filterValues, prevPurchDateRange: null })
    sendRequestCount("")
    setAlert(false)
  }
  const handleSubmit = () => {
    const dateRange = [
      days[0].startDate.toLocaleString("en-US").split(",")[0],
      days[0].endDate.toLocaleString("en-US").split(",")[0],
    ]
    setFiltersValues({
      ...filterValues,
      prevPurchDateRange: dateRange,
    })
    sendRequestCount(
      `CAST('${
        days[0].startDate.toLocaleString("en-US").split(",")[0]
      }' AS DATE FORMAT 'MM/DD/YYYY') AND CAST('${
        days[0].endDate.toLocaleString("en-US").split(",")[0]
      }' AS DATE FORMAT 'MM/DD/YYYY')`
    )
    setRecordRequest({ ...recordRequest, prevPurchDateRange: null })
    setAlert(true)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const sqlClean = { sql: AdWhereClsAM.sql.replace(" AND 1=0", "") }
    const url = bigQueryURL(
      neverPurchased,
      nevSerPrevPurch,
      nevSerDateRange,
      recordRequestBody ? ["06/06/2022"] : null
    ).url
    const WhereClsAM = createSQLDateSentence(
      recordRequestBody,
      "prevPurchDateRange",
      "CAST(NULLIF(ContractDate,'') AS DATE FORMAT 'MM/DD/YYYY')",
      filterValues,
      sqlClean,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, {
        sqlSales: WhereClsAM ? WhereClsAM.replace(" AND 1=0", "") : " AND 1=0",
        sqlService: sqlService.sql ? sqlService.sql : " AND 1=0",
        roofTopID: dealerInfoValue.rooftopID,
      })
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  useEffect(() => {
    setDays([
      {
        key: "selection",
        startDate:
          filterValues.prevPurchDateRange !== null
            ? new Date(filterValues.prevPurchDateRange[0])
            : new Date(Date.now() - 24 * 60 * 60 * 1000 * 730),
        endDate:
          filterValues.prevPurchDateRange !== null
            ? new Date(filterValues.prevPurchDateRange[1])
            : new Date(),
      },
    ])
  }, [])

  return (
    <>
      <h2 className="font-bold text-[#586283] text-[20px]">Date Range</h2>
      <div className="flex flex-col items-center m-4">
        {alert && filterValues.prevPurchDateRange !== null && (
          <SaveMessage custBuild={true} />
        )}
        <div className="flex flex-col items-center m-4">
          <div className="flex">
            <RangeDateLabel setDays={setDays} />
            <DateRange
              onChange={(item) => setDays([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={days}
              editableDateInputs={true}
              dateDisplayFormat="MM/dd/yyyy"
              maxDate={new Date("12/31/2024")}
              direction="horizontal"
            />
          </div>
          <div className="flex justify-between w-[13%] py-8">
            <button
              className="bg-[#586283] text-[#f9f9fa] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-[#298FC2] text-[#f9f9fa] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <SwitchFilter next={"Vehicle Makes"} prev={"State"} custBuild={true} />
    </>
  )
}

export default PrevPurchVehiDateRange
