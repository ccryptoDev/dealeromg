import React, { useEffect, useState } from "react"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { useRecoilState } from "recoil"
import axios from "axios"
import { createSQLListSentence } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SaveMessage from "../Fields/SaveMessage"

const EducationalLevel = () => {
  const [alert, setAlert] = useState(false)
  const [edLevel, setedLevel] = useState([
    { name: "Completed High School", id: "0", selected: false, code: "A" },
    {
      name: "Attended Vocational/Technical",
      id: "1",
      selected: false,
      code: "D",
    },
    { name: "Completed College", id: "2", selected: false, code: "B" },
    { name: "Completed Graduate School", id: "3", selected: false, code: "C" },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )

  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const finalEdLevel = []
  const finalEdLevelCodes = []

  const educationLevelPersistency = () => {
    const edLevelList = [
      { name: "Completed High School", id: "0", selected: false, code: "A" },
      {
        name: "Attended Vocational/Technical",
        id: "1",
        selected: false,
        code: "D",
      },
      { name: "Completed College", id: "2", selected: false, code: "B" },
      {
        name: "Completed Graduate School",
        id: "3",
        selected: false,
        code: "C",
      },
    ]
    for (let i = 0; i < edLevelList.length; i++) {
      if (filtersValues.educationLevel) {
        filtersValues.educationLevel.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === edLevelList[i].name.toLowerCase() &&
            (edLevelList[i] = { ...edLevelList[i], selected: true })
          return null
        })
      }
    }
    setedLevel(edLevelList)
  }

  useEffect(() => {
    educationLevelPersistency()
  }, [])

  const changeInput = (event) => {
    const edLevelAux = [...edLevel]
    edLevelAux[
      event.target.id.substring(0, event.target.id.length - 7)
    ].selected = event.target.checked
    setedLevel(edLevelAux)
  }

  const handleEdLevel = () => {
    setAlert(true)
    for (let i = 0; i < edLevel.length; i++) {
      if (edLevel[i].selected) {
        finalEdLevel.push(`${edLevel[i].name}`)
        finalEdLevelCodes.push(`${edLevel[i].code}`)
      }
      if (i === edLevel.length - 1) {
        const EdWithQoutes = finalEdLevelCodes.map((it) => {
          return `'${it}'`
        })
        sendRequestCount(EdWithQoutes)
        setFiltersValues({
          ...filtersValues,
          educationLevel: finalEdLevel,
        })
        setRecordRequest({
          ...recordRequest,
          educationLevel: finalEdLevelCodes,
        })
      }
    }
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "educationLevel",
      "C.EDUCATIONCD",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      false
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
    filtersValues.educationLevel === null &&
      setedLevel(edLevel.map((item) => ({ ...item, selected: false })))
  }, [filtersValues.educationLevel])

  return (
    <div>
      {alert && filtersValues.educationLevel && (
        <SaveMessage custBuild={false} />
      )}
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-[#586283] text-[20px] mb-6">
          Education Level
        </h2>
        <fieldset className="h-auto">
          <legend className="sr-only">Education Level</legend>
          {edLevel.map((itemlev) => (
            <div className="flex items-center mb-4" key={itemlev.id}>
              <input
                id={`${itemlev.id}itemlev`}
                checked={itemlev.selected}
                onChange={(event) => changeInput(event)}
                aria-describedby={`checkbox-${itemlev.id}itemlev`}
                type="checkbox"
                className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
              />
              <label
                htmlFor={`${itemlev.id}itemlev`}
                className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {itemlev.name}
              </label>
            </div>
          ))}
        </fieldset>
      </div>
      <SwitchFilterSubmit
        next={"Credit Repair Interest & Credit Report Interest"}
        prev={"Occupation"}
        custBuild={false}
        onSubmit={handleEdLevel}
      />
    </div>
  )
}

export default EducationalLevel
