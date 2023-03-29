import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"
import {
  filtersValuesStateCB,
  recordCountValuesStateCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  SpinerCB,
  recordCountNumberCB,
} from "../../atoms/CustomerBuilderAtom"
import arrowup from "../../assets/images/arrowup.png"
import reset from "../../assets/images/reset.png"
import SaveMessage from "../Fields/SaveMessage"
import SwitchFilter from "../Fields/SwitchFilter"
import { createSQLListSentence } from "../AudienceCatBuilder/utils"
import { bigQueryURL } from "../../util/bigQueryURL"
import { dealerInfo } from "../../atoms/DealerAtom"

const GeoState = () => {
  const [selectedStates, setSelectedStates] = useState([])
  const [recordCount, setRecordCount] = useRecoilState(recordCountValuesStateCB)
  const [filterValue, setFiltersValues] = useRecoilState(filtersValuesStateCB)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [alert, setAlert] = useState(false)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBSale)
  const [sqlService, setSqlService] = useRecoilState(FinalWhereClsCBService)
  const setSpiner = useRecoilState(SpinerCB)[1]
  const setRecordCountNumber = useRecoilState(recordCountNumberCB)[1]
  const { neverPurchased, nevSerPrevPurch } = filterValue
  const usStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]
  const newUsState = usStates.map((st) => {
    return { name: st, selected: false }
  })

  const handleSelectedStates = (event) => {
    if (event.target.checked) {
      setSelectedStates((prevState) => [...prevState, event.target.value])
    } else {
      setSelectedStates(
        selectedStates.filter((value) => value !== event.target.value)
      )
    }
  }

  const handleSubmit = () => {
    setAlert(true)
    const selectedStatesWithQoutes = selectedStates.map((it) => {
      return `'${it}'`
    })
    sendRequestCount(selectedStatesWithQoutes)
    setFiltersValues({
      ...filterValue,
      states: selectedStates,
    })
    setRecordCount({
      ...recordCount,
      states: selectedStates,
    })
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const url = bigQueryURL(neverPurchased, nevSerPrevPurch).url
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "states",
      "State",
      filterValue,
      recordCount,
      AdWhereClsAM,
      false
    )
    const WhereClsAMService = createSQLListSentence(
      recordRequestBody,
      "states",
      "State",
      filterValue,
      recordCount,
      sqlService,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    setSqlService({ sql: WhereClsAMService })
    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, {
        sqlSales: WhereClsAM.replace(" AND 1=0", ""),
        sqlService: WhereClsAMService.replace(" AND 1=0", ""),
        roofTopID: dealerInfoValue.rooftopID,
      })
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCountNumber({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  const handleReset = () => {
    setSelectedStates([])
    sendRequestCount("")
    setFiltersValues({
      ...filterValue,
      states: null,
    })
    setRecordCount({
      ...recordCount,
      states: null,
    })
    setAlert(false)
  }

  useEffect(() => {
    setSelectedStates(filterValue.states ?? [])
  }, [])

  useEffect(() => {
    filterValue.states === null && setSelectedStates([])
  }, [filterValue.states])

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-bold text-[#586283] text-[20px]">State</h2>
        <div className="flex space-x-5 pr-2 mt-5 mb-4 m">
          {alert && filterValue.states !== null && (
            <SaveMessage custBuild={true} />
          )}
        </div>
        <div className="flex space-x-5 pr-2 mt-5 mb-4 m">
          <button
            className="flex flex-row justify-between text-[#298FC2] bg-[#FFFFFF] ring-1 focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleReset}
          >
            Reset
            <img className="py-[2px] px-2" src={reset} alt="reset" />
          </button>
        </div>
      </div>
      <fieldset className="grid grid-cols-3 mt-4 h-auto">
        {newUsState.map((state, id) => (
          <div className="flex items-center mb-4" key={id}>
            <input
              id={`${id}class`}
              onChange={handleSelectedStates}
              aria-describedby={`checkbox-${id}class`}
              type="checkbox"
              value={state.name}
              checked={selectedStates?.find((name) => name === state.name)}
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${id}class`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {state.name}
            </label>
          </div>
        ))}
      </fieldset>
      <div className="flex m-auto">
        <button
          onClick={handleSubmit}
          className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
        >
          Submit
          <img className="mx-2" src={arrowup} alt="arrow" />
        </button>
      </div>
      <SwitchFilter
        next={"Date Range"}
        prev={"Zip Code Radius"}
        custBuild={true}
      />
    </>
  )
}

export default GeoState
