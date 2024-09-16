import { useEffect, useState } from "react"
import axios from "axios"

import LayoutPresetBuilds from "../../containers/PresetBuilds/LayoutPresetBuilds"

function GlobalBuilds() {
  const [data, setData] = useState([])
  const getPresets = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}api/Presets`)
      .then((res) => {
        setData(
          res.data.filter(
            (presetAux) => presetAux.presetType.presetTypeID === 4
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
      <LayoutPresetBuilds nameBuilds="Global" data={data} />
    </div>
  )
}

export default GlobalBuilds
