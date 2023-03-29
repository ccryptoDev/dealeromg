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

export default function FinWealthAssets({
  setHouseIncome,
  setHouseValue,
  setWealthAssets,
}) {
  const [value, setValue] = React.useState([5, 149])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]

  useEffect(() => {
    if (filtersValues.allWealthAssests != null) {
      setValue(filtersValues.allWealthAssests)
    }
  }, [filtersValues.allWealthAssests])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleWealthChange = () => {
    const wealthRange = value
    const allWealthLetters = []
    let keepGoing = false
    setFiltersValues({ ...filtersValues, allWealthAssests: wealthRange })
    if (
      (wealthRange[0] >= 0 && wealthRange[0] < 1) ||
      (wealthRange[1] >= 0 && wealthRange[1] < 1) ||
      keepGoing
    ) {
      allWealthLetters.push("A")
      if (wealthRange[0] >= 0 && wealthRange[0] < 1) keepGoing = true
      if (wealthRange[1] >= 0 && wealthRange[1] < 1) keepGoing = false
    }
    if (
      (wealthRange[0] >= 1 && wealthRange[0] < 5) ||
      (wealthRange[1] >= 1 && wealthRange[1] < 5) ||
      keepGoing
    ) {
      allWealthLetters.push("B")
      if (wealthRange[0] >= 1 && wealthRange[0] < 5) keepGoing = true
      if (wealthRange[1] >= 1 && wealthRange[1] < 5) keepGoing = false
    }
    if (
      (wealthRange[0] >= 5 && wealthRange[0] < 25) ||
      (wealthRange[1] >= 5 && wealthRange[1] < 25) ||
      keepGoing
    ) {
      allWealthLetters.push("C")
      if (wealthRange[0] >= 5 && wealthRange[0] < 25) keepGoing = true
      if (wealthRange[1] >= 5 && wealthRange[1] < 25) keepGoing = false
    }
    if (
      (wealthRange[0] >= 25 && wealthRange[0] < 50) ||
      (wealthRange[1] >= 25 && wealthRange[1] < 50) ||
      keepGoing
    ) {
      allWealthLetters.push("D")
      if (wealthRange[0] >= 25 && wealthRange[0] < 50) keepGoing = true
      if (wealthRange[1] >= 25 && wealthRange[1] < 50) keepGoing = false
    }
    if (
      (wealthRange[0] >= 50 && wealthRange[0] < 75) ||
      (wealthRange[1] >= 50 && wealthRange[1] < 75) ||
      keepGoing
    ) {
      allWealthLetters.push("E")
      if (wealthRange[0] >= 50 && wealthRange[0] < 75) keepGoing = true
      if (wealthRange[1] >= 50 && wealthRange[1] < 75) keepGoing = false
    }
    if (
      (wealthRange[0] >= 75 && wealthRange[0] < 100) ||
      (wealthRange[1] >= 75 && wealthRange[1] < 100) ||
      keepGoing
    ) {
      allWealthLetters.push("F")
      if (wealthRange[0] >= 75 && wealthRange[0] < 100) keepGoing = true
      if (wealthRange[1] >= 75 && wealthRange[1] < 100) keepGoing = false
    }
    if (
      (wealthRange[0] >= 100 && wealthRange[0] < 150) ||
      (wealthRange[1] >= 100 && wealthRange[1] < 150) ||
      keepGoing
    ) {
      allWealthLetters.push("G")
      if (wealthRange[0] >= 100 && wealthRange[0] < 150) keepGoing = true
      if (wealthRange[1] >= 100 && wealthRange[1] < 150) keepGoing = false
    }
    if (
      (wealthRange[0] >= 150 && wealthRange[0] < 250) ||
      (wealthRange[1] >= 150 && wealthRange[1] < 250) ||
      keepGoing
    ) {
      allWealthLetters.push("H")
      if (wealthRange[0] >= 150 && wealthRange[0] < 250) keepGoing = true
      if (wealthRange[1] >= 150 && wealthRange[1] < 250) keepGoing = false
    }
    if (
      (wealthRange[0] >= 250 && wealthRange[0] < 375) ||
      (wealthRange[1] >= 250 && wealthRange[1] < 375) ||
      keepGoing
    ) {
      allWealthLetters.push("I")
      if (wealthRange[0] >= 250 && wealthRange[0] < 375) keepGoing = true
      if (wealthRange[1] >= 250 && wealthRange[1] < 375) keepGoing = false
    }
    if (
      (wealthRange[0] >= 375 && wealthRange[0] < 500) ||
      (wealthRange[1] >= 375 && wealthRange[1] < 500) ||
      keepGoing
    ) {
      allWealthLetters.push("J")
      if (wealthRange[0] >= 375 && wealthRange[0] < 500) keepGoing = true
      if (wealthRange[1] >= 375 && wealthRange[1] < 500) keepGoing = false
    }
    if (
      (wealthRange[0] >= 500 && wealthRange[0] < 750) ||
      (wealthRange[1] >= 500 && wealthRange[1] < 750) ||
      keepGoing
    ) {
      allWealthLetters.push("K")
      if (wealthRange[0] >= 500 && wealthRange[0] < 750) keepGoing = true
      if (wealthRange[1] >= 500 && wealthRange[1] < 750) keepGoing = false
    }
    if (
      (wealthRange[0] >= 750 && wealthRange[0] < 1000) ||
      (wealthRange[1] >= 750 && wealthRange[1] < 1000) ||
      keepGoing
    ) {
      allWealthLetters.push("L")
      if (wealthRange[0] >= 750 && wealthRange[0] < 1000) keepGoing = true
      if (wealthRange[1] >= 750 && wealthRange[1] < 1000) keepGoing = false
    }
    if (wealthRange[0] >= 1000 || wealthRange[1] >= 1000 || keepGoing) {
      allWealthLetters.push("M")
      if (wealthRange[0] >= 0) keepGoing = true
      if (wealthRange[1] >= 0) keepGoing = false
    }
    sendRequestCount(
      allWealthLetters.map((letter) => {
        return `'${letter}'`
      })
    )
    setRecordRequest({ ...recordRequest, allWealthAssests: allWealthLetters })
    setHouseValue(false)
    setHouseIncome(false)
    setWealthAssets(true)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "allWealthAssests",
      "C.WEALTHSCR",
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
    setValue([5, 149])
    setFiltersValues({ ...filtersValues, allWealthAssests: null })
    sendRequestCount([])
    setWealthAssets(false)
  }

  useEffect(() => {
    filtersValues.allWealthAssests === null && setValue([5, 149])
  }, [filtersValues.allWealthAssests])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 400 }}>
        <div className="bg-white py-6 px-10 rounded-xl flex flex-col items-center">
          <h1 className="font-bold text-[#586283] text-[20px] mb-8">
            All Wealth Assets
          </h1>
          <Slider
            getAriaLabel={() => "All Wealth Assets"}
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
              : `$${value[0]},000 - $${value[1]},000 +`}
          </h2>
          <div className="flex justify-between">
            <button
              onClick={handleWealthChange}
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
