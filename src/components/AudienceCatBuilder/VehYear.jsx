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
import { createSQLSliderSentence } from "./utils"
import SwitchFilter from "../Fields/SwitchFilter"
import SaveMessage from "../Fields/SaveMessage"

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
  return `${value}`
}

export default function VehYear() {
  const [alert, setAlert] = React.useState(false)
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [value, setValue] = React.useState([1990, 2022])

  useEffect(() => {
    if (filtersValues.yearRange != null) {
      setValue(filtersValues.yearRange)
    }
  }, [filtersValues.yearRange])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleYearRange = () => {
    setAlert(true)
    const yearRange = value
    sendRequestCount(`'${value[0]}' AND '${value[1]}'`)
    setFiltersValues({ ...filtersValues, yearRange })
    setRecordRequest({ ...recordRequest, yearRange: null })
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLSliderSentence(
      recordRequestBody,
      "yearRange",
      "A.YEAR",
      filtersValues,
      AdWhereClsAM,
      true
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
    setAlert(false)
    setValue([1990, 2020])
    setFiltersValues({ ...filtersValues, yearRange: null })
    sendRequestCount("")
  }

  useEffect(() => {
    filtersValues.yearRange === null && setValue([1990, 2020])
  }, [filtersValues.yearRange])

  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center flex-col">
        {alert && filtersValues.yearRange != null && (
          <SaveMessage custBuild={false} />
        )}
        <Box sx={{ width: 300 }}>
          <div className="bg-[#FFFFFF] py-6 px-10 rounded-xl flex flex-col items-center">
            <h1 className="font-bold text-[#586283] text-[20px] mb-8">Year</h1>
            <Slider
              getAriaLabel={() => "Year"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              step={1}
              min={1960}
              max={2023}
            />
            <h2 className="text-xs mb-3 font-bold text-[#586283]">
              <span className="font-medium">Selected Range: </span>
              {`${value[0]} - ${value[1]}`}
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleYearRange}
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
        next={"Vehicle Mileage"}
        prev={"Vehicle Models"}
      />
    </ThemeProvider>
  )
}
