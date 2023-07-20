import React, { useEffect } from "react"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import axios from "axios"
import arrowup from "../../assets/images/arrowup.png"
import { createSQLListSentence } from "./utils"

const FinCreditRepair = ({ setCredRepair, setCredReport }) => {
  const [finCRepair, setfinCRepair] = React.useState([
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
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalCreditRepair = []
  const finalCreditRepairCodes = []

  const creditRepairInterestPersistency = () => {
    const finCRepairList = [
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
    for (let i = 0; i < finCRepairList.length; i++) {
      if (filtersValues.creditRepairInterest) {
        filtersValues.creditRepairInterest.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === finCRepairList[i].name.toLowerCase() &&
            (finCRepairList[i] = { ...finCRepairList[i], selected: true })
          return null
        })
      }
    }
    setfinCRepair(finCRepairList)
  }

  useEffect(() => {
    creditRepairInterestPersistency()
  }, [])

  const changeInput = (event) => {
    const finCRepairAux = [...finCRepair]
    finCRepairAux[
      event.target.id.substring(0, event.target.id.length - 7)
    ].selected = event.target.checked
    setfinCRepair(finCRepairAux)
  }

  const handleCreditRepair = () => {
    for (let i = 0; i < finCRepair.length; i++) {
      if (finCRepair[i].selected) {
        finalCreditRepair.push(`${finCRepair[i].name}`)
        finCRepair[i].code.forEach((code) =>
          finalCreditRepairCodes.push(`${code}`)
        )
      }
      if (i === finCRepair.length - 1) {
        const RepairWithQoutes = finalCreditRepairCodes.map((it) => {
          return `'${it}'`
        })
        sendRequestCount(RepairWithQoutes)
        setFiltersValues({
          ...filtersValues,
          creditRepairInterest: finalCreditRepair,
        })
        setRecordRequest({
          ...recordRequest,
          creditRepairInterest: finalCreditRepairCodes,
        })
      }
    }
    setCredRepair(true)
    setCredReport(false)
  }

  useEffect(() => {
    filtersValues.creditRepairInterest === null &&
      setfinCRepair(
        finCRepair.map((crepair) => ({ ...crepair, selected: false }))
      )
  }, [filtersValues.creditRepairInterest])

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "creditRepairInterest",
      "C.CPI_CREDIT_REPAIR_INDEX",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
        {
          sql: WhereClsAM,
          roofTopID: dealerInfoValue.rooftopID,
          sqlService: filtersValues.excludeService
            ? `${filtersValues.excludeService}`
            : "",
          sqlSales: filtersValues.excludeSales
            ? `${filtersValues.excludeSales}`
            : "",
        }
      )
      .then((res) => {
        const resBigQuery = res.data[0]
        const resBigQueryExclude = res.data[1]?.numpid

        setRecordCount({
          value: resBigQuery.numpid,
          amountExcludeSales: filtersValues.excludeSales
            ? resBigQueryExclude
            : null,
          amountExcludeService: filtersValues.excludeService
            ? resBigQueryExclude
            : null,
        })
        setSpiner(false)
      })
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-[#586283] text-[20px] mb-6">
        Credit Repair Interest
      </h2>
      <fieldset className="h-auto">
        <legend className="sr-only">Credit Repair Interest</legend>
        {finCRepair.map((crepair) => (
          <div className="flex items-center mb-4" key={crepair.id}>
            <input
              id={`${crepair.id}crepair`}
              checked={crepair.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${crepair.id}crepair`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${crepair.id}crepair`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {crepair.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handleCreditRepair}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Submit
        <img className="py-[2px] px-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default FinCreditRepair
