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

const theme = createTheme({
  palette: {
    primary: {
      main: "#298FC2",
    },
    secondary: {
      main: "#298FC2",
    },
  },
})

function valuetext(value) {
  return `${value},000`
}

export default function FinHomeValue({
  setHouseIncome,
  setHouseValue,
  setWealthAssets,
}) {
  const [value, setValue] = React.useState([25, 224])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]

  useEffect(() => {
    if (filtersValues.homeValues != null) {
      setValue(filtersValues.homeValues)
    }
  }, [filtersValues.homeValues])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleHomeValueChange = () => {
    const homeValueRange = value
    const homeLetters = []
    let keepGoing = false
    setFiltersValues({ ...filtersValues, homeValues: homeValueRange })
    if (
      (homeValueRange[0] >= 0 && homeValueRange[0] < 25) ||
      (homeValueRange[1] >= 0 && homeValueRange[1] < 25) ||
      keepGoing
    ) {
      homeLetters.push("A")
      if (homeValueRange[0] >= 0 && homeValueRange[0] < 25) keepGoing = true
      if (homeValueRange[1] >= 0 && homeValueRange[1] < 25) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 25 && homeValueRange[0] < 50) ||
      (homeValueRange[1] >= 25 && homeValueRange[1] < 50) ||
      keepGoing
    ) {
      homeLetters.push("B")
      if (homeValueRange[0] >= 25 && homeValueRange[0] < 50) keepGoing = true
      if (homeValueRange[1] >= 25 && homeValueRange[1] < 50) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 50 && homeValueRange[0] < 75) ||
      (homeValueRange[1] >= 50 && homeValueRange[1] < 75) ||
      keepGoing
    ) {
      homeLetters.push("C")
      if (homeValueRange[0] >= 50 && homeValueRange[0] < 75) keepGoing = true
      if (homeValueRange[1] >= 50 && homeValueRange[1] < 75) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 75 && homeValueRange[0] < 100) ||
      (homeValueRange[1] >= 75 && homeValueRange[1] < 100) ||
      keepGoing
    ) {
      homeLetters.push("D")
      if (homeValueRange[0] >= 75 && homeValueRange[0] < 100) keepGoing = true
      if (homeValueRange[1] >= 75 && homeValueRange[1] < 100) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 100 && homeValueRange[0] < 125) ||
      (homeValueRange[1] >= 100 && homeValueRange[1] < 125) ||
      keepGoing
    ) {
      homeLetters.push("E")
      if (homeValueRange[0] >= 100 && homeValueRange[0] < 125) keepGoing = true
      if (homeValueRange[1] >= 100 && homeValueRange[1] < 125) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 125 && homeValueRange[0] < 150) ||
      (homeValueRange[1] >= 125 && homeValueRange[1] < 150) ||
      keepGoing
    ) {
      homeLetters.push("F")
      if (homeValueRange[0] >= 125 && homeValueRange[0] < 150) keepGoing = true
      if (homeValueRange[1] >= 125 && homeValueRange[1] < 150) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 150 && homeValueRange[0] < 175) ||
      (homeValueRange[1] >= 150 && homeValueRange[1] < 175) ||
      keepGoing
    ) {
      homeLetters.push("G")
      if (homeValueRange[0] >= 150 && homeValueRange[0] < 175) keepGoing = true
      if (homeValueRange[1] >= 150 && homeValueRange[1] < 175) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 175 && homeValueRange[0] < 200) ||
      (homeValueRange[1] >= 175 && homeValueRange[1] < 200) ||
      keepGoing
    ) {
      homeLetters.push("H")
      if (homeValueRange[0] >= 175 && homeValueRange[0] < 200) keepGoing = true
      if (homeValueRange[1] >= 175 && homeValueRange[1] < 200) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 200 && homeValueRange[0] < 225) ||
      (homeValueRange[1] >= 200 && homeValueRange[1] < 225) ||
      keepGoing
    ) {
      homeLetters.push("I")
      if (homeValueRange[0] >= 200 && homeValueRange[0] < 225) keepGoing = true
      if (homeValueRange[1] >= 200 && homeValueRange[1] < 225) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 225 && homeValueRange[0] < 250) ||
      (homeValueRange[1] >= 225 && homeValueRange[1] < 250) ||
      keepGoing
    ) {
      homeLetters.push("J")
      if (homeValueRange[0] >= 225 && homeValueRange[0] < 250) keepGoing = true
      if (homeValueRange[1] >= 225 && homeValueRange[1] < 250) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 250 && homeValueRange[0] < 275) ||
      (homeValueRange[1] >= 250 && homeValueRange[1] < 275) ||
      keepGoing
    ) {
      homeLetters.push("K")
      if (homeValueRange[0] >= 250 && homeValueRange[0] < 275) keepGoing = true
      if (homeValueRange[1] >= 250 && homeValueRange[1] < 275) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 275 && homeValueRange[0] < 300) ||
      (homeValueRange[1] >= 275 && homeValueRange[1] < 300) ||
      keepGoing
    ) {
      homeLetters.push("L")
      if (homeValueRange[0] >= 275 && homeValueRange[0] < 300) keepGoing = true
      if (homeValueRange[1] >= 275 && homeValueRange[1] < 300) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 300 && homeValueRange[0] < 350) ||
      (homeValueRange[1] >= 300 && homeValueRange[1] < 350) ||
      keepGoing
    ) {
      homeLetters.push("M")
      if (homeValueRange[0] >= 300 && homeValueRange[0] < 350) keepGoing = true
      if (homeValueRange[1] >= 300 && homeValueRange[1] < 350) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 350 && homeValueRange[0] < 400) ||
      (homeValueRange[1] >= 350 && homeValueRange[1] < 400) ||
      keepGoing
    ) {
      homeLetters.push("N")
      if (homeValueRange[0] >= 350 && homeValueRange[0] < 400) keepGoing = true
      if (homeValueRange[1] >= 350 && homeValueRange[1] < 400) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 400 && homeValueRange[0] < 450) ||
      (homeValueRange[1] >= 400 && homeValueRange[1] < 450) ||
      keepGoing
    ) {
      homeLetters.push("O")
      if (homeValueRange[0] >= 400 && homeValueRange[0] < 450) keepGoing = true
      if (homeValueRange[1] >= 400 && homeValueRange[1] < 450) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 450 && homeValueRange[0] < 500) ||
      (homeValueRange[1] >= 450 && homeValueRange[1] < 500) ||
      keepGoing
    ) {
      homeLetters.push("P")
      if (homeValueRange[0] >= 450 && homeValueRange[0] < 500) keepGoing = true
      if (homeValueRange[1] >= 450 && homeValueRange[1] < 500) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 500 && homeValueRange[0] < 750) ||
      (homeValueRange[1] >= 500 && homeValueRange[1] < 750) ||
      keepGoing
    ) {
      homeLetters.push("Q")
      if (homeValueRange[0] >= 500 && homeValueRange[0] < 750) keepGoing = true
      if (homeValueRange[1] >= 500 && homeValueRange[1] < 750) keepGoing = false
    }
    if (
      (homeValueRange[0] >= 750 && homeValueRange[0] < 1000) ||
      (homeValueRange[1] >= 750 && homeValueRange[1] < 1000) ||
      keepGoing
    ) {
      homeLetters.push("R")
      if (homeValueRange[0] >= 750 && homeValueRange[0] < 1000) keepGoing = true
      if (homeValueRange[1] >= 750 && homeValueRange[1] < 1000)
        keepGoing = false
    }
    if (homeValueRange[0] >= 1000 || homeValueRange[1] >= 1000 || keepGoing) {
      homeLetters.push("S")
      if (homeValueRange[0] >= 0) keepGoing = true
      if (homeValueRange[1] >= 0) keepGoing = false
    }
    sendRequestCount(
      homeLetters.map((letter) => {
        return `'${letter}'`
      })
    )
    setRecordRequest({ ...recordRequest, homeValues: homeLetters })
    setHouseValue(true)
    setHouseIncome(false)
    setWealthAssets(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "homeValues",
      "C.MRKTHOMEVAL",
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

  const handleReset = () => {
    setValue([25, 224])
    setFiltersValues({ ...filtersValues, homeValues: null })
    sendRequestCount([])
    setHouseValue(false)
  }

  useEffect(() => {
    filtersValues.homeValues === null && setValue([25, 224])
  }, [filtersValues.homeValues])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 400 }}>
        <div className="bg-white py-6 px-10 rounded-xl flex flex-col items-center">
          <h1 className="font-bold text-[#586283] text-[20px] mb-8">
            Home Value
          </h1>
          <Slider
            getAriaLabel={() => "Home Value"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay={`${value},000`}
            getAriaValueText={valuetext}
            step={1}
            min={0}
            max={1000}
          />
          <h2 className="text-xs mb-3 font-bold text-[#586283]">
            <span className="font-medium">Selected Range: </span>
            {value[1] === 1000
              ? `$${value[0]},000 - $1,000,000+`
              : `$${value[0]},000 - $${value[1]},000`}
          </h2>
          <div className="flex justify-between">
            <button
              onClick={handleHomeValueChange}
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
    </ThemeProvider>
  )
}
