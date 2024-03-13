import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"

import check from "../../assets/images/check.svg"
import Support from "./Support"
import ResultsModule from "../Campaigns/ResultsModule"
import arrowup from "../../assets/images/arrowup.png"

import { dealerInfo } from "../../atoms/DealerAtom.js"
import { CollapseRightBar } from "../../atoms/SideBars"
import CollapsingButton from "../../components/Fields/CollapsingButton"

import supportIcon from "../../assets/images/reset.png"

export default function InventoryUrls() {
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const [success, setSuccess] = useState(false)
  const [crmCompanyID, setcrmCompanyID] = useState("")
  const [dataProvider, setDataProvider] = useState([])
  const [validUrls, setValidUrls] = useState({
    url1: "",
    url2: "",
    url3: "",
    isActive: false,
  })
  const [selectedProvider, setSelectedProvider] = useState()
  const [inventory, setInventory] = useState({
    dealerID: 1,
    dealerGroupID: 1,
    newUsedProvider: "",
    providerDealerExportUrlNU: "",
    newOnlyProvider: "",
    providerDealerExportUrlN: "",
    usedOnlyProvider: "",
    providerDealerExportUrlU: "",
    inventoryUrlFace: [""],
    inventoryUrlFacePreset: "",
    soldUrlFace: "",
    inventoryUrlMSFree: [""],
    soldUrlMSFree: "",
    inventoryUrlAll: "",
  })
  const [error, setError] = useState("")

  const getcrmCompanyID = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}Dealers/${dealerInfoValue.dealerID}`
      )
      .then((res) => setcrmCompanyID(res.data.crmCompanyID))
      .catch((error) => console.log(error))
  }

  const getFiles = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Files/${crmCompanyID}`)
      .then((res) => {
        setInventory({
          dealerID: res.data.dealer.dealerID,
          dealerGroupID: res.data.dealer.dealerGroupID,
          newUsedProvider: "",
          providerDealerExportUrlNU: "",
          newOnlyProvider: "",
          providerDealerExportUrlN: "",
          usedOnlyProvider: "",
          providerDealerExportUrlU: "",
          inventoryUrlFace: res.data.destinations.filter(
            (url) => url.destination_name.toLowerCase() === "facebook"
          ),
          inventoryUrlFacePreset: "",
          soldUrlFace: "",
          inventoryUrlMSFree: res.data.destinations.filter(
            (url) => url.destination_name.toLowerCase() === "microsoft"
          ),
          inventoryUrlMSFreePreset: "",
          soldUrlMSFree: "",
          inventoryUrlAll: res.data.destinations.filter(
            (url) => url.destination_name.toLowerCase() === "all inventory"
          )[0],
        })
      })
      .catch((error) => console.log(error))
  }

  const getDataProvider = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMG}DataProviders`
      )
      setDataProvider(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getValidUrls = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMG}api/AlertParameters/GetValidUrls?DealerID=${dealerInfoValue.dealerID}`
      )
      setValidUrls(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getcrmCompanyID()
    getDataProvider()
    getValidUrls()
    setSelectedProvider(dealerInfoValue.dataProviderID)
  }, [])

  useEffect(() => {
    if (crmCompanyID !== "") {
      getFiles()
    }
  }, [crmCompanyID])

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInventory((inventoryAct) => {
      return { ...inventoryAct, [name]: value }
    })
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append("DealerID", dealerInfoValue.dealerID)
    formData.append("DataProviderID", +selectedProvider)
    axios
      .patch(`${process.env.REACT_APP_API_DOMG}Dealers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Error saving data provider")
        } else {
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 10000)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSubmitValidUrls = () => {
    const HTTP_STRING = "http://"
    const WWW_STRING = "www."
    const DOT_STRING = "."
    const HTTPS_STRING = "https://"
    if (
      validUrls.url1.toLowerCase().includes(HTTP_STRING) ||
      validUrls.url2.toLowerCase().includes(HTTP_STRING) ||
      validUrls.url3.toLowerCase().includes(HTTP_STRING)
    ) {
      setError(
        "Form did not submit. The protocols HTTP or www text is not required. Use only the domain and path."
      )
      return
    }
    if (
      validUrls.url1.toLowerCase().includes(HTTPS_STRING) ||
      validUrls.url2.toLowerCase().includes(HTTPS_STRING) ||
      validUrls.url3.toLowerCase().includes(HTTPS_STRING)
    ) {
      setError(
        "Form did not submit. The protocols HTTPS or www text is not required. Use only the domain and path."
      )
      return
    }
    if (
      validUrls.url1.toLowerCase().includes(WWW_STRING) ||
      validUrls.url2.toLowerCase().includes(WWW_STRING) ||
      validUrls.url3.toLowerCase().includes(WWW_STRING)
    ) {
      setError(
        "Form did not submit. The protocols HTTP or www text is not required. Use only the domain and path."
      )
      return
    }
    if (
      (validUrls.url1 && !validUrls.url1.toLowerCase().includes(DOT_STRING)) ||
      (validUrls.url2 && !validUrls.url2.toLowerCase().includes(DOT_STRING)) ||
      (validUrls.url3 && !validUrls.url3.toLowerCase().includes(DOT_STRING))
    ) {
      setError(
        "Form did not submit. You’re missing a period in the domain address."
      )
      return
    }
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}api/AlertParameters/SetValidUrls`,
        { ...validUrls, dealerId: dealerInfoValue.dealerID }
      )
      .then((response) => {
        if (response.status !== 200) {
          alert("Error saving validations url")
        } else {
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 10000)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex bg-[#F5F9FF] rounded-xl">
      <div className="grid col-span-5 2xl:text-[14px] text-[12px] rounded-l-xl p-4 w-[83%] grow">
        {success ? (
          <div className="flex w-full justify-center">
            <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
              <img className="mx-2 pt-[4px] h-[85%]" src={check} alt="check" />
              <h3 className="text-white font-bold text-[15px]">
                Your inventory was saved successfully.
              </h3>
            </div>
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div className="flex w-full justify-center">
            <div className="bg-red-600 px-2 py-2 rounded-md flex justify-center mb-4 w-[550px]">
              <h3 className="text-white font-bold text-[15px]">{error}</h3>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-2 gap-4 mt-[20px]">
          <div className="h-[67px] flex flex-col items-start">
            <p className="text-[#586283] text-[12px]">Settings</p>
            <h2 className="font-bold text-[#586283] text-[20px]">
              Inventory Files
            </h2>
          </div>
          <div className="grid col-span-2 p-[20px] bg-[#EAEFF5] rounded-lg">
            <div className="h-[40px] flex items-center">
              <h2 className="font-bold text-[#586283] text-[16px]">
                Inbound Feed Source
              </h2>
            </div>
            <hr className="mb-4 rounded-xl border-2" />
            <div className="grid grid-cols-12 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-4 font-bold text-[#586283] text-[14px]">
                New & Used Provider
              </h3>
            </div>
            <div className="grid grid-cols-12 mb-[12px] pr-[20px] justify-start w-full items-center">
              <select
                className="grid col-span-4 rounded-xl w-[90%] focus:outline-[#58628325]"
                value={selectedProvider}
                name="newUsedProvider"
                onChange={handleProviderChange}
              >
                <option value="NA" selected="selected">
                  N/A
                </option>
                {dataProvider.map((provider) => (
                  <option
                    value={provider.dataProviderID}
                    key={provider.dataProviderID}
                  >
                    {provider.dataProviderName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row my-[12px] justify-center w-full">
              <button
                onClick={handleSubmit}
                className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              >
                Submit
                <img className="mx-2" src={arrowup} alt="arrow" />
              </button>
            </div>
            <hr className="mt-2 mb-4 rounded-xl border-2" />
            <div className="grid grid-cols-12 mt-[10px] justify-start w-full items-center gap-2">
              <div className="flex mb-4 col-span-12">
                <input
                  id="checkbox-valid-urls"
                  checked={validUrls.isActive}
                  onChange={() =>
                    setValidUrls({
                      ...validUrls,
                      isActive: !validUrls.isActive,
                    })
                  }
                  aria-describedby="checkbox-valid-urls"
                  type="checkbox"
                  className="w-4 h-4 bg-[#298fc217] text-[#298FC2] rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-[#298FC2] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checkbox-valid-urls"
                  className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Use VDP URL Validator
                </label>
              </div>
              {validUrls.isActive && (
                <>
                  <input
                    type="url"
                    value={validUrls.url1}
                    onChange={(event) =>
                      setValidUrls({ ...validUrls, url1: event.target.value })
                    }
                    className="grid col-span-12 rounded-xl w-full focus:border-none focus:outline-[#58628325]"
                  ></input>
                  <input
                    type="url"
                    value={validUrls.url2}
                    onChange={(event) =>
                      setValidUrls({ ...validUrls, url2: event.target.value })
                    }
                    className="grid col-span-12 rounded-xl w-full focus:border-none focus:outline-[#58628325]"
                  ></input>
                  <input
                    type="url"
                    value={validUrls.url3}
                    onChange={(event) =>
                      setValidUrls({ ...validUrls, url3: event.target.value })
                    }
                    className="grid col-span-12 rounded-xl w-full focus:border-none focus:outline-[#58628325]"
                  ></input>
                </>
              )}
            </div>
            <div className="flex flex-row my-[12px] justify-center w-full">
              <button
                onClick={handleSubmitValidUrls}
                className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              >
                Submit
                <img className="mx-2" src={arrowup} alt="arrow" />
              </button>
            </div>
          </div>
          <div className="grid col-span-2 p-[20px] bg-white rounded-lg">
            <div className="grid grid-cols-12 h-[40px] items-center">
              <h2 className="grid col-span-12 my-[15px] font-bold text-[#586283] text-[16px]">
                All Inventory Outbound CSV File
              </h2>
              <hr className="grid col-span-12 mb-4 rounded-xl border-2" />
            </div>
            <div className="grid grid-cols-12 mt-[35px] justify-start w-full items-center">
              <h3 className="grid col-span-12 text-[#586283] text-[14px]">
                Inventory File for all
              </h3>
              <input
                type="url"
                disabled
                value={inventory.inventoryUrlAll.file}
                className="grid col-span-12 rounded-xl w-full focus:border-none focus:outline-[#58628325]"
              ></input>
            </div>
          </div>
          <div className="grid col-span-2 p-[20px] bg-white rounded-lg">
            <div className="grid grid-cols-12 h-[40px] items-center">
              <h2 className="grid col-span-12 my-[15px] font-bold text-[#586283] text-[16px]">
                Facebook Outbound CSV File
              </h2>
              <hr className="grid col-span-12 mb-4 rounded-xl border-2" />
            </div>
            {inventory.inventoryUrlFace.map((link, index) => {
              if (index > 0) {
                return (
                  <React.Fragment key={`face-${index + 1}`}>
                    <div className="grid grid-cols-12 justify-start mt-[35px] w-full items-center">
                      <h3 className="grid col-span-8 text-[#586283] text-[14px]">
                        Inventory File for Facebook {index}
                      </h3>
                    </div>
                    <div className="grid grid-cols-12 w-full">
                      <input
                        type="url"
                        disabled
                        value={link.file}
                        className="grid col-span-8 rounded-xl w-[150%] focus:border-none focus:outline-[#58628325]"
                      ></input>
                    </div>
                  </React.Fragment>
                )
              }
              return null
            })}
            <div className="grid grid-cols-12 mt-[25px] justify-start w-full items-center">
              <h3 className="grid col-span-12 text-[#586283] text-[14px]">
                Sold File for Facebook
              </h3>
              <input
                type="url"
                name="soldUrlFace"
                onChange={(event) => handleChange(event)}
                value=""
                className="grid col-span-12 rounded-xl focus:border-none focus:outline-[#58628325]"
              ></input>
            </div>
          </div>
          <div className="grid col-span-2 p-[20px] bg-white rounded-lg">
            <div className="grid grid-cols-12 h-[40px] items-center">
              <h2 className="grid col-span-12 my-[15px] font-bold text-[#586283] text-[16px]">
                Microsoft Free Listing Outbound CSV File
              </h2>
              <hr className="grid col-span-12 mb-4 rounded-xl border-2" />
            </div>
            {inventory.inventoryUrlMSFree.map((link, index) => {
              return (
                <React.Fragment key={`ms-${index + 1}`}>
                  <div className="grid grid-cols-12 justify-start mt-[35px] w-full items-center">
                    <h3 className="grid col-span-8 text-[#586283] text-[14px]">
                      Inventory File for MS Free {index + 1}
                    </h3>
                  </div>
                  <div className="grid grid-cols-12 w-full">
                    <input
                      type="url"
                      disabled
                      value={link.file}
                      className="grid col-span-8 rounded-xl w-[150%] focus:border-none focus:outline-[#58628325]"
                    ></input>
                  </div>
                </React.Fragment>
              )
            })}
            <div className="grid grid-cols-12 mt-[25px] justify-start w-full items-center">
              <h3 className="grid col-span-12 text-[#586283] text-[14px]">
                Sold File for MS Free
              </h3>
              <input
                type="url"
                name="soldUrlMSFree"
                onChange={(event) => handleChange(event)}
                value={inventory.soldUrlMSFree}
                className="grid col-span-12 rounded-xl focus:border-none focus:outline-[#58628325]"
              ></input>
            </div>
          </div>
        </div>
      </div>
      {rightMenuCollapse ? (
        <div className="flex flex-col">
          <CollapsingButton side="right" />
          <div className="flex items-center justify-center w-[48px] h-[48px]">
            <img src={supportIcon} alt="support" />
          </div>
        </div>
      ) : (
        <div className="p-2 2xl:text-[14px] text-[12px] rounded-r-xl bg-[#FFFFFF] w-[17%]">
          <CollapsingButton side="right" />
          <ResultsModule />
          <Support />
        </div>
      )}
    </div>
  )
}
