// Components
import AudienceCatModule from "../../components/CustomerBuilder/AudienceCatModule"
// import InfoModule from "../../components/CustomerBuilder/InfoModule";
import categoryImg from "../../assets/images/categories.png"
import ResetFiltersButton from "../../components/Fields/ResetFiltersButton"

const LeftSideContainer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3 mb-4">
        <img src={categoryImg} alt="category" className="h-[20px] w-[18px]" />
        <h1 className="font-bold mb-2 text-[#298FC2]">Category</h1>
      </div>
      <AudienceCatModule />
      {/* <InfoModule /> */}
      <ResetFiltersButton audienceCatBuilder={false} />
    </div>
  )
}

export default LeftSideContainer
