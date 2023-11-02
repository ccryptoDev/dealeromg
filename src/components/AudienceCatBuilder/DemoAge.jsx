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
import axios from "axios"
import { useEffect } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { createSQLSliderSentence } from "./utils"
import arrowup from "../../assets/images/arrowup.png"
import reset from "../../assets/images/reset.png"

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

export default function DemoAge({ setGender, setAge, setSpanish }) {
  const [value, setValue] = React.useState([30, 50])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]

  useEffect(() => {
    if (filtersValues.ageRange != null) {
      setValue(filtersValues.ageRange)
    }
  }, [filtersValues.ageRange])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleAgeChange = () => {
    const ageRange = value
    sendRequestCount(`'${value[0]}' AND '${value[1]}'`)
    setFiltersValues({ ...filtersValues, ageRange })
    setRecordRequest({
      ...recordRequest,
      ageRange: { initialValue: value[0], finalValue: value[1] },
    })
    setSpanish(false)
    setAge(true)
    setGender(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLSliderSentence(
      recordRequestBody,
      "ageRange",
      "C.AGE",
      filtersValues,
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

  const handleReset = () => {
    setValue([30, 50])
    setFiltersValues({ ...filtersValues, ageRange: null })
    sendRequestCount("")
  }

  useEffect(() => {
    filtersValues.ageRange === null && setValue([30, 50])
  }, [filtersValues.ageRange])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 300 }}>
        <div className="bg-white py-6 px-10 rounded-xl flex flex-col items-center">
          <h1 className="font-bold text-[#586283] text-[20px] mb-8">Age</h1>
          <Slider
            getAriaLabel={() => "Age"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={1}
            min={18}
            max={99}
          />
          <h2 className="text-xs mb-3 font-bold text-[#586283]">
            <span className="font-medium">Selected Range: </span>
            {`${value[0]} - ${value[1]}`}
          </h2>
          <div className="flex justify-between">
            <button
              onClick={handleAgeChange}
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
