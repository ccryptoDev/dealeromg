// Componentes
import SecondNavbar from "../../components/SecondNavbar"
import TabsModule from "../../components/Campaigns/TabsModule"
// Containers
import MainBodyContainer from "./MainBodyContainer"

function LayoutIrregular() {
  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid grid-row-2 spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <SecondNavbar />
        <TabsModule />
      </div>

      <div className="flex bg-[#F5F9FF] rounded-xl min-h-screen">
        <div className="grow w-[60%] mr-8 ml-8">
          <MainBodyContainer />
        </div>
      </div>
    </div>
  )
}

export default LayoutIrregular
