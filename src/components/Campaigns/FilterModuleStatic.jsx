import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useRecoilState } from "recoil"
import { dealerInfo } from "../../atoms/DealerAtom.js"
import {
  filterInventoryBuilder,
  refreshInventoryBuilder,
  presetBuilder,
  valuesInventoryBuilder,
  resultValuesInvBuilder,
  amountSets,
} from "../../atoms/InventoryBuilderAtom.js"
import {
  defaultFilterInventoryBuilder,
  defaultResultModule,
} from "../../util/defaultFilterValuesCampaigns.js"
import CollapsingButton from "../Fields/CollapsingButton.jsx"
import VehMakeModelFilter from "./VehMakeModelFilter.jsx"
import axios from "axios"
import { changeCurrencyFormat } from "../../util/changeFormat.js"
import VehStyleFilter from "./VehStyleFilter.jsx"
import { StaticInputs } from "./StaticInputs.jsx"

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

function valuetextDayLot(value) {
  return `${value}`
}

function valuetextDealerPrice(value) {
  return `${value}`
}

function valuetextMileage(value) {
  return `${value}`
}

// function valuetextViews (value) {
//   return `${value}`
// }

function valuetextImageCount(value) {
  return `${value}`
}

function valuetextYear(value) {
  return `${value}`
}

const typeListStatic = ["NEW", "CPO", "USED"]

const FilterModuleStatic = () => {
  const [filters, setFilters] = useRecoilState(filterInventoryBuilder) // the ones that are sent to the backend
  const [refresh, setRefresh] = useRecoilState(refreshInventoryBuilder)
  const [value, setValue] = useState([0, 70])
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [valueDealerPrice, setValueDealerPrice] = useState([0, 100000])
  const [valueMileage, setValueMileage] = useState([0, 150000])
  const [, setValueViews] = useState([0, 6000])
  const [valueImageCount, setValueImageCount] = useState([0, 60])
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const [, setPresetBuilder] = useRecoilState(presetBuilder)
  const setSelectedStyle = useState([])[1]
  const [type, setType] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filterChange, setFilterChange] = useState(false)
  const valuesInvBuilder = useRecoilState(valuesInventoryBuilder)[0] // dynamic data from the backend response
  const [resultFIlter, setResultFilter] = useRecoilState(resultValuesInvBuilder) // data to show the resume of what the user selected
  const [dealerPresets, setDealerPresets] = useState([])
  const [amountPresets, setAmountPresets] = useRecoilState(amountSets)
  const [preset, setPreset] = useState("all")
  const [valueYear, setValueYear] = useState([1960, 2023])
  const filtersDefault = defaultFilterInventoryBuilder
  const [renderType, setRenderType] = useState(false)
  const [showStyleModal, setShowStyleModal] = useState(false)

  const resetFilterStatus = () => {
    setResultFilter(defaultResultModule)
  }

  const handleChangeTypes = (event) => {
    if (event.target.checked) {
      setType((prevState) => [...prevState, event.target.value])
    } else {
      setType((prevState) =>
        prevState.filter((value) => value !== event.target.value)
      )
    }
    setRenderType(true)
  }

  const resetFilters = () => {
    setFilters(filtersDefault)
    setFilterChange(false)
    resetFilterStatus()
    setRefresh(!refresh)
    setValue([
      filtersDefault.minDaysOnLot ?? 0,
      filtersDefault.maxDaysOnLot ?? 70,
    ])
    setValueDealerPrice([
      filtersDefault.minDealerPrice ?? 0,
      filtersDefault.maxDealerPrice ?? 100000,
    ])
    setValueMileage([
      filtersDefault.minMileage ?? 0,
      filtersDefault.maxMileage ?? 150000,
    ])
    setValueViews([
      filtersDefault.minViews ?? 0,
      filtersDefault.maxViews ?? 6000,
    ])
    setSelectedStyle([])
    setType(filtersDefault.typeList ?? [])
    setMakes([])
    setModels([])
    setPreset("all")
    setPresetBuilder({ name: null })
    setValueImageCount([
      filtersDefault.minImageCount ?? 0,
      filtersDefault.maxImageCount ?? 60,
    ])
    setValueYear([
      filtersDefault.minYear ?? 1960,
      filtersDefault.maxYear ?? 2023,
    ])
  }

  const handleChangeDayLot = (event, newValue) => {
    setValue(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
      minDaysOnLot: newValue[0],
      maxDaysOnLot: newValue[1],
    })
    setResultFilter({
      ...resultFIlter,
      minDaysOnLot: newValue[0],
      maxDaysOnLot: newValue[1],
    })
  }

  const handleChangeDealerPrice = (event, newValue) => {
    setValueDealerPrice(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
      minDealerPrice: newValue[0],
      maxDealerPrice: newValue[1],
    })
    setResultFilter({
      ...resultFIlter,
      minDealerPrice: newValue[0],
      maxDealerPrice: newValue[1],
    })
  }

  const handleChangeMileage = (event, newValue) => {
    setValueMileage(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
      minMileage: newValue[0],
      maxMileage: newValue[1],
    })
    setResultFilter({
      ...resultFIlter,
      minMileage: newValue[0],
      maxMileage: newValue[1],
    })
  }

  // const handleChangeViews = (event, newValue) => {
  //   setValueViews(newValue)
  //   setRefresh(!refresh)
  //   setFilters({
  //     ...filters,
  //     minViews: newValue[0],
  //     maxViews: newValue[1],
  //   })
  //   setResultFilter({
  //     ...resultFIlter,
  //     minViews: newValue[0],
  //     maxViews: newValue[1],
  //   })
  // }

  const handleChangeImageCount = (event, newValue) => {
    setValueImageCount(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
      minImageCount: newValue[0],
      maxImageCount: newValue[1],
    })
    setResultFilter({
      ...resultFIlter,
      minImageCount: newValue[0],
      maxImageCount: newValue[1],
    })
  }

  const handleChangeVehicleYear = (event, newValue) => {
    setValueYear(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
      minYear: newValue[0],
      maxYear: newValue[1],
    })
    setResultFilter({
      ...resultFIlter,
      minYear: newValue[0],
      maxYear: newValue[1],
    })
  }

  useEffect(() => {
    if (renderType) {
      setResultFilter({
        ...resultFIlter,
        typeList: type,
      })
      setFilters({
        ...filters,
        typeList: type,
      })
      setRenderType(false)
      setRefresh(!refresh)
    }
  }, [renderType])

  useEffect(() => {
    if (
      Object.values(resultFIlter).find((s) => s !== null && s?.length !== 0)
    ) {
      setFilterChange(true)
    }
  }, [resultFIlter])

  const getPreset = (get = false) => {
    setFilterChange(false)
    if (!filterChange || get) {
      resetFilterStatus()
      const existPreset = dealerPresets.find(
        (dealerPreset) => dealerPreset.name === preset
      )
      if (preset === "all") {
        resetFilters()
      } else if (existPreset !== undefined) {
        axios
          .get(
            `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/presets/${existPreset.id}`
          )
          .then((response) => {
            if (response.status === 200) {
              setPresetBuilder({ name: preset })
              setFilters({
                ...response.data,
              })
              setRefresh(!refresh)
            }
          })
          .catch((error) => console.log(error))
      } else {
        axios
          .post(
            `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/presets`,
            {
              ...filters,
              dealerId: dealerInfoValue.dealerID,
              destination: preset.includes("Facebook") ? "fb" : "ms",
            }
          )
          .then((response) => {
            if (response.status === 200) {
              setPresetBuilder({ name: preset })
              setFilters({
                ...response.data,
              })
              setRefresh(!refresh)
            }
          })
          .catch((error) => console.log(error))
      }
    } else {
      setShowFilterModal(true)
    }
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/presets/list/dealer/${dealerInfoValue.dealerID}`
      )
      .then((response) => {
        if (response.status === 200) {
          const dealerPresetsTmp = response.data
          setDealerPresets(dealerPresetsTmp)
          setAmountPresets({
            fb: dealerPresetsTmp.filter((dealerPresetTmp) =>
              dealerPresetTmp.name.includes("Facebook")
            ).length,
            ms: dealerPresetsTmp.filter((dealerPresetTmp) =>
              dealerPresetTmp.name.includes("MICROSOFT")
            ).length,
          })
        }
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    setValue([
      valuesInvBuilder.minDaysOnLot ?? 0,
      valuesInvBuilder.maxDaysOnLot ?? 70,
    ])
    setType(valuesInvBuilder.typeList ?? [])
    setValueDealerPrice([
      valuesInvBuilder.minDealerPrice ?? 0,
      valuesInvBuilder.maxDealerPrice ?? 100000,
    ])
    setSelectedStyle(valuesInvBuilder.vehicleStyleList ?? [])
    setValueMileage([
      valuesInvBuilder.minMileage ?? 0,
      valuesInvBuilder.maxMileage ?? 150000,
    ])
    setValueViews([
      valuesInvBuilder.minViews ?? 0,
      valuesInvBuilder.maxViews ?? 6000,
    ])
    setValueImageCount([
      valuesInvBuilder.minImageCount ?? 0,
      valuesInvBuilder.maxImageCount ?? 60,
    ])
    setValueYear([
      valuesInvBuilder.minYear ?? 1960,
      valuesInvBuilder.maxYear ?? 2023,
    ])
  }, [valuesInvBuilder])

  const PromptModal = (
    <div className="overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex items-center justify-center">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="bg-white rounded-lg w-[500px] flex flex-col items-center justify-center p-8 space-y-6">
          <p className="font-bold text-[#586283] text-[20px] text-center">
            Do you want to open a new set? You did not save your current filter
            selections
          </p>
          <div className="w-[50%] flex flex-row justify-between">
            <button
              className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => {
                getPreset(true)
                resetFilterStatus()
                setShowFilterModal(false)
                setFilterChange(false)
              }}
            >
              Continue
            </button>
            <button
              className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => setShowFilterModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const modalSave = () => {
    return (
      <div
        id="saveBuildModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showModal ? "" : "hidden"
        } overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-auto flex items-center justify-center`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow p-6">
            <VehMakeModelFilter
              makes={makes}
              setMakes={setMakes}
              models={models}
              setModels={setModels}
              setShowModal={setShowModal}
              view="inventory"
            />
          </div>
        </div>
      </div>
    )
  }

  const modalStyle = () => {
    return (
      <div
        id="styleModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showStyleModal ? "" : "hidden"
        } overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-auto flex items-center justify-center`}
      >
        <div className="relative p-4 w-fit h-full md:h-auto bg-white">
          <div className="flex flex-col items-center m-4">
            <div className="flex flex-col">
              <VehStyleFilter
                valuesInvBuilder={valuesInvBuilder}
                setShowStyleModal={setShowStyleModal}
                view="inventory"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {showFilterModal && PromptModal}
      {modalSave()}
      {modalStyle()}
      <div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <img
              src={dealerInfoValue.businessLogoUrl}
              alt="dealer_logo"
              className="w-[70%] pl-8 pt-2"
            />
            <h1 className="font-bold">{dealerInfoValue.businessName}</h1>
          </div>
          <div>
            <CollapsingButton side="left" />
          </div>
        </div>
      </div>
      <div className="bg-slate-100 mb-4 mt-2 px-2 flex flex-col rounded-lg">
        <h1 className="font-bold text-[#298FC2] text-[17px] mt-2 w-full">
          Load Set
        </h1>
        <div className="flex flex-row justify-between py-3">
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            id="prevSet"
            className="w-[82%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all">All Inventory</option>
            <option value="Facebook Set #1">Facebook Set 1</option>
            <option value="Facebook Set #2">Facebook Set 2</option>
            <option value="Facebook Set #3">Facebook Set 3</option>
            {[
              ...Array(amountPresets.fb - 3 > 0 ? amountPresets.fb - 3 : 0),
            ].map((e, index) => {
              return (
                <option value={`Facebook Set #${index + 4}`} key={index}>
                  Facebook Set {index + 4}
                </option>
              )
            })}
            <option value="MICROSOFT Set #1">Microsoft Set 1</option>
            <option value="MICROSOFT Set #2">Microsoft Set 2</option>
            <option value="MICROSOFT Set #3">Microsoft Set 3</option>
            {[
              ...Array(amountPresets.ms - 3 > 0 ? amountPresets.ms - 3 : 0),
            ].map((e, index) => {
              return (
                <option value={`MICROSOFT Set #${index + 4}`} key={index}>
                  Microsoft Set {index + 4}
                </option>
              )
            })}
          </select>

          <button
            type="button"
            onClick={() => getPreset(false)}
            className=" text-xs py-2.5 w-[12%] font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            GO
          </button>
        </div>
      </div>

      <div className="bg-slate-50 mx-1 px-3 rounded-lg">
        <div className="flex justify-between border-b-2 my-4 pb-2">
          <h1 className="font-bold text-[#586283] text-[16px] leading-5">
            Filter
          </h1>
          <button
            className="flex underline text-[14px] pt-0.5 leading-5"
            onClick={resetFilters}
          >
            Clear Filters
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M9 14C10.1867 14 11.3467 13.6481 12.3334 12.9888C13.3201 12.3295 14.0892 11.3925 14.5433 10.2961C14.9974 9.19975 15.1162 7.99335 14.8847 6.82946C14.6532 5.66557 14.0818 4.59648 13.2426 3.75736C12.4035 2.91825 11.3344 2.3468 10.1705 2.11529C9.00666 1.88378 7.80026 2.0026 6.7039 2.45673C5.60754 2.91085 4.67047 3.67989 4.01118 4.66658C3.35189 5.65328 3 6.81331 3 8V11.1L1.2 9.3L0.5 10L3.5 13L6.5 10L5.8 9.3L4 11.1V8C4 7.0111 4.29325 6.0444 4.84265 5.22215C5.39206 4.39991 6.17295 3.75904 7.08658 3.3806C8.00021 3.00217 9.00555 2.90315 9.97545 3.09608C10.9454 3.289 11.8363 3.76521 12.5355 4.46447C13.2348 5.16373 13.711 6.05465 13.9039 7.02455C14.0969 7.99446 13.9978 8.99979 13.6194 9.91342C13.241 10.8271 12.6001 11.6079 11.7779 12.1573C10.9556 12.7068 9.98891 13 9 13V14Z"
                fill="#586283"
              />
            </svg>
          </button>
        </div>
        <div className="bg-slate-50 py-0 px-4 flex flex-col border-b-2">
          <h3 className="font-bold text-[#586283] text-[12px] my-1">Type</h3>
          <div className="flex flex-col mb-4">
            {typeListStatic.map((item, index) => (
              <div className="flex m-2" key={index}>
                <input
                  id={item}
                  type="checkbox"
                  value={item}
                  checked={!!type.find((value) => value === item)}
                  onChange={handleChangeTypes}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={item}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <Box sx={{ width: "100%", borderBottom: "2px solid lightgray" }}>
            <div className="bg-slate-50 py-2 px-4 rounded-xl flex flex-col">
              <div className="flex justify-between">
                <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                  Days on Lot
                </h1>
                <h2 className="text-xs mb-3 font-bold text-[#586283]">
                  <span className="font-medium">{`${value[0]} - ${value[1]} Days`}</span>
                </h2>
              </div>
              <StaticInputs
                minBack={filters.minDaysOnLot}
                maxBack={filters.maxDaysOnLot}
                sentValues={handleChangeDayLot}
              />
              <div className="px-4">
                <Slider
                  getAriaLabel={() => "day"}
                  value={value}
                  onChange={handleChangeDayLot}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetextDayLot}
                  step={1}
                  min={valuesInvBuilder.minDaysOnLot ?? 1}
                  max={valuesInvBuilder.maxDaysOnLot ?? 70}
                />
              </div>
            </div>
          </Box>
          <div className="py-2 px-4 border-b-2">
            <label
              htmlFor="model"
              className="block my-2 text-[14px] font-bold text-[#586283] dark:text-gray-400"
            >
              Vehicles
            </label>
            <button
              onClick={() => {
                setShowModal(true)
              }}
              className="my-2 bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Make/Model
            </button>
            {/* <button
              onClick={() => {
                setShowStyleModal(true)
              }}
              className="my-2 bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Style
            </button> */}
            <div className="bg-slate-50 pt-2 rounded-xl flex flex-col">
              <div className="flex justify-between">
                <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                  Year
                </h1>
                <h2 className="text-xs mb-3 font-bold text-[#586283]">
                  <span className="font-medium">{`${valueYear[0]} - ${valueYear[1]}`}</span>
                </h2>
              </div>
              <StaticInputs
                minBack={filters.minYear}
                maxBack={filters.maxYear}
                sentValues={handleChangeVehicleYear}
              />
              <div className="px-4">
                <Slider
                  getAriaLabel={() => "year"}
                  value={valueYear}
                  onChange={handleChangeVehicleYear}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetextYear}
                  step={1}
                  min={valuesInvBuilder.minYear ?? 1960}
                  max={valuesInvBuilder.maxYear ?? 2023}
                />
              </div>
            </div>
          </div>

          <Box sx={{ width: "100%", borderBottom: "2px solid lightgray" }}>
            <div className="bg-slate-50 pt-2 px-4 rounded-xl flex flex-col">
              <div className="flex justify-between">
                <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                  Price
                </h1>
                <h2 className="text-xs mb-3 font-bold text-[#586283]">
                  <span className="font-medium">{`$ ${changeCurrencyFormat(
                    valueDealerPrice[0]
                  )} - $ ${changeCurrencyFormat(valueDealerPrice[1])}`}</span>
                </h2>
              </div>
              <StaticInputs
                minBack={filters.minDealerPrice}
                maxBack={filters.maxDealerPrice}
                sentValues={handleChangeDealerPrice}
              />
              <div className="px-4">
                <Slider
                  getAriaLabel={() => "price"}
                  value={valueDealerPrice}
                  onChange={handleChangeDealerPrice}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetextDealerPrice}
                  step={100}
                  min={+valuesInvBuilder.minDealerPrice ?? 0}
                  max={+valuesInvBuilder.maxDealerPrice ?? 100000}
                />
              </div>
            </div>
            <div className="bg-slate-50 px-4 rounded-xl flex flex-col">
              <div className="flex justify-between">
                <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                  Mileage
                </h1>
                <h2 className="text-xs mb-3 font-bold text-[#586283]">
                  <span className="font-medium">{`${changeCurrencyFormat(
                    valueMileage[0]
                  )} - ${changeCurrencyFormat(valueMileage[1])}`}</span>
                </h2>
              </div>
              <StaticInputs
                sentValues={handleChangeMileage}
                minBack={filters.minMileage}
                maxBack={filters.maxMileage}
              />
              <div className="px-4">
                <Slider
                  getAriaLabel={() => "mileage"}
                  value={valueMileage}
                  onChange={handleChangeMileage}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetextMileage}
                  step={100}
                  min={valuesInvBuilder.minMileage ?? 0}
                  max={valuesInvBuilder.maxMileage ?? 150000}
                />
              </div>
            </div>
          </Box>
          <div className="bg-slate-50 pt-2 px-4  flex flex-col border-b-2">
            <div className="flex justify-between">
              <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                Image Count
              </h1>
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">{`${valueImageCount[0]} - ${valueImageCount[1]}`}</span>
              </h2>
            </div>
            <StaticInputs
              min={filters.minImageCount}
              max={filters.maxImageCount}
              sentValues={handleChangeImageCount}
            />
            <div className="px-4">
              <Slider
                getAriaLabel={() => "imageCount"}
                value={valueImageCount}
                onChange={handleChangeImageCount}
                valueLabelDisplay="auto"
                getAriaValueText={valuetextImageCount}
                step={1}
                min={valuesInvBuilder.minImageCount ?? 0}
                max={valuesInvBuilder.maxImageCount ?? 60}
              />
            </div>
          </div>
          {/* <div className="bg-slate-50 pt-2 px-4  flex flex-col border-b-2">
            <h1 className="font-bold text-[#586283] text-[12px] mb-0">Views</h1>
            <h2 className="text-xs mb-3 font-bold text-[#586283]">
              <span className="font-medium">{`${valueViews[0]} - ${valueViews[1]}`}</span>
            </h2>
            <div className="px-4">
              <Slider
                getAriaLabel={() => "views"}
                value={valueViews}
                onChange={handleChangeViews}
                valueLabelDisplay="auto"
                getAriaValueText={valuetextViews}
                step={100}
                min={valuesInvBuilder.minViews ?? 0}
                max={valuesInvBuilder.maxViews ?? 6000}
              />
            </div>
          </div> */}
        </ThemeProvider>
      </div>
    </>
  )
}

export default FilterModuleStatic
