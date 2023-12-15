import React, { useState, useEffect, useMemo } from "react"
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

const _ = require("lodash")

const VehMakeModel = () => {
  const [alertMake, setAlertMake] = useState(false)
  const [alertModel, setAlertModel] = useState(false)
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const show = useRecoilState(audienceCatBuilderState)[0]
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setSpiner = useRecoilState(Spiner)[1]
  const [modelsGroup, setModelsGroup] = useState([])
  const [searchMake, setSearchMake] = useState("")
  const [searchModel, setSearchModel] = useState("")
  const [filterMake, setFilterMake] = useState("")
  const [filterModel, setFilterModel] = useState("")

  const [vehMake, setVehMake] = React.useState([])
  const [vehModel, setVehModel] = React.useState([])
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const makesFilter = []
  const modelFilter = []

  useEffect(() => {
    const response = []
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Auto/getManufacturersList`)
      .then((res) => {
        const makes = res.data
        for (let i = 0; i < makes.length; i++) {
          let result = {
            name:
              makes[i].make.charAt(0).toUpperCase() +
              makes[i].make.slice(1).toLowerCase(),
            id: i,
            selected: false,
          }
          if (filtersValues.makes) {
            filtersValues.makes.map((make) => {
              make.toLowerCase() === makes[i].make.toLowerCase() &&
                (result = { ...result, selected: true })
              return null
            })
          }
          response.push(result)
        }
        setVehMake(response)
      })

    if (response.length) handleModelsFilter(AdWhereClsAM.sql)
  }, [])

  const handleMakesFilter = () => {
    setAlertMake(true)
    let WhereClsAM
    for (let i = 0; i < vehMake.length; i++) {
      if (vehMake[i].selected) {
        makesFilter.push(`${vehMake[i].name}`)
      }
      if (i === vehMake.length - 1) {
        const MakesWithQoutes = makesFilter.map((it) => {
          return `'${it.toUpperCase()}'`
        })
        WhereClsAM = sendRequestCountMakes(MakesWithQoutes)
        setFiltersValues((filterValuesAct) => {
          return { ...filterValuesAct, makes: makesFilter }
        })
        setRecordRequest((recordRequestAct) => {
          return {
            ...recordRequestAct,
            makes: makesFilter.map((item) => item.toUpperCase()),
          }
        })
      }
    }
    handleModelsFilter(WhereClsAM)
  }

  const sendRequestCountMakes = (recordRequestBody) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "makes",
      "A.MAKE",
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
    return WhereClsAM
  }

  const handleModelsFilter = (oldBigQuery = null) => {
    const headers = { "Content-Type": "application/json" }
    const makesFilterJson = JSON.stringify(
      makesFilter.map((it) => {
        return `${it.toUpperCase()}`
      })
    )
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}Auto/getModelsByMakeList`,
        makesFilterJson,
        { headers }
      )
      .then((res) => {
        const modelsV1 = res.data
        const modelsVF = []
        for (let i = 0; i < modelsV1.length; i++) {
          let result = {
            make:
              modelsV1[i].make.charAt(0).toUpperCase() +
              modelsV1[i].make.slice(1).toLowerCase(),
            name:
              modelsV1[i].model.charAt(0).toUpperCase() +
              modelsV1[i].model.slice(1).toLowerCase(),
            id: i,
            selected: false,
          }
          if (filtersValues.models) {
            filtersValues.models.map((models) => {
              models.toLowerCase() === modelsV1[i].model.toLowerCase() &&
                (result = { ...result, selected: true })
              return null
            })
          }
          modelsVF.push(result)
        }
        if (filtersValues.models != null) {
          const ModelsWithQoutes = modelsVF
            .filter(function (item) {
              return item.selected
            })
            .map(function (item) {
              return `'${item.name.toUpperCase()}'`
            })
          sendRequestCountModels(ModelsWithQoutes, oldBigQuery)
          setFiltersValues((filtersValuesAct) => {
            return {
              ...filtersValuesAct,
              models: modelsVF
                .filter(function (item) {
                  return item.selected
                })
                .map(function (item) {
                  return item.name
                }),
            }
          })
          setRecordRequest((recordRequestAct) => {
            return {
              ...recordRequestAct,
              models: modelsVF
                .filter(function (item) {
                  return item.selected
                })
                .map(function (item) {
                  return item.name.toUpperCase()
                }),
            }
          })
        }
        setVehModel(modelsVF)
        setModelsGroup(_.groupBy(modelsVF, "make"))
      })
  }

  // Makes
  const changeInputMake = (event) => {
    const vehMakeAux = [...vehMake]
    vehMakeAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setVehMake(vehMakeAux)
  }

  const changeAllInputOnMake = () => {
    const vehMakeAux = [...vehMake]
    for (let i = 0; i < vehMakeAux.length; i++) {
      vehMakeAux[i].selected = true
    }
    setVehMake(vehMakeAux)
  }

  const changeAllInputOffMake = () => {
    const vehMakeAux = [...vehMake]
    for (let j = 0; j < vehMakeAux.length; j++) {
      vehMakeAux[j].selected = false
    }
    setVehMake(vehMakeAux)
  }

  // Model
  const changeInputModel = (event) => {
    const vehModelAux = [...vehModel]
    vehModelAux[
      event.target.id.substring(0, event.target.id.length - 5)
    ].selected = event.target.checked
    setVehModel(vehModelAux)
  }

  const changeAllInputOnModel = () => {
    const vehModelAux = [...vehModel]
    for (let k = 0; k < vehModelAux.length; k++) {
      vehModel[k].selected = true
    }
    setVehModel(vehModelAux)
  }

  const changeAllInputOffModel = () => {
    const vehModelAux = [...vehModel]
    for (let l = 0; l < vehModelAux.length; l++) {
      vehModelAux[l].selected = false
    }
    setVehModel(vehModelAux)
  }

  const handleModels = () => {
    setAlertModel(true)
    for (let i = 0; i < vehModel.length; i++) {
      if (vehModel[i].selected) {
        modelFilter.push(`${vehModel[i].name}`)
      }
      if (i === vehModel.length - 1) {
        const ModelsWithQoutes = modelFilter.map((it) => {
          return `'${it.toUpperCase()}'`
        })
        sendRequestCountModels(ModelsWithQoutes)
        setFiltersValues({ ...filtersValues, models: modelFilter })
        setRecordRequest({
          ...recordRequest,
          models: modelFilter.map((item) => item.toUpperCase()),
        })
      }
    }
  }

  const sendRequestCountModels = (recordRequestBody, oldBigQuery) => {
    setSpiner(true)
    const WhereClsAM = createSQLListSentence(
      recordRequestBody,
      "models",
      "A.MODEL",
      filtersValues,
      recordRequest,
      AdWhereClsAM,
      true,
      oldBigQuery
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

  const handleSearchInputMake = (event) => {
    setSearchMake(event.target.value)
  }

  const filteredMakes = useMemo(() => {
    return vehMake.filter((make) => {
      return make.name.toLowerCase().includes(searchMake.toLowerCase())
    })
  }, [vehMake, searchMake])

  const handleSearchInputModel = (event) => {
    setSearchModel(event.target.value)
    if (event.target.value) {
      const vehModelAux = vehModel.filter((model) => {
        return model.name.toLowerCase().includes(searchModel.toLowerCase())
      })
      setModelsGroup(_.groupBy(vehModelAux, "make"))
    } else {
      setModelsGroup(_.groupBy(vehModel, "make"))
    }
  }

  useEffect(() => {
    if (filtersValues.makes === null) {
      setVehMake(vehMake.map((make) => ({ ...make, selected: false })))
    }
  }, [filtersValues.makes])

  return (
    <>
      {show[14].status ? (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px]">Makes</h2>
          {alertMake && filtersValues.makes !== null && (
            <SaveMessage custBuild={false} />
          )}
          <div className="flex justify-between mt-4 mb-[32px] h-[48px]">
            <input
              className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
              type="text"
              value={searchMake ?? ""}
              placeholder="Find List"
              onChange={handleSearchInputMake}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="filterSelect">Filter</InputLabel>
                <Select
                  labelId="filterSelect"
                  value={filterMake}
                  onChange={(event) => setFilterMake(event.target.value)}
                  label="Filter"
                  className="bg-white border-none h-[48px] px-4 py-2 rounded-md"
                >
                  <MenuItem onClick={changeAllInputOnMake} value={10}>
                    Select All
                  </MenuItem>
                  <MenuItem onClick={changeAllInputOffMake} value={20}>
                    Clear All
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <fieldset className="grid grid-cols-5 mt-4 h-auto">
            <p className="sr-only">Makes</p>
            {filteredMakes.map((make) => (
              <div
                className="flex items-center mb-4 2xl:text-[14px] text-[12px]"
                key={make.id}
              >
                <input
                  id={`${make.id}makes`}
                  checked={make.selected}
                  onChange={(event) => changeInputMake(event)}
                  aria-describedby={`checkbox-${make.id}`}
                  type="checkbox"
                  className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                />
                <label
                  htmlFor={`${make.id}makes`}
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {make.name}
                </label>
              </div>
            ))}
          </fieldset>
          <SwitchFilterSubmit
            onSubmit={handleMakesFilter}
            prev={"Zip Code Radius"}
            next={"Vehicle Models"}
            custBuild={false}
          />
        </div>
      ) : null}
      {show[13].status && filtersValues.makes != null ? (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px]">Models</h2>
          {alertModel && filtersValues.models !== null && (
            <SaveMessage custBuild={false} />
          )}
          <div className="flex justify-between mt-4 mb-[32px]">
            <input
              className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
              type="text"
              defaultValue={searchModel}
              onChange={handleSearchInputModel}
              placeholder="Find List"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="filterSelect">Filter</InputLabel>
                <Select
                  labelId="filterSelect"
                  value={filterModel}
                  onChange={(event) => setFilterModel(event.target.value)}
                  label="Filter"
                  className="bg-white border-none h-[48px] px-4 py-2 rounded-md"
                >
                  <MenuItem onClick={changeAllInputOnModel} value={10}>
                    Select All
                  </MenuItem>
                  <MenuItem onClick={changeAllInputOffModel} value={20}>
                    Clear All
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <fieldset className="customScrollBar grid grid-cols-1 mt-4 h-[65vh] overflow-y-scroll">
            {Object.keys(modelsGroup).map((title) => (
              <div key={title.id}>
                <h1 className="font-bold text-[#586283] text-[18px] mb-2">
                  {title}
                </h1>
                <div className="grid grid-cols-5">
                  {modelsGroup[title].map((model) => (
                    <div className="flex items-center mb-4" key={model.id}>
                      <input
                        id={`${model.id}model`}
                        checked={model.selected}
                        onChange={(event) => changeInputModel(event)}
                        aria-describedby={`checkbox-${model.id}model`}
                        type="checkbox"
                        className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                      />
                      <label
                        htmlFor={`${model.id}model`}
                        className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {model.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
          <SwitchFilterSubmit
            custBuild={false}
            prev={"Vehicle Makes"}
            next={"Vehicle Year"}
            onSubmit={handleModels}
          />
        </div>
      ) : show[13].status ? (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px]">Models</h2>
          <div className="flex justify-between mt-4 mb-[32px]">
            <input
              className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
              type="text"
              value={searchModel ?? ""}
              placeholder="Find List"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="filterSelect">Filter</InputLabel>
                <Select
                  labelId="filterSelect"
                  value={filterModel}
                  onChange={(event) => setFilterModel(event.target.value)}
                  label="Filter"
                  className="bg-white border-none h-[48px] px-4 py-2 rounded-md"
                >
                  <MenuItem onClick={changeAllInputOnModel} value={10}>
                    Select All
                  </MenuItem>
                  <MenuItem onClick={changeAllInputOffModel} value={20}>
                    Clear All
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img
              className="h-[160px] w-[157px]"
              src={emptyFolder}
              alt="Empty Folder"
            ></img>
            <p className="text-[#586283] text-[16px] mt-[32px]">
              Start searching by adding some Makes in the previous filter
            </p>
          </div>
          <SwitchFilter
            custBuild={false}
            prev={"Vehicle Makes"}
            next={"Vehicle Year"}
          />
        </div>
      ) : null}
    </>
  )
}

export default VehMakeModel
