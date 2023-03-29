import React, { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../../atoms/DealerAtom"
import businessprofile from "../../assets/images/business-profile.svg"
import arrowright from "../../assets/images/arrow-right.png"
import useAuth from "../../Hooks/useAuth"

function BusinessProfile() {
  const [crmid, setCrmid] = React.useState("")
  const user = JSON.parse(localStorage.getItem("permissionsDealerOMG"))
  const [showModal, setShowModal] = React.useState(false)
  const [dealer, setDealer] = React.useState(false)
  const setDealerInfoValue = useRecoilState(dealerInfo)[1]
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const history = useNavigate()

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
    if (!authPermRols[2]) {
      history(-1)
      return null
    }
  }, [])

  const modalBusinessProfile = () => {
    const handleRedirect = () => {
      setDealerInfoValue(dealer)
      history("/business-settings/profile")
    }

    return (
      <div
        id="businessProfileModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          showModal ? null : "hidden"
        } overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="p-6 space-y-6 text-[#586283]">
              Platform profile with the same CRM Company ID, already exist.
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
              <button
                type="button"
                onClick={handleRedirect}
                className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              >
                Continue
              </button>
              <button
                data-modal-toggle="businessProfileModal"
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

  const findCRMId = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Dealers/ByCrmCompanyID/${crmid}`)
      .then((response) => {
        if (response.status === 200) {
          setDealer(response.data)
          setShowModal(true)
        } else {
          createDealerWithCrmCompanyID()
        }
      })
      .catch((error) => {
        console.log(error)
        createDealerWithCrmCompanyID()
      })
  }

  const createDealerWithCrmCompanyID = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG_NODE}dealers/random`)
      .then((response) => {
        if (response.status !== 200) {
          alert("Error creating random ID")
        } else {
          const formData = new FormData()
          formData.append("DealerGroupID", 1)
          formData.append("User", `new-user${crmid.toString()}@omg.com`)
          formData.append("Password", crmid.toString())
          formData.append("CrmCompanyID", crmid.toString())
          formData.append("random_id", response.data)
          axios
            .post(`${process.env.REACT_APP_API_DOMG}Dealers/`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.status !== 200) {
                alert("Error creating new dealer")
              } else {
                setDealerInfoValue(response.data)
                history("/business-settings/profile")
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createDealer = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG_NODE}dealers/random`)
      .then((response) => {
        if (response.status !== 200) {
          alert("Error creating random ID")
        } else {
          const formData = new FormData()
          formData.append("DealerGroupID", 1)
          formData.append("UserID", user.userID)
          formData.append("random_id", response.data)
          axios
            .post(`${process.env.REACT_APP_API_DOMG}Dealers/`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.status !== 200) {
                alert("Error creating new dealer")
              } else {
                setDealerInfoValue(response.data)
                history("/business-settings/profile")
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div
      className="flex flex-col mt-4 justify-center p-[20px] mb-4 text-sm text-white bg-[#48578F] rounded-lg"
      role="alert"
    >
      <div className="flex space-x-3 mb-4">
        <img
          src={businessprofile}
          alt="bussines profile"
          className="h-[20px] w-[18px]"
        />
        <h1 className="font-bold mb-2 text-white">Create Business Profile</h1>
      </div>
      <div className="flex flex-col justify-start items-center">
        <button
          type="button"
          onClick={createDealer}
          className="flex items-center justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center mb-2"
        >
          Go
          <img className="mx-2" src={arrowright} alt="arrow" />
        </button>
        <p className="mt-6">
          Optionally, enter the Company ID, to check if an account exist.
        </p>
        <div className="flex justify-between mt-4 mb-[10px] h-[48px] w-full">
          <input
            className="w-full px-4 py-2 text-black rounded-lg border-none text-sm focus:ring-[#58628325]"
            type="text"
            onChange={(e) => setCrmid(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={findCRMId}
          className="flex items-center justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2 text-center my-2"
        >
          Go
          <img className="mx-2" src={arrowright} alt="arrow" />
        </button>
        {modalBusinessProfile()}
      </div>
    </div>
  )
}

export default BusinessProfile
