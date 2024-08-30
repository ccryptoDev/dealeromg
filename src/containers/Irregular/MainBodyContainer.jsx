import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import EnhancedTable from "../../components/Campaigns/EnhancedTable"
import LoadingSpinner from "../../components/Fields/LoadingSpinner"
import { dealerInfo } from "../../atoms/DealerAtom.js"

function MainBodyContainer() {
  const [irregular, setIrregular] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dealerInfoValue] = useRecoilState(dealerInfo)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG}api/InventoryBuilder/unique/dealerId/${dealerInfoValue.dealerID}`
      )
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false)
          setIrregular(response.data)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [])

  return (
    <>
      <div className="flex flex-col">
        <div className="h-[32px] my-[40px]">
          <h2 className="font-bold text-3xl text-[#586283]">
            Irregular({irregular.length})
          </h2>
        </div>
      </div>
      <div
        className={`flex flex-col overflow-x-auto ${
          isLoading ? "m-[25%]  items-center overflow-hidden" : ""
        }`}
      >
        {isLoading ? (
          <LoadingSpinner size={20} />
        ) : !irregular.length ? (
          <h2 className="font-bold text-[#586283] text-center text-xl">
            No Irregular data found.
          </h2>
        ) : (
          <EnhancedTable rows={irregular} view="irregular" />
        )}
      </div>
    </>
  )
}

export default MainBodyContainer
