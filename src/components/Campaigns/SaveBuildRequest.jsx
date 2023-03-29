import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import {
  filterInventoryBuilder,
  amountSets,
  resultValuesInvBuilder,
} from "../../atoms/InventoryBuilderAtom.js"
import { defaultResultModule } from "../../util/defaultFilterValuesCampaigns"
import { dealerInfo } from "../../atoms/DealerAtom.js"
import LoadingSpinner from "../../components/Fields/LoadingSpinner"

function SaveBuildRequest() {
  const [preset, setPreset] = useState("empty")
  const [amountPresets] = useRecoilState(amountSets)
  const [filters] = useRecoilState(filterInventoryBuilder)
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const [savePreset, setSavePreset] = useState(false)
  const [dealerPresets, setDealerPresets] = useState([])
  const setResultFilter = useRecoilState(resultValuesInvBuilder)[1]

  const resetFilterStatus = () => {
    setResultFilter(defaultResultModule)
  }

  const getPresets = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/presets/list/dealer/${dealerInfoValue.dealerID}`
      )
      .then((response) => {
        if (response.status === 200) {
          const dealerPresetsTmp = response.data
          setDealerPresets(dealerPresetsTmp)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getPresets()
  }, [])

  const CSVDownloadAllInventory = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}RecordsFromMaster/${dealerInfoValue.random_id}`,
        {
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement("a")
          link.href = url
          link.setAttribute(
            "download",
            `All_Inventory_${dealerInfoValue.businessName.replaceAll(
              " ",
              "_"
            )}_${new Date()
              .toISOString()
              .split("T")[0]
              .replaceAll("-", "_")}.csv`
          )
          document.body.appendChild(link)
          link.click()
        }
      })
      .catch((error) => console.log(error))
  }

  const handleSumbmit = () => {
    setSavePreset(true)
    resetFilterStatus()
    const existPreset = dealerPresets.find(
      (dealerPreset) => dealerPreset.name === preset
    )
    if (existPreset) {
      axios
        .put(
          `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/presets/${existPreset.id}`,
          {
            ...filters,
            makeList: filters.makeList.map((make) => make.toUpperCase()),
            modelList: filters.modelList.map((model) => model.toUpperCase()),
            destination: preset.includes("Facebook") ? "fb" : "ms",
            dealerId: dealerInfoValue.dealerID,
          }
        )
        .then(() => {
          setTimeout(() => {
            setSavePreset(false)
          }, 3000)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .post(`${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/presets`, {
          ...filters,
          makeList: filters.makeList.map((make) => make.toUpperCase()),
          modelList: filters.modelList.map((model) => model.toUpperCase()),
          dealerId: dealerInfoValue.dealerID,
          destination: preset.includes("Facebook") ? "fb" : "ms",
        })
        .then((response) => {
          if (response.status === 200) {
            setTimeout(() => {
              getPresets()
              setSavePreset(false)
            }, 3000)
          }
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <>
      {
        <div className="flex flex-col mt-4 bg-[#48578F] p-[20px] rounded-[12px]">
          <h1 className="font-bold mb-2 text-[#FFFFFF]">
            Save To Outbound Inventory
          </h1>
          <h3 className="font-medium mb-2 text-[#FFFFFF]">
            Save Filtered set for
            <br />
            current and future Campaigns
          </h3>
          <select
            onChange={(e) => setPreset(e.target.value)}
            value={preset}
            className="rounded-xl w-full mb-4 px-[16px] py-[8px] focus:outline-[#58628325] focus:border-none"
          >
            <option value="empty">Select Format</option>
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
            onClick={handleSumbmit}
            className="mb-4 w-full text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
          >
            {!savePreset ? (
              <svg
                className="w-6 h-6 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            ) : (
              <LoadingSpinner size={5} />
            )}
            <p>{!savePreset ? "Submit" : "Preset saving"}</p>
          </button>
          <div className="px-4 flex flex-col">
            <h3 className="font-bold text-white text-[17px] my-4">Exclude</h3>
            <div className="flex items-center mb-4">
              <input
                id="limiter"
                type="checkbox"
                checked={true}
                value=""
                className="w-4 h-4 text-[#298FC2] bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="limiter"
                className="ml-2 text-sm font-medium text-white dark:text-gray-300"
              >
                Two images or less
              </label>
            </div>
          </div>
          <div className="px-4 flex flex-col">
            <h3 className="font-bold text-white text-[17px] mt-2">
              Inventory Control
            </h3>
            <div className="flex flex-col">
              <div className="flex my-4">
                <input
                  id="limiter"
                  type="checkbox"
                  checked={true}
                  value=""
                  className="w-4 h-4 text-[#298FC2] bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="limiter"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  View Limiter
                </label>
              </div>
              <div className="flex">
                <input
                  id="limiter"
                  type="checkbox"
                  checked={true}
                  value=""
                  className="w-4 h-4 text-[#298FC2] bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="limiter"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  Dynamic Replenish
                </label>
              </div>
            </div>
          </div>{" "}
          <button
            type="button"
            onClick={CSVDownloadAllInventory}
            className="mt-4 w-full text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
          >
            <svg
              data-accordion-icon
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              ></path>
            </svg>
            <p>All Inventory </p>
          </button>
        </div>
      }
    </>
  )
}

export default SaveBuildRequest
