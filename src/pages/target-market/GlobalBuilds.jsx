import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import useAuth from "../../Hooks/useAuth"
import LayoutPresetBuilds from "../../containers/PresetBuilds/LayoutPresetBuilds"

function GlobalBuilds() {
  const authPermRols = useAuth([""], false)
  const history = useNavigate()
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
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
    getPresets()
  }, [])

  return (
    <div>
      <LayoutPresetBuilds nameBuilds="Global" data={data} />
    </div>
  )
}

export default GlobalBuilds
