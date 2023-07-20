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
import { dealerInfo } from "../../atoms/DealerAtom"
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

export default function FinHouseIncome({
  setHouseIncome,
  setHouseValue,
  setWealthAssets,
}) {
  const [value, setValue] = React.useState([30, 124])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  let incomeRange = []

  useEffect(() => {
    if (filtersValues.householdIncome != null) {
      setValue(filtersValues.householdIncome)
    }
  }, [filtersValues.householdIncome])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleIncomesChange = () => {
    incomeRange = value
    const homeValueLetters = []
    let keepGoing = false
    setFiltersValues({ ...filtersValues, householdIncome: incomeRange })
    if (
      (incomeRange[0] >= 0 && incomeRange[0] < 20) ||
      (incomeRange[1] >= 0 && incomeRange[1] < 20) ||
      keepGoing
    ) {
      homeValueLetters.push("A")
      if (incomeRange[0] >= 0 && incomeRange[0] < 20) keepGoing = true
      if (incomeRange[1] >= 0 && incomeRange[1] < 20) keepGoing = false
    }
    if (
      (incomeRange[0] >= 20 && incomeRange[0] < 30) ||
      (incomeRange[1] >= 20 && incomeRange[1] < 30) ||
      keepGoing
    ) {
      homeValueLetters.push("B")
      if (incomeRange[0] >= 20 && incomeRange[0] < 30) keepGoing = true
      if (incomeRange[1] >= 20 && incomeRange[1] < 30) keepGoing = false
    }
    if (
      (incomeRange[0] >= 30 && incomeRange[0] < 40) ||
      (incomeRange[1] >= 30 && incomeRange[1] < 40) ||
      keepGoing
    ) {
      homeValueLetters.push("C")
      if (incomeRange[0] >= 30 && incomeRange[0] < 40) keepGoing = true
      if (incomeRange[1] >= 30 && incomeRange[1] < 40) keepGoing = false
    }
    if (
      (incomeRange[0] >= 40 && incomeRange[0] < 50) ||
      (incomeRange[1] >= 40 && incomeRange[1] < 50) ||
      keepGoing
    ) {
      homeValueLetters.push("D")
      if (incomeRange[0] >= 40 && incomeRange[0] < 50) keepGoing = true
      if (incomeRange[1] >= 40 && incomeRange[1] < 50) keepGoing = false
    }
    if (
      (incomeRange[0] >= 50 && incomeRange[0] < 75) ||
      (incomeRange[1] >= 50 && incomeRange[1] < 75) ||
      keepGoing
    ) {
      homeValueLetters.push("E")
      if (incomeRange[0] >= 50 && incomeRange[0] < 75) keepGoing = true
      if (incomeRange[1] >= 50 && incomeRange[1] < 75) keepGoing = false
    }
    if (
      (incomeRange[0] >= 75 && incomeRange[0] < 100) ||
      (incomeRange[1] >= 75 && incomeRange[1] < 100) ||
      keepGoing
    ) {
      homeValueLetters.push("F")
      if (incomeRange[0] >= 75 && incomeRange[0] < 100) keepGoing = true
      if (incomeRange[1] >= 75 && incomeRange[1] < 100) keepGoing = false
    }
    if (
      (incomeRange[0] >= 100 && incomeRange[0] < 125) ||
      (incomeRange[1] >= 100 && incomeRange[1] < 125) ||
      keepGoing
    ) {
      homeValueLetters.push("G")
      if (incomeRange[0] >= 100 && incomeRange[0] < 125) keepGoing = true
      if (incomeRange[1] >= 100 && incomeRange[1] < 125) keepGoing = false
    }
    if (
      (incomeRange[0] >= 125 && incomeRange[0] < 150) ||
      (incomeRange[1] >= 125 && incomeRange[1] < 150) ||
      keepGoing
    ) {
      homeValueLetters.push("H")
      if (incomeRange[0] >= 125 && incomeRange[0] < 150) keepGoing = true
      if (incomeRange[1] >= 125 && incomeRange[1] < 150) keepGoing = false
    }
    if (
      (incomeRange[0] >= 150 && incomeRange[0] < 175) ||
      (incomeRange[1] >= 150 && incomeRange[1] < 175) ||
      keepGoing
    ) {
      homeValueLetters.push("I")
      if (incomeRange[0] >= 150 && incomeRange[0] < 175) keepGoing = true
      if (incomeRange[1] >= 150 && incomeRange[1] < 175) keepGoing = false
    }
    if (
      (incomeRange[0] >= 175 && incomeRange[0] < 200) ||
      (incomeRange[1] >= 175 && incomeRange[1] < 200) ||
      keepGoing
    ) {
      homeValueLetters.push("J")
      if (incomeRange[0] >= 175 && incomeRange[0] < 200) keepGoing = true
      if (incomeRange[1] >= 175 && incomeRange[1] < 200) keepGoing = false
    }
    if (
      (incomeRange[0] >= 200 && incomeRange[0] < 250) ||
      (incomeRange[1] >= 200 && incomeRange[1] < 250) ||
      keepGoing
    ) {
      homeValueLetters.push("K")
      if (incomeRange[0] >= 200 && incomeRange[0] < 250) keepGoing = true
      if (incomeRange[1] >= 200 && incomeRange[1] < 250) keepGoing = false
    }
    if (incomeRange[0] >= 250 || incomeRange[1] >= 250 || keepGoing) {
      homeValueLetters.push("L")
      if (incomeRange[0] >= 0) keepGoing = true
      if (incomeRange[1] >= 0) keepGoing = false
    }
    sendRequestCount(
      homeValueLetters.map((letter) => {
        return `'${letter}'`
      })
    )
    setRecordRequest({ ...recordRequest, householdIncome: homeValueLetters })
    setHouseValue(false)
    setHouseIncome(true)
    setWealthAssets(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "householdIncome",
      "C.EHI",
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

  const handleReset = () => {
    setValue([30, 124])
    setFiltersValues({ ...filtersValues, householdIncome: null })
    sendRequestCount([])
    setHouseIncome(false)
  }

  useEffect(() => {
    filtersValues.householdIncome === null && setValue([30, 124])
  }, [filtersValues.householdIncome])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 400 }}>
        <div className="bg-white py-6 px-10 rounded-xl flex flex-col items-center">
          <h1 className="font-bold text-[#586283] text-[20px] mb-8">
            All House Income:
          </h1>
          <Slider
            getAriaLabel={() => "All house income"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay={`${value},000`}
            getAriaValueText={valuetext}
            step={1}
            min={0}
            max={250}
          />
          <h2 className="text-xs mb-3 font-bold text-[#586283]">
            <span className="font-medium">Selected Range: </span>
            {value[1] === 250
              ? `$${value[0]},000 - $${value[1]},000+`
              : `$${value[0]},000 - $${value[1]},000 +`}
          </h2>
          <div className="flex justify-between">
            <button
              onClick={handleIncomesChange}
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
