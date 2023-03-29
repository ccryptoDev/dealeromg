import { useState, useEffect, useMemo } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import arrowup from "../../assets/images/arrowup.png"
import emptyFolder from "../../assets/images/emptyfolder.png"
import { useRecoilState } from "recoil"
import {
  valuesInventoryBuilder,
  resultValuesInvBuilder,
  filterInventoryBuilder,
  refreshInventoryBuilder,
} from "../../atoms/InventoryBuilderAtom.js"
import {
  valuesSoldTable,
  filterSoldTable,
  refreshSold,
} from "../../atoms/SoldTableAtom"

const _ = require("lodash")

const VehMakeModelFilter = ({
  makes,
  models,
  setMakes,
  setModels,
  setShowModal,
  view,
}) => {
  const [filters, setFilters] = useRecoilState(
    view !== "sold" ? filterInventoryBuilder : filterSoldTable
  )
  const [refresh, setRefresh] = useRecoilState(
    view !== "sold" ? refreshInventoryBuilder : refreshSold
  )
  const [showMake, setShowMake] = useState(true)
  const [modelsGroup, setModelsGroup] = useState([])
  const [searchMake, setSearchMake] = useState("")
  const searchModel = useState("")[0]
  const [filter, setFilter] = useState("")
  const [vehMake, setVehMake] = useState([])
  const [vehModel, setVehModel] = useState([])
  const inventoryBuilder = useRecoilState(
    view !== "sold" ? valuesInventoryBuilder : valuesSoldTable
  )[0]
  const makesFilter = []
  const modelFilter = []
  const [resultFilter, setResultFilter] = useRecoilState(resultValuesInvBuilder)

  useEffect(() => {
    const makesResponse = inventoryBuilder.makeList
    const response = []
    for (let i = 0; i < makesResponse.length; i++) {
      let result = {
        name:
          makesResponse[i].make.charAt(0).toUpperCase() +
          makesResponse[i].make.slice(1).toLowerCase(),
        id: i,
        selected: false,
      }
      if (makes.length) {
        makes.map((make) => {
          make.toLowerCase() === makesResponse[i].make.toLowerCase() &&
            (result = { ...result, selected: true })
          return null
        })
      }
      response.push(result)
    }
    setVehMake(response)
  }, [inventoryBuilder])

  useEffect(() => {
    if (makes?.length > 0) handleMakesFilter()
  }, [vehMake])

  const handleMakesFilter = () => {
    for (let i = 0; i < vehMake.length; i++) {
      if (vehMake[i].selected) {
        makesFilter.push(`${vehMake[i].name}`)
      }
      if (i === vehMake.length - 1) {
        setMakes(makesFilter)
      }
    }
    handleModelsFilter()

    setShowMake(false)
  }

  const handleModelsFilter = () => {
    const modelsV1 = []
    for (let i = 0; i < inventoryBuilder.modelList.length; i++) {
      for (let j = 0; j < makesFilter.length; j++) {
        if (inventoryBuilder.modelList[i].make === makesFilter[j]) {
          modelsV1.push(inventoryBuilder.modelList[i])
        }
      }
    }
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
      if (models.length) {
        models.map((models) => {
          models.toLowerCase() === modelsV1[i].model.toLowerCase() &&
            (result = { ...result, selected: true })
          return null
        })
      }
      modelsVF.push(result)
    }
    if (models != null) {
      setModels(
        modelsVF
          .filter(function (item) {
            return item.selected
          })
          .map(function (item) {
            return item.name
          })
      )
    }
    setVehModel(modelsVF)
    setModelsGroup(_.groupBy(modelsVF, "make"))
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
    for (let i = 0; i < vehModel.length; i++) {
      if (vehModel[i].selected) {
        modelFilter.push(`${vehModel[i].name}`)
      }
      if (i === vehModel.length - 1) {
        setModels(modelFilter)
        setResultFilter({
          ...resultFilter,
          makeList: makes,
          modelList: modelFilter,
        })
        setFilters({
          ...filters,
          makeList: makes,
          modelList: modelFilter,
        })
      }
    }
    setRefresh(!refresh)
    setShowModal(false)
  }

  const handleSearchInputMake = (event) => {
    setSearchMake(event.target.value)
  }

  const filteredMakes = useMemo(() => {
    return vehMake.filter((make) => {
      return make.name.toLowerCase().includes(searchMake.toLowerCase())
    })
  }, [vehMake, searchMake])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      {showMake ? (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px]">Makes</h2>
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
                  id="filterSelectId"
                  value={filter}
                  label="Filter"
                  onChange={handleChange}
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
          <div className="flex flex-row justify-between items-center rounded-xl bg-[#E3EBF6] px-2 mt-5">
            <button
              className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={handleMakesFilter}
            >
              Next Filter
            </button>
          </div>
        </div>
      ) : null}
      {!showMake && makes != null ? (
        <div>
          <h2 className="font-bold text-[#586283] text-[20px]">Models</h2>
          <div className="flex justify-between mt-4 mb-[32px]">
            <input
              className="w-[60%] px-4 py-2 rounded-lg border-none text-sm focus:ring-[#58628325]"
              type="text"
              defaultValue={searchModel}
              placeholder="Find List"
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
          <div className="flex flex-row justify-between items-center rounded-xl bg-[#E3EBF6] px-2 mt-5">
            <button
              className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={() => setShowMake(true)}
            >
              Previous Filter
            </button>
            <button
              onClick={handleModels}
              type="button"
              className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
            >
              Submit
              <img className="mx-2" src={arrowup} alt="arrow" />
            </button>
            <button
              className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : !showMake ? (
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
                  id="filterSelectId"
                  value={filter}
                  label="Filter"
                  onChange={handleChange}
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
          <div className="flex flex-row justify-between items-center rounded-xl bg-[#E3EBF6] px-2 mt-5">
            <button
              className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={() => setShowMake(true)}
            >
              Previous Filter
            </button>
            <button
              className="bg-white text-[#586283] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default VehMakeModelFilter
