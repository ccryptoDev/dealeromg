import axios from "axios"
import { useRecoilState } from "recoil"
import {
  filtersValuesStateCB,
  recordCountValuesStateCB,
  FinalWhereClsCBSale,
  FinalWhereClsCBService,
  recordCountNumberCB,
  recordCountNumberActivityCB,
} from "../../atoms/CustomerBuilderAtom"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
} from "../../atoms/audienceCatBuilderAtom"

import {
  defaultFilterValuesAB,
  defaultFilterValuesCB,
  defaultRecordCountValuesAB,
  defaultRecordCountValuesCB,
} from "../../util/defaultValuesFilterBuilders"
import { dealerInfo } from "../../atoms/DealerAtom"

function ResetFiltersButton({ audienceCatBuilder }) {
  const setFiltersValues = useRecoilState(
    audienceCatBuilder ? filtersValuesState : filtersValuesStateCB
  )[1]
  const setRecordCountValues = useRecoilState(
    audienceCatBuilder ? recordCountValuesState : recordCountValuesStateCB
  )[1]
  const setSQLAudience = useRecoilState(FinalWhereClsAM)[1]
  const setSQLSale = useRecoilState(FinalWhereClsCBSale)[1]
  const setSQLService = useRecoilState(FinalWhereClsCBService)[1]
  const setRecordCount = useRecoilState(
    audienceCatBuilder ? recordCountNumber : recordCountNumberCB
  )[1]
  const setRecordCountActivityNumber = useRecoilState(
    recordCountNumberActivityCB
  )[1]
  const dealer = useRecoilState(dealerInfo)[0]
  const resetRecordCountNumber = async (audienceCatBuilder) => {
    const url = audienceCatBuilder
      ? "BigQuery/getConsumersCountFromBigQuery"
      : "BigQuery/getDealerVaultCountFromBigQuery"
    const body = audienceCatBuilder
      ? {
          sql: "",
          roofTopID: dealer.rooftopID,
          sqlService: "",
          sqlSales: "",
        }
      : {
          sqlSales: "",
          sqlService: "",
          roofTopID: dealer.rooftopID,
        }

    const res = await axios.post(`${process.env.REACT_APP_API_DOMG}${url}`, {
      ...body,
    })
    const resBigQuery = res.data[0]
    const recordCountNumber = resBigQuery.numpid
    if (audienceCatBuilder) {
      setRecordCount({
        value: recordCountNumber,
        amountExcludeSales: null,
        amountExcludeService: null,
      })
    } else {
      const resActivity = await axios.post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getDVCountDaysWithoutActivity`,
        { ...body }
      )
      const resBigQueryActivity = resActivity.data
      const noActivitySales = resBigQueryActivity[0]?.numpid
      const noActivityService = resBigQueryActivity[1]?.numpid
      setRecordCountActivityNumber({
        valueSales: noActivitySales,
        valueService: noActivityService,
      })
      setRecordCount({ value: recordCountNumber })
    }
  }

  return (
    <div className="flex flex-col mt-4 bg-[#48578F] p-[20px] rounded-[12px]">
      <h1 className="font-bold mb-2 text-[#FFFFFF]">
        Reset Results and Filter
      </h1>
      <button
        onClick={() => {
          setFiltersValues(
            audienceCatBuilder ? defaultFilterValuesAB : defaultFilterValuesCB
          )
          setRecordCountValues(
            audienceCatBuilder
              ? defaultRecordCountValuesAB
              : defaultRecordCountValuesCB
          )
          audienceCatBuilder
            ? setSQLAudience({ sql: "" })
            : setSQLSale({ sql: " AND 1=0" })
          setSQLService({ sql: " AND 1=0" })
          resetRecordCountNumber(audienceCatBuilder)
        }}
        type="button"
        className="mb-4 text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
      >
        <svg
          className="w-6 h-6 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p>Submit</p>
      </button>
    </div>
  )
}

export default ResetFiltersButton
