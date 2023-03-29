import React, { useEffect } from "react"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { useRecoilState } from "recoil"
import axios from "axios"
import arrowup from "../../assets/images/arrowup.png"
import { createSQLListSentence } from "./utils"

const FinCreditReport = ({ setCredRepair, setCredReport }) => {
  const [finCreport, setfinCreport] = React.useState([
    {
      name: "None To Little Interest",
      id: "0",
      selected: false,
      code: ["0", "1", "2"],
    },
    { name: "Interest", id: "1", selected: false, code: ["3", "4", "5"] },
    {
      name: "Strong Interest",
      id: "2",
      selected: false,
      code: ["6", "7", "8", "9"],
    },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const finalCreditReport = []
  const finalCreditReportCodes = []

  const creditReportInterestPersistency = () => {
    const finCreportList = [
      {
        name: "None To Little Interest",
        id: "0",
        selected: false,
        code: ["0", "1", "2"],
      },
      { name: "Interest", id: "1", selected: false, code: ["3", "4", "5"] },
      {
        name: "Strong Interest",
        id: "2",
        selected: false,
        code: ["6", "7", "8", "9"],
      },
    ]
    for (let i = 0; i < finCreportList.length; i++) {
      if (filtersValues.creditReportInterest) {
        filtersValues.creditReportInterest.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === finCreportList[i].name.toLowerCase() &&
            (finCreportList[i] = { ...finCreportList[i], selected: true })
          return null
        })
      }
    }
    setfinCreport(finCreportList)
  }

  useEffect(() => {
    creditReportInterestPersistency()
  }, [])

  const changeInput = (event) => {
    const finCreportAux = [...finCreport]
    finCreportAux[
      event.target.id.substring(0, event.target.id.length - 7)
    ].selected = event.target.checked
    setfinCreport(finCreportAux)
  }

  const handleReportChange = () => {
    for (let i = 0; i < finCreport.length; i++) {
      if (finCreport[i].selected) {
        finalCreditReport.push(`${finCreport[i].name}`)
        finCreport[i].code.forEach((code) =>
          finalCreditReportCodes.push(`${code}`)
        )
      }
      if (i === finCreport.length - 1) {
        const ReportWithQoutes = finalCreditReportCodes.map((it) => {
          return `'${it}'`
        })
        sendRequestCount(ReportWithQoutes)
        setFiltersValues({
          ...filtersValues,
          creditReportInterest: finalCreditReport,
        })
        setRecordRequest({
          ...recordRequest,
          creditReportInterest: finalCreditReportCodes,
        })
      }
    }
    setCredReport(true)
    setCredRepair(false)
  }
  useEffect(() => {
    filtersValues.creditReportInterest === null &&
      setfinCreport(
        finCreport.map((crepair) => ({ ...crepair, selected: false }))
      )
  }, [filtersValues.creditReportInterest])

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "creditReportInterest",
      "C.CPI_CREDIT_REPORT_INDEX",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
        { sql: WhereClsAM }
      )
      .then((res) => {
        const resBigQuery = res.data[0]

        const recordCountNumber = resBigQuery.numpid
        // setFacebookData(res.data)
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-[#586283] text-[20px] mb-6">
        Credit Report Interest
      </h2>
      <fieldset className="h-auto">
        <legend className="sr-only">Credit Report Interest</legend>
        {finCreport.map((creport) => (
          <div className="flex items-center mb-4" key={creport.id}>
            <input
              id={`${creport.id}creport`}
              checked={creport.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${creport.id}creport`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${creport.id}creport`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {creport.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handleReportChange}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Submit
        <img className="py-[2px] px-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default FinCreditReport
