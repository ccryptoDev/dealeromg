import LayoutAdminPanel from "../../containers/AdminPanel/LayoutAdminPanel"
import EnhancedTable from "../../components/AdminPanel/EnhancedTable"
import axios from "axios"
import Checkbox from "../../components/AdminPanel/Checkbox"
import { useEffect, useMemo, useState } from "react"
import { changeDateFormat } from "../../util/changeFormat"

const ProviderManagement = () => {
  const [dealers, setDealers] = useState([])
  const [providers, setProviders] = useState([])
  const [dealerVaultFeed, setDealerVaultFeed] = useState([])
  const [provCat, setProvCat] = useState([
    {
      name: "All",
      id: "0",
      status: true,
    },
    {
      name: "Activate",
      id: "1",
      status: false,
    },
    {
      name: "Deactivated",
      id: "2",
      status: false,
    },
  ])
  // STATE: second table
  // provider
  const [dealerCat, setDealerCat] = useState([
    {
      name: "All",
      id: "0",
      status: true,
    },
    {
      name: "Activate",
      id: "1",
      status: false,
    },
    {
      name: "Deactivated",
      id: "2",
      status: false,
    },
  ])
  // client
  const [clientCat, setClientCat] = useState([
    {
      name: "All",
      id: "0",
      status: false,
    },
    {
      name: "Client",
      id: "1",
      status: true,
    },
    {
      name: "Trial",
      id: "2",
      status: false,
    },
  ])
  const [dealerVaultStatus, setDealerVaultStatus] = useState([
    {
      name: "All",
      id: "0",
      status: true,
    },
    {
      name: "Activate",
      id: "1",
      status: false,
    },
    {
      name: "Deactivated",
      id: "2",
      status: false,
    },
  ])
  // client
  const [dealerVaultTier, setDealerVaultTier] = useState([
    {
      name: "All",
      id: "0",
      status: false,
    },
    {
      name: "Client",
      id: "1",
      status: true,
    },
    {
      name: "Trial",
      id: "2",
      status: false,
    },
  ])

  // prov handle change - FIRST TABLE
  const provHandleChange = (event) => {
    const { name, checked } = event.target
    const provider = { ...provCat }
    if (name === "All") {
      provider[0].status = checked
      provider[1].status = false
      provider[2].status = false
    } else if (name === "Activate") {
      provider[0].status = false
      provider[1].status = checked
      provider[2].status = false
    } else if (name === "Deactivated") {
      provider[0].status = false
      provider[1].status = false
      provider[2].status = checked
    }
    setProvCat(provider)
  }
  // provider handle change
  const providerHandleChange = (event) => {
    const { name, checked } = event.target

    const dealerFilter = { ...dealerCat }
    if (name === "All") {
      dealerFilter[0].status = checked
      dealerFilter[1].status = false
      dealerFilter[2].status = false
    } else if (name === "Activate") {
      dealerFilter[0].status = false
      dealerFilter[1].status = checked
      dealerFilter[2].status = false
    } else if (name === "Deactivated") {
      dealerFilter[0].status = false
      dealerFilter[1].status = false
      dealerFilter[2].status = checked
    }
    setDealerCat(dealerFilter)
  }
  // dealer handle change
  const clientHandleChange = (event) => {
    const { name, checked } = event.target
    const client = { ...clientCat }
    if (name === "All") {
      client[0].status = checked
      client[1].status = false
      client[2].status = false
    } else if (name === "Client") {
      client[0].status = false
      client[1].status = checked
      client[2].status = false
    } else if (name === "Trial") {
      client[0].status = false
      client[1].status = false
      client[2].status = checked
    }
    setClientCat(client)
  }
  const dealerVaultStatusHandleChange = (event) => {
    const { name, checked } = event.target

    const dealerFilter = { ...dealerVaultStatus }
    if (name === "All") {
      dealerFilter[0].status = checked
      dealerFilter[1].status = false
      dealerFilter[2].status = false
    } else if (name === "Activate") {
      dealerFilter[0].status = false
      dealerFilter[1].status = checked
      dealerFilter[2].status = false
    } else if (name === "Deactivated") {
      dealerFilter[0].status = false
      dealerFilter[1].status = false
      dealerFilter[2].status = checked
    }
    setDealerVaultStatus(dealerFilter)
  }

  const dealerVaultHandleChange = (event) => {
    const { name, checked } = event.target
    const client = { ...dealerVaultTier }
    if (name === "All") {
      client[0].status = checked
      client[1].status = false
      client[2].status = false
    } else if (name === "Client") {
      client[0].status = false
      client[1].status = checked
      client[2].status = false
    } else if (name === "Trial") {
      client[0].status = false
      client[1].status = false
      client[2].status = checked
    }
    setDealerVaultTier(client)
  }

  function createDataProviderTable(id, randomID, dataProviderName, createdAt) {
    return {
      id,
      randomID,
      dataProviderName,
      createdAt,
    }
  }

  function getDealers() {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}DealersWithProvider`)
      .then((res) => {
        if (res.status === 200) setDealers(res.data)
      })
      .catch((error) => console.log(error))
  }
  function getProviders() {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}DataProviders`)
      .then((res) => {
        if (res.status === 200) setProviders(res.data)
      })
      .catch((error) => console.log(error))
  }
  const getDealerVaultFeed = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}DealersWithRoofTopID`)
      .then((res) => {
        if (res.status === 200) setDealerVaultFeed(res.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getDealers()
    getProviders()
    getDealerVaultFeed()
  }, [])

  const rowsProviderTable = []

  const headCellsProviderTable = [
    {
      id: "randomID",
      numeric: false,
      disablePadding: true,
      label: "Provider ID",
    },
    {
      id: "dataProviderName",
      numeric: false,
      disablePadding: false,
      label: "Feed Provider Name",
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Profile Create Date",
    },
  ]
  // DEALER
  function createDataDealerTable(
    id,
    ValidationAlert,
    percentage,
    LastInboundDateTime,
    Business,
    CompanyID,
    PlatformID,
    FeedProvider
  ) {
    return {
      id,
      ValidationAlert,
      percentage,
      LastInboundDateTime,
      Business,
      CompanyID,
      PlatformID,
      FeedProvider,
    }
  }

  function createDealerVaultFeed(
    id,
    alertNoFeed,
    percentage,
    lastInbound,
    dealerGroup,
    dealership,
    companyID,
    platformID,
    dealervaultID
  ) {
    return {
      id,
      alertNoFeed,
      percentage,
      lastInbound,
      dealerGroup,
      dealership,
      companyID,
      platformID,
      dealervaultID,
    }
  }

  const rowsDealerTable = []

  const headCellsDealerTable = [
    {
      id: "ValidationAlert",
      numeric: false,
      disablePadding: true,
      label: "Validation Alert",
    },
    // {
    //   id: "percentage",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "%",
    // },
    {
      id: "LastInboundDateTime",
      numeric: false,
      disablePadding: false,
      label: "Last Inbound Date & Time",
    },
    {
      id: "Business",
      numeric: false,
      disablePadding: false,
      label: "Business",
    },
    {
      id: "CompanyID",
      numeric: false,
      disablePadding: false,
      label: "Company ID",
    },
    {
      id: "PlatformID",
      numeric: false,
      disablePadding: false,
      label: "Platform ID",
    },
    {
      id: "FeedProvider",
      numeric: false,
      disablePadding: false,
      label: "Feed Provider",
    },
  ]

  const rowsDealerVaultTable = []

  const headCellsDealerVaultTable = [
    {
      id: "alertNoFeed",
      numeric: false,
      disablePadding: true,
      label: "Alert No Feed",
    },
    {
      id: "percentage",
      numeric: false,
      disablePadding: false,
      label: "%",
    },
    {
      id: "lastInbound",
      numeric: false,
      disablePadding: false,
      label: "Last Inbound",
    },
    {
      id: "dealerGroup",
      numeric: false,
      disablePadding: false,
      label: "Dealer Group",
    },
    {
      id: "dealership",
      numeric: false,
      disablePadding: false,
      label: "Dealership",
    },
    {
      id: "companyID",
      numeric: false,
      disablePadding: false,
      label: "Company ID",
    },
    {
      id: "platformID",
      numeric: false,
      disablePadding: false,
      label: "Platform ID",
    },
    {
      id: "dealervaultID",
      numeric: false,
      disablePadding: false,
      label: "Dealervault ID",
    },
  ]

  // CHECKBOX FILTERS TABLE 1
  const filteredProvider = useMemo(() => {
    // provider = all
    if (provCat[0].status) {
      return providers
    }
    // provider = active
    else if (provCat[1].status) {
      return providers.filter((provider) => provider.enabled)
    }
    // provider = deactivated
    else if (provCat[2].status) {
      return providers.filter((provider) => !provider.enabled)
    }
  }, [provCat, providers])

  filteredProvider.map((provider) =>
    rowsProviderTable.push(
      createDataProviderTable(
        provider.dataProviderID,
        provider.randomID,
        provider.dataProviderName,
        changeDateFormat(provider.createdAt).split("T")[0]
      )
    )
  )

  // CHECKBOX FILTERS TABLE 2
  const filteredDealer = useMemo(() => {
    // provider = all and client = all
    if (dealerCat[0].status === true && clientCat[0].status === true) {
      return dealers
    }
    // provider = All and client = client
    else if (dealerCat[0].status === true && clientCat[1].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel !== false)
    }
    // provider = All and client = tier
    else if (dealerCat[0].status === true && clientCat[2].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = active and client = all
    else if (dealerCat[1].status === true && clientCat[0].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = active and client = client
    else if (dealerCat[1].status === true && clientCat[1].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = active and client = tier
    else if (dealerCat[1].status === true && clientCat[2].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = deactivated and client = all
    else if (dealerCat[2].status === true && clientCat[0].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = deactivated and client = client
    else if (dealerCat[2].status === true && clientCat[1].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = deactivated and client = tier
    else if (dealerCat[2].status === true && clientCat[2].status === true) {
      return dealers.filter((dealer) => dealer.tierLevel === false)
    }
  }, [dealerCat, clientCat, dealers])

  // loop the data from filteredProvider and push it to row dealer table to generate the rows
  filteredDealer.map((dealer) =>
    rowsDealerTable.push(
      createDataDealerTable(
        dealer.dealerID,
        dealer.validationAlerts.length === 0 ? "*" : dealer.validationAlerts,
        // "100%",
        changeDateFormat(dealer.lastInboudDate),
        dealer.dealer,
        dealer.companyID,
        dealer.platformID,
        dealer.feedProvider
      )
    )
  )

  // CHECKBOX FILTERS TABLE 2
  const filteredDealerVault = useMemo(() => {
    // provider = all and client = all
    if (
      dealerVaultStatus[0].status === true &&
      dealerVaultTier[0].status === true
    ) {
      return dealerVaultFeed
    }
    // provider = All and client = client
    else if (
      dealerVaultStatus[0].status === true &&
      dealerVaultTier[1].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel !== false)
    }
    // provider = All and client = tier
    else if (
      dealerVaultStatus[0].status === true &&
      dealerVaultTier[2].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = active and client = all
    else if (
      dealerVaultStatus[1].status === true &&
      dealerVaultTier[0].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = active and client = client
    else if (
      dealerVaultStatus[1].status === true &&
      dealerVaultTier[1].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = active and client = tier
    else if (
      dealerVaultStatus[1].status === true &&
      dealerVaultTier[2].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = deactivated and client = all
    else if (
      dealerVaultStatus[2].status === true &&
      dealerVaultTier[0].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = deactivated and client = client
    else if (
      dealerVaultStatus[2].status === true &&
      dealerVaultTier[1].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
    // provider = deactivated and client = tier
    else if (
      dealerVaultStatus[2].status === true &&
      dealerVaultTier[2].status === true
    ) {
      return dealerVaultFeed.filter((dealer) => dealer.tierLevel === false)
    }
  }, [dealerVaultTier, dealerVaultStatus, dealerVaultFeed])

  // loop the data from filteredProvider and push it to row dealer table to generate the rows
  filteredDealerVault.map((dealer) =>
    rowsDealerVaultTable.push(
      createDealerVaultFeed(
        dealer.companyID,
        dealer.alerts,
        dealer.percentage,
        dealer.lastInboundDate,
        dealer.dealerGroup,
        dealer.dealership,
        dealer.companyID,
        dealer.platformID,
        dealer.dealerVaultID
      )
    )
  )

  return (
    <LayoutAdminPanel>
      <div className="bg-[#F5F9FF] rounded-xl min-h-[80vh]">
        <div className="flex flex-col items-center">
          <div className="w-full px-[32px] mt-[24px]">
            <div className="text-[#586283] border-b-2 border-[#E0E0E0] pb-[20px]">
              <p className="text-[12px]"> Admin Panel</p>
              <p className="text-[20px] font-bold">Provider Management</p>
            </div>

            <section className="mt-[20px] border-b-2 border-[#E0E0E0] pb-[20px]">
              <h2 className="text-[16px] font-bold text-[#586283]">
                Providers
              </h2>
              <div className="mt-[20px] flex rounded-[12px] bg-white text-[16px] text-[#586283]">
                <div className="w-[250px] p-[24px] bg-[#EAEFF5] rounded-l-[12px] ">
                  <h2 className="font-bold border-b-2 border-[#E0E0E0] pb-[16px]">
                    Provider Filter
                  </h2>
                  <p className="mt-[16px] text-[14px] text-[#2D3032]">
                    Status:
                  </p>
                  <Checkbox
                    label={provCat[0].name}
                    id={provCat[0].id}
                    name={provCat[0].name}
                    checked={provCat[0].status}
                    handleChange={provHandleChange}
                  />
                  <Checkbox
                    label={provCat[1].name}
                    id={provCat[1].id}
                    name={provCat[1].name}
                    checked={provCat[1].status}
                    handleChange={provHandleChange}
                  />
                  <Checkbox
                    label={provCat[2].name}
                    id={provCat[2].id}
                    name={provCat[2].name}
                    checked={provCat[2].status}
                    handleChange={provHandleChange}
                  />
                </div>
                <div>
                  <EnhancedTable
                    headCells={headCellsProviderTable}
                    rows={rowsProviderTable}
                    titleName="Providers"
                  />
                </div>
              </div>
            </section>

            <section className="mt-[20px] border-b-2 border-[#E0E0E0] pb-[20px]">
              <h2 className="text-[16px] font-bold text-[#586283]">Dealers</h2>
              <div className="mt-[20px] flex rounded-[12px] bg-white text-[16px] text-[#586283]">
                <div className="w-[250px] p-[24px] bg-[#EAEFF5] rounded-l-[12px] ">
                  <h2 className="font-bold border-b-2 border-[#E0E0E0] pb-[16px]">
                    Business Filter
                  </h2>
                  <p className="mt-[16px] text-[14px] text-[#2D3032]">
                    Status:
                  </p>
                  <Checkbox
                    label={dealerCat[0].name}
                    id={dealerCat[0].id}
                    name={dealerCat[0].name}
                    checked={dealerCat[0].status}
                    handleChange={providerHandleChange}
                  />
                  <Checkbox
                    label={dealerCat[1].name}
                    id={dealerCat[1].id}
                    name={dealerCat[1].name}
                    checked={dealerCat[1].status}
                    handleChange={providerHandleChange}
                  />
                  <Checkbox
                    label={dealerCat[2].name}
                    id={dealerCat[2].id}
                    name={dealerCat[2].name}
                    checked={dealerCat[2].status}
                    handleChange={providerHandleChange}
                  />
                  <p className="mt-[16px] text-[14px] text-[#2D3032]">
                    Tier Level:
                  </p>
                  <Checkbox
                    label={clientCat[0].name}
                    id={clientCat[0].id}
                    name={clientCat[0].name}
                    checked={clientCat[0].status}
                    handleChange={clientHandleChange}
                  />
                  <Checkbox
                    label={clientCat[1].name}
                    id={clientCat[1].id}
                    name={clientCat[1].name}
                    checked={clientCat[1].status}
                    handleChange={clientHandleChange}
                  />
                  <Checkbox
                    label={clientCat[2].name}
                    id={clientCat[2].id}
                    name={clientCat[2].name}
                    checked={clientCat[2].status}
                    handleChange={clientHandleChange}
                  />
                </div>
                <div>
                  <EnhancedTable
                    headCells={headCellsDealerTable}
                    rows={rowsDealerTable}
                    titleName="Dealers"
                  />
                </div>
              </div>
              <div className="mt-[20px] flex rounded-[12px] bg-white text-[16px] text-[#586283]">
                <div className="w-[250px] p-[24px] bg-[#EAEFF5] rounded-l-[12px] ">
                  <h2 className="font-bold border-b-2 border-[#E0E0E0] pb-[16px]">
                    Business Filter
                  </h2>
                  <p className="mt-[16px] text-[14px] text-[#2D3032]">
                    Status:
                  </p>
                  <Checkbox
                    label={dealerVaultStatus[0].name}
                    id={dealerVaultStatus[0].id}
                    name={dealerVaultStatus[0].name}
                    checked={dealerVaultStatus[0].status}
                    handleChange={dealerVaultStatusHandleChange}
                  />
                  <Checkbox
                    label={dealerVaultStatus[1].name}
                    id={dealerVaultStatus[1].id}
                    name={dealerVaultStatus[1].name}
                    checked={dealerVaultStatus[1].status}
                    handleChange={dealerVaultStatusHandleChange}
                  />
                  <Checkbox
                    label={dealerVaultStatus[2].name}
                    id={dealerVaultStatus[2].id}
                    name={dealerVaultStatus[2].name}
                    checked={dealerVaultStatus[2].status}
                    handleChange={dealerVaultStatusHandleChange}
                  />
                  <p className="mt-[16px] text-[14px] text-[#2D3032]">
                    Tier Level:
                  </p>
                  <Checkbox
                    label={dealerVaultTier[0].name}
                    id={dealerVaultTier[0].id}
                    name={dealerVaultTier[0].name}
                    checked={dealerVaultTier[0].status}
                    handleChange={dealerVaultHandleChange}
                  />
                  <Checkbox
                    label={dealerVaultTier[1].name}
                    id={dealerVaultTier[1].id}
                    name={dealerVaultTier[1].name}
                    checked={dealerVaultTier[1].status}
                    handleChange={dealerVaultHandleChange}
                  />
                  <Checkbox
                    label={dealerVaultTier[2].name}
                    id={dealerVaultTier[2].id}
                    name={dealerVaultTier[2].name}
                    checked={dealerVaultTier[2].status}
                    handleChange={dealerVaultHandleChange}
                  />
                </div>
                <div>
                  <EnhancedTable
                    headCells={headCellsDealerVaultTable}
                    rows={rowsDealerVaultTable}
                    titleName="Dealer's With A Dealervault Feed"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </LayoutAdminPanel>
  )
}

export default ProviderManagement
