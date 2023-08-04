// Components
import ResultsModule from "../../components/AudienceCatBuilder/ResultsModule"
import DownloadResults from "../../components/AudienceCatBuilder/DownloadResults"
import SaveBuildRequest from "../../components/AudienceCatBuilder/SaveBuildRequest"
import resultsImg from "../../assets/images/results.png"
import ExcludePastCustomer from "../../components/AudienceCatBuilder/ExcludePastCustomer"
import TransactionCount from "../../components/CustomerBuilder/TransactionCount"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"

function RightSideContainer() {
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3 mb-4">
        <img src={resultsImg} alt="results" className="h-[20px] w-[18px]" />
        <h1 className="font-bold mb-2 text-[#298FC2]">Results</h1>
      </div>
      <ResultsModule />
      <DownloadResults />
      <SaveBuildRequest />
      {dealerInfoValue.rooftopID ? (
        <>
          <ExcludePastCustomer />
          <TransactionCount />
        </>
      ) : null}
    </div>
  )
}

export default RightSideContainer
