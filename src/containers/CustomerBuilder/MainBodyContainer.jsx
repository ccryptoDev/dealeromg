import { useRecoilState } from "recoil"
import { customerBuilderState } from "../../atoms/CustomerBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"

// Components
import Breadcrumps from "../../components/CustomerBuilder/Breadcrumps"
import VehYear from "../../components/CustomerBuilder/VehYear"
import GeoZipCodeArea from "../../components/CustomerBuilder/GeoZipCodeArea"
import PrevPurchVehiDateRange from "../../components/CustomerBuilder/PrevPurchVehiDateRange"
import PrevServVehTotalSpend from "../../components/CustomerBuilder/PrevServVehTotalSpend"
import GeoDMA from "../../components/CustomerBuilder/GeoDMA"
import GeoState from "../../components/CustomerBuilder/GeoState"
import PrevServVehTotalServiceCount from "../../components/CustomerBuilder/PrevServVehTotalServiceCount"
import PrevSerVehNeverPurch from "../../components/CustomerBuilder/PrevSerVehNeverPurch"
import PrevSerDateRange from "../../components/CustomerBuilder/PrevSerDateRange"
import NevSerDateRange from "../../components/CustomerBuilder/NevSerDateRange"
import NevSerPrevPurch from "../../components/CustomerBuilder/NevSerPrevPurch"
import PrevSerROCode from "../../components/CustomerBuilder/PrevSerROCode"
import PrevPurchMakeModel from "../../components/CustomerBuilder/PrevPurchMakeModel"
import PrevSerMakeModel from "../../components/CustomerBuilder/PrevSerMakeModel"
import PrevPurchYear from "../../components/CustomerBuilder/PrevPurchYear"
import WrongMessage from "../../components/Fields/WrongMessage"

const MainBodyContainer = () => {
  const dealerValue = useRecoilState(dealerInfo)[0]
  const show = useRecoilState(customerBuilderState)[0]
  return (
    <div className="flex flex-col">
      <Breadcrumps />
      {!dealerValue.rooftopID ? <WrongMessage /> : null}
      <PrevPurchMakeModel />
      <PrevSerMakeModel />
      {show[0].status ? <NevSerPrevPurch /> : null}
      {show[1].status ? <NevSerDateRange /> : null}
      {show[2].status ? <PrevSerROCode /> : null}
      {show[3].status ? <PrevSerVehNeverPurch /> : null}
      {show[4].status ? <PrevServVehTotalServiceCount /> : null}
      {show[5].status ? <PrevServVehTotalSpend /> : null}
      {show[9].status ? <PrevSerDateRange /> : null}
      {show[6].status ? <VehYear /> : null}
      {show[10].status ? <PrevPurchYear /> : null}
      {show[13].status ? <PrevPurchVehiDateRange /> : null}
      {show[14].status ? <GeoState /> : null}
      {show[15].status ? <GeoDMA /> : null}
      {show[16].status ? <GeoZipCodeArea /> : null}
    </div>
  )
}

export default MainBodyContainer
