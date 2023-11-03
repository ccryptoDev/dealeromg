import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"
import {
  filtersValuesState,
  recordCountValuesState,
  FinalWhereClsAM,
  recordCountNumber,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import useAuth from "../../Hooks/useAuth"
import { numArray } from "../../util/makeNumberArray"

const ExcludePastCustomer = () => {
  const authPermRolsUB = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const years = numArray(10, 1)
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const AdWhereClsAM = useRecoilState(FinalWhereClsAM)[0]
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [autoPurchase, setAutoPurchase] = useState(false)
  const [autoService, setAutoService] = useState(false)
  const [autoPurchaseYears, setAutoPurchaseYears] = useState(3)
  const [autoServiceYears, setAutoServiceYears] = useState(3)

  useEffect(() => {
    if (filtersValues.excludeService) {
      setAutoServiceYears(+filtersValues.excludeService)
      setAutoService(true)
    }
    if (filtersValues.excludeSales) {
      setAutoPurchaseYears(+filtersValues.excludeSales)
      setAutoPurchase(true)
    }
    if (!filtersValues.excludeSales && !filtersValues.excludeService) {
      setAutoPurchase(false)
      setAutoService(false)
      setAutoPurchaseYears(3)
      setAutoServiceYears(3)
    }
  }, [filtersValues.excludeService, filtersValues.excludeSales])

  const handleSubmit = () => {
    setFiltersValues({
      ...filtersValues,
      excludeSales: autoPurchase ? `${autoPurchaseYears}` : null,
      excludeService: autoService ? `${autoServiceYears}` : null,
    })
    setRecordRequest({
      ...recordRequest,
      excludeSales: autoPurchase ? `Last ${autoPurchaseYears} Years` : null,
      excludeService: autoService ? `Last ${autoServiceYears} Years` : null,
    })

    setSpiner(true)
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
        {
          sql: AdWhereClsAM.sql,
          roofTopID: dealerInfoValue.rooftopID,
          sqlService: autoService ? `${autoServiceYears}` : "",
          sqlSales: autoPurchase ? `${autoPurchaseYears}` : "",
        }
      )
      .then((res) => {
        const resBigQuery = res.data[0]
        const resBigQueryExclude = res.data[1]?.numpid

        if (autoPurchase && autoService) {
          setRecordCount({
            value: resBigQuery.numpid,
            amountExcludeService: resBigQueryExclude,
            amountExcludeSales: res.data[2]?.numpid,
          })
        } else {
          setRecordCount({
            value: resBigQuery.numpid,
            amountExcludeSales: autoPurchase ? resBigQueryExclude : null,
            amountExcludeService: autoService ? resBigQueryExclude : null,
          })
        }
        setSpiner(false)
      })
  }

  const handleSelect = (e) => {
    if (e.target.name === "autoPurchase") {
      setAutoPurchaseYears(+e.target.value)
    }
    if (e.target.name === "autoService") {
      setAutoServiceYears(+e.target.value)
    }
  }

  const handleCheck = (e) => {
    if (e.target.name === "autoPurchase") {
      setAutoPurchase(!autoPurchase)
    }
    if (e.target.name === "autoService") {
      setAutoService(!autoService)
    }
  }

  return (
    <>
      {authPermRolsUB[2] ? (
        <div className="flex flex-col mt-4 bg-[#48578F] p-[20px] rounded-[12px]">
          <h1 className="font-bold mb-2 text-[#FFFFFF]">
            Exclude Past Customer
          </h1>
          <div className="mb-4">
            <div className="flex ml-4">
              <input
                type="checkbox"
                checked={autoPurchase}
                onChange={handleCheck}
                name="autoPurchase"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="font-bold mb-2 text-[#FFFFFF] ml-6">
                Auto Purchase
              </label>
            </div>
            <select
              onChange={handleSelect}
              name="autoPurchase"
              value={autoPurchaseYears}
              className="ml-8  w-[82%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {years.map((year) => {
                if (year === 1) {
                  return (
                    <option key={year} value={year}>
                      Last {year} Year
                    </option>
                  )
                }
                if (year === 3) {
                  return (
                    <option key={year} value={year} selected>
                      Last {year} Years
                    </option>
                  )
                }
                return (
                  <option key={year} value={year}>
                    Last {year} Year
                  </option>
                )
              })}
            </select>
          </div>
          <div className="mb-4">
            <div className="flex ml-4">
              <input
                type="checkbox"
                checked={autoService}
                onChange={handleCheck}
                name="autoService"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="font-bold mb-2 text-[#FFFFFF] ml-6">
                Auto Service
              </label>
            </div>
            <select
              className="ml-8 w-[82%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleSelect}
              name="autoService"
              value={autoServiceYears}
            >
              {years.map((year) => {
                if (year === 1) {
                  return (
                    <option key={year} value={year}>
                      Last {year} Year
                    </option>
                  )
                }
                if (year === 3) {
                  return (
                    <option key={year} value={year} selected>
                      Last {year} Years
                    </option>
                  )
                }
                return (
                  <option key={year} value={year}>
                    Last {year} Year
                  </option>
                )
              })}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="button"
            className="mb-4 text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
          >
            <svg
              className="w-6 h-6 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p>Submit</p>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default ExcludePastCustomer
