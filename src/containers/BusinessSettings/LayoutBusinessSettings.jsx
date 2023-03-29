import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth"

// Componentes
import Navbar from "../../components/BusinessSettings/Navbar"
import TabsModule from "../../components/BusinessSettings/TabsModule"
import Profile from "../../components/BusinessSettings/Profile"
import Connect from "../../components/BusinessSettings/Connect"
import InventoryUrls from "../../components/BusinessSettings/InventoryUrls"
import Alerts from "../../components/BusinessSettings/Alerts"
import Hierarchy from "../../components/BusinessSettings/Hierarchy"
import AlertsControl from "../../components/BusinessSettings/AlertsControl"

// Containers

function LayoutBusinessSettings({ activeTab }) {
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

  // activeTab === 2 && Customize
  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <Navbar />
        <TabsModule />
      </div>
      {activeTab === 0 ? <Profile /> : null}
      {activeTab === 1 ? <InventoryUrls /> : null}
      {activeTab === 2 ? <Connect /> : null}
      {activeTab === 3 ? <Connect /> : null}
      {activeTab === 4 ? <Hierarchy /> : null}
      {activeTab === 5 ? <Alerts /> : null}
      {activeTab === 6 ? <AlertsControl /> : null}
    </div>
  )
}

export default LayoutBusinessSettings
