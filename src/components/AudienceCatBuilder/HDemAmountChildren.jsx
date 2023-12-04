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

const HDemAmountChildren = ({
  setDemLength,
  setDemVeteran,
  setDemAmount,
  setDemOlder,
}) => {
  const [Childrens, setChildrens] = React.useState([
    { name: "No Children", id: "0", selected: false, code: "A" },
    { name: "1-2 Children", id: "1", selected: false, code: "B" },
    { name: "3-5 Children", id: "2", selected: false, code: "C" },
    { name: "6 or More Children", id: "3", selected: false, code: "D" },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalAmountC = []
  const finalAmountCodes = []

  const childrensPersistency = () => {
    const childrenList = [
      { name: "No Children", id: "0", selected: false, code: "A" },
      { name: "1-2 Children", id: "1", selected: false, code: "B" },
      { name: "3-5 Children", id: "2", selected: false, code: "C" },
      { name: "6 or More Children", id: "3", selected: false, code: "D" },
    ]
    for (let i = 0; i < childrenList.length; i++) {
      if (filtersValues.childrens) {
        filtersValues.childrens.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === childrenList[i].name.toLowerCase() &&
            (childrenList[i] = { ...childrenList[i], selected: true })
          return null
        })
      }
    }
    setChildrens(childrenList)
  }

  useEffect(() => {
    childrensPersistency()
  }, [])

  const changeInput = (event) => {
    const ChildrensAux = [...Childrens]
    ChildrensAux[
      event.target.id.substring(0, event.target.id.length - 9)
    ].selected = event.target.checked
    setChildrens(ChildrensAux)
  }

  const handlePDChange = () => {
    for (let i = 0; i < Childrens.length; i++) {
      if (Childrens[i].selected) {
        finalAmountC.push(`${Childrens[i].name}`)
        finalAmountCodes.push(`${Childrens[i].code}`)
      }
      if (i === Childrens.length - 1) {
        setFiltersValues({ ...filtersValues, childrens: finalAmountC })
        setRecordRequest({
          ...recordRequest,
          childrens: finalAmountCodes.map((item) => item.toUpperCase()),
        })
      }
    }
    const ChildsWithQoutes = finalAmountCodes.map((it) => {
      return `'${it}'`
    })
    sendRequestCount(ChildsWithQoutes)
    setDemLength(false)
    setDemVeteran(false)
    setDemAmount(true)
    setDemOlder(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "childrens",
      "C.CHILDNBRCD",
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
    filtersValues.childrens === null &&
      setChildrens(Childrens.map((item) => ({ ...item, selected: false })))
  }, [filtersValues.childrens])

  return (
    <div className="flex flex-col items-center justify-center">
      <fieldset className="h-auto flex flex-col items-center justify-center">
        <h1 className="font-bold text-[#586283] text-[20px] mb-8">
          Amount of Children
        </h1>
        {Childrens.map((childrens) => (
          <div
            className="flex items-center justify-center w-[105px] mr-0 mb-4"
            key={childrens.id}
          >
            <input
              id={`${childrens.id}childrens`}
              checked={childrens.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${childrens.id}childrens`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${childrens.id}childrens`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {childrens.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handlePDChange}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Submit
        <img className="py-[2px] px-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default HDemAmountChildren
