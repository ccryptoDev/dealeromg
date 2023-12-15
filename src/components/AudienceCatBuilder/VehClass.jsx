import React, { useEffect, useMemo } from "react"
import axios from "axios"
import {
  filtersValuesState,
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
import { createSQLListSentence } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SaveMessage from "../Fields/SaveMessage"

const VehClass = () => {
  const [vehclase, setVehclase] = React.useState([])
  const [alert, setAlert] = React.useState(false)
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const finalClasses = []
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState("")

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Auto/getAvailableVehicleClass`)
      .then((res) => {
        const classes = res.data
        const response = []
        for (let i = 0; i < classes.length; i++) {
          // Logic compare for persistance when change
          const nameTmp = classes[i]
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
          let result = {
            name: nameTmp.replace("Suv", "SUV"),
            id: i,
            selected: false,
          }
          if (filtersValues.vehicleClasses) {
            filtersValues.vehicleClasses.map((vehicleClas) => {
              vehicleClas.toLowerCase() === classes[i].toLowerCase() &&
                (result = { ...result, selected: true })
              return null
            })
          }
          response.push(result)
          // End Logic Persistance
        }
        setVehclase(response)
      })
  }, [])

  const changeInput = (event) => {
    const vehclaseAux = [...vehclase]
    vehclaseAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setVehclase(vehclaseAux)
  }

  const changeAllInputOn2 = () => {
    const vehclaseAux = [...vehclase]
    for (let m = 0; m < vehclaseAux.length; m++) {
      vehclaseAux[m].selected = true
    }
    setVehclase(vehclaseAux)
  }

  const changeAllInputOff2 = () => {
    const vehclaseAux = [...vehclase]
    for (let n = 0; n < vehclaseAux.length; n++) {
      vehclaseAux[n].selected = false
    }
    setVehclase(vehclaseAux)
  }

  const handleClassChange = () => {
    setAlert(true)
    for (let i = 0; i < vehclase.length; i++) {
      if (vehclase[i].selected) {
        finalClasses.push(`${vehclase[i].name}`)
      }
      if (i === vehclase.length - 1) {
        const ClassWithQoutes = finalClasses.map((it) => {
          return `'${it.toUpperCase()}'`
        })
        sendRequestCount(ClassWithQoutes)
        setFiltersValues({ ...filtersValues, vehicleClasses: finalClasses })
        setRecordRequest({
          ...recordRequest,
          vehicleClasses: finalClasses.map((item) => item.toUpperCase()),
        })
      }
    }
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "vehicleClasses",
      "A.VEH_CLASS",
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

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }

  const filteredClass = useMemo(() => {
    return vehclase.filter((clas) => {
      return clas.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [vehclase, search])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    filtersValues.vehicleClasses === null &&
      setVehclase(vehclase.map((item) => ({ ...item, selected: false })))
  }, [filtersValues.vehicleClasses])

  return (
    <div>
      {alert && filtersValues.vehicleClasses !== null && (
        <SaveMessage custBuild={false} />
      )}
      <h2 className="font-bold text-[#586283] text-[20px]">Vehicle Class</h2>
      <div className="flex justify-between mt-4 mb-[32px] h-[48px]">
        <input
          className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
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
      <fieldset className="grid grid-cols-2 mt-4 h-auto">
        <legend className="sr-only">Class</legend>
        {filteredClass.map((clase) => (
          <div className="flex items-center mb-4" key={clase.id}>
            <input
              id={`${clase.id}class`}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${clase.id}class`}
              type="checkbox"
              checked={clase.selected}
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${clase.id}class`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {clase.name}
            </label>
          </div>
        ))}
      </fieldset>
      <SwitchFilterSubmit
        next={"Vehicle Fuel"}
        prev={"Vehicle Mileage"}
        onSubmit={handleClassChange}
        custBuild={false}
      />
    </div>
  )
}

export default VehClass
