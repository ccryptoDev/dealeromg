import { useRecoilState } from "recoil"
import {
  audienceCatBuilderState,
  filtersValuesState,
} from "../../atoms/audienceCatBuilderAtom"
import { useState } from "react"

// Components
import Breadcrumps from "../../components/AudienceCatBuilder/Breadcrumps"
import VehMakeModel from "../../components/AudienceCatBuilder/VehMakeModel"
import VehYear from "../../components/AudienceCatBuilder/VehYear"
import VehMileage from "../../components/AudienceCatBuilder/VehMileage"
import VehclassName from "../../components/AudienceCatBuilder/VehClass"
import VehFuel from "../../components/AudienceCatBuilder/VehFuel"
import VehPurchaseDate from "../../components/AudienceCatBuilder/VehPurchaseDate"
import AutBrandLoyalty from "../../components/AudienceCatBuilder/AutBrandLoyalty"
import AutPurchaseLikeH from "../../components/AudienceCatBuilder/AutPurchaseLikeH"
import AutPurchaseLikeHUsed from "../../components/AudienceCatBuilder/AutPurchaseLikeHUsed"
import FinCreditRepair from "../../components/AudienceCatBuilder/FinCreditRepair"
import FinCreditReport from "../../components/AudienceCatBuilder/FinCreditReport"
import FinHouseIncome from "../../components/AudienceCatBuilder/FinHouseIncome"
import FinWealthAssets from "../../components/AudienceCatBuilder/FinWealthAssets"
import FinHomeValue from "../../components/AudienceCatBuilder/FinHomeValue"
import HDemLengthResidence from "../../components/AudienceCatBuilder/HDemLengthResidence"
import HDemVeteranHome from "../../components/AudienceCatBuilder/HDemVeteranHome"
import HDemAmountChildren from "../../components/AudienceCatBuilder/HDemAmountChildren"
import HDemOlderTeen from "../../components/AudienceCatBuilder/HDemOlderTeen"
import DemoGenderAge from "../../components/AudienceCatBuilder/DemoGenderAge"
import DemoAge from "../../components/AudienceCatBuilder/DemoAge"
import DemoSpeaksSpanish from "../../components/AudienceCatBuilder/DemoSpeaksSpanish"
import DemoOcuppation from "../../components/AudienceCatBuilder/DemoOcuppation"
import GeoZipCodeArea from "../../components/AudienceCatBuilder/GeoZipCodeArea"
import EducationalLevel from "../../components/AudienceCatBuilder/EducationalLevel"
import SwitchFilter from "../../components/Fields/SwitchFilter"
import SaveMessageCombine from "../../components/Fields/SaveMessageCombine"

function MainBodyContainer() {
  const [news, setNews] = useState(false)
  const [used, setUsed] = useState(false)
  const [credRepair, setCredRepair] = useState(false)
  const [credReport, setCredReport] = useState(false)
  const [houseIncome, setHouseIncome] = useState(false)
  const [houseValue, setHouseValue] = useState(false)
  const [wealthAssets, setWealthAssets] = useState(false)
  const [demLength, setDemLength] = useState(false)
  const [demVeteran, setDemVeteran] = useState(false)
  const [demAmount, setDemAmount] = useState(false)
  const [demOlder, setDemOlder] = useState(false)
  const [gender, setGender] = useState(false)
  const [age, setAge] = useState(false)
  const [spanish, setSpanish] = useState(false)
  const show = useRecoilState(audienceCatBuilderState)[0]
  const filtersValues = useRecoilState(filtersValuesState)[0]

  return (
    <div className="flex flex-col">
      <Breadcrumps />
      <VehMakeModel />
      {show[12].status ? <VehYear /> : null}
      {show[11].status ? <VehMileage /> : null}
      {show[10].status ? <VehclassName /> : null}
      {show[9].status ? <VehFuel /> : null}
      {show[3].status ? <EducationalLevel /> : null}
      {show[8].status ? <VehPurchaseDate /> : null}
      {show[7].status ? <AutBrandLoyalty /> : null}
      {show[6].status ? (
        <div className="flex flex-col w-full space-y-4">
          <div className="flex flex-col items-center">
            {news && !used && filtersValues.newMarketScoreRange !== null && (
              <SaveMessageCombine name={"New Purchase Likelihood"} />
            )}
            {!news && used && filtersValues.usedMarketScoreRange !== null && (
              <SaveMessageCombine name={"Used Purchase Likelihood"} />
            )}
            <AutPurchaseLikeH setNews={setNews} setUsed={setUsed} />
            <AutPurchaseLikeHUsed setNews={setNews} setUsed={setUsed} />
          </div>
          <SwitchFilter
            next={"Gender, Age & Speaks Spanish"}
            prev={"Brand Loyalty"}
            custBuild={false}
          />
        </div>
      ) : null}
      {show[2].status ? (
        <div className="flex flex-col w-full space-y-4">
          {credRepair &&
            !credReport &&
            filtersValues.creditRepairInterest !== null && (
              <SaveMessageCombine name={"Credit Repair Interest"} />
            )}
          {!credRepair &&
            credReport &&
            filtersValues.creditReportInterest !== null && (
              <SaveMessageCombine name={"Credit Report Interest"} />
            )}
          <div className="flex flex-col items-center space-y-4">
            <FinCreditRepair
              setCredRepair={setCredRepair}
              setCredReport={setCredReport}
            />
            <FinCreditReport
              setCredRepair={setCredRepair}
              setCredReport={setCredReport}
            />
          </div>
          <SwitchFilter
            next={"Household Income, Wealth Assets & Home Value"}
            prev={"Education Level"}
            custBuild={false}
          />
        </div>
      ) : null}
      {show[1].status ? (
        <div className="flex flex-col w-full space-y-4">
          {houseIncome &&
            !houseValue &&
            !wealthAssets &&
            filtersValues.householdIncome !== null && (
              <SaveMessageCombine name={"Household Income"} />
            )}
          {!houseIncome &&
            houseValue &&
            !wealthAssets &&
            filtersValues.homeValues !== null && (
              <SaveMessageCombine name={"Home Value"} />
            )}
          {!houseIncome &&
            !houseValue &&
            wealthAssets &&
            filtersValues.allWealthAssests !== null && (
              <SaveMessageCombine name={"Wealth Assets"} />
            )}
          <div className="flex flex-col items-center space-y-4">
            <FinHouseIncome
              setHouseIncome={setHouseIncome}
              setHouseValue={setHouseValue}
              setWealthAssets={setWealthAssets}
            />
            <FinWealthAssets
              setHouseIncome={setHouseIncome}
              setHouseValue={setHouseValue}
              setWealthAssets={setWealthAssets}
            />
            <FinHomeValue
              setHouseIncome={setHouseIncome}
              setHouseValue={setHouseValue}
              setWealthAssets={setWealthAssets}
            />
          </div>
          <SwitchFilter
            next={"Household Demographics"}
            prev={"Credit Repair Interest & Credit Report Interest"}
            custBuild={false}
          />
        </div>
      ) : null}
      {show[0].status ? (
        <div className="flex flex-col w-full space-y-4">
          <div className="flex flex-col items-center space-y-4">
            {demAmount &&
              !demLength &&
              !demOlder &&
              !demVeteran &&
              filtersValues.childrens !== null && (
                <SaveMessageCombine name={"Amount of Children"} />
              )}
            {!demAmount &&
              demLength &&
              !demOlder &&
              !demVeteran &&
              filtersValues.lenghtResidence !== null && (
                <SaveMessageCombine name={"Length of Residence"} />
              )}
            {!demAmount &&
              !demLength &&
              demOlder &&
              !demVeteran &&
              filtersValues.teenagerDriver !== null && (
                <SaveMessageCombine name={"Presence of Older Teen"} />
              )}
            {!demAmount &&
              !demLength &&
              !demOlder &&
              demVeteran &&
              filtersValues.veteranInHome !== null && (
                <SaveMessageCombine name={"Veteran in the Home"} />
              )}
            <HDemLengthResidence
              setDemAmount={setDemAmount}
              setDemOlder={setDemOlder}
              setDemVeteran={setDemVeteran}
              setDemLength={setDemLength}
            />
            <HDemVeteranHome
              setDemAmount={setDemAmount}
              setDemOlder={setDemOlder}
              setDemVeteran={setDemVeteran}
              setDemLength={setDemLength}
            />
            <HDemAmountChildren
              setDemAmount={setDemAmount}
              setDemOlder={setDemOlder}
              setDemVeteran={setDemVeteran}
              setDemLength={setDemLength}
            />
            <HDemOlderTeen
              setDemAmount={setDemAmount}
              setDemOlder={setDemOlder}
              setDemVeteran={setDemVeteran}
              setDemLength={setDemLength}
            />
          </div>
          <SwitchFilter
            next={"Zip Code Radius"}
            prev={"Household Income, Wealth Assets & Home Value"}
            custBuild={false}
          />
        </div>
      ) : null}
      {show[5].status ? (
        <div className="flex flex-col w-full space-y-4">
          <div className="flex flex-col items-center space-y-4">
            {age && !spanish && !gender && filtersValues.ageRange !== null && (
              <SaveMessageCombine name={"Age"} />
            )}
            {!age &&
              spanish &&
              !gender &&
              filtersValues.speakSpanish !== null && (
                <SaveMessageCombine name={"Speaks Spanish"} />
              )}
            {!age && !spanish && gender && filtersValues.genders !== null && (
              <SaveMessageCombine name={"Gender"} />
            )}
            <DemoGenderAge
              setAge={setAge}
              setGender={setGender}
              setSpanish={setSpanish}
            />
            <DemoAge
              setAge={setAge}
              setGender={setGender}
              setSpanish={setSpanish}
            />
            <DemoSpeaksSpanish
              setAge={setAge}
              setGender={setGender}
              setSpanish={setSpanish}
            />
          </div>
          <SwitchFilter
            next={"Occupation"}
            prev={"Purchase Likelihood"}
            custBuild={false}
          />
        </div>
      ) : null}
      {show[4].status ? <DemoOcuppation /> : null}
      {show[15].status ? <GeoZipCodeArea /> : null}
    </div>
  )
}

export default MainBodyContainer
