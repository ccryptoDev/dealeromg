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

const DemoGenderAge = ({ setGender, setAge, setSpanish }) => {
  const [gender, setgender] = React.useState([
    { name: "Female", id: "0", selected: false, code: "F" },
    { name: "Male", id: "1", selected: false, code: "M" },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalGender = []
  const finalGenderCodes = []

  const gendersPersistency = () => {
    const genderList = [
      { name: "Female", id: "0", selected: false, code: "F" },
      { name: "Male", id: "1", selected: false, code: "M" },
    ]
    for (let i = 0; i < genderList.length; i++) {
      if (filtersValues.genders) {
        filtersValues.genders.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === genderList[i].name.toLowerCase() &&
            (genderList[i] = { ...genderList[i], selected: true })
          return null
        })
      }
    }
    setgender(genderList)
  }

  useEffect(() => {
    gendersPersistency()
  }, [])

  const changeInput = (event) => {
    const genderAux = [...gender]
    genderAux[
      event.target.id.substring(0, event.target.id.length - 6)
    ].selected = event.target.checked
    setgender(genderAux)
  }

  const handleGenderChange = () => {
    for (let i = 0; i < gender.length; i++) {
      if (gender[i].selected) {
        finalGender.push(`${gender[i].name}`)
        finalGenderCodes.push(`${gender[i].code}`)
      }
      if (i === gender.length - 1) {
        const GenderWithQoutes = finalGender.map((it) => {
          return `'${it.substring(0, 1)}'`
        })
        sendRequestCount(GenderWithQoutes)
        setFiltersValues({ ...filtersValues, genders: finalGender })
        setRecordRequest({
          ...recordRequest,
          genders: finalGenderCodes.map((item) => item.toUpperCase()),
        })
      }
    }
    setSpanish(false)
    setAge(false)
    setGender(true)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "genders",
      "C.GENDER",
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
    filtersValues.genders === null &&
      setgender(gender.map((item) => ({ ...item, selected: false })))
  }, [filtersValues.genders])

  return (
    <div className="flex flex-col items-center">
      <fieldset className="h-auto">
        <legend className="sr-only">Gender</legend>
        <h1 className="font-bold text-[#586283] text-[20px] mb-8">Gender</h1>
        {gender.map((gender) => (
          <div className="flex items-center mb-4" key={gender.id}>
            <input
              id={`${gender.id}gender`}
              checked={gender.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${gender.id}gender`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${gender.id}gender`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {gender.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handleGenderChange}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Submit
        <img className="py-[2px] mx-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default DemoGenderAge
