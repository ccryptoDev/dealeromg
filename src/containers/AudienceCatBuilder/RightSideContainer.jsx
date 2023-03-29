// Components
import ResultsModule from "../../components/AudienceCatBuilder/ResultsModule";
import DownloadResults from "../../components/AudienceCatBuilder/DownloadResults";
import SaveBuildRequest from "../../components/AudienceCatBuilder/SaveBuildRequest";
import resultsImg from "../../assets/images/results.png";

function RightSideContainer() {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3 mb-4">
        <img src={resultsImg} alt="results" className="h-[20px] w-[18px]" />
        <h1 className="font-bold mb-2 text-[#298FC2]">Results</h1>
      </div>
      <ResultsModule />
      <DownloadResults />
      <SaveBuildRequest />
    </div>
  );
}

export default RightSideContainer;
