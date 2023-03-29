import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import axios from "axios"
// Components
import {
  filterInventoryBuilder,
  refreshInventoryBuilder,
  presetBuilder,
  valuesInventoryBuilder,
} from "../../atoms/InventoryBuilderAtom.js"
import { dealerInfo } from "../../atoms/DealerAtom.js"
import EnhancedTable from "../../components/Campaigns/EnhancedTable"
import LoadingSpinner from "../../components/Fields/LoadingSpinner"

function MainBodyContainer() {
  const [name, setName] = useState("")
  const [inventoryBuilder, setInventoryBuilder] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const filters = useRecoilState(filterInventoryBuilder)[0]
  const [refresh] = useRecoilState(refreshInventoryBuilder)
  const [dealerInfoValue] = useRecoilState(dealerInfo)
  const preset = useRecoilState(presetBuilder)[0]
  const setValuesInventoryBuilder = useRecoilState(valuesInventoryBuilder)[1]

  const uniqueValues = () => {
    const typeList = [
      ...new Set(inventoryBuilder.map((item) => item.state_of_vehicle)),
    ]
    const daysOnLot = [
      ...new Set(inventoryBuilder.map((item) => item.days_in_stock)),
    ].sort((a, b) => a - b)
    const price = [...new Set(inventoryBuilder.map((item) => item.price))].sort(
      (a, b) => a - b
    )
    const milage = [
      ...new Set(inventoryBuilder.map((item) => item.mileage_value)),
    ].sort((a, b) => a - b)
    const makeList = [...new Set(inventoryBuilder.map((item) => item.make))]
      .sort()
      .map((make) => {
        return { make }
      })
    const year = [...new Set(inventoryBuilder.map((item) => item.year))].sort(
      (a, b) => a - b
    )
    const vehicleStyleList = [
      ...new Set(
        inventoryBuilder
          .map((item) => {
            if (item.body_style === "") {
              return "Empty"
            } else {
              return item.body_style.toUpperCase().replace(/ /g, "_")
            }
          })
          .sort()
      ),
    ]

    const getModelList = () => {
      let modelList = []
      modelList = inventoryBuilder.map((item) => {
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
    const imgCount = [
      ...new Set(inventoryBuilder.map((item) => item.imageCount)),
    ].sort((a, b) => a - b)

    const views = [...new Set(inventoryBuilder.map((item) => item.views))]

    setValuesInventoryBuilder({
      typeList,
      makeList,
      modelList,
      year,
      vehicleStyleList,
      minDaysOnLot: daysOnLot.at(0),
      maxDaysOnLot: daysOnLot.at(-1),
      minDealerPrice: price.at(0),
      maxDealerPrice: price.at(-1),
      minMileage: milage.at(0),
      maxMileage: milage.at(-1),
      minViews: views.at(0),
      maxViews: views.at(-1),
      minImageCount: imgCount.at(0),
      maxImageCount: imgCount.at(-1),
      minYear: year.at(0),
      maxYear: year.at(-1),
    })
  }

  useEffect(() => {
    if (inventoryBuilder.length > 0) uniqueValues()
  }, [inventoryBuilder])

  useEffect(() => {
    setIsLoading(true)
    const getTable = setTimeout(() => {
      axios
        .post(`${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/Get`, {
          ...filters,
          makeList: filters.makeList.map((make) => make.toUpperCase()),
          modelList: filters.modelList.map((model) => model.toUpperCase()),
          dealerId: dealerInfoValue.dealerID,
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false)
            setInventoryBuilder(response.data)
            setName(preset.name)
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
      <div className="h-[32px] my-[40px]">
        <h2 className="font-bold text-3xl text-[#586283]">
          {name ?? "All Inventory"} ({inventoryBuilder.length})
        </h2>
      </div>
      <div
        className={`flex flex-col overflow-x-auto ${
          isLoading ? "m-[25%]  items-center overflow-hidden" : ""
        }`}
      >
        {isLoading ? (
          <LoadingSpinner size={`[90%]`} />
        ) : (
          <EnhancedTable rows={inventoryBuilder} view="inventory" />
        )}
      </div>
    </>
  )
}

export default MainBodyContainer
