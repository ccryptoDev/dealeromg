import { useState, useEffect } from "react"
import EnhancedTable from "../../components/Campaigns/EnhancedTable"
import LoadingSpinner from "../../components/Fields/LoadingSpinner"
import { useRecoilState } from "recoil"
import {
  filterSoldTable,
  refreshSold,
  valuesSoldTable,
} from "../../atoms/SoldTableAtom"
import { dealerInfo } from "../../atoms/DealerAtom.js"
import axios from "axios"
import { sortDate } from "../../util/sortDate"

function MainBodyContainer() {
  const [sold, setSold] = useState([])
  const filters = useRecoilState(filterSoldTable)[0]
  const [isLoading, setIsLoading] = useState(false)
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const [refresh] = useRecoilState(refreshSold)
  const setValuesSold = useRecoilState(valuesSoldTable)[1]

  const uniqueValues = () => {
    const typeList = [...new Set(sold.map((item) => item.state_of_vehicle))]
    const daysOnLot = [...new Set(sold.map((item) => item.days_in_stock))].sort(
      (a, b) => a - b
    )
    const price = [...new Set(sold.map((item) => item.price))].sort(
      (a, b) => a - b
    )
    const milage = [...new Set(sold.map((item) => item.mileage_value))].sort(
      (a, b) => a - b
    )
    const makeList = [...new Set(sold.map((item) => item.make))]
      .sort()
      .map((make) => {
        return { make }
      })
    const year = [...new Set(sold.map((item) => item.year))].sort(
      (a, b) => a - b
    )
    const vehicleStyleList = [
      ...new Set(
        sold
          .map((item) => item.body_style.toUpperCase().replace(/ /g, "_"))
          .sort()
      ),
    ]

    const getModelList = () => {
      let modelList = []
      modelList = sold.map((item) => {
        return { make: item.make, model: item.model }
      })
      const uniqueModel = []
      modelList = modelList.filter((element) => {
        const isDuplicate = uniqueModel.includes(element.model)
        if (!isDuplicate) {
          uniqueModel.push(element.model)
          return true
        }
        return false
      })

      modelList.sort((a, b) => {
        const fa = a.make
        const fb = b.make

        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
      return modelList
    }
    const modelList = getModelList()
    const imgCount = [...new Set(sold.map((item) => item.imageCount))].sort(
      (a, b) => a - b
    )

    const status = [...new Set(sold.map((item) => item.recordStatus.id))]
    const dateRange = [...new Set(sold.map((item) => item.soldDate))].sort(
      sortDate
    )

    setValuesSold({
      typeList,
      makeList,
      modelList,
      vehicleStyleList,
      minDaysOnLot: daysOnLot.at(0),
      maxDaysOnLot: daysOnLot.at(-1),
      minDealerPrice: price.at(0),
      maxDealerPrice: price.at(-1),
      minMileage: milage.at(0),
      maxMileage: milage.at(-1),
      minImageCount: imgCount.at(0),
      maxImageCount: imgCount.at(-1),
      minYear: year.at(0),
      maxYear: year.at(-1),
      recordStatus: status,
      minDateSold: dateRange.at(0),
      maxDateSold: dateRange.at(-1),
    })
  }

  useEffect(() => {
    if (sold.length > 0) uniqueValues()
  }, [sold])

  useEffect(() => {
    setIsLoading(true)
    const getTable = setTimeout(() => {
      axios
        .post(
          `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/sold/get`,
          {
            ...filters,
            makeList: filters.makeList.map((make) => make.toUpperCase()),
            modelList: filters.modelList.map((model) => model.toUpperCase()),
            typeList: filters.typeList.map((type) => type?.toUpperCase()),
            dealerId: dealerInfoValue.dealerID,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false)
            setSold(response.data)
          }
        })
        .catch((error) => {
          setIsLoading(false)
          console.log(error)
        })
    }, 5000)

    return () => clearTimeout(getTable)
  }, [refresh])

  return (
    <>
      <div className="flex flex-col">
        <div className="h-[32px] my-[40px]">
          <h2 className="font-bold text-3xl text-[#586283]">
            Sold({sold.length})
          </h2>
        </div>
      </div>
      <div
        className={`flex flex-col overflow-x-auto ${
          isLoading ? "m-[25%]  items-center overflow-hidden" : ""
        }`}
      >
        {isLoading ? (
          <LoadingSpinner size={`[90%]`} />
        ) : (
          <EnhancedTable rows={sold} view={"sold"} />
        )}
      </div>
    </>
  )
}

export default MainBodyContainer
