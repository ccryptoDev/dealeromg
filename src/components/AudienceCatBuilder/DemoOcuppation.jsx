import React, { useEffect } from "react"
import axios from "axios"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { useRecoilState } from "recoil"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { createSQLListSentence } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SaveMessage from "../Fields/SaveMessage"

const DemoOcuppation = () => {
  const [ocuppation, setocuppation] = React.useState([])
  const [alert, setAlert] = React.useState(false)
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const [, setRecordCount] = useRecoilState(recordCountNumber)
  const finalOcuppation = []
  const finalOcuppationCodes = []
  const [search, setSearch] = React.useState("")
  const [filter, setFilter] = React.useState("")

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Consumer/getAvailableOccupations`)
      .then((res) => {
        const ocuppations = res.data
        function SortArray(item1, item2) {
          return item1.description.localeCompare(item2.description)
        }
        ocuppations.sort(SortArray)
        const response = []
        for (let i = 0; i < ocuppations.length; i++) {
          let result = {
            name:
              ocuppations[i].description.charAt(0).toUpperCase() +
              ocuppations[i].description.slice(1).toLowerCase(),
            id: i,
            code: ocuppations[i].code,
            selected: false,
          }
          if (filtersValues.ocupationCodes) {
            filtersValues.ocupationCodes.map((ocupationCodes) => {
              ocupationCodes.toLowerCase() ===
                ocuppations[i].description.toLowerCase() &&
                (result = { ...result, selected: true })
              return null
            })
          }
          response.push(result)
        }
        setocuppation(response)
      })
  }, [])

  const changeInput = (event) => {
    const ocuppationAux = [...ocuppation]
    ocuppationAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setocuppation(ocuppationAux)
  }

  const changeAllInputOn2 = () => {
    const ocuppationAux = [...ocuppation]
    for (let m = 0; m < ocuppationAux.length; m++) {
      ocuppationAux[m].selected = true
    }
    setocuppation(ocuppationAux)
  }

  const changeAllInputOff2 = () => {
    const ocuppationAux = [...ocuppation]
    for (let n = 0; n < ocuppationAux.length; n++) {
      ocuppationAux[n].selected = false
    }
    setocuppation(ocuppationAux)
  }

  const handleOcuppationChange = () => {
    setAlert(true)
    for (let i = 0; i < ocuppation.length; i++) {
      if (ocuppation[i].selected) {
        finalOcuppation.push(`${ocuppation[i].name}`)
        finalOcuppationCodes.push(`${ocuppation[i].code}`)
      }
      if (i === ocuppation.length - 1) {
        const OccWithQoutes = finalOcuppationCodes.map((it) => {
          return `'${it}'`
        })
        sendRequestCount(OccWithQoutes)
        setFiltersValues({ ...filtersValues, ocupationCodes: finalOcuppation })
        setRecordRequest({
          ...recordRequest,
          ocupationCodes: finalOcuppationCodes,
        })
      }
    }
  }

  const sendRequestCount = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "ocupationCodes",
      "C.OCCUPATIONCD",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      false
    )
    setAdWhereClsAM({ sql: WhereClsAM })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
        { sql: WhereClsAM }
      )
      .then((res) => {
        const resBigQuery = res.data[0]

        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }

  const filteredOc = React.useMemo(() => {
    return ocuppation.filter((clas) => {
      return clas.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [ocuppation, search])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    filtersValues.ocupationCodes === null &&
      setocuppation(
        ocuppation.map((it) => {
          return { ...it, selected: false }
        })
      )
  }, [filtersValues.ocupationCodes])

  return (
    <div>
      {alert && filtersValues.ocupationCodes !== null && (
        <SaveMessage custBuild={false} />
      )}
      <h2 className="font-bold text-[#586283] text-[20px]">Occupation</h2>
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
      <fieldset className="grid grid-cols-3 mt-4 h-auto">
        <legend className="sr-only">Occupation</legend>
        {filteredOc.map((ocupp) => (
          <div className="flex items-center mb-4" key={ocupp.id}>
            <input
              id={`${ocupp.id}ocupp`}
              checked={ocupp.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${ocupp.id}ocupp`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${ocupp.id}ocupp`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {ocupp.name}
            </label>
          </div>
        ))}
      </fieldset>
      <SwitchFilterSubmit
        next={"Education Level"}
        prev={"Gender, Age & Speaks Spanish"}
        onSubmit={handleOcuppationChange}
        custBuild={false}
      />
    </div>
  )
}

export default DemoOcuppation
