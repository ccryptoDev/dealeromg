import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import axios from "axios"

import {
  filtersValuesStateCB,
  recordCountValuesStateCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
} from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"

import check from "../../assets/images/check.svg"
import useAuth from "../../Hooks/useAuth"

function SaveBuildRequest() {
  const authPermRolsGB = useAuth([""], false, ["super-admin", "admin"], true)
  const authPermRolsUB = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const authPermRolsDB = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const history = useNavigate()
  const [filterValues] = useRecoilState(filtersValuesStateCB)
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const [recordRequest] = useRecoilState(recordCountValuesStateCB)
  const [sqlQuerySales] = useRecoilState(FinalWhereClsCBSale)
  const [sqlQueryService] = useRecoilState(FinalWhereClsCBService)
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preset, setPreset] = useState({
    name: null,
    type: null,
    tag: "General",
  })

  const modalSave = () => {
    const handleChange = (event) => {
      const { name, value } = event.target
      setPreset({ ...preset, [name]: value })
    }

    return (
      <div
        id="saveBuildModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showModal ? null : "hidden"
        } overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-auto flex items-center justify-center`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <div className="p-6 space-y-6">
              {success ? (
                <div className="flex w-full justify-center">
                  <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
                    <img
                      className="mx-2 pt-[4px] h-[85%]"
                      src={check}
                      alt="check"
                    />
                    <h3 className="text-white font-bold text-[15px]">
                      The build request was saved successfully.
                    </h3>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="grid grid-cols-3 w-full items-center justify-center">
                <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px] mb-1">
                  Build Name
                </h3>
                <input
                  name="name"
                  onChange={(event) => handleChange(event)}
                  value={preset.name}
                  placeholder="Build Name"
                  className="grid col-span-2 rounded-xl w-full p-[16px] border-[1px] border-black focus:outline-[#58628325] ml-[15px]"
                />
              </div>
              <div className="grid grid-cols-3 w-full items-center justify-center">
                <h3 className="col-span-1 font-bold text-[#586283] text-[16px] mb-1">
                  Location
                </h3>
                <select
                  name="type"
                  onChange={(event) => handleChange(event)}
                  value={preset.type}
                  placeholder="Location"
                  className="grid col-span-2 rounded-xl w-full px-[16px] py-[8px] focus:outline-[#58628325] ml-[15px] focus:border-none"
                >
                  {authPermRolsUB[2] && <option value={1}>User Builds</option>}
                  {authPermRolsDB[2] && (
                    <option value={3}>Dealer Builds</option>
                  )}
                  {authPermRolsGB[2] && (
                    <option value={4}>Global Builds</option>
                  )}
                </select>
              </div>
              <div className="grid grid-cols-3 w-full items-center justify-center">
                <h3 className="col-span-1 font-bold text-[#586283] text-[16px] mb-1">
                  Category
                </h3>
                <select
                  name="tag"
                  onChange={(event) => handleChange(event)}
                  value={preset.tag}
                  placeholder="Tag"
                  className="grid col-span-2 rounded-xl w-full px-[16px] py-[8px] focus:outline-[#58628325] ml-[15px] focus:border-none"
                >
                  <option>General</option>
                  <option>Credit / Finance</option>
                  <option>Service</option>
                  <option>New</option>
                  <option>Recruitment</option>
                  <option>Used</option>
                  <option>Trade</option>
                  <option>OEM (Global only)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = () => {
    let presetType = {
      presetTypeID: 1,
      presetTypeName: "User Only",
    }
    if (preset.type === "3") {
      presetType = {
        presetTypeID: 3,
        presetTypeName: "Dealers",
      }
    }
    if (preset.type === "4") {
      presetType = {
        presetTypeID: 4,
        presetTypeName: "Global",
      }
    }
    const user = JSON.parse(localStorage.getItem("permissionsDealerOMG"))
    axios
      .post(`${process.env.REACT_APP_API_DOMG}/api/Presets`, {
        dealerID:
          presetType.presetTypeName === "User Only"
            ? user.userID
            : dealerInfoValue.dealerID,
        presetType,
        presetName: preset.name,
        tags: [
          preset.tag,
          "CUSTOMER",
          filterValues.zipCodeCenter && filterValues.zipCodeRadius
            ? `Zip Code ${filterValues.zipCodeCenter} - Miles ${filterValues.zipCodeRadius}`
            : "",
        ],
        recordRequest: JSON.stringify(recordRequest),
        filterValues: JSON.stringify(filterValues),
        sqlQueryService: JSON.stringify(sqlQueryService),
        sqlQuerySales: JSON.stringify(sqlQuerySales),
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
            setShowModal(false)
          }, 3500)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!authPermRolsUB[0]) {
      history("/login")
      return null
    }
  }, [])

  return (
    <>
      {authPermRolsUB[2] ? (
        <div className="flex flex-col mt-4 bg-[#48578F] p-[20px] rounded-[12px]">
          {modalSave()}
          <h1 className="font-bold mb-2 text-[#FFFFFF]">Save Build Request</h1>
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="mb-4 text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
          >
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
            <p>Open</p>
          </button>
        </div>
      ) : null}
    </>
  )
}

export default SaveBuildRequest
