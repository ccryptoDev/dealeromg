import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import axios from "axios"

import Support from "./Support"
import useAuth from "../../Hooks/useAuth"
import check from "../../assets/images/check.svg"
import alert from "../../assets/images/alert.svg"
import arrowup from "../../assets/images/arrowup.png"

import { dealerInfo } from "../../atoms/DealerAtom.js"
import { CollapseRightBar } from "../../atoms/SideBars"
import CollapsingButton from "../../components/Fields/CollapsingButton"

import supportIcon from "../../assets/images/reset.png"
import { numArray } from "../../util/makeNumberArray"

export default function AlertsControl() {
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  )
  const history = useNavigate()
  const [success, setSuccess] = useState(false)
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const porcentageArray = numArray(90, 10)
  // const daysArray = numArray(150, 10)

  const [alerts, setAlerts] = useState({
    dealerID: dealerInfoValue.dealerID,
    noImageUrl: 5,
    noImageUrlEmail: false,
    pageErrorTrakingEmail: false,
    urlValidationEmail: false,
    agingFileEmail: false,
    recordCountTreshold: 5,
    recordCountTresholdEmail: false,
    dolOverAverage: 10,
    dolOverAverageEmail: false,
  })

  const getAlertStatusFromDealer = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_DOMG}api/AlertParameters/${dealerInfoValue.dealerID}`
      )
      const {
        noImageUrl,
        noImageUrlEmail,
        pageErrorTrakingEmail,
        urlValidationEmail,
        agingFileEmail,
        recordCountTreshold,
        recordCountTresholdEmail,
        dolOverAverage,
        dolOverAverageEmail,
      } = res.data
      setAlerts({
        dealerID: dealerInfoValue.dealerID,
        noImageUrl,
        noImageUrlEmail,
        pageErrorTrakingEmail,
        urlValidationEmail,
        agingFileEmail,
        recordCountTreshold,
        recordCountTresholdEmail,
        dolOverAverage,
        dolOverAverageEmail,
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
    if (!authPermRols[2]) {
      history(-1)
      return null
    }
    getAlertStatusFromDealer()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setAlerts((alertsAct) => {
      return { ...alertsAct, [name]: value }
    })
  }

  const handleSubmit = () => {
    const modifyAlerts = {
      dealerID: dealerInfoValue.dealerID,
      noImageUrl: +alerts.noImageUrl,
      noImageUrlEmail: alerts.noImageUrlEmail,
      pageErrorTrakingEmail: alerts.pageErrorTrakingEmail,
      urlValidationEmail: alerts.urlValidationEmail,
      agingFileEmail: alerts.agingFileEmail,
      recordCountTreshold: +alerts.recordCountTreshold,
      recordCountTresholdEmail: alerts.recordCountTresholdEmail,
      dolOverAverage: +alerts.dolOverAverage,
      dolOverAverageEmail: alerts.dolOverAverageEmail,
    }
    axios
      .patch(
        `${process.env.REACT_APP_API_DOMG}api/AlertParameters/${dealerInfoValue.dealerID}`,
        modifyAlerts
      )
      .then((response) => {
        if (response.status !== 200) {
          alert("Error saving Alerts")
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
                Your alerts was saved successfully.
              </h3>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-2 gap-1 ">
          <div className="h-[40px] flex items-center">
            <h2 className="font-bold text-[#586283] text-[16px] mb-4">
              Control Alerts For This Dealer Profile
            </h2>
          </div>
          <div className="grid col-span-2 p-[20px] bg-white rounded-lg">
            <div className="grid grid-cols-3 mb-[12px] justify-start items-center">
              <h2 className="grid col-span-1 col-start-2 font-bold text-[#2D3032] text-[14px]">
                View in Platform
              </h2>
              <h2 className="grid col-span-1 font-bold text-[#2D3032] text-[14px]">
                Send Email
              </h2>
            </div>
            <div className="grid grid-cols-3 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px]">
                No Image URL
              </h3>
              <select
                className="grid col-span-1 w-[90%] rounded-xl p-[16px] focus:outline-[#58628325]"
                value={alerts.noImageUrl}
                name="noImageUrl"
                onChange={(event) => handleChange(event)}
              >
                {porcentageArray.map((opt) => (
                  <option value={opt} key={opt}>
                    {opt} %
                  </option>
                ))}
              </select>
              <select
                className="grid col-span-1 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325]"
                value={alerts.noImageUrlEmail}
                name="noImageUrlEmail"
                onChange={(event) => handleChange(event)}
              >
                <option value={true} selected="selected">
                  On
                </option>
                <option value={false}>Off</option>
              </select>
            </div>
            {/* <div className="grid grid-cols-3 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px]">
                Page Error Tracking
              </h3>
              <select
                className="grid col-span-1 col-start-3 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325]"
                value={alerts.pageErrorTrakingEmail}
                name="pageErrorTrakingEmail"
                onChange={(event) => handleChange(event)}
              >
                <option value={true} selected="selected">
                  On
                </option>
                <option value={false}>Off</option>
              </select>
            </div> */}
            {/* <div className="grid grid-cols-3 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px]">
                URL Validation
              </h3>
              <select
                className="grid col-span-1 col-start-3 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325]"
                value={alerts.urlValidationEmail}
                name="urlValidationEmail"
                onChange={(event) => handleChange(event)}
              >
                <option value={true} selected="selected">
                  On
                </option>
                <option value={false}>Off</option>
              </select>
            </div> */}
            {/* <div className="grid grid-cols-3 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px]">
                Aging File
              </h3>
              <select
                className="grid col-span-1 col-start-3 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325]"
                value={alerts.agingFileEmail}
                name="agingFileEmail"
                onChange={(event) => handleChange(event)}
              >
                <option value={true} selected="selected">
                  On
                </option>
                <option value={false}>Off</option>
              </select>
            </div> */}
            <div className="grid grid-cols-3 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px]">
                Record Count Threshold
              </h3>
              <select
                className="grid col-span-1 w-[90%] rounded-xl p-[16px] focus:outline-[#58628325]"
                value={alerts.recordCountTreshold}
                name="recordCountTreshold"
                onChange={(event) => handleChange(event)}
              >
                {porcentageArray.map((opt) => (
                  <option value={opt} key={opt}>
                    {opt} %
                  </option>
                ))}
              </select>
              <select
                className="grid col-span-1 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325]"
                value={alerts.recordCountTresholdEmail}
                name="recordCountTresholdEmail"
                onChange={(event) => handleChange(event)}
              >
                <option value={true} selected="selected">
                  On
                </option>
                <option value={false}>Off</option>
              </select>
            </div>
            {/* <div className="grid grid-cols-3 mb-[12px] pr-[20px] justify-start w-full items-center">
              <h3 className="grid col-span-1 font-bold text-[#586283] text-[16px]">
                DOL Over Average
              </h3>
              <select
                className="grid col-span-1 w-[90%] rounded-xl p-[16px] focus:outline-[#58628325]"
                value={alerts.dolOverAverage}
                name="dolOverAverage"
                onChange={(event) => handleChange(event)}
              >
                {daysArray.map((opt) => (
                  <option value={opt} key={opt}>
                    {opt} days
                  </option>
                ))}
              </select>
              <select
                className="grid col-span-1 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325]"
                value={alerts.dolOverAverageEmail}
                name="dolOverAverageEmail"
                onChange={(event) => handleChange(event)}
              >
                <option value={true} selected="selected">
                  On
                </option>
                <option value={false}>Off</option>
              </select>
            </div> */}
            <hr className="mb-4 rounded-xl border-2" />
            <div className="flex flex-row my-[6px] justify-center w-full">
              <button
                onClick={handleSubmit}
                className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              >
                Submit
                <img className="mx-2" src={arrowup} alt="arrow" />
              </button>
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
          <Support />
        </div>
      )}
    </div>
  )
}
