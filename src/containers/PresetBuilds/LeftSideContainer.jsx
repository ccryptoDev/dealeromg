// Components
import InfoModule from "../../components/PresetBuilds/InfoModule"
import categoryImg from "../../assets/images/categories.png"

function LeftSideContainer() {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3 mb-4">
        <img src={categoryImg} alt="category" className="h-[20px] w-[18px]" />
      </div>
      <InfoModule />
    </div>
  )
}

export default LeftSideContainer
