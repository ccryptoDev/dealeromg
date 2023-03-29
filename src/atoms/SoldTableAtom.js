import { atom } from "recoil"

export const filterSoldTable = atom({
  key: "filterSoldTable",
  default: {
    dealerId: null,
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
    minImageCount: null,
    maxImageCount: null,
    minYear: null,
    maxYear: null,
    minDateSold: null,
    maxDateSold: null,
    recordStatus: [2, 3],
  },
})

export const valuesSoldTable = atom({
  key: "valuesSoldTable",
  default: {
    dealerId: null,
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
    minImageCount: null,
    maxImageCount: null,
    minYear: null,
    maxYear: null,
    minDateSold: null,
    maxDateSold: null,
    recordStatus: [2, 3],
  },
})

export const refreshSold = atom({
  key: "refreshSold",
  default: true,
})
