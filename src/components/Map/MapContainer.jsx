import { useEffect, useState } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"

import {
  FinalWhereClsAM,
  filtersValuesState,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { Map } from "../../atoms/Map"
import MapComponent from "./Map"

const consumerGeoJson = []

const MapContainer = () => {
  const [FinalWhereCls] = useRecoilState(FinalWhereClsAM)
  const filtersValues = useRecoilState(filtersValuesState)[0]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const [lng] = useState(dealerInfoValue.longitude || -95.15739478125067) // logged in dealer longitude dealerInfoValue.longitude
  const [lat] = useState(dealerInfoValue.latitude || 34.419370132083344) // logged in dealer latitude dealerInfoValue.latitude
  const [zoom] = useState(7.5) // default zoom level for the map
  const [API_KEY] = useState("Q9bRVvoT1qc8xVewFHmX") // your maptiler key as sent by Dean via slack
  const [showMap, setShowMap] = useState(null)
  const [refreshMap] = useRecoilState(Map)

  const mapJsonDownload = () => {
    consumerGeoJson.length = 0
    setShowMap(Math.random())
    axios({
      url: `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumerLocationData`,
      method: "POST",
      data: {
        sql: FinalWhereCls.sql,
        roofTopID: dealerInfoValue.rooftopID,
        sqlService: filtersValues.excludeService
          ? `${filtersValues.excludeService}`
          : "",
        sqlSales: filtersValues.excludeSales
          ? `${filtersValues.excludeSales}`
          : "",
      },
    }).then((response) => {
      const data = response.data
      for (let i = 0; i < data.length; i++) {
        consumerGeoJson.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [data[i].coordinates.lng, data[i].coordinates.lat],
          },
          properties: {
            address1: data[i].address1,
            address2: data[i].address2,
            city: data[i].city,
            state: data[i].state,
            postalCode: data[i].postalCode,
            lat: data[i].coordinates.lat,
            lng: data[i].coordinates.lng,
          },
        })
      }
      setShowMap(Math.random())
    })
  }

  useEffect(() => {
    if (refreshMap) mapJsonDownload()
  }, [refreshMap])

  if (showMap === null) return null

  return (
    <MapComponent
      lng={lng}
      lat={lat}
      zoom={zoom}
      consumerGeoJson={consumerGeoJson}
      apiKey={API_KEY}
      showMap={showMap}
    />
  )
}

export default MapContainer
