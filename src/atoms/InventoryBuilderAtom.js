import { atom } from "recoil"

export const filterInventoryBuilder = atom({
  key: "filterInventoryBuilder",
  default: {
    id: 0,
    dealerId: 0,
    destination: "all",
    typeList: [],
    minDaysOnLot: null,
    maxDaysOnLot: null,
    makeList: [],
    modelList: [],
    vehicleStyleList: [],
    minDealerPrice: null,
    maxDealerPrice: null,
    minMileage: null,
    maxMileage: null,
    inventoryRefill: true,
    dateInventoryRefill: null,
    minViews: null,
    maxViews: null,
    minImageCount: null,
    maxImageCount: null,
    viewLimiter: false,
    oneImageOrLess: false,
    minYear: null,
    maxYear: null,
  },
})
export const valuesInventoryBuilder = atom({
  key: "valuesInventoryBuilder",
  default: {
    typeList: [],
    minDaysOnLot: null,
    maxDaysOnLot: null,
    makeList: [],
    modelList: [],
    vehicleStyleList: [],
    minDealerPrice: null,
    maxDealerPrice: null,
    minMileage: null,
    maxMileage: null,
    inventoryRefill: true,
    dateInventoryRefill: null,
    minViews: null,
    maxViews: null,
    minImageCount: null,
    maxImageCount: null,
    viewLimiter: false,
    oneImageOrLess: false,
    minYear: null,
    maxYear: null,
  },
})

export const resultValuesInvBuilder = atom({
  key: "resultValuesInvBuilder",
  default: {
    typeList: [],
    minDaysOnLot: null,
    maxDaysOnLot: null,
    makeList: [],
    modelList: [],
    vehicleStyleList: [],
    minDealerPrice: null,
    maxDealerPrice: null,
    minMileage: null,
    maxMileage: null,
    minViews: null,
    maxViews: null,
    minImageCount: null,
    maxImageCount: null,
    minYear: null,
    maxYear: null,
  },
})

export const refreshInventoryBuilder = atom({
  key: "refreshInventoryBuilder",
  default: true,
})

export const presetBuilder = atom({
  key: "presetBuilder",
  default: {
    name: null,
  },
})

export const amountSets = atom({
  key: "amountSets",
  default: {
    ms: 0,
    fb: 0,
  },
})
