import axios from "axios"
import {
  filtersValuesState,
  recordCountNumber,
  Spiner,
  FinalWhereClsAM,
  recordCountValuesState,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import React, { useEffect } from "react"
import arrowup from "../../assets/images/arrowup.png"
import { findQuery, createSQLListPurchaseLike } from "./utils"

const AutPurchaseLikeH = ({ setNews, setUsed }) => {
  const [purchaseLike, setpurchaseLike] = React.useState([
    { name: "Low", id: "0", selected: false },
    { name: "Medium", id: "1", selected: false },
    { name: "High", id: "2", selected: false },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalPurchaseLike = []

  const purshaceLikelihoodPersistency = () => {
    const purchaseLikeList = [
      { name: "Low", id: "0", selected: false },
      { name: "Medium", id: "1", selected: false },
      { name: "High", id: "2", selected: false },
    ]
    for (let i = 0; i < purchaseLikeList.length; i++) {
      if (filtersValues.newMarketScoreRange) {
        filtersValues.newMarketScoreRange.map((purchaseLike) => {
          purchaseLike.toLowerCase() ===
            purchaseLikeList[i].name.toLowerCase() &&
            (purchaseLikeList[i] = { ...purchaseLikeList[i], selected: true })
          return null
        })
      }
    }
    setpurchaseLike(purchaseLikeList)
  }

  useEffect(() => {
    purshaceLikelihoodPersistency()
  }, [])

  const changeInput = (event) => {
    const purchaseLikeAux = [...purchaseLike]
    purchaseLikeAux[
      event.target.id.substring(0, event.target.id.length - 7)
    ].selected = event.target.checked
    setpurchaseLike(purchaseLikeAux)
  }

  function SortArray(item1, item2) {
    return item1.localeCompare(item2)
  }

  const handlePurchaseLike = () => {
    for (let i = 0; i < purchaseLike.length; i++) {
      if (purchaseLike[i].selected) {
        if (purchaseLike[i].name === "Low") {
          finalPurchaseLike.push(`${purchaseLike[i].name}`)
        } else if (purchaseLike[i].name === "Medium") {
          finalPurchaseLike.push(`${purchaseLike[i].name}`)
        } else if (purchaseLike[i].name === "High") {
          finalPurchaseLike.push(`${purchaseLike[i].name}`)
        }
      }
      if (i === purchaseLike.length - 1) {
        sendRequestCount(findQuery(finalPurchaseLike, "A.IN_MARKET_NEW_SCORE"))
        finalPurchaseLike.sort(SortArray)
        setFiltersValues({
          ...filtersValues,
          newMarketScoreRange: finalPurchaseLike,
        })
        setRecordRequest({
          ...recordRequest,
          newMarketScoreRange: finalPurchaseLike,
        })
      }
    }
    setNews(true)
    setUsed(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListPurchaseLike(
      recordRequestBody,
      "newMarketScoreRange",
      "A.IN_MARKET_NEW_SCORE",
      filtersValues,
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
    filtersValues.newMarketScoreRange === null &&
      setpurchaseLike(
        purchaseLike.map((item) => ({ ...item, selected: false }))
      )
  }, [filtersValues.newMarketScoreRange])

  return (
    <>
      <h2 className="font-bold text-[#586283] text-[20px] mb-6 w-full">
        Purchase Likelihood
      </h2>
      <div className="flex flex-col items-center">
        <fieldset className="h-auto">
          <legend className="sr-only">Purchase Likelihood</legend>
          <h2 className="font-bold text-[#586283] text-[17px] mb-6">New Car</h2>
          {purchaseLike.map((crepair) => (
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
          type="button"
          onClick={handlePurchaseLike}
          className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center my-2"
        >
          Submit
          <img className="mx-2" src={arrowup} alt="arrow" />
        </button>
      </div>
    </>
  )
}

export default AutPurchaseLikeH
