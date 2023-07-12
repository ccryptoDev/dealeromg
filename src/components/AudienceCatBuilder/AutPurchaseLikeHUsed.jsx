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

const AutPurchaseLikeHUsed = ({ setNews, setUsed }) => {
  const [purchaseLikeUsed, setpurchaseLikeUsed] = React.useState([
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
  const finalPurchaseLikeUsed = []

  const purshaceLikelihoodPersistencyUsed = () => {
    const purchaseLikeListUsed = [
      { name: "Low", id: "0", selected: false },
      { name: "Medium", id: "1", selected: false },
      { name: "High", id: "2", selected: false },
    ]
    for (let i = 0; i < purchaseLikeListUsed.length; i++) {
      if (filtersValues.usedMarketScoreRange) {
        filtersValues.usedMarketScoreRange.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() ===
            purchaseLikeListUsed[i].name.toLowerCase() &&
            (purchaseLikeListUsed[i] = {
              ...purchaseLikeListUsed[i],
              selected: true,
            })
          return null
        })
      }
    }
    setpurchaseLikeUsed(purchaseLikeListUsed)
  }

  useEffect(() => {
    purshaceLikelihoodPersistencyUsed()
  }, [])

  const changeInputUsed = (event) => {
    const purchaseLikeAuxUsed = [...purchaseLikeUsed]
    purchaseLikeAuxUsed[
      event.target.id.substring(0, event.target.id.length - 11)
    ].selected = event.target.checked
    setpurchaseLikeUsed(purchaseLikeAuxUsed)
  }

  function SortArray(item1, item2) {
    return item1.localeCompare(item2)
  }

  const handlePurchaseUsed = () => {
    for (let i = 0; i < purchaseLikeUsed.length; i++) {
      if (purchaseLikeUsed[i].selected) {
        if (purchaseLikeUsed[i].name === "Low") {
          finalPurchaseLikeUsed.push(`${purchaseLikeUsed[i].name}`)
        } else if (purchaseLikeUsed[i].name === "Medium") {
          finalPurchaseLikeUsed.push(`${purchaseLikeUsed[i].name}`)
        } else if (purchaseLikeUsed[i].name === "High") {
          finalPurchaseLikeUsed.push(`${purchaseLikeUsed[i].name}`)
        }
      }
      if (i === purchaseLikeUsed.length - 1) {
        sendRequestCount(
          findQuery(finalPurchaseLikeUsed, "A.IN_MARKET_USED_SCORE")
        )
        finalPurchaseLikeUsed.sort(SortArray)
        setFiltersValues({
          ...filtersValues,
          usedMarketScoreRange: finalPurchaseLikeUsed,
        })
        setRecordRequest({
          ...recordRequest,
          usedMarketScoreRange: finalPurchaseLikeUsed,
        })
      }
    }
    setUsed(true)
    setNews(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListPurchaseLike(
      recordRequestBody,
      "usedMarketScoreRange",
      "A.IN_MARKET_USED_SCORE",
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
    filtersValues.usedMarketScoreRange === null &&
      setpurchaseLikeUsed(
        purchaseLikeUsed.map((item) => ({ ...item, selected: false }))
      )
  }, [filtersValues.usedMarketScoreRange])

  return (
    <div className="flex flex-col items-center">
      <fieldset className="h-auto">
        <legend className="sr-only">Purchase Likelihood</legend>
        <h2 className="font-bold text-[#586283] text-[17px] mb-6">Used Car</h2>
        {purchaseLikeUsed.map((crepairused) => (
          <div className="flex items-center mb-4" key={crepairused.id}>
            <input
              id={`${crepairused.id}crepairused`}
              checked={crepairused.selected}
              onChange={(event) => changeInputUsed(event)}
              aria-describedby={`checkbox-${crepairused.id}crepairused`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${crepairused.id}crepairused`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {crepairused.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={handlePurchaseUsed}
        className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center my-2"
      >
        Submit
        <img className="mx-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default AutPurchaseLikeHUsed
