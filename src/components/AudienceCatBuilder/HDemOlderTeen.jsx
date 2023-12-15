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
import { createSQLYesSentence } from "./utils"

const HDemOlderTeen = ({
  setDemLength,
  setDemVeteran,
  setDemAmount,
  setDemOlder,
}) => {
  const [olderTeen, setOlderTeen] = React.useState([
    { name: "Yes", id: "0", selected: false },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]

  const teenagerDriverPersistency = () => {
    const olderTeenList = [{ name: "Yes", id: "0", selected: false }]
    for (let i = 0; i < olderTeenList.length; i++) {
      if (filtersValues.teenagerDriver) {
        filtersValues.teenagerDriver &&
          (olderTeenList[i] = { ...olderTeenList[i], selected: true })
      }
    }
    setOlderTeen(olderTeenList)
  }

  useEffect(() => {
    teenagerDriverPersistency()
  }, [])

  const changeInput = (event) => {
    const olderTeenAux = [...olderTeen]
    olderTeenAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setOlderTeen(olderTeenAux)
  }

  const handleOlderChange = () => {
    if (olderTeen[0].selected) {
      sendRequestCount(`'Y'`)
      setFiltersValues({ ...filtersValues, teenagerDriver: true })
      setRecordRequest({ ...recordRequest, teenagerDriver: true })
    } else {
      sendRequestCount("")
      setFiltersValues({ ...filtersValues, teenagerDriver: false })
    }
    setDemLength(false)
    setDemVeteran(false)
    setDemAmount(false)
    setDemOlder(true)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLYesSentence(
      recordRequestBody,
      "C.CHILDAGECD_16_17",
      AdWhereClsAM
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
        if (filtersValues.excludeSales && filtersValues.excludeService) {
          setRecordCount({
            value: resBigQuery.numpid,
            amountExcludeService: resBigQueryExclude,
            amountExcludeSales: res.data[2]?.numpid,
          })
        } else {
          setRecordCount({
            value: resBigQuery.numpid,
            amountExcludeSales: filtersValues.excludeSales
              ? resBigQueryExclude
              : null,
            amountExcludeService: filtersValues.excludeService
              ? resBigQueryExclude
              : null,
          })
        }
        setSpiner(false)
      })
  }

  useEffect(() => {
    filtersValues.teenagerDriver === null &&
      setOlderTeen([{ name: "Yes", id: "0", selected: false }])
  }, [filtersValues.teenagerDriver])

  return (
    <div className="flex flex-col items-center">
      <fieldset className="h-auto">
        <legend className="sr-only">Presence of Driving Age Teenager</legend>
        <h1 className="font-bold text-[#586283] text-[20px] mb-4">
          Presence of Driving Age Teenager
        </h1>
        {olderTeen.map((older) => (
          <div className="flex items-center justify-center mb-4" key={older.id}>
            <input
              id={`${older.id}older`}
              checked={older.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${older.id}older`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${older.id}older`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {older.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handleOlderChange}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Submit
        <img className="py-[2px] px-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default HDemOlderTeen
