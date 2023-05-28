import axios from "axios"
import React, { useEffect, useState, useMemo } from "react"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../../atoms/DealerAtom"
import { primeConsultant } from "../../atoms/primeConsultant.js"
import check from "../../assets/images/check.svg"
import Support from "./Support"
import CollapsingButton from "../../components/Fields/CollapsingButton"
import { CollapseRightBar } from "../../atoms/SideBars"

import supportIcon from "../../assets/images/reset.png"

export default function Connect() {
  const [users, setUsers] = useState([])
  const [dealerGroups, setDealerGroups] = useState([])
  const [userID, setUserID] = useState(0)
  const [dealerInfoValue, setDealerInfoValue] = useRecoilState(dealerInfo)
  const [dealerConnections, setDealerConnections] = useState({
    crmCompanyID: dealerInfoValue.crmCompanyID,
    googleAnalyticsGTMID: dealerInfoValue.googleAnalytics_GTM_ID,
    webStreamID: dealerInfoValue.webStreamID,
    dashThisURL: dealerInfoValue.dashThisURL,
    dealerVaultID: dealerInfoValue.rooftopID,
    fbPageID: dealerInfoValue.fb_page_id,
  })
  const [success, setSuccess] = useState(false)
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const [, setPrimeCon] = useRecoilState(primeConsultant)
  const [dealerGroupID, setDealerGroupID] = useState(
    dealerInfoValue.dealerGroup.dealerGroupID
  )

  const rols = ["Business", "Business Free"]

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Users`)
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDealerConnections({ ...dealerConnections, [name]: value })
  }
  const submit = () => {
    const formData = new FormData()
    formData.append("DealerID", dealerInfoValue.dealerID)
    formData.append("CrmCompanyID", dealerConnections.crmCompanyID)
    formData.append(
      "GoogleAnalytics_GTM_ID",
      dealerConnections.googleAnalyticsGTMID
    )
    formData.append("WebStreamID", dealerConnections.webStreamID)
    formData.append("DashThisURL", dealerConnections.dashThisURL)
    formData.append("RoofTopID", dealerConnections.dealerVaultID)
    formData.append("ProgramID", "DVV01397")
    formData.append("fb_page_id", dealerConnections.fbPageID)
    axios
      .patch(`${process.env.REACT_APP_API_DOMG}Dealers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 10000)
        }
      })
      .catch((error) => console.log(error))
  }

  const getDealerGroups = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}DealerGroups`)
      .then((res) => setDealerGroups(res.data))
      .catch((error) => console.log(error))
  }

  const updatePrimeConsultant = (userID) => {
    const updatePrime = {
      dealer_id: dealerInfoValue.dealerID,
      user_id: userID,
    }

    axios
      .patch(
        `${process.env.REACT_APP_API_DOMG_NODE}dealers/primary-consultant/`,
        updatePrime
      )
      .then((response) => {
        if (response.status !== 200) {
          alert("Error updating primary consultant")
        } else {
          setPrimeCon(response.data)
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

  useEffect(() => {
    getUsers()
    getDealerGroups()
  }, [])

  const handleConnectDealerGroup = () => {
    const formData = new FormData()
    formData.append("DealerID", dealerInfoValue.dealerID)
    formData.append("DealerGroupID", dealerGroupID)
    formData.append("BusinessName", dealerInfoValue.businessName)
    formData.append("Address", dealerInfoValue.address)
    formData.append("Address2", dealerInfoValue.address2)
    formData.append("City", dealerInfoValue.city)
    formData.append("ZipCode", dealerInfoValue.zipCode)
    formData.append("State", dealerInfoValue.state)
    formData.append("BusinessLogo", dealerInfoValue.businessLogoUrl)
    formData.append("ProfileStatus", dealerInfoValue.profileStatus)
    formData.append("CrmCompanyID", dealerInfoValue.crmCompanyID)
    formData.append("TierLevel", dealerInfoValue.tierLevel)
    formData.append("CrmCompanyUrl", dealerInfoValue.crmCompanyUrl)
    axios
      .patch(`${process.env.REACT_APP_API_DOMG}Dealers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Error updating dealer")
        } else {
          setDealerInfoValue(response.data)
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
          }, 10000)
        }
      })
      .catch((error) => console.log(error))
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return !user.role.roleName.includes(rols)
    })
  }, [users])

  return (
    <div className="flex bg-[#F5F9FF] rounded-xl">
      <div className="grid col-span-5 2xl:text-[14px] text-[12px] rounded-l-xl p-4 w-[83%] grow">
        {success ? (
          <div className="flex w-full justify-center">
            <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
              <img className="mx-2 pt-[4px] h-[85%]" src={check} alt="check" />
              <h3 className="text-white font-bold text-[15px]">
                Your connection was saved successfully.
              </h3>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col items-center justify-start">
          <div className="grid grid-cols-12 mb-[12px] w-full items-center">
            <h3 className="grid col-span-1 font-bold text-[#586283]">
              Platform ID:
            </h3>
            <h4 className="grid col-span-11 ml-[15px]">9380008811</h4>
          </div>
          <h3 className="font-bold text-[#586283] text-[20px] my-[20px]">
            Connect This Profile
          </h3>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              QuickBooks Account #
            </h3>
            <select className="rounded-xl w-[400px] p-[16px] focus:outline-[#58628325] ml-[15px] focus:border-none">
              <option value="" selected="selected">
                Select a QuickBooks Account #
              </option>
            </select>
          </div>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              HubSpot Company ID #
            </h3>
            <input
              className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]"
              name="crmCompanyID"
              onChange={handleChange}
              value={
                dealerConnections.crmCompanyID
                  ? dealerConnections.crmCompanyID
                  : ""
              }
            ></input>
          </div>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              Google Analytics GTM ID
            </h3>
            <input
              className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]"
              name="googleAnalyticsGTMID"
              onChange={handleChange}
              value={
                dealerConnections.googleAnalyticsGTMID
                  ? dealerConnections.googleAnalyticsGTMID
                  : ""
              }
            ></input>
          </div>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              Web Stream ID
            </h3>
            <input
              className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]"
              name="webStreamID"
              onChange={handleChange}
              value={
                dealerConnections.webStreamID
                  ? dealerConnections.webStreamID
                  : ""
              }
            ></input>
          </div>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              Facebook Page ID #
            </h3>
            <input
              name="fbPageID"
              onChange={handleChange}
              value={
                dealerConnections.fbPageID ? dealerConnections.fbPageID : ""
              }
              className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]"
            ></input>
          </div>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              DashThis URL
            </h3>
            <input
              className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]"
              name="dashThisURL"
              onChange={handleChange}
              value={
                dealerConnections.dashThisURL
                  ? dealerConnections.dashThisURL
                  : ""
              }
            ></input>
          </div>
          <div className="grid grid-cols-12 mb-[12px] justify-start w-full items-center">
            <h3 className="grid col-span-2 font-bold text-[#586283]">
              DealerVault ID #
            </h3>
            <input
              name="dealerVaultID"
              onChange={handleChange}
              value={
                dealerConnections.dealerVaultID
                  ? dealerConnections.dealerVaultID
                  : ""
              }
              className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]"
            ></input>
          </div>
          <div className="flex flex-row mb-[12px] justify-center w-full">
            <button
              onClick={submit}
              className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="">
          <h3 className="font-bold text-[#586283] text-[20px] my-[20px]">
            Connect to a Dealer Group profile:
          </h3>
          <div className="flex flex-row items-center justify-around w-[800px] space-y-6">
            <h3>Dealer Group</h3>
            <select
              onChange={(e) => setDealerGroupID(e.target.value)}
              value={dealerGroupID}
              className="rounded-xl w-[400px] p-[16px] focus:outline-[#58628325] ml-[15px] focus:border-none"
            >
              {dealerGroups.map((dealergroup) => (
                <option
                  value={dealergroup.dealerGroupID}
                  key={dealergroup.dealerGroupID}
                >
                  {`${dealergroup.dealerGroupName} - ${dealergroup.dealerGroupID}`}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col justify-center items-center my-[12px] space-y-4">
            <button
              onClick={handleConnectDealerGroup}
              className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
            >
              Submit
            </button>
            <h3 className="underline cursor-pointer">
              Bulk Dealership to Dealer Group Connections
            </h3>
          </div>
        </div>
        <div className="">
          <h3 className="font-bold text-[#586283] text-[20px] my-[20px]">
            Connect To Staff
          </h3>
          <div className="flex flex-row items-center justify-around w-[800px] space-y-6">
            <h3>Primary Dealer Consultant</h3>
            <select
              onChange={(e) => {
                setUserID(e.target.value)
                updatePrimeConsultant(+e.target.value)
              }}
              value={userID}
              className="rounded-xl w-[400px] p-[16px] focus:outline-[#58628325] ml-[15px] focus:border-none"
            >
              {filteredUsers.map((user) => (
                <option value={user.userID} key={user.userID}>
                  {`${user.firstName} ${user.lastName} - ${user.email}`}
                </option>
              ))}
            </select>
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
          <Support />
        </div>
      )}
    </div>
  )
}
