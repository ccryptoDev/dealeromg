import axios from "axios"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import {
  filtersValuesStateCB,
  recordCountValuesStateCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  SpinerCB,
  recordCountNumberCB,
  recordCountNumberActivityCB,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import arrowup from "../../assets/images/arrowup.png"
import reset from "../../assets/images/reset.png"
import SaveMessage from "../Fields/SaveMessage"
import { createSQLSliderSentence } from "../AudienceCatBuilder/utils"
import { bigQueryURL } from "../../util/bigQueryURL"

import SwitchFilter from "../Fields/SwitchFilter"

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

const PrevPurchYear = () => {
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesStateCB)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesStateCB
  )
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [value, setValue] = useState([1990, 2022])
  const [alert, setAlert] = useState(false)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBSale)
  const sqlService = useRecoilState(FinalWhereClsCBService)[0]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const setRecordCountNumber = useRecoilState(recordCountNumberCB)[1]
  const setRecordCountActivityNumber = useRecoilState(
    recordCountNumberActivityCB
  )[1]
  const { neverPurchased, nevSerPrevPurch, nevSerDateRange } = filtersValues

  useEffect(() => {
    if (filtersValues.prevPurchYear != null) {
      setValue(filtersValues.prevPurchYear)
    } else {
      setValue([1990, 2022])
    }
  }, [filtersValues.prevPurchYear])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleYearRange = () => {
    setAlert(true)
    const prevPurchYear = value
    sendRequestCount(`'${value[0]}' AND '${value[1]}'`)
    setFiltersValues({ ...filtersValues, prevPurchYear })
    setRecordRequest({ ...recordRequest, prevPurchYear: null })
  }

  const sendRequestCount = (recordRequestBody) => {
    const sqlClean = { sql: AdWhereClsAM.sql.replace(" AND 1=0", "") }
    const url = bigQueryURL(
      neverPurchased,
      nevSerPrevPurch,
      nevSerDateRange
    ).url
    setSpiner(true)
    const WhereClsAM = createSQLSliderSentence(
      recordRequestBody,
      "prevPurchYear",
      "Year",
      filtersValues,
      sqlClean,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    const bodyRequest = {
      sqlSales: WhereClsAM ? WhereClsAM.replace(" AND 1=0", "") : " AND 1=0",
      sqlService: sqlService.sql ? sqlService.sql : " AND 1=0",
      roofTopID: dealerInfoValue.rooftopID,
    }
    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, bodyRequest)
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCountNumber({ value: recordCountNumber })
        setSpiner(false)
      })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getDVCountDaysWithoutActivity`,
        bodyRequest
      )
      .then((res) => {
        const resBigQuery = res.data
        const noActivitySales = resBigQuery[0]?.numpid
        const noActivityService = resBigQuery[1]?.numpid
        setRecordCountActivityNumber({
          valueSales: noActivitySales,
          valueService: noActivityService,
        })
        setSpiner(false)
      })
  }

  const handleReset = () => {
    setValue([1990, 2020])
    sendRequestCount("")
    setFiltersValues({ ...filtersValues, prevPurchYear: null })
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center flex-col">
        {alert && filtersValues.prevPurchYear !== null && (
          <SaveMessage custBuild={true} />
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
              max={2024}
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
        next={"New/Used"}
        prev={"Vehicle Models"}
        custBuild={true}
      />
    </ThemeProvider>
  )
}

export default PrevPurchYear
