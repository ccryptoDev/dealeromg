import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import {
  filtersValuesStateCB,
  SpinerCB,
  FinalWhereClsCBService,
  recordCountValuesStateCB,
  recordCountNumberCB,
  FinalWhereClsCBSale,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import RangeDateLabel from "./RangeDateLabel"
import SaveMessage from "../Fields/SaveMessage"
import { createSQLDateSentence } from "../AudienceCatBuilder/utils"
import SwitchFilter from "../Fields/SwitchFilter"
import { bigQueryURL } from "../../util/bigQueryURL"

const PrevSerDateRange = () => {
  const [alert, setAlert] = useState(false)
  const [filterValues, setFiltersValues] = useRecoilState(filtersValuesStateCB)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBService)
  const sqlSales = useRecoilState(FinalWhereClsCBSale)[0]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const setRecordCount = useRecoilState(recordCountNumberCB)[1]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesStateCB
  )
  const { neverPurchased, nevSerPrevPurch } = filterValues
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
    setFiltersValues({ ...filterValues, PrevSerDateRange: null })
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
      PrevSerDateRange: dateRange,
    })
    sendRequestCount(
      `CAST('${
        days[0].startDate.toLocaleString("en-US").split(",")[0]
      }' AS DATE FORMAT 'MM/DD/YYYY') AND CAST('${
        days[0].endDate.toLocaleString("en-US").split(",")[0]
      }' AS DATE FORMAT 'MM/DD/YYYY')`
    )
    setRecordRequest({ ...recordRequest, PrevSerDateRange: null })
    setAlert(true)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const sqlClean = { sql: AdWhereClsAM.sql.replace(" AND 1=0", "") }
    const url = bigQueryURL(neverPurchased, nevSerPrevPurch).url
    const WhereClsAM = createSQLDateSentence(
      recordRequestBody,
      "PrevSerDateRange",
      "CAST(NULLIF(CloseDate,'') AS DATE FORMAT 'MM/DD/YYYY')",
      filterValues,
      sqlClean,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, {
        sqlService: WhereClsAM
          ? WhereClsAM.replace(" AND 1=0", "")
          : " AND 1=0",
        sqlSales: sqlSales.sql ? sqlSales.sql : " AND 1=0",
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
          filterValues.PrevSerDateRange !== null
            ? new Date(filterValues.PrevSerDateRange[0])
            : new Date(Date.now() - 24 * 60 * 60 * 1000 * 730),
        endDate:
          filterValues.PrevSerDateRange !== null
            ? new Date(filterValues.PrevSerDateRange[1])
            : new Date(),
      },
    ])
  }, [])

  return (
    <>
      <h2 className="font-bold text-[#586283] text-[20px]">
        Services in a Date Range
      </h2>
      <div className="flex flex-col items-center m-4">
        {alert && filterValues.PrevSerDateRange !== null && (
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
      <SwitchFilter next={"Makes"} prev={"Year"} custBuild={true} />
    </>
  )
}

export default PrevSerDateRange
