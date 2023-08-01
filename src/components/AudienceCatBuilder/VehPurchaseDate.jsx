import React, { useEffect, useState } from "react"
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
import { createSQLListSentence } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SaveMessage from "../Fields/SaveMessage"

const VehPurchaseDate = () => {
  const [alert, setAlert] = useState(false)
  const [vehpdate, setVehpdate] = React.useState([
    {
      name: "1 Years to 2 Years",
      id: "0",
      selected: false,
      code: ["A", "B", "C", "D"],
    },
    { name: "2 Years to 3 Years", id: "1", selected: false, code: "E" },
    { name: "3 Years to 4 Years", id: "2", selected: false, code: "F" },
    { name: "4 or More Years", id: "3", selected: false, code: "G" },
  ])

  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalPD = []
  const finalPDCodes = []

  const inferredPurchasedDatesPersistency = () => {
    const vehpdateList = [
      {
        name: "1 Years to 2 Years",
        id: "0",
        selected: false,
        code: ["A", "B", "C", "D"],
      },
      { name: "2 Years to 3 Years", id: "1", selected: false, code: "E" },
      { name: "3 Years to 4 Years", id: "2", selected: false, code: "F" },
      { name: "4 or More Years", id: "3", selected: false, code: "G" },
    ]
    for (let i = 0; i < vehpdateList.length; i++) {
      if (filtersValues.inferredPurchasedDates) {
        filtersValues.inferredPurchasedDates.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === vehpdateList[i].name.toLowerCase() &&
            (vehpdateList[i] = { ...vehpdateList[i], selected: true })
          return null
        })
      }
    }
    setVehpdate(vehpdateList)
  }

  useEffect(() => {
    inferredPurchasedDatesPersistency()
  }, [])

  const changeInput = (event) => {
    const vehpdateAux = [...vehpdate]
    vehpdateAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setVehpdate(vehpdateAux)
  }

  const handlePDChange = () => {
    setAlert(true)
    for (let i = 0; i < vehpdate.length; i++) {
      if (vehpdate[i].selected) {
        finalPD.push(`${vehpdate[i].name}`)
        if (vehpdate[i].id === "0") {
          finalPDCodes.push("A", "B", "C", "D")
        } else {
          finalPDCodes.push(`${vehpdate[i].code}`)
        }
      }
      if (i === vehpdate.length - 1) {
        setFiltersValues({ ...filtersValues, inferredPurchasedDates: finalPD })
        setRecordRequest({
          ...recordRequest,
          inferredPurchasedDates: finalPDCodes.map((item) =>
            item.toUpperCase()
          ),
        })
      }
    }
    const PDWithQoutes = finalPDCodes.map((it) => {
      return `'${it.toUpperCase()}'`
    })
    sendRequestCount(PDWithQoutes)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "inferredPurchasedDates",
      "A.INFERREDDATE",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      true
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

  useEffect(() => {
    filtersValues.inferredPurchasedDates === null &&
      setVehpdate(vehpdate.map((item) => ({ ...item, selected: false })))
  }, [filtersValues.inferredPurchasedDates])

  return (
    <div>
      {alert && filtersValues.inferredPurchasedDates !== null && (
        <SaveMessage custBuild={false} />
      )}
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-[#586283] text-[20px] mb-6">
          Inferred Purchase Date
        </h2>
        <fieldset className="h-auto">
          <legend className="sr-only">Inferred Purchase Date</legend>
          {vehpdate.map((pdate) => (
            <div className="flex items-center mb-4" key={pdate.id}>
              <input
                id={`${pdate.id}pdate`}
                checked={pdate.selected}
                onChange={(event) => changeInput(event)}
                aria-describedby={`checkbox-${pdate.id}pdate`}
                type="checkbox"
                className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
              />
              <label
                htmlFor={`${pdate.id}pdate`}
                className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {pdate.name}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <SwitchFilterSubmit
        custBuild={false}
        onSubmit={handlePDChange}
        next={"Brand Loyalty"}
        prev={"Vehicle Fuel"}
      />
    </div>
  )
}

export default VehPurchaseDate
