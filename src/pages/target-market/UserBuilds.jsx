import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import useAuth from "../../Hooks/useAuth"
import LayoutPresetBuilds from "../../containers/PresetBuilds/LayoutPresetBuilds"

function UserBuilds() {
  const authPermRols = useAuth([""], false)
  const history = useNavigate()
  const [data, setData] = useState([])
  const user = JSON.parse(localStorage.getItem("permissionsDealerOMG"))
  const getPresets = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}api/Presets`)
      .then((res) => {
        setData(
          res.data.filter(
            (presetAux) =>
              presetAux.presetType.presetTypeID === 1 &&
              presetAux.dealerID === user.userID
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
      <LayoutPresetBuilds nameBuilds="User" data={data} />
    </div>
  )
}

export default UserBuilds
