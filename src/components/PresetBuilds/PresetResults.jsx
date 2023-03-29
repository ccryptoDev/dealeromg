import { useEffect, useState } from "react"
import {
  filtersValuesState,
  recordCountValuesState,
  FinalWhereClsAM,
  recordCountNumber,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import {
  filtersValuesStateCB,
  recordCountValuesStateCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  recordCountNumberCB,
  SpinerCB,
} from "../../atoms/CustomerBuilderAtom"
import { bigQueryURL } from "../../util/bigQueryURL"
import { useRecoilState } from "recoil"
import axios from "axios"
// Components
import General from "./General"
import { dealerInfo } from "../../atoms/DealerAtom"

const _ = require("lodash")

function PresetResults({ nameBuilds = "", data, sqlAudience }) {
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setFilterValues = useRecoilState(
    sqlAudience === "" ? filtersValuesState : filtersValuesStateCB
  )[1]
  const setSqlQuery = useRecoilState(FinalWhereClsAM)[1]
  const setRecordRequest = useRecoilState(
    sqlAudience === "" ? recordCountValuesState : recordCountValuesStateCB
  )[1]
  const setSqlQueryService = useRecoilState(FinalWhereClsCBService)[1]
  const setSqlQuerySale = useRecoilState(FinalWhereClsCBSale)[1]
  const [presets, setPresets] = useState([])
  const [presetsGroup, setPresetsGroup] = useState([])
  const setSpiner = useRecoilState(sqlAudience === "" ? Spiner : SpinerCB)[1]
  const setRecordCount = useRecoilState(
    sqlAudience === "" ? recordCountNumber : recordCountNumberCB
  )[1]
  const [showDelete, setShowDelete] = useState(false)
  const [deletedID, setDeletedID] = useState(null)

  const handleDelete = (id) => {
    setShowDelete(true)
    setDeletedID(id)
  }

  const handleDeletePreset = (deletedID) => {
    setShowDelete(false)
    axios
      .delete(`${process.env.REACT_APP_API_DOMG}api/Presets/${deletedID}`)
      .then(() => {
        const presetsAux = presets.filter(
          (preset) => preset.presetID !== deletedID
        )
        setPresets(presetsAux)
      })
      .catch((e) => console.log(e))
  }

  const handleSet = (id) => {
    const presetsAux = presets.filter((preset) => preset.presetID === id)
    const filterValues = JSON.parse(presetsAux[0].filterValues)
    setFilterValues(filterValues)
    const recordRequest = JSON.parse(presetsAux[0].recordRequest)
    setRecordRequest(recordRequest)
    let url = ""
    let sql
    if (presetsAux[0].sqlQuery !== null) {
      url = "getConsumersCountFromBigQuery"
      setSqlQuery(JSON.parse(presetsAux[0].sqlQuery))
      setSqlQuerySale({ sql: "" })
      setSqlQueryService({ sql: "" })
      sql = JSON.parse(presetsAux[0].sqlQuery)
    } else {
      const { neverPurchased, nevSerPrevPurch } = filterValues
      const sqlService = JSON.parse(presetsAux[0].sqlQueryService)
      const sqlSales = JSON.parse(presetsAux[0].sqlQuerySales)
      url = bigQueryURL(neverPurchased, nevSerPrevPurch).url
      setSqlQuerySale(sqlSales)
      setSqlQueryService(sqlService)
      setSqlQuery({ sql: "" })
      sql = {
        sqlService: sqlService.sql,
        sqlSales: sqlSales.sql,
        roofTopID: dealerInfoValue.rooftopID,
      }
    }

    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, sql)
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid
        setRecordCount({ value: recordCountNumber })
        setSpiner(false)
      })
  }

  useEffect(() => {
    setPresets(data)
  }, [data])

  useEffect(() => {
    setPresetsGroup(_.groupBy(presets, "tags[0]"))
  }, [presets])

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-row bg-[#E57200] py-2 rounded-md justify-center mb-4 w-auto px-6">
          <h3 className="flex flex-row text-white font-bold text-[15px]">
            Click on the plus
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mx-2 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            icon or preset name from each preset to set the selection results
          </h3>
        </div>
      </div>
      {showDelete ? (
        <div className="overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-auto flex items-center justify-center">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="bg-white rounded-lg w-[500px] flex flex-col items-center justify-center p-8 space-y-6">
              <p className="font-bold text-[#586283] text-[20px] text-center">
                Are you sure you want to delete this save build request?
              </p>
              <div className="w-[50%] flex flex-row justify-between">
                <button
                  className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleDeletePreset.bind(this, deletedID)}
                >
                  Yes
                </button>
                <button
                  className="flex flex-row justify-between text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => setShowDelete(false)}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col items-left px-8 space-y-4 h-[70vh] overflow-y-scroll customScrollBar">
        {Object.keys(presetsGroup).map((title, index) => (
          <div key={index}>
            <h1 className="font-bold text-[#586283] text-[20px] mt-8 mb-1">
              {title}
            </h1>
            <div className="w-full">
              {presetsGroup[title].map((presetGroup) => (
                <General
                  key={presetGroup.presetID}
                  nameBuilds={nameBuilds}
                  handleDelete={handleDelete}
                  handleSet={handleSet}
                  preset={presetGroup}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PresetResults
