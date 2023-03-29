import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useRecoilState } from "recoil"
import { dealerInfo } from "../../atoms/DealerAtom.js"
import {
  filterSoldTable,
  refreshSold,
  valuesSoldTable,
} from "../../atoms/SoldTableAtom"
import { defaultFilterSold } from "../../util/defaultFilterValuesCampaigns"
import CollapsingButton from "../../components/Fields/CollapsingButton"
import VehMakeModelFilter from "./VehMakeModelFilter.jsx"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRangePicker } from "react-date-range"
import { changeCurrencyFormat } from "../../util/changeFormat.js"
import VehStyleFilter from "./VehStyleFilter.jsx"

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

function valuetextImageCount(value) {
  return `${value}`
}

function valuetextYear(value) {
  return `${value}`
}

const FilterModuleSold = () => {
  const [filters, setFilters] = useRecoilState(filterSoldTable)
  const [refresh, setRefresh] = useRecoilState(refreshSold)
  const [value, setValue] = useState([0, 70])
  const [makes, setMakes] = useState([])
  const [models, setModels] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showModalCalendar, setShowModalCalendar] = useState(false)
  const [valueDealerPrice, setValueDealerPrice] = useState([0, 100000])
  const [valueYear, setValueYear] = useState([1960, 2023])
  const [valueMileage, setValueMileage] = useState([0, 150000])
  const [valueImageCount, setValueImageCount] = useState([0, 60])
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const setSelectedStyle = useState([])[1]
  const [type, setType] = useState([])
  const [status, setStatus] = useState([])
  const valuesInvBuilder = useRecoilState(valuesSoldTable)[0]
  const filtersDefault = defaultFilterSold
  const [renderType, setRenderType] = useState(false)
  const [renderStatus, setRenderStatus] = useState(false)
  const [days, setDays] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ])
  const [showStyleModal, setShowStyleModal] = useState(false)

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

  const handleChangeStatus = (event) => {
    if (event.target.checked) {
      setStatus((prevState) => [...prevState, +event.target.value])
    } else {
      setStatus((prevState) =>
        prevState.filter((value) => value !== +event.target.value)
      )
    }
    setRenderStatus(true)
  }

  function GetFormattedDate(today) {
    const day = String(today.getDate()).padStart(2, "0")
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const year = today.getFullYear()
    return year + "/" + month + "/" + day
  }

  const resetFilters = () => {
    setFilters(filtersDefault)
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
    setSelectedStyle(filtersDefault.vehicleStyleList ?? [])
    setType(filtersDefault.typeList ?? [])
    setMakes([])
    setModels([])
    setValueImageCount([
      filtersDefault.minImageCount ?? 0,
      filtersDefault.maxImageCount ?? 60,
    ])
    setValueYear([
      filtersDefault.minYear ?? 1960,
      filtersDefault.maxYear ?? 2023,
    ])
    setStatus(filtersDefault.recordStatus ?? [1, 2])
    setDays([
      {
        startDate: new Date(filtersDefault.minDateSold) || new Date(),
        endDate:
          new Date(filtersDefault.maxDateSold) ||
          new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        key: "selection",
      },
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
  }

  const handleChangeDealerPrice = (event, newValue) => {
    setValueDealerPrice(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
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
  }

  const handleChangeImageCount = (event, newValue) => {
    setValueImageCount(newValue)
    setRefresh(!refresh)
    setFilters({
      ...filters,
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
  }

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
    setValueImageCount([
      valuesInvBuilder.minImageCount ?? 0,
      valuesInvBuilder.maxImageCount ?? 60,
    ])
    setValueYear([
      valuesInvBuilder.minYear ?? 1960,
      valuesInvBuilder.maxYear ?? 2023,
    ])
    setStatus(valuesInvBuilder.recordStatus ?? [2, 3])
    setDays([
      {
        startDate: new Date(valuesInvBuilder.minDateSold) || new Date(),
        endDate:
          new Date(valuesInvBuilder.maxDateSold) ||
          new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        key: "selection",
      },
    ])
  }, [valuesInvBuilder])

  useEffect(() => {
    if (renderType) {
      setFilters({
        ...filters,
        typeList: type,
      })
      setRenderType(false)
      setRefresh(!refresh)
    }
  }, [renderType])

  useEffect(() => {
    if (renderStatus) {
      setFilters({
        ...filters,
        recordStatus: status,
      })
      setRenderStatus(false)
      setRefresh(!refresh)
    }
  }, [renderStatus])

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
              view={"sold"}
            />
          </div>
        </div>
      </div>
    )
  }

  const modalCalendar = () => {
    return (
      <div
        id="calendarModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showModalCalendar ? "" : "hidden"
        } overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-auto flex items-center justify-center`}
      >
        <div className="relative p-4 w-fit h-full md:h-auto bg-white">
          <div className="flex flex-col items-center m-4">
            <DateRangePicker
              onChange={(item) => setDays([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={days}
              direction="horizontal"
            />
            <div className="flex justify-between w-full bg-white rounded-lg mt-4">
              <button
                className="bg-[#586283] text-white rounded-lg text-sm px-5 py-2.5 text-center mx-4 my-2"
                onClick={() => {
                  setDays([
                    {
                      key: "selection",
                      startDate: new Date(),
                      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                    },
                  ])
                }}
              >
                Reset
              </button>
              <button
                className="bg-[#298FC2] text-[#f9f9fa] rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
                onClick={() => {
                  setFilters({
                    ...filters,
                    minDateSold: GetFormattedDate(days[0].startDate),
                    maxDateSold: GetFormattedDate(days[0].endDate),
                  })
                  setRefresh(!refresh)
                  setShowModalCalendar(false)
                }}
              >
                Submit
              </button>
              <button
                className="bg-[#586283] text-white rounded-lg text-sm px-5 py-2.5 text-center mx-4 my-2"
                onClick={() => {
                  setShowModalCalendar(false)
                }}
              >
                Close
              </button>
            </div>
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
                view="sold"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {modalSave()}
      {modalCalendar()}
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
        <button
          onClick={() => {
            setShowModalCalendar(true)
          }}
          className="my-2 bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          Date Range
        </button>

        <div className="bg-slate-50 py-0 px-4 flex flex-col border-b-2">
          <h3 className="font-bold text-[#586283] text-[12px] my-1">Status</h3>
          <div className="flex flex-col mb-4">
            {valuesInvBuilder.recordStatus?.find((value) => value === 3) && (
              <div className="flex m-2">
                <input
                  id={"sold"}
                  type="checkbox"
                  value={3}
                  checked={status.find((value) => value === 3)}
                  onChange={handleChangeStatus}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={"sold"}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  SOLD
                </label>
              </div>
            )}
            {valuesInvBuilder.recordStatus?.find((value) => value === 2) && (
              <div className="flex m-2">
                <input
                  id={"hold"}
                  type="checkbox"
                  value={2}
                  checked={status.find((value) => value === 2)}
                  onChange={handleChangeStatus}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={"hold"}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  HOLD
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-50 py-0 px-4 flex flex-col border-b-2">
          <h3 className="font-bold text-[#586283] text-[12px] my-1">Type</h3>
          <div className="flex flex-col mb-4">
            {valuesInvBuilder.typeList.map((item, index) => (
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
              <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                Days on Lot
              </h1>
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">{`${value[0]} - ${value[1]} Days`}</span>
              </h2>
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
            <button
              onClick={() => {
                setShowStyleModal(true)
              }}
              className="my-2 bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Style
            </button>
            <div className="bg-slate-50 pt-2 rounded-xl flex flex-col">
              <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                Year
              </h1>
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">{`${valueYear[0]} - ${valueYear[1]}`}</span>
              </h2>
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
              <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                Dealer Price
              </h1>
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">{`$ ${changeCurrencyFormat(
                  valueDealerPrice[0]
                )} - $ ${changeCurrencyFormat(valueDealerPrice[1])}`}</span>
              </h2>
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
              <h1 className="font-bold text-[#586283] text-[12px] mb-0">
                Mileage
              </h1>
              <h2 className="text-xs mb-3 font-bold text-[#586283]">
                <span className="font-medium">{`${changeCurrencyFormat(
                  valueMileage[0]
                )} - ${changeCurrencyFormat(valueMileage[1])}`}</span>
              </h2>
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
            <h1 className="font-bold text-[#586283] text-[12px] mb-0">
              Image Count
            </h1>
            <h2 className="text-xs mb-3 font-bold text-[#586283]">
              <span className="font-medium">{`${valueImageCount[0]} - ${valueImageCount[1]}`}</span>
            </h2>
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
        </ThemeProvider>
      </div>
    </>
  )
}

export default FilterModuleSold
