import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"
import {
  filtersValuesStateCB,
  SpinerCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  recordCountNumberCB,
  recordCountValuesStateCB,
} from "../../atoms/CustomerBuilderAtom"
import { createSQLSliderSentence } from "../AudienceCatBuilder/utils"

import reset from "../../assets/images/reset.png"
import arrowup from "../../assets/images/arrowup.png"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Slider from "@mui/material/Slider"
import SaveMessage from "../Fields/SaveMessage"
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

const PrevServVehTotalServiceCount = () => {
  const [filterValues, setFiltersValues] = useRecoilState(filtersValuesStateCB)
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsCBService)
  const sqlSales = useRecoilState(FinalWhereClsCBSale)[0]
  const setRecordCount = useRecoilState(recordCountNumberCB)[1]
  const setSpiner = useRecoilState(SpinerCB)[1]
  const [alert, setAlert] = useState(false)
  const [totalService, setTotalService] = useState([0, 27])
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesStateCB
  )

  const handleSubmit = () => {
    setFiltersValues({
      ...filterValues,
      prevSerTotalService: [totalService[0], totalService[1]],
    })
    sendRequestCount(`'${totalService[0]}' AND '${totalService[1]}'`)
    setRecordRequest({ ...recordRequest, prevSerTotalService: null })
    setAlert(true)
  }

  const handleReset = () => {
    setTotalService([0, 27])
    setFiltersValues({ ...filterValues, prevSerTotalService: null })
    setAlert(false)
    sendRequestCount("")
  }

  const handleChangeTotalService = (event, newValue) => {
    setTotalService(newValue)
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLSliderSentence(
      recordRequestBody,
      "prevSerTotalService",
      "CASS_STD_DPBC",
      filterValues,
      AdWhereClsAM,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getDealerVaultCountFromBigQuery`,
        {
          sqlService: WhereClsAM
            ? WhereClsAM.replace(" AND 1=0", "")
            : " AND 1=0",
          sqlSales: sqlSales.sql ? sqlSales.sql : " AND 1=0",
        }
      )
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  useEffect(() => {
    setTotalService(
      filterValues.prevSerTotalService !== null
        ? [
            filterValues.prevSerTotalService[0],
            filterValues.prevSerTotalService[1],
          ]
        : [1, 27]
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
                Total Service Count
              </h1>
              <Slider
                getAriaLabel={() => "service"}
                value={totalService}
                onChange={handleChangeTotalService}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                step={1}
                min={1}
                max={27}
              />
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">Selected Range: </span>
                {`${totalService[0]} - ${totalService[1]}`}
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
          next={"Never Purchased a Vehicle"}
          prev={"Total Spend"}
          custBuild={true}
        />
      </ThemeProvider>
    </>
  )
}

export default PrevServVehTotalServiceCount
