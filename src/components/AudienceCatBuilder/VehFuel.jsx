import React, { useEffect, useState } from "react"
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
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { createSQLListSentence } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SaveMessage from "../Fields/SaveMessage"

const VehFuel = () => {
  const [alert, setAlert] = useState(false)
  const [vehfuel, setVehfuel] = React.useState([
    { name: "Diesel", id: 0, selected: false, code: "D" },
    { name: "Gasoline", id: 1, selected: false, code: "G" },
    { name: "Electric / Gas", id: 2, selected: false, code: "L" },
    { name: "Hybrid", id: 3, selected: false, code: "Y" },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalFuels = []
  const finalFuelsCodes = []
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState("")

  const fuelTypeCodesPersistency = () => {
    const vehFuelList = [
      { name: "Diesel", id: 0, selected: false, code: "D" },
      { name: "Gasoline", id: 1, selected: false, code: "G" },
      { name: "Electric / Gas", id: 2, selected: false, code: "L" },
      { name: "Hybrid", id: 3, selected: false, code: "Y" },
    ]
    for (let i = 0; i < vehFuelList.length; i++) {
      if (filtersValues.fuelTypeCodes) {
        filtersValues.fuelTypeCodes.map((fuelTypeName) => {
          fuelTypeName.toLowerCase() === vehFuelList[i].name.toLowerCase() &&
            (vehFuelList[i] = { ...vehFuelList[i], selected: true })
          return null
        })
      }
    }
    setVehfuel(vehFuelList)
  }

  useEffect(() => {
    fuelTypeCodesPersistency()
  }, [])

  const changeInput = (event) => {
    const vehfuelAux = [...vehfuel]
    vehfuelAux[
      event.target.id.substring(0, event.target.id.length - 4)
    ].selected = event.target.checked
    setVehfuel(vehfuelAux)
  }

  const changeAllInputOn3 = () => {
    const vehfuelAux = [...vehfuel]
    for (let m = 0; m < vehfuelAux.length; m++) {
      vehfuelAux[m].selected = true
    }
    setVehfuel(vehfuelAux)
  }

  const changeAllInputOff3 = () => {
    const vehfuelAux = [...vehfuel]
    for (let n = 0; n < vehfuelAux.length; n++) {
      vehfuelAux[n].selected = false
    }
    setVehfuel(vehfuelAux)
  }

  const handleFuelChange = () => {
    setAlert(true)
    for (let i = 0; i < vehfuel.length; i++) {
      if (vehfuel[i].selected) {
        finalFuels.push(`${vehfuel[i].name}`)
        finalFuelsCodes.push(`${vehfuel[i].code}`)
      }
      if (i === vehfuel.length - 1) {
        const FuelWithQoutes = finalFuelsCodes.map((it) => {
          return `'${it.toUpperCase()}'`
        })
        sendRequestCount(FuelWithQoutes)
        setFiltersValues({ ...filtersValues, fuelTypeCodes: finalFuels })
        setRecordRequest({
          ...recordRequest,
          fuelTypeCodes: finalFuelsCodes.map((item) => item.toUpperCase()),
        })
      }
    }
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "fuelTypeCodes",
      "A.FUELTYPECD",
      filtersValues,
      recordRequest,
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

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }

  const filteredFuel = React.useMemo(() => {
    return vehfuel.filter((fuel) => {
      return fuel.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [vehfuel, search])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    filtersValues.fuelTypeCodes === null &&
      setVehfuel(vehfuel.map((item) => ({ ...item, selected: false })))
  }, [filtersValues.fuelTypeCodes])

  return (
    <div>
      {alert && filtersValues.fuelTypeCodes !== null && (
        <SaveMessage custBuild={false} />
      )}
      <div className="flex justify-end mt-4 mb-[32px] h-[48px]">
        <input
          className="hidden w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
          type="text"
          value={search ?? ""}
          placeholder="Find List"
          onChange={handleSearchInput}
        />
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
              <MenuItem onClick={changeAllInputOn3} value={10}>
                Select All
              </MenuItem>
              <MenuItem onClick={changeAllInputOff3} value={20}>
                Clear All
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <fieldset className="h-auto flex flex-col items-center">
        <h2 className="font-bold text-[#586283] text-[20px] mb-8">
          Vehicle Fuel
        </h2>
        <legend className="sr-only">Vehicle Fuel</legend>
        {filteredFuel.map((fuel) => (
          <div className="flex w-[120px] items-center mb-4" key={fuel.id}>
            <input
              id={`${fuel.id}fuel`}
              checked={fuel.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${fuel.id}fuel`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${fuel.id}fuel`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {fuel.name}
            </label>
          </div>
        ))}
      </fieldset>
      <SwitchFilterSubmit
        onSubmit={handleFuelChange}
        next={"Vehicle Purchase Date"}
        prev={"Vehicle Class"}
        custBuild={false}
      />
    </div>
  )
}

export default VehFuel
