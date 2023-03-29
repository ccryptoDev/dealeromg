// Componentes
import Navbar from "../../components/BusinessSettings/Navbar"
import TabsModule from "../../components/AdminPanel/TabsModule"

// Containers

function LayoutAdminPanel({ children }) {
  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <Navbar />
        <TabsModule />
      </div>
      {children}
    </div>
  )
}

export default LayoutAdminPanel
