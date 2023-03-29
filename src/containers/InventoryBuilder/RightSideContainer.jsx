// Components
import ResultsModule from "../../components/Campaigns/ResultsModule";
import SaveBuildRequest from "../../components/Campaigns/SaveBuildRequest";
import resultsImg from "../../assets/images/results.png";
import { CollapseRightBar } from "../../atoms/SideBars";
import { useRecoilState } from "recoil";

import arrowBarLeft from "../../assets/images/arrow-bar-left.svg";

function RightSideContainer() {
  const setRightMenuCollapse = useRecoilState(CollapseRightBar)[1];
  const handleCollapse = () => {
    setRightMenuCollapse(true);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleCollapse}
        className="flex items-center justify-center w-[48px] h-[48px] my-8 bg-[#298FC2] rounded-lg rotate-180"
      >
        <img src={arrowBarLeft} alt="collapse right menu" />
      </button>
      <div className="flex space-x-3 mb-4">
        <img src={resultsImg} alt="results" className="h-[20px] w-[18px]" />
        <h1 className="font-bold mb-2 text-[#298FC2]">Outbound Results</h1>
      </div>
      <ResultsModule />
      <SaveBuildRequest />
    </div>
  );
}

export default RightSideContainer;
