import ResultsModule from "../../components/CustomerBuilder/ResultsModule"
import DownloadResults from "../../components/CustomerBuilder/DownloadResults"
import SaveBuildRequest from "../../components/CustomerBuilder/SaveBuildRequest"
import resultsImg from "../../assets/images/results.png"
import TransactionCount from "../../components/CustomerBuilder/TransactionCount"

const RightSideContainer = () => {
  return (
    <>
      <TransactionCount />
      <div className="flex flex-col">
        <div className="flex space-x-3 mb-4">
          <img src={resultsImg} alt="results" className="h-[20px] w-[18px]" />
          <h1 className="font-bold mb-2 text-[#298FC2]">Results</h1>
        </div>
        <ResultsModule />
        <DownloadResults />
        <SaveBuildRequest />
      </div>
    </>
  )
}

export default RightSideContainer
