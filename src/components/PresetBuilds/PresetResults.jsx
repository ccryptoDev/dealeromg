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
import check from "../../assets/images/check.svg"
// Components
import General from "./General"
import { dealerInfo } from "../../atoms/DealerAtom"

const _ = require("lodash")

function PresetResults({ nameBuilds = "", data, sqlAudience }) {
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const setFilterValues = useRecoilState(filtersValuesState)[1]
  const setFilterValuesCB = useRecoilState(filtersValuesStateCB)[1]
  const setSqlQuery = useRecoilState(FinalWhereClsAM)[1]
  const setRecordRequest = useRecoilState(recordCountValuesState)[1]
  const setRecordRequestCB = useRecoilState(recordCountValuesStateCB)[1]
  const setSqlQueryService = useRecoilState(FinalWhereClsCBService)[1]
  const setSqlQuerySale = useRecoilState(FinalWhereClsCBSale)[1]
  const [presets, setPresets] = useState([])
  const [presetsGroup, setPresetsGroup] = useState([])
  const setSpiner = useRecoilState(Spiner)[1]
  const setSpinerCB = useRecoilState(SpinerCB)[1]
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const setRecordCountCB = useRecoilState(recordCountNumberCB)[1]
  const [showDelete, setShowDelete] = useState(false)
  const [deletedID, setDeletedID] = useState(null)
  const [textMessage, setTextMessage] = useState("")

  const handleDelete = (id) => {
    setShowDelete(true)
    setDeletedID(id)
  }

  const handleDeletePreset = (deletedID) => {
    setShowDelete(false)
    setTextMessage("deleted")
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
    const recordRequest = JSON.parse(presetsAux[0].recordRequest)
    let url = ""
    let sql
    if (presetsAux[0].sqlQuery !== null) {
      setSpiner(true)
      setFilterValues(filterValues)
      setRecordRequest(recordRequest)
      url = "getConsumersCountFromBigQuery"
      setSqlQuery(JSON.parse(presetsAux[0].sqlQuery))
      setSqlQuerySale({ sql: "" })
      setSqlQueryService({ sql: "" })
      const presetSQL = JSON.parse(presetsAux[0].sqlQuery)
      sql = {
        sql: presetSQL.sql,
        roofTopID: dealerInfoValue.rooftopID,
        sqlService: filterValues.excludeService
          ? filterValues.excludeService
          : "",
        sqlSales: filterValues.excludeSales ? filterValues.excludeSales : "",
      }
    } else {
      setSpinerCB(true)
      setFilterValuesCB(filterValues)
      setRecordRequestCB(recordRequest)
      const { neverPurchased, nevSerPrevPurch, nevSerDateRange } = filterValues
      const sqlService = JSON.parse(presetsAux[0].sqlQueryService)
      const sqlSales = JSON.parse(presetsAux[0].sqlQuerySales)
      url = bigQueryURL(neverPurchased, nevSerPrevPurch, nevSerDateRange).url
      setSqlQuerySale(sqlSales)
      setSqlQueryService(sqlService)
      setSqlQuery({ sql: "" })
      sql = {
        sqlService: sqlService.sql,
        sqlSales: sqlSales.sql,
        roofTopID: dealerInfoValue.rooftopID,
      }
    }
    setTextMessage("restored")

    axios
      .post(`${process.env.REACT_APP_API_DOMG}BigQuery/${url}`, sql)
      .then((res) => {
        const resBigQuery = res.data[0]
        const recordCountNumber = resBigQuery.numpid

        if (presetsAux[0].sqlQuery !== null) {
          const resBigQueryExclude = res.data[1]?.numpid
          if (filterValues.excludeSales && filterValues.excludeService) {
            setRecordCount({
              value: resBigQuery.numpid,
              amountExcludeService: resBigQueryExclude,
              amountExcludeSales: res.data[2]?.numpid,
            })
          } else {
            setRecordCount({
              value: resBigQuery.numpid,
              amountExcludeSales: filterValues.excludeSales
                ? resBigQueryExclude
                : null,
              amountExcludeService: filterValues.excludeService
                ? resBigQueryExclude
                : null,
            })
          }
          setSpiner(false)
        } else {
          setRecordCountCB({ value: recordCountNumber })
          setSpinerCB(false)
        }
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
      {textMessage && (
        <div className="flex w-full justify-center">
          <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[500px]">
            <img className="mx-2 pt-[4px] h-[85%]" src={check} alt="check" />
            <h3 className="text-white font-bold text-[15px]">
              {`Your "Saved Build" was ${textMessage}.`}
            </h3>
          </div>
        </div>
      )}
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
