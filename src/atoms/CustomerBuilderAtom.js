import { atom } from "recoil"

export const customerBuilderState = atom({
  key: "customerBuilderState",
  default: [
    { name: "Previously Purchased a Vehicle", status: false },
    { name: "No Services in a Date Range", status: false },
    { name: "RO Code", status: false },
    { name: "Never Purchased a Vehicle", status: false },
    { name: "Total Service Count", status: false },
    { name: "Total Spend", status: false },
    { name: "Vehicle Year", status: false },
    { name: "Models", status: false },
    { name: "Makes", status: false },
    { name: "Services in a Date Range", status: false },
    { name: "Year", status: false },
    { name: "Vehicle Models", status: false },
    { name: "Vehicle Makes", status: false },
    { name: "Date Range", status: false },
    { name: "State", status: false },
    { name: "DMA", status: false },
    { name: "Zip Code Radius", status: true },
  ],
})

export const filtersValuesStateCB = atom({
  key: "filtersValuesStateCB",
  default: {
    states: null,
    neverPurchased: null,
    zipCodes: null,
    yearRange: null,
    prevPurchYear: null,
    zipCodeCenter: null,
    zipCodeRadius: null,
    zipCodesCount: null,
    nevSerDateRange: null,
    nevSerPrevPurch: null,
    prevPurchMake: null,
    prevPurchModel: null,
    prevPurchDateRange: null,
    prevSerMake: null,
    prevSerModel: null,
    prevSerNeverPurch: null,
    prevSerTotalService: null,
    prevSerTotalSpend: null,
    PrevSerDateRange: null,
  },
})

export const recordCountValuesStateCB = atom({
  key: "recordCountValuesStateCB",
  default: {
    states: null,
    neverPurchased: null,
    zipCodes: null,
    yearRange: null,
    prevPurchYear: null,
    zipCodeCenter: null,
    zipCodeRadius: null,
    zipCodesCount: null,
    nevSerDateRange: null,
    nevSerPrevPurch: null,
    prevPurchMake: null,
    prevPurchModel: null,
    prevPurchDateRange: null,
    prevSerMake: null,
    prevSerModel: null,
    prevSerNeverPurch: null,
    prevSerTotalService: null,
    prevSerTotalSpend: null,
    PrevSerDateRange: null,
  },
})

export const csvFacebookDataCB = atom({
  key: "csvFacebookDataCB",
  default: [],
})

export const recordCountNumberCB = atom({
  key: "recordCountNumberCB",
  default: { value: null },
})

export const FinalWhereClsCBService = atom({
  key: "FinalWhereClsCBService",
  default: { sql: " AND 1=0" },
})

export const FinalWhereClsCBSale = atom({
  key: "FinalWhereClsCBSale",
  default: { sql: " AND 1=0" },
})

export const SpinerCB = atom({
  key: "SpinerCB",
  default: false,
})
