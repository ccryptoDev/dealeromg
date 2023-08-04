// Components
import ResultsModule from "../../components/AudienceCatBuilder/ResultsModule"
import ResultsModuleCB from "../../components/CustomerBuilder/ResultsModule"
import DownloadResults from "../../components/AudienceCatBuilder/DownloadResults"
import DownloadResultsCB from "../../components/CustomerBuilder/DownloadResults"
import { useRecoilState } from "recoil"
import { FinalWhereClsAM } from "../../atoms/audienceCatBuilderAtom"
import {
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
} from "../../atoms/CustomerBuilderAtom"
import DedupeOptions from "../../components/PresetBuilds/DedupeOptions"
import resultsImg from "../../assets/images/results.png"

function RightSideContainer() {
  const audience = useRecoilState(FinalWhereClsAM)[0]
  const customerSale = useRecoilState(FinalWhereClsCBSale)[0]
  const customerService = useRecoilState(FinalWhereClsCBService)[0]

  console.log("audience", audience)
  console.log("customerSale", customerSale)
  console.log("customerService", customerService)
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3 mb-4">
        <img src={resultsImg} alt="results" className="h-[20px] w-[18px]" />
        <h1 className="font-bold mb-2 text-[#298FC2]">Results</h1>
      </div>
      {audience.sql === "" &&
      (customerSale.sql === " AND 1=0" || customerSale.sql === "") &&
      (customerService.sql === " AND 1=0" || customerService.sql === "") ? (
        <h1 className="text-[20px] font-normal text-gray-500 text-center">
          Select your build to see results
        </h1>
      ) : (
        <>
          {audience.sql !== "" &&
          (customerSale.sql === " AND 1=0" || customerSale.sql === "") &&
          (customerService.sql === " AND 1=0" || customerService.sql === "") ? (
            <ResultsModule />
          ) : (
            <ResultsModuleCB />
          )}
          <DedupeOptions />
          {audience.sql !== "" &&
          (customerSale.sql === " AND 1=0" || customerSale.sql === "") &&
          (customerService.sql === " AND 1=0" || customerService.sql === "") ? (
            <DownloadResults />
          ) : (
            <DownloadResultsCB />
          )}
        </>
      )}
    </div>
  )
}

export default RightSideContainer
