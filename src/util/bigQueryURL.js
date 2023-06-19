export const bigQueryURL = (
  neverPurchased,
  nevSerPrevPurch,
  nevSerDateRange = false,
  prevPurchDateRange = false
) => {
  const bigQueryURL = {
    url: "",
    csv: "",
  }
  const notExcludeQuery = !neverPurchased && !nevSerPrevPurch

  const excludeSalesVehicleQuery = !neverPurchased && nevSerPrevPurch

  const excludeServiceVehicleQuery = neverPurchased && !nevSerPrevPurch

  const excludeSalesServiceQuery = neverPurchased && nevSerPrevPurch

  const includeSalesNeverServiceQuery = !!(
    nevSerDateRange &&
    nevSerDateRange[0] &&
    prevPurchDateRange &&
    prevPurchDateRange[0]
  )

  if (includeSalesNeverServiceQuery) {
    bigQueryURL.url = "getDealerVaultCountFromBQSalesNeverService"
    bigQueryURL.csv = "getDealerVaultListSalesNeverServiceCSV"
  } else if (notExcludeQuery) {
    bigQueryURL.url = "getDealerVaultCountFromBigQuery"
    bigQueryURL.csv = "getDealerVaultListCSV"
  } else if (excludeSalesVehicleQuery) {
    bigQueryURL.url = "getDealerVaultCountSalesFromBigQuery"
    bigQueryURL.csv = "getDealerVaultListSalesCSV"
  } else if (excludeServiceVehicleQuery) {
    bigQueryURL.url = "getDealerVaultCountServiceFromBigQuery"
    bigQueryURL.csv = "getDealerVaultListServiceCSV"
  } else if (excludeSalesServiceQuery) {
    bigQueryURL.url = "getDealerVaultCountBothFromBigQuery"
    bigQueryURL.csv = "getDealerVaultListBothCSV"
  }
  return bigQueryURL
}
