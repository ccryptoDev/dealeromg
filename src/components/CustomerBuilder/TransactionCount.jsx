import axios from "axios"
import { useState, useEffect } from "react"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"

function TransactionCount() {
  const [soldTransactions, setSoldTransactions] = useState(0)
  const [serviceTransactions, setServiceTransactions] = useState(0)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]

  const getTransactionCount = () => {
    const responseSales = axios.post(
      `${process.env.REACT_APP_API_DOMG}BigQuery/getDealerVaultCountFromBigQuery`,
      {
        sqlSales: "",
        sqlService: "" + " AND 0=1",
        roofTopID: dealerInfoValue.rooftopID,
      }
    )

    const responseService = axios.post(
      `${process.env.REACT_APP_API_DOMG}BigQuery/getDealerVaultCountFromBigQuery`,
      {
        sqlSales: "" + " AND 0=1",
        sqlService: "",
        roofTopID: dealerInfoValue.rooftopID,
      }
    )
    Promise.all([responseSales, responseService])
      .then((values) => {
        setSoldTransactions(
          values[0].data[0].numpid
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
        setServiceTransactions(
          values[1].data[0].numpid
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getTransactionCount()
  }, [])

  return (
    <div>
      <h1 className="text-lg font-semibold">{`Dealer's Customer Database`}</h1>
      <p className="ml-4">Sold Transactions: {soldTransactions}</p>
      <p className="ml-4 mb-4">Service Transactions: {serviceTransactions}</p>
    </div>
  )
}

export default TransactionCount
