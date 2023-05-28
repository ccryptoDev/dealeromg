import React, { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"

import EnhancedTable from "../../components/AdminPanel/EnhancedTable"
import Support from "./Support"
import check from "../../assets/images/check.svg"
import alert from "../../assets/images/alert.svg"

import { dealerInfo } from "../../atoms/DealerAtom.js"
import { CollapseRightBar } from "../../atoms/SideBars"
import CollapsingButton from "../../components/Fields/CollapsingButton"

import supportIcon from "../../assets/images/reset.png"

export default function Alerts() {
  const [successClear, setSuccessClear] = useState(false)
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const [resentAlerts, setResentAlerts] = useState([])
  const [historicalAlerts, setHistoricalAlerts] = useState([])

  const changeString = (string) => {
    const newStr = string.replaceAll("_", " ").replaceAll("-", " ")
    const arr = newStr.split(" ")
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    const str2 = arr.join(" ")
    return str2
  }

  const changeDateFormat = (date) => {
    const newFormat = new Date(date)

    const pst = newFormat.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })

    return pst
  }

  const getAlertLog = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}api/Alerts/Get?DealerID=${dealerInfoValue.dealerID}`
      )
      .then((res) => {
        const historicalAlertsTmp = []
        const resentAlertsTmp = []
        for (let i = 0; i < res.data.length; i++) {
          if (!res.data[i].seenAt) {
            resentAlertsTmp.push(res.data[i])
          } else {
            historicalAlertsTmp.push(res.data[i])
          }
        }
        setHistoricalAlerts(historicalAlertsTmp)
        setResentAlerts(resentAlertsTmp)
      })
      .catch((error) => console.log(error))
  }

  function createHistoricalAlertTable(id, name, description, date) {
    return {
      id,
      name,
      description,
      date,
    }
  }

  const rowsHistoricalAlertTable = []
  const rowsRecentAlertTable = []
  const headCellsHistoricalAlertTable = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Alert",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Date",
    },
  ]

  historicalAlerts.map((alert) => {
    rowsHistoricalAlertTable.push(
      createHistoricalAlertTable(
        alert.id,
        changeString(alert.alertType.slug),
        `${alert.alertType.description} ${alert?.dealer?.businessName} ${alert?.dealer?.crmCompanyID}`,
        changeDateFormat(alert.createdAt)
      )
    )
    return null
  })

  resentAlerts.map((alert) => {
    rowsRecentAlertTable.push(
      createHistoricalAlertTable(
        alert.id,
        changeString(alert.alertType.slug),
        `${alert.alertType.description} ${alert?.dealer?.businessName} ${alert?.dealer?.crmCompanyID}`,
        changeDateFormat(alert.createdAt)
      )
    )
    return null
  })

  useEffect(() => {
    getAlertLog()
  }, [])

  const handleSubmitClear = () => {
    const unClearAlerts = resentAlerts.map((item) => item.id)
    axios
      .patch(
        `${process.env.REACT_APP_API_DOMG}api/Alerts/SetSeen`,
        unClearAlerts
      )
      .then((response) => {
        if (response.status !== 200) {
          alert("Error clearing Alerts")
        } else {
          setSuccessClear(true)
          getAlertLog()
          setTimeout(() => {
            setSuccessClear(false)
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
        <h2 className="font-bold text-[#586283] text-[16px]">Dealer</h2>
        <div className="grid grid-cols-2 gap-4 mt-[20px]">
          <div className="grid col-span-2 p-[20px] bg-white rounded-lg">
            {successClear ? (
              <div className="flex w-full justify-center">
                <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
                  <img
                    className="mx-2 pt-[4px] h-[85%]"
                    src={check}
                    alt="check"
                  />
                  <h3 className="text-white font-bold text-[15px]">
                    The alert(s) was cleared successfully.
                  </h3>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="h-[67px] flex flex-row items-center justify-start space-x-2">
              <h2 className="font-bold text-[#586283] text-[20px]">
                Current Alerts
              </h2>
            </div>
            <hr className="mb-4 rounded-xl border-2" />
            <section className="mt-[20px] border-b-2 border-[#E0E0E0] pb-[20px]">
              <div className="mt-[20px] flex rounded-[12px] bg-white text-[16px] text-[#586283]">
                <div className="w-full">
                  <EnhancedTable
                    headCells={headCellsHistoricalAlertTable}
                    rows={rowsRecentAlertTable}
                    titleName=""
                  />
                </div>
              </div>
            </section>
            <div className="flex flex-row my-[12px] justify-center w-full">
              <button
                onClick={handleSubmitClear}
                className="flex items-center w-[180px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
              >
                Move to History
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-[20px]">
          <div className="grid col-span-2 p-[20px] bg-white rounded-lg">
            <div className="h-[67px] flex items-center">
              <h2 className="font-bold text-[#586283] text-[20px]">
                Historical Alerts
              </h2>
            </div>
            <hr className="mb-4 rounded-xl border-2" />
            <section className="mt-[20px] border-b-2 border-[#E0E0E0] pb-[20px]">
              <div className="mt-[20px] flex rounded-[12px] bg-white text-[16px] text-[#586283]">
                <div className="w-full">
                  <EnhancedTable
                    headCells={headCellsHistoricalAlertTable}
                    rows={rowsHistoricalAlertTable}
                    titleName=""
                  />
                </div>
              </div>
            </section>
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
