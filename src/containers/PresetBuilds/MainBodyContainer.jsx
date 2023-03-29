// Components
import Breadcrumps from "../../components/PresetBuilds/Breadcrumps"
import PresetResults from "../../components/PresetBuilds/PresetResults"
import { useRecoilState } from "recoil"
import { FinalWhereClsAM } from "../../atoms/audienceCatBuilderAtom"

function MainBodyContainer({ nameBuilds, data }) {
  const sqlAudience = useRecoilState(FinalWhereClsAM)[0]
  return (
    <div className="flex flex-col">
      <Breadcrumps nameBuilds={nameBuilds} />
      <PresetResults
        nameBuilds={nameBuilds}
        data={data}
        sqlAudience={sqlAudience.sql}
      />
    </div>
  )
}

export default MainBodyContainer
