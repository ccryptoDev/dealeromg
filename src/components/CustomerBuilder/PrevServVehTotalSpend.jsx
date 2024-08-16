import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import {
  filtersValuesStateCB,
  SpinerCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  recordCountNumberCB,
  recordCountValuesStateCB,
  recordCountNumberActivityCB,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { createSQLSliderSentence } from "../AudienceCatBuilder/utils"

import reset from "../../assets/images/reset.png"
import arrowup from "../../assets/images/arrowup.png"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Slider from "@mui/material/Slider"
import SaveMessage from "../Fields/SaveMessage"
import SwitchFilter from "../Fields/SwitchFilter"
import { bigQueryURL } from "../../util/bigQueryURL"
import axios from "axios"

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

const PrevServVehTotalSpend = () => {
  const [alert, setAlert] = useState(false)
  const [totalSpend, setTotalSpend] = useState([1, 12036])
  const [filterValues, setFiltersValues] = useRecoilState(filtersValuesStateCB)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBService)
  const sqlSales = useRecoilState(FinalWhereClsCBSale)[0]
  const setRecordCountNumber = useRecoilState(recordCountNumberCB)[1]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesStateCB
  )
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setRecordCountActivityNumber = useRecoilState(
    recordCountNumberActivityCB
  )[1]
  const { neverPurchased, nevSerPrevPurch, nevSerDateRange } = filterValues

  const handleSubmit = () => {
    setFiltersValues({
      ...filterValues,
      prevSerTotalSpend: [totalSpend[0], totalSpend[1]],
    })
    sendRequestCount(`'${totalSpend[0]}' AND '${totalSpend[1]}'`)
    setRecordRequest({ ...recordRequest, prevSerTotalSpend: null })
    setAlert(true)
  }
  const handleReset = () => {
    setTotalSpend([1, 12036])
    setFiltersValues({ ...filterValues, prevSerTotalSpend: null })
    sendRequestCount("")
    setAlert(false)
  }
  const handleChangeTotalSpend = (event, newValue) => {
    setTotalSpend(newValue)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const sqlClean = { sql: AdWhereClsAM.sql.replace(" AND 1=0", "") }
    const url = bigQueryURL(
      neverPurchased,
      nevSerPrevPurch,
      nevSerDateRange
    ).url
    const WhereClsAM = createSQLSliderSentence(
      recordRequestBody,
      "prevSerTotalSpend",
      "CASS_STD_ZIP4",
      filterValues,
      sqlClean,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    const bodyRequest = {
      sqlService: WhereClsAM ? WhereClsAM.replace(" AND 1=0", "") : " AND 1=0",
      sqlSales: sqlSales.sql ? sqlSales.sql : " AND 1=0",
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

  useEffect(() => {
    setTotalSpend(
      filterValues.prevSerTotalSpend !== null
        ? [filterValues.prevSerTotalSpend[0], filterValues.prevSerTotalSpend[1]]
        : [1, 12036]
    )
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex items-center flex-col">
          {alert && <SaveMessage custBuild={true} />}
          <Box sx={{ width: 300 }}>
            <div className="bg-[#FFFFFF] py-6 px-10 rounded-xl flex flex-col items-center">
              <h1 className="font-bold text-[#586283] text-[20px] mb-8">
                Total Spend
              </h1>
              <Slider
                getAriaLabel={() => "Year"}
                value={totalSpend}
                onChange={handleChangeTotalSpend}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={1}
                min={1}
                max={12036}
              />
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">Selected Range: </span>
                {`${totalSpend[0]} - ${totalSpend[1]}`}
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={handleSubmit}
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
          next={"Total Service Count"}
          prev={"Vehicle Year"}
          custBuild={true}
        />
      </ThemeProvider>
    </>
  )
}

export default PrevServVehTotalSpend
