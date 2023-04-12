import React, { useEffect } from "react"
import { useRecoilState } from "recoil"
// Components
import LayoutEntryPage from "../containers/EntryPage/LayoutEntryPage"
import {
  filtersValuesStateCB,
  recordCountValuesStateCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  recordCountNumberCB,
} from "../atoms/CustomerBuilderAtom"
import {
  filtersValuesState,
  recordCountValuesState,
  FinalWhereClsAM,
  recordCountNumber,
} from "../atoms/audienceCatBuilderAtom"

import {
  defaultFilterValuesAB,
  defaultFilterValuesCB,
  defaultRecordCountValuesAB,
  defaultRecordCountValuesCB,
} from "../util/defaultValuesFilterBuilders"

function EntryPage() {
  const setFiltersValuesCB = useRecoilState(filtersValuesStateCB)[1]
  const setRecordCountValuesCB = useRecoilState(recordCountValuesStateCB)[1]
  const setFiltersValues = useRecoilState(filtersValuesState)[1]
  const setRecordCountValues = useRecoilState(recordCountValuesState)[1]
  const setSQLAudience = useRecoilState(FinalWhereClsAM)[1]
  const setSQLSale = useRecoilState(FinalWhereClsCBSale)[1]
  const setSQLService = useRecoilState(FinalWhereClsCBService)[1]
  const setRecordCountNumber = useRecoilState(recordCountNumber)[1]
  const setRecordCountNumberCB = useRecoilState(recordCountNumberCB)[1]

  const resetFiltersAudience = () => {
    setFiltersValues(defaultFilterValuesAB)
    setRecordCountValues(defaultRecordCountValuesAB)
    setFiltersValuesCB(defaultFilterValuesCB)
    setRecordCountValuesCB(defaultRecordCountValuesCB)
    setSQLAudience({ sql: "" })
    setSQLSale({ sql: " AND 1=0" })
    setSQLService({ sql: " AND 1=0" })
    setRecordCountNumber({ value: null })
    setRecordCountNumberCB({ value: null })
  }

  useEffect(() => {
    resetFiltersAudience(true)
  }, [])

  return (
    <div className="flex flex-col">
      <LayoutEntryPage />
    </div>
  )
}

export default EntryPage
