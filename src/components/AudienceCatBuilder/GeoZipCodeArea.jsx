import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import {
  filtersValuesState,
  audienceCatBuilderState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import emptyFolder from "../../assets/images/emptyfolder.png"
import { createSQLListSentence } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SwitchFilter from "../Fields/SwitchFilter"
import SaveMessage from "../Fields/SaveMessage"

const GeoZipCodeArea = () => {
  const [zipcodes, setzipcodes] = useState([])
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [alert, setAlert] = useState(false)
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [geozipcode, setGeozipcode] = useState(filtersValues.zipCodeCenter)
  const [distance, setDistance] = useState(filtersValues.zipCodeRadius)
  const show = useRecoilState(audienceCatBuilderState)[0]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const setSpiner = useRecoilState(Spiner)[1]
  const [zipCodesShow, setZipCodesShow] = useState(false)
  const [error, setError] = useState(false)
  const codes = []
  const CLIENT_KEY = process.env.REACT_APP_API_ZIP_CODES_DEAN

  const changeInput = (event) => {
    const zipcodesAux = [...zipcodes]
    zipcodesAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setzipcodes(zipcodesAux)
  }

  const changeAllInputOn2 = () => {
    const zipcodesAux = [...zipcodes]
    for (let m = 0; m < zipcodesAux.length; m++) {
      zipcodesAux[m].selected = true
    }
    setzipcodes(zipcodesAux)
  }

  const changeAllInputOff2 = () => {
    const zipcodesAux = [...zipcodes]
    for (let n = 0; n < zipcodesAux.length; n++) {
      zipcodesAux[n].selected = false
    }
    setzipcodes(zipcodesAux)
  }

  const changeZipCode = (e) => {
    if (!isNaN(e.target.value.trim()) && e.target.value.trim().length <= 5)
      setGeozipcode(e.target.value.trim())
  }

  const changeRadius = (e) => {
    if (!isNaN(e.target.value.trim())) setDistance(e.target.value.trim())
  }

  const findZipCodes = (shouldBeSelected) => {
    axios
      .get(
        `${process.env.REACT_APP_API_ZIP_CODES}${CLIENT_KEY}/radius.json/${
          geozipcode || dealerInfoValue.zipCode
        }/${distance || 10}/mile`
      )
      .then((res) => {
        const zipcodesData = res.data.zip_codes
        zipcodesData.sort((a, b) => a.zip_code - b.zip_code)
        const response = []
        for (let i = 0; i < zipcodesData.length; i++) {
          let result = {
            name: zipcodesData[i].zip_code,
            id: i,
            selected: shouldBeSelected,
          }
          if (filtersValues.zipCodes) {
            filtersValues.zipCodes.map((zipcodeclas) => {
              zipcodeclas === result.name &&
                (result = { ...result, selected: true })
              return null
            })
          }
          response.push(result)
          if (i === zipcodesData.length - 1) {
            setzipcodes(response)
          }
        }
      })
      .catch((error) => {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 10000)
        console.log(error)
      })
    setZipCodesShow(true)
  }

  useEffect(() => {
    if (filtersValues.zipCodes) {
      findZipCodes(false)
    }
  }, [])

  const handleZipCodes = () => {
    setAlert(true)
    for (let i = 0; i < zipcodes.length; i++) {
      if (zipcodes[i].selected) {
        codes.push(`${zipcodes[i].name}`)
      }
      if (i === zipcodes.length - 1) {
        const ZipsWithQoutes = codes.map((it) => {
          return `'${it}'`
        })
        sendRequestCount(ZipsWithQoutes)
        setFiltersValues({
          ...filtersValues,
          zipCodes: codes,
          zipCodeCenter: geozipcode,
          zipCodeRadius: distance,
          zipCodesCount: codes.length,
        })
        setRecordRequest({ ...recordRequest, zipCodes: codes })
      }
    }
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "zipCodes",
      "C.ZIP",
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

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }

  const filteredZips = useMemo(() => {
    return zipcodes.filter((zip) => {
      return zip.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [zipcodes, search])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    if (
      filtersValues.zipCodeCenter === null &&
      filtersValues.zipCodes === null &&
      filtersValues.zipCodeRadius === null
    ) {
      setZipCodesShow(false)
      setGeozipcode(null)
      setDistance(null)
    }
  }, [
    filtersValues.zipCodes,
    filtersValues.zipCodeCenter,
    filtersValues.zipCodeRadius,
  ])

  return (
    <div className="">
      {alert && filtersValues.zipCodes !== null && (
        <SaveMessage custBuild={false} />
      )}
      {error ? (
        <div className="flex w-full justify-center">
          <div className="bg-red-600 py-2 rounded-md flex justify-center mb-4 w-[550px]">
            <h3 className="text-white font-bold text-[15px]">
              Zip Code not found in the system.
            </h3>
          </div>
        </div>
      ) : (
        ""
      )}
      {show[15].status === true && zipCodesShow === true ? (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px] mb-8">
            Zip Code
          </h2>
          <div className="flex space-x-8 items-center justify-between">
            <div className="flex w-full">
              <span
                className="image-input_center cursor-pointer"
                style={{ backgroundColor: "#F5F9FF" }}
                onClick={() => setGeozipcode(dealerInfoValue.zipCode)}
                title="Add Dealer's Zip Code To Form"
              ></span>
              <input
                onChange={changeZipCode}
                value={geozipcode ?? ""}
                placeholder="Starting Zip Code"
                className="rounded-xl p-[16px]  focus:outline-[#58628325] mr-10"
              ></input>
              <input
                onChange={changeRadius}
                value={distance ?? ""}
                placeholder="Radius"
                className="rounded-xl image-input_radius p-[16px] focus:outline-[#58628325]"
              ></input>

              {distance != null && geozipcode !== null ? (
                <button
                  onClick={() => findZipCodes(true)}
                  className="flex items-center w-[80px] justify-around text-white bg-[#298FC2] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-10"
                >
                  Display
                </button>
              ) : (
                ""
              )}
            </div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="filterSelect">Filter</InputLabel>
                <Select
                  labelId="filterSelect"
                  id="filterSelectId"
                  value={filter}
                  label="Filter"
                  onChange={handleChange}
                  className="bg-white border-none h-[48px] px-4 py-2 rounded-md"
                >
                  <MenuItem onClick={changeAllInputOn2} value={10}>
                    Select All
                  </MenuItem>
                  <MenuItem onClick={changeAllInputOff2} value={20}>
                    Clear All
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex justify-between mt-4 mb-[32px] h-[48px] ml-7">
            <input
              className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
              type="text"
              value={search}
              placeholder="Find List"
              onChange={handleSearchInput}
            />
          </div>
          <fieldset className="customScrollBar grid grid-cols-6 mt-4 h-[60vh] overflow-y-scroll">
            <legend className="sr-only">Zip Codes</legend>
            {filteredZips.map((zipcode) => (
              <div className="flex items-center mb-4" key={zipcode.id}>
                <input
                  id={`${zipcode.id}class`}
                  checked={zipcode.selected}
                  onChange={(event) => changeInput(event)}
                  aria-describedby={`checkbox-${zipcode.id}class`}
                  type="checkbox"
                  className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                />
                <label
                  htmlFor={`${zipcode.id}class`}
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {zipcode.name}
                </label>
              </div>
            ))}
          </fieldset>
          <SwitchFilterSubmit
            next={"Vehicle Makes"}
            prev={"Household Demographics"}
            custBuild={false}
            onSubmit={handleZipCodes}
          />
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px] mb-8">
            Zip Code
          </h2>
          <div className="flex space-x-8 items-center justify-between">
            <div className="flex w-full">
              <span
                className="image-input_center cursor-pointer"
                style={{ backgroundColor: "#F5F9FF" }}
                onClick={() => setGeozipcode(dealerInfoValue.zipCode)}
                title="Add Dealer's Zip Code To Form"
              ></span>
              <input
                onChange={changeZipCode}
                value={geozipcode ?? ""}
                placeholder="Starting Zip Code"
                className="rounded-xl p-[16px]  focus:outline-[#58628325] mr-10"
              ></input>
              <input
                onChange={changeRadius ?? ""}
                value={distance ?? ""}
                placeholder="Radius"
                className="rounded-xl image-input_radius p-[16px] focus:outline-[#58628325] mr-10"
              ></input>
              {distance != null && geozipcode !== null ? (
                <button
                  onClick={() => findZipCodes(true)}
                  className="flex items-center w-[80px] justify-around text-white bg-[#298FC2] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Display
                </button>
              ) : (
                ""
              )}
            </div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="filterSelect">Filter</InputLabel>
                <Select
                  labelId="filterSelect"
                  id="filterSelectId"
                  value={filter}
                  label="Filter"
                  onChange={handleChange}
                  className="bg-white border-none h-[48px] px-4 py-2 rounded-md"
                >
                  <MenuItem onClick={changeAllInputOn2} value={10}>
                    Select All
                  </MenuItem>
                  <MenuItem onClick={changeAllInputOff2} value={20}>
                    Clear All
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="flex justify-between mt-4 mb-[32px] h-[48px] ml-7">
            <input
              className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
              type="text"
              value={search}
              placeholder="Find List"
              onChange={handleSearchInput}
            />
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img
              className="h-[160px] w-[157px]"
              src={emptyFolder}
              alt="Empty Folder"
            ></img>
            <p className="text-[#586283] text-[16px] mt-[32px]">
              Start searching by adding the Starting Zip Code and Radius
            </p>
          </div>
          <SwitchFilter
            next={"Vehicle Makes"}
            prev={"Household Demographics"}
            custBuild={false}
          />
        </div>
      )}
    </div>
  )
}

export default GeoZipCodeArea
