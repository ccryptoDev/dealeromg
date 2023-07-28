import * as React from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import {
  filtersValuesState,
  FinalWhereClsAM,
  recordCountNumber,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import arrowup from "../../assets/images/arrowup.png"
import reset from "../../assets/images/reset.png"
import { createSQLSliderSentence } from "./utils"

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

export default function HDemLengthResidence({
  setDemLength,
  setDemVeteran,
  setDemAmount,
  setDemOlder,
}) {
  const [value, setValue] = React.useState([3, 8])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  let lenghtRange = []
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]

  useEffect(() => {
    if (filtersValues.lenghtResidence != null) {
      setValue(filtersValues.lenghtResidence)
    }
  }, [filtersValues.lenghtResidence])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleLenghtChange = () => {
    lenghtRange = value
    sendRequestCount(`'${value[0]}' AND '${value[1]}'`)
    setFiltersValues({ ...filtersValues, lenghtResidence: lenghtRange })
    setDemLength(true)
    setDemVeteran(false)
    setDemAmount(false)
    setDemOlder(false)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLSliderSentence(
      recordRequestBody,
      "lenghtResidence",
      "C.LOR",
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
    setValue([3, 8])
    setFiltersValues({ ...filtersValues, lenghtResidence: null })
    sendRequestCount("")
  }

  useEffect(() => {
    filtersValues.lenghtResidence === null && setValue([3, 8])
  }, [filtersValues.lenghtResidence])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: 300 }}>
        <div className="bg-white py-6 px-10 rounded-xl flex flex-col items-center">
          <h1 className="font-bold text-[#586283] text-[20px] mb-8">
            Length of Residence
          </h1>
          <Slider
            getAriaLabel={() => "Length of Residence"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={1}
            min={0}
            max={15}
          />
          <h2 className="text-xs mb-3 font-bold text-[#586283]">
            <span className="font-medium">Selected Range: </span>
            {`${value[0]} years - ${value[1]} years +`}
          </h2>
          <div className="flex justify-between">
            <button
              onClick={handleLenghtChange}
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
