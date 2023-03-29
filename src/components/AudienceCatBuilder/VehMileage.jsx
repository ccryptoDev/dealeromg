import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import arrowup from "../../assets/images/arrowup.png"
import reset from "../../assets/images/reset.png"
import { createSQLListSentence } from "./utils"
import SwitchFilter from "../Fields/SwitchFilter"
import SaveMessage from "../Fields/SaveMessage"

const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#298FC2",
    },
  },
})

function valuetext(value) {
  return `${value},000`
}

export default function VehMileage() {
  const [alert, setAlert] = React.useState(false)
  const [value, setValue] = React.useState([0, 50])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  const setRecordCount = useRecoilState(recordCountNumber)[1]

  useEffect(() => {
    if (filtersValues.mileageCodeList != null) {
      setValue(filtersValues.mileageCodeList)
    }
  }, [filtersValues.mileageCodeList])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleMileageChange = () => {
    setAlert(true)
    const mileageRange = value
    const mileageLetters = []
    let keepGoing = false
    setFiltersValues({ ...filtersValues, mileageCodeList: mileageRange })
    if (
      (mileageRange[0] >= 0 && mileageRange[0] < 10) ||
      (mileageRange[1] >= 0 && mileageRange[1] < 10) ||
      keepGoing
    ) {
      mileageLetters.push("A")
      if (mileageRange[0] >= 0 && mileageRange[0] < 10) keepGoing = true
      if (mileageRange[1] >= 0 && mileageRange[1] < 10) keepGoing = false
    }
    if (
      (mileageRange[0] >= 10 && mileageRange[0] < 20) ||
      (mileageRange[1] >= 10 && mileageRange[1] < 20) ||
      keepGoing
    ) {
      mileageLetters.push("B")
      if (mileageRange[0] >= 10 && mileageRange[0] < 20) keepGoing = true
      if (mileageRange[1] >= 10 && mileageRange[1] < 20) keepGoing = false
    }
    if (
      (mileageRange[0] >= 20 && mileageRange[0] < 30) ||
      (mileageRange[1] >= 20 && mileageRange[1] < 30) ||
      keepGoing
    ) {
      mileageLetters.push("C")
      if (mileageRange[0] >= 20 && mileageRange[0] < 30) keepGoing = true
      if (mileageRange[1] >= 20 && mileageRange[1] < 30) keepGoing = false
    }
    if (
      (mileageRange[0] >= 30 && mileageRange[0] < 40) ||
      (mileageRange[1] >= 30 && mileageRange[1] < 40) ||
      keepGoing
    ) {
      mileageLetters.push("D")
      if (mileageRange[0] >= 30 && mileageRange[0] < 40) keepGoing = true
      if (mileageRange[1] >= 30 && mileageRange[1] < 40) keepGoing = false
    }
    if (
      (mileageRange[0] >= 40 && mileageRange[0] < 50) ||
      (mileageRange[1] >= 40 && mileageRange[1] < 50) ||
      keepGoing
    ) {
      mileageLetters.push("E")
      if (mileageRange[0] >= 40 && mileageRange[0] < 50) keepGoing = true
      if (mileageRange[1] >= 40 && mileageRange[1] < 50) keepGoing = false
    }
    if (
      (mileageRange[0] >= 50 && mileageRange[0] < 60) ||
      (mileageRange[1] >= 50 && mileageRange[1] < 60) ||
      keepGoing
    ) {
      mileageLetters.push("F")
      if (mileageRange[0] >= 50 && mileageRange[0] < 60) keepGoing = true
      if (mileageRange[1] >= 50 && mileageRange[1] < 60) keepGoing = false
    }
    if (
      (mileageRange[0] >= 60 && mileageRange[0] < 70) ||
      (mileageRange[1] >= 60 && mileageRange[1] < 70) ||
      keepGoing
    ) {
      mileageLetters.push("G")
      if (mileageRange[0] >= 60 && mileageRange[0] < 70) keepGoing = true
      if (mileageRange[1] >= 60 && mileageRange[1] < 70) keepGoing = false
    }
    if (
      (mileageRange[0] >= 70 && mileageRange[0] < 80) ||
      (mileageRange[1] >= 70 && mileageRange[1] < 80) ||
      keepGoing
    ) {
      mileageLetters.push("H")
      if (mileageRange[0] >= 70 && mileageRange[0] < 80) keepGoing = true
      if (mileageRange[1] >= 70 && mileageRange[1] < 80) keepGoing = false
    }
    if (
      (mileageRange[0] >= 80 && mileageRange[0] < 90) ||
      (mileageRange[1] >= 80 && mileageRange[1] < 90) ||
      keepGoing
    ) {
      mileageLetters.push("I")
      if (mileageRange[0] >= 80 && mileageRange[0] < 90) keepGoing = true
      if (mileageRange[1] >= 80 && mileageRange[1] < 90) keepGoing = false
    }
    if (
      (mileageRange[0] >= 90 && mileageRange[0] < 100) ||
      (mileageRange[1] >= 90 && mileageRange[1] < 100) ||
      keepGoing
    ) {
      mileageLetters.push("J")
      if (mileageRange[0] >= 90 && mileageRange[0] < 100) keepGoing = true
      if (mileageRange[1] >= 90 && mileageRange[1] < 100) keepGoing = false
    }
    if (
      (mileageRange[0] >= 100 && mileageRange[0] < 110) ||
      (mileageRange[1] >= 100 && mileageRange[1] < 110) ||
      keepGoing
    ) {
      mileageLetters.push("K")
      if (mileageRange[0] >= 100 && mileageRange[0] < 110) keepGoing = true
      if (mileageRange[1] >= 100 && mileageRange[1] < 110) keepGoing = false
    }
    if (
      (mileageRange[0] >= 110 && mileageRange[0] < 120) ||
      (mileageRange[1] >= 110 && mileageRange[1] < 120) ||
      keepGoing
    ) {
      mileageLetters.push("L")
      if (mileageRange[0] >= 110 && mileageRange[0] < 120) keepGoing = true
      if (mileageRange[1] >= 110 && mileageRange[1] < 120) keepGoing = false
    }
    if (
      (mileageRange[0] >= 120 && mileageRange[0] < 130) ||
      (mileageRange[1] >= 120 && mileageRange[1] < 130) ||
      keepGoing
    ) {
      mileageLetters.push("M")
      if (mileageRange[0] >= 120 && mileageRange[0] < 130) keepGoing = true
      if (mileageRange[1] >= 120 && mileageRange[1] < 130) keepGoing = false
    }
    if (
      (mileageRange[0] >= 130 && mileageRange[0] < 140) ||
      (mileageRange[1] >= 130 && mileageRange[1] < 140) ||
      keepGoing
    ) {
      mileageLetters.push("N")
      if (mileageRange[0] >= 130 && mileageRange[0] < 140) keepGoing = true
      if (mileageRange[1] >= 130 && mileageRange[1] < 140) keepGoing = false
    }
    if (
      (mileageRange[0] >= 140 && mileageRange[0] < 150) ||
      (mileageRange[1] >= 140 && mileageRange[1] < 150) ||
      keepGoing
    ) {
      mileageLetters.push("O")
      if (mileageRange[0] >= 140 && mileageRange[0] < 150) keepGoing = true
      if (mileageRange[1] >= 140 && mileageRange[1] < 150) keepGoing = false
    }
    if (
      (mileageRange[0] >= 150 && mileageRange[0] < 160) ||
      (mileageRange[1] >= 150 && mileageRange[1] < 160) ||
      keepGoing
    ) {
      mileageLetters.push("P")
      if (mileageRange[0] >= 150 && mileageRange[0] < 160) keepGoing = true
      if (mileageRange[1] >= 150 && mileageRange[1] < 160) keepGoing = false
    }
    if (
      (mileageRange[0] >= 160 && mileageRange[0] < 170) ||
      (mileageRange[1] >= 160 && mileageRange[1] < 170) ||
      keepGoing
    ) {
      mileageLetters.push("Q")
      if (mileageRange[0] >= 160 && mileageRange[0] < 170) keepGoing = true
      if (mileageRange[1] >= 160 && mileageRange[1] < 170) keepGoing = false
    }
    if (
      (mileageRange[0] >= 170 && mileageRange[0] < 180) ||
      (mileageRange[1] >= 170 && mileageRange[1] < 180) ||
      keepGoing
    ) {
      mileageLetters.push("R")
      if (mileageRange[0] >= 170 && mileageRange[0] < 180) keepGoing = true
      if (mileageRange[1] >= 170 && mileageRange[1] < 180) keepGoing = false
    }
    if (
      (mileageRange[0] >= 180 && mileageRange[0] < 190) ||
      (mileageRange[1] >= 180 && mileageRange[1] < 190) ||
      keepGoing
    ) {
      mileageLetters.push("S")
      if (mileageRange[0] >= 180 && mileageRange[0] < 190) keepGoing = true
      if (mileageRange[1] >= 180 && mileageRange[1] < 190) keepGoing = false
    }
    if (
      (mileageRange[0] >= 190 && mileageRange[0] < 200) ||
      (mileageRange[1] >= 190 && mileageRange[1] < 200) ||
      keepGoing
    ) {
      mileageLetters.push("T")
      if (mileageRange[0] >= 190 && mileageRange[0] < 200) keepGoing = true
      if (mileageRange[1] >= 190 && mileageRange[1] < 200) keepGoing = false
    }
    if (
      (mileageRange[0] >= 200 && mileageRange[0] < 210) ||
      (mileageRange[1] >= 200 && mileageRange[1] < 210) ||
      keepGoing
    ) {
      mileageLetters.push("U")
      if (mileageRange[0] >= 200 && mileageRange[0] < 210) keepGoing = true
      if (mileageRange[1] >= 200 && mileageRange[1] < 210) keepGoing = false
    }
    if (
      (mileageRange[0] >= 210 && mileageRange[0] < 220) ||
      (mileageRange[1] >= 210 && mileageRange[1] < 220) ||
      keepGoing
    ) {
      mileageLetters.push("V")
      if (mileageRange[0] >= 210 && mileageRange[0] < 220) keepGoing = true
      if (mileageRange[1] >= 210 && mileageRange[1] < 220) keepGoing = false
    }
    if (
      (mileageRange[0] >= 220 && mileageRange[0] < 230) ||
      (mileageRange[1] >= 220 && mileageRange[1] < 230) ||
      keepGoing
    ) {
      mileageLetters.push("W")
      if (mileageRange[0] >= 220 && mileageRange[0] < 230) keepGoing = true
      if (mileageRange[1] >= 220 && mileageRange[1] < 230) keepGoing = false
    }
    if (
      (mileageRange[0] >= 230 && mileageRange[0] < 240) ||
      (mileageRange[1] >= 230 && mileageRange[1] < 240) ||
      keepGoing
    ) {
      mileageLetters.push("X")
      if (mileageRange[0] >= 230 && mileageRange[0] < 240) keepGoing = true
      if (mileageRange[1] >= 230 && mileageRange[1] < 240) keepGoing = false
    }
    if (
      (mileageRange[0] >= 240 && mileageRange[0] < 250) ||
      (mileageRange[1] >= 240 && mileageRange[1] < 250) ||
      keepGoing
    ) {
      mileageLetters.push("Y")
      if (mileageRange[0] >= 240 && mileageRange[0] < 250) keepGoing = true
      if (mileageRange[1] >= 240 && mileageRange[1] < 250) keepGoing = false
    }
    if (
      (mileageRange[0] >= 250 && mileageRange[0] < 260) ||
      (mileageRange[1] >= 250 && mileageRange[1] < 260) ||
      keepGoing
    ) {
      mileageLetters.push("Z")
      if (mileageRange[0] >= 250 && mileageRange[0] < 260) keepGoing = true
      if (mileageRange[1] >= 250 && mileageRange[1] < 260) keepGoing = false
    }
    sendRequestCount(
      mileageLetters.map((letter) => {
        return `'${letter}'`
      })
    )
    setRecordRequest({ ...recordRequest, mileageCodeList: mileageLetters })
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "mileageCodeList",
      "A.MILEAGECD",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      true
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

  const handleReset = () => {
    setAlert(false)
    setValue([0, 50])
    setFiltersValues({
      ...filtersValues,
      mileageCodeList: null,
    })
    sendRequestCount([])
  }

  useEffect(() => {
    filtersValues.mileageCodeList === null && setValue([0, 50])
  }, [filtersValues.mileageCodeList])

  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center flex-col">
        {alert && filtersValues.mileageCodeList != null && (
          <SaveMessage custBuild={false} />
        )}
        <Box sx={{ width: 300 }}>
          <div className="bg-white py-6 px-10 rounded-xl flex flex-col items-center">
            <h1 className="font-bold text-[#586283] text-[20px] mb-8">
              Mileage
            </h1>
            <Slider
              getAriaLabel={() => "Mileage"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay={`${value},000`}
              getAriaValueText={valuetext}
              step={10}
              min={0}
              max={260}
              color="secondary"
            />
            <h2 className="text-xs mb-3 font-bold text-[#586283]">
              <span className="font-medium">Selected Range: </span>
              {value[1] === 260
                ? `${value[0]},000 - ${value[1]},000+`
                : `${value[0]},000 - ${value[1]},000`}
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleMileageChange}
                type="button"
                className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Submit
                <img className="py-[2px] px-2" src={arrowup} alt="arrow" />
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="flex flex-row justify-between text-[#298FC2] bg-[#FFFFFF] ring-1 focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Reset
                <img className="py-[2px] px-2" src={reset} alt="reset" />
              </button>
            </div>
          </div>
        </Box>
      </div>
      <SwitchFilter
        custBuild={false}
        next={"Vehicle Class"}
        prev={"Vehicle Year"}
      />
    </ThemeProvider>
  )
}
