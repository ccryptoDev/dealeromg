import React, { useEffect } from "react"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { useRecoilState } from "recoil"
import axios from "axios"
import arrowup from "../../assets/images/arrowup.png"
import { createSQLYesSentence } from "./utils"

const DemoSpeaksSpanish = ({ setGender, setAge, setSpanish }) => {
  const [speaksSpanish, setspeaksSpanish] = React.useState([
    { name: "Yes", id: "0", selected: false },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]

  const speaksSpanishPersistency = () => {
    const speaksSpanishList = [{ name: "Yes", id: "0", selected: false }]
    for (let i = 0; i < speaksSpanishList.length; i++) {
      if (filtersValues.speakSpanish) {
        filtersValues.speakSpanish &&
          (speaksSpanishList[i] = { ...speaksSpanishList[i], selected: true })
      }
    }
    setspeaksSpanish(speaksSpanishList)
  }

  useEffect(() => {
    speaksSpanishPersistency()
  }, [])

  const changeInput = (event) => {
    const speaksSpanishAux = [...speaksSpanish]
    speaksSpanishAux[
      event.target.id.substring(0, event.target.id.length - 8)
    ].selected = event.target.checked
    setspeaksSpanish(speaksSpanishAux)
  }

  const handleSpeakChange = () => {
    if (speaksSpanish[0].selected) {
      sendRequestCount(`'Y'`)
      setFiltersValues({ ...filtersValues, speakSpanish: true })
      setRecordRequest({ ...recordRequest, speakSpanish: true })
    } else {
      sendRequestCount("")
      setFiltersValues({ ...filtersValues, speakSpanish: false })
      setRecordRequest({ ...recordRequest, speakSpanish: false })
    }
    setSpanish(true)
    setAge(false)
    setGender(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLYesSentence(
      recordRequestBody,
      "C.SPANISHSPCD",
      AdWhereClsAM
    )
    setAdWhereClsAM({ sql: WhereClsAM })

    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
        { sql: WhereClsAM }
      )
      .then((res) => {
        const resBigQuery = res.data[0]

        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  useEffect(() => {
    filtersValues.speakSpanish === null &&
      setspeaksSpanish([{ name: "Yes", id: "0", selected: false }])
  }, [filtersValues.speakSpanish])

  return (
    <div className="flex flex-col items-center ">
      <fieldset className="h-auto">
        <legend className="sr-only">Speaks Spanish</legend>
        <h1 className="font-bold text-[#586283] text-[20px] mb-8">
          Speaks Spanish
        </h1>
        {speaksSpanish.map((sspanish) => (
          <div
            className="flex items-center justify-center mb-4"
            key={sspanish.id}
          >
            <input
              id={`${sspanish.id}sspanish`}
              checked={sspanish.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${sspanish.id}sspanish`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${sspanish.id}sspanish`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {sspanish.name}
            </label>
          </div>
        ))}
      </fieldset>
      <button
        onClick={handleSpeakChange}
        type="button"
        className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        Submit
        <img className="py-[2px] mx-2" src={arrowup} alt="arrow" />
      </button>
    </div>
  )
}

export default DemoSpeaksSpanish
