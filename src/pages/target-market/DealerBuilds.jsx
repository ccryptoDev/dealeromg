import { useEffect, useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../../atoms/DealerAtom"
import LayoutPresetBuilds from "../../containers/PresetBuilds/LayoutPresetBuilds"

function DealerBuilds() {
  const [data, setData] = useState([])
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const getPresets = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}api/Presets`)
      .then((res) => {
        setData(
          res.data.filter(
            (presetAux) =>
              presetAux.presetType.presetTypeID === 3 &&
              presetAux.dealerID === dealerInfoValue.dealerID
          )
        )
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    getPresets()
  }, [])

  return (
    <div>
      <LayoutPresetBuilds nameBuilds="Dealer" data={data} />
    </div>
  )
}

export default DealerBuilds
