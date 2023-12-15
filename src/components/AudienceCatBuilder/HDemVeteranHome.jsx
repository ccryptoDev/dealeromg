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

const HDemVeteranHome = ({
  setDemLength,
  setDemVeteran,
  setDemAmount,
  setDemOlder,
}) => {
  const [veteranHome, setveteranHome] = React.useState([
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

  const veteranInHomePersistency = () => {
    const veteranInHomeList = [{ name: "Yes", id: "0", selected: false }]
    for (let i = 0; i < veteranInHomeList.length; i++) {
      if (filtersValues.veteranInHome) {
        filtersValues.veteranInHome &&
          (veteranInHomeList[i] = { ...veteranInHomeList[i], selected: true })
      }
    }
  }

  useEffect(() => {
    veteranInHomePersistency()
  }, [])

  const changeInput = (event) => {
    const veteranHomeAux = [...veteranHome]
    veteranHomeAux[
      event.target.id.substring(0, event.target.id.length - 7)
    ].selected = event.target.checked
    setveteranHome(veteranHomeAux)
  }

  const handleVeteranChange = () => {
    if (veteranHome[0].selected) {
      sendRequestCount(`'Y'`)
      setFiltersValues({ ...filtersValues, veteranInHome: true })
      setRecordRequest({ ...recordRequest, veteranInHome: true })
    } else {
      sendRequestCount("")
      setFiltersValues({ ...filtersValues, veteranInHome: false })
    }
    setDemLength(false)
    setDemVeteran(true)
    setDemAmount(false)
    setDemOlder(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLYesSentence(
      recordRequestBody,
      "C.VETERANCD",
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
    filtersValues.veteranInHome &&
      setveteranHome([{ name: "Yes", id: "0", selected: false }])
  }, [filtersValues.veteranInHome])

  return (
    <div className="flex flex-col items-center">
      <fieldset className="h-auto">
        <legend className="sr-only">Veteran In Home</legend>
        <h1 className="font-bold text-[#586283] text-[20px] mb-4">
          Veteran In Home
        </h1>
        {veteranHome.map((veteran) => (
          <div
            className="flex items-center justify-center mb-4"
            key={veteran.id}
          >
            <input
              id={`${veteran.id}veteran`}
              checked={veteran.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${veteran.id}veteran`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${veteran.id}veteran`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {veteran.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handleVeteranChange}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Submit
        <img className="py-[2px] px-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default HDemVeteranHome
