import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  filtersValuesState,
  recordCountValuesState,
  recordCountNumber,
  FinalWhereClsAM,
  Spiner,
} from "../../atoms/audienceCatBuilderAtom"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import reset from "../../assets/images/reset.png"
import { createSQLBrandLoyalty } from "./utils"
import SwitchFilterSubmit from "../Fields/SwitchFilterSubmit"
import SaveMessage from "../Fields/SaveMessage"

const AutBrandLoyalty = () => {
  const [alert, setAlert] = useState(false)
  const [AutBrandLoyalty, setAutBrandLoyalty] = React.useState([
    {
      name: "BMW",
      id: "0",
      name_bq: "A.BMW_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Cadillac",
      id: "1",
      name_bq: "A.CADILLAC_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Chevrolet",
      id: "2",
      name_bq: "A.CHEVROLET_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Chrysler",
      id: "3",
      name_bq: "A.CHRYSLER_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Coupe",
      id: "4",
      name_bq: "A.COUPE_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Dodge",
      id: "5",
      name_bq: "A.DODGE_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Ford",
      id: "6",
      name_bq: "A.FORD_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "GMC",
      id: "7",
      name_bq: "A.GMC_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Honda",
      id: "8",
      name_bq: "A.HONDA_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Hybrid",
      id: "9",
      name_bq: "A.HYBRID_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Hyundai",
      id: "10",
      name_bq: "A.HYUNDAI_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Infinity",
      id: "11",
      name_bq: "A.INFINITY_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Jeep",
      id: "12",
      name_bq: "A.JEEP_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Land Rover",
      id: "13",
      name_bq: "A.LANDROVER_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Lexus",
      id: "14",
      name_bq: "A.LEXUS_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Lincoln",
      id: "15",
      name_bq: "A.LINCOLN_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Mercedes Benz",
      id: "16",
      name_bq: "A.MERCEDES_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Nissan",
      id: "17",
      name_bq: "A.NISSAN_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Sedan",
      id: "18",
      name_bq: "A.SEDAN_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "SUV",
      id: "19",
      name_bq: "A.SUV_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Toyota",
      id: "20",
      name_bq: "A.TOYOTA_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Truck",
      id: "21",
      name_bq: "A.TRUCK_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Van",
      id: "22",
      name_bq: "A.VAN_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
    {
      name: "Volvo",
      id: "23",
      name_bq: "A.VOLVO_AFFINITY",
      NotApplicable: true,
      LessLikelyToPurchase: false,
      MostLikelyToPurchase: false,
    },
  ])
  const [filtersValues, setFiltersValues] = useRecoilState(filtersValuesState)
  const [recordRequest, setRecordRequest] = useRecoilState(
    recordCountValuesState
  )
  const setSpiner = useRecoilState(Spiner)[1]
  const [AdWhereClsAM, setAdWhereClsAM] = useRecoilState(FinalWhereClsAM)
  const setRecordCount = useRecoilState(recordCountNumber)[1]
  const dealerInfoValue = useRecoilState(dealerInfo)[0]

  const brandLoyaltyPersistency = () => {
    const AutBrandLoyaltyList = [
      {
        name: "BMW",
        id: "0",
        name_bq: "A.BMW_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Cadillac",
        id: "1",
        name_bq: "A.CADILLAC_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Chevrolet",
        id: "2",
        name_bq: "A.CHEVROLET_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Chrysler",
        id: "3",
        name_bq: "A.CHRYSLER_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Coupe",
        id: "4",
        name_bq: "A.COUPE_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Dodge",
        id: "5",
        name_bq: "A.DODGE_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Ford",
        id: "6",
        name_bq: "A.FORD_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "GMC",
        id: "7",
        name_bq: "A.GMC_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Honda",
        id: "8",
        name_bq: "A.HONDA_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Hybrid",
        id: "9",
        name_bq: "A.HYBRID_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Hyundai",
        id: "10",
        name_bq: "A.HYUNDAI_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Infinity",
        id: "11",
        name_bq: "A.INFINITY_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Jeep",
        id: "12",
        name_bq: "A.JEEP_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Land Rover",
        id: "13",
        name_bq: "A.LANDROVER_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Lexus",
        id: "14",
        name_bq: "A.LEXUS_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Lincoln",
        id: "15",
        name_bq: "A.LINCOLN_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Mercedes Benz",
        id: "16",
        name_bq: "A.MERCEDES_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Nissan",
        id: "17",
        name_bq: "A.NISSAN_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Sedan",
        id: "18",
        name_bq: "A.SEDAN_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "SUV",
        id: "19",
        name_bq: "A.SUV_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Toyota",
        id: "20",
        name_bq: "A.TOYOTA_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Truck",
        id: "21",
        name_bq: "A.TRUCK_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Van",
        id: "22",
        name_bq: "A.VAN_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
      {
        name: "Volvo",
        id: "23",
        name_bq: "A.VOLVO_AFFINITY",
        NotApplicable: true,
        LessLikelyToPurchase: false,
        MostLikelyToPurchase: false,
      },
    ]
    for (let i = 0; i < AutBrandLoyaltyList.length; i++) {
      if (filtersValues.brandLoyalty) {
        AutBrandLoyaltyList[i] = {
          ...AutBrandLoyaltyList[i],
          NotApplicable:
            filtersValues.brandLoyalty[i].status === "Not Applicable",
          LessLikelyToPurchase:
            filtersValues.brandLoyalty[i].status === "Less Likely To Purchase",
          MostLikelyToPurchase:
            filtersValues.brandLoyalty[i].status === "Most Likely To Purchase",
        }
      }
    }
    setAutBrandLoyalty(AutBrandLoyaltyList)
  }

  useEffect(() => {
    brandLoyaltyPersistency()
  }, [])

  const changeInputnotapp = (event) => {
    const AutBrandLoyaltyAux = [...AutBrandLoyalty]
    const index = parseInt(
      event.target.id.substring(0, event.target.id.length - 6)
    )
    AutBrandLoyaltyAux[index].NotApplicable = true
    AutBrandLoyaltyAux[index].LessLikelyToPurchase = false
    AutBrandLoyaltyAux[index].MostLikelyToPurchase = false
    setAutBrandLoyalty(AutBrandLoyaltyAux)
  }

  const changeAllInputOffLoyalty = () => {
    setAlert(false)
    const AutBrandLoyaltyAux = [...AutBrandLoyalty]
    for (let n = 0; n < AutBrandLoyaltyAux.length; n++) {
      AutBrandLoyalty[n].NotApplicable = true
      AutBrandLoyalty[n].LessLikelyToPurchase = false
      AutBrandLoyalty[n].MostLikelyToPurchase = false
    }
    setAutBrandLoyalty(AutBrandLoyaltyAux)
    setFiltersValues({ ...filtersValues, brandLoyalty: null })
  }

  const changeInputless = (event) => {
    const AutBrandLoyaltyAux = [...AutBrandLoyalty]
    const index = event.target.id.substring(0, event.target.id.length - 4)
    AutBrandLoyaltyAux[index].LessLikelyToPurchase = true
    AutBrandLoyaltyAux[index].MostLikelyToPurchase = false
    AutBrandLoyaltyAux[index].NotApplicable = false
    setAutBrandLoyalty(AutBrandLoyaltyAux)
  }

  const changeInputmost = (event) => {
    const AutBrandLoyaltyAux = [...AutBrandLoyalty]
    const index = event.target.id.substring(0, event.target.id.length - 4)
    AutBrandLoyaltyAux[index].MostLikelyToPurchase = true
    AutBrandLoyaltyAux[index].LessLikelyToPurchase = false
    AutBrandLoyaltyAux[index].NotApplicable = false
    setAutBrandLoyalty(AutBrandLoyaltyAux)
  }

  const changeBrandLoyalty = () => {
    setAlert(true)
    const auxResponse = []
    for (let i = 0; i < AutBrandLoyalty.length; i++) {
      if (AutBrandLoyalty[i].LessLikelyToPurchase) {
        auxResponse.push({
          name: AutBrandLoyalty[i].name,
          id: i,
          name_bq: AutBrandLoyalty[i].name_bq,
          status: "Less Likely To Purchase",
          code: ["1", "2"],
        })
      } else if (AutBrandLoyalty[i].MostLikelyToPurchase) {
        auxResponse.push({
          name: AutBrandLoyalty[i].name,
          id: i,
          name_bq: AutBrandLoyalty[i].name_bq,
          status: "Most Likely To Purchase",
          code: ["3", "4", "5"],
        })
      } else if (AutBrandLoyalty[i].NotApplicable) {
        auxResponse.push({
          name: AutBrandLoyalty[i].name,
          id: i,
          name_bq: AutBrandLoyalty[i].name_bq,
          status: "Not Applicable",
          code: ["0"],
        })
      }
      const auxResponse2 = auxResponse.filter(
        (item) => item.status !== "Not Applicable"
      )
      let Query = ""
      if (i === AutBrandLoyalty.length - 1) {
        const amountOfElements = auxResponse2.length
        for (let j = 0; j < auxResponse2.length; j++) {
          if (j === auxResponse2.length - 1) {
            Query += `${auxResponse2[j].name_bq} IN('${auxResponse2[
              j
            ].code.join("','")}')`
          } else {
            Query += `${auxResponse2[j].name_bq} IN('${auxResponse2[
              j
            ].code.join("','")}') AND `
          }
        }
        sendRequestCount(Query, amountOfElements)
        setFiltersValues({ ...filtersValues, brandLoyalty: auxResponse })
        setRecordRequest({ ...recordRequest, brandLoyalty: auxResponse })
      }
    }
  }

  const sendRequestCount = (recordRequestBody, amountOfElements) => {
    setSpiner(true)
    const WhereClsAM = createSQLBrandLoyalty(
      recordRequestBody,
      amountOfElements,
      "brandLoyalty",
      filtersValues,
      AdWhereClsAM
    )
    setAdWhereClsAM({ sql: WhereClsAM })

    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersCountFromBigQuery`,
        {
          sql: WhereClsAM,
          roofTopID: dealerInfoValue.rooftopID,
          sqlService: filtersValues.excludeService
            ? `${filtersValues.excludeService}`
            : "",
          sqlSales: filtersValues.excludeSales
            ? `${filtersValues.excludeSales}`
            : "",
        }
      )
      .then((res) => {
        const resBigQuery = res.data[0]
        const resBigQueryExclude = res.data[1]?.numpid
        if (filtersValues.excludeSales && filtersValues.excludeService) {
          setRecordCount({
            value: resBigQuery.numpid,
            amountExcludeService: resBigQueryExclude,
            amountExcludeSales: res.data[2]?.numpid,
          })
        } else {
          setRecordCount({
            value: resBigQuery.numpid,
            amountExcludeSales: filtersValues.excludeSales
              ? resBigQueryExclude
              : null,
            amountExcludeService: filtersValues.excludeService
              ? resBigQueryExclude
              : null,
          })
        }
        setSpiner(false)
      })
  }

  useEffect(() => {
    filtersValues.brandLoyalty === null &&
      setAutBrandLoyalty(
        AutBrandLoyalty.map((item) => ({
          ...item,
          NotApplicable: true,
          LessLikelyToPurchase: false,
          MostLikelyToPurchase: false,
        }))
      )
  }, [filtersValues.brandLoyalty])

  return (
    <div>
      {alert && filtersValues.brandLoyalty !== null && (
        <SaveMessage custBuild={false} />
      )}
      <h2 className="font-bold text-[#586283] text-[20px]">Brand Loyalty</h2>
      <div className="flex flex-row justify-end space-x-5 pr-2 mt-5 mb-4">
        <button
          onClick={changeAllInputOffLoyalty}
          type="button"
          className="flex flex-row justify-between text-[#298FC2] bg-[#FFFFFF] ring-1 focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Reset
          <img className="py-[2px] px-2" src={reset} alt="reset" />
        </button>
      </div>
      <div className="grid grid-cols-4 mt-5 mb-4 place-items-center">
        <p></p>
        <p className="font-bold text-[#586283]">Not Applicable</p>
        <p className="font-bold text-[#586283]">Less Likely to Purchase</p>
        <p className="font-bold text-[#586283]">Most Likely to Purchase</p>
      </div>
      <fieldset className="customScrollBar h-[90vh] overflow-y-scroll">
        <legend className="sr-only">Brand Loyalty</legend>
        {AutBrandLoyalty.map((loyalty) => (
          <div
            className="grid grid-cols-4 mb-4 place-items-center"
            key={loyalty.id}
          >
            <label
              htmlFor={`${loyalty.id}loyalty`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {loyalty.name}
            </label>
            <input
              id={`${loyalty.id}notapp`}
              checked={loyalty.NotApplicable}
              onChange={(event) => changeInputnotapp(event)}
              aria-describedby={`checkbox-${loyalty.id}notapp`}
              type="checkbox"
              className="w-4 h-4 bg-[#298fc217] text-[#298FC2] rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-[#298FC2] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              id={`${loyalty.id}less`}
              checked={loyalty.LessLikelyToPurchase}
              onChange={(event) => changeInputless(event)}
              aria-describedby={`checkbox-${loyalty.id}less`}
              type="checkbox"
              className="w-4 h-4 bg-[#298fc217] text-[#298FC2] rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-[#298FC2] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              id={`${loyalty.id}most`}
              checked={loyalty.MostLikelyToPurchase}
              onChange={(event) => changeInputmost(event)}
              aria-describedby={`checkbox-${loyalty.id}most`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-[#298FC2] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        ))}
      </fieldset>
      <SwitchFilterSubmit
        next={"Purchase Likelihood"}
        prev={"Vehicle Purchase Date"}
        onSubmit={changeBrandLoyalty}
        custBuild={false}
      />
    </div>
  )
}

export default AutBrandLoyalty
