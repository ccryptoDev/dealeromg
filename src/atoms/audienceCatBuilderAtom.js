import { atom } from "recoil"

export const audienceCatBuilderState = atom({
  key: "audienceCatBuilderAtom",
  default: [
    { name: "Household Demographics", status: false },
    { name: "Household Income, Wealth Assets & Home Value", status: false },
    { name: "Credit Repair Interest & Credit Report Interest", status: false },
    { name: "Education Level", status: false },
    { name: "Occupation", status: false },
    { name: "Gender, Age & Speaks Spanish", status: false },
    { name: "Purchase Likelihood", status: false },
    { name: "Brand Loyalty", status: false },
    { name: "Vehicle Purchase Date", status: false },
    { name: "Vehicle Fuel", status: false },
    { name: "Vehicle Class", status: false },
    { name: "Vehicle Mileage", status: false },
    { name: "Vehicle Year", status: false },
    { name: "Vehicle Models", status: false },
    { name: "Vehicle Makes", status: false },
    { name: "Zip Code Radius", status: true },
  ],
})

export const filtersValuesState = atom({
  key: "filtersValuesState",
  default: {
    pids: null,
    fuelTypeCodes: null,
    ocupationCodes: null,
    makes: null,
    models: null,
    vehicleClasses: null,
    zipCodes: null,
    genders: null,
    mileageCodeList: null,
    inferredPurchasedDates: null,
    allWealthAssests: null,
    homeValues: null,
    childrens: null,
    ageRange: null,
    yearRange: null,
    newMarketScoreRange: null,
    usedMarketScoreRange: null,
    teenagerDriver: null,
    speakSpanish: null,
    veteranInHome: null,
    purshaceLikelihood: null,
    creditRepairInterest: null,
    creditReportInterest: null,
    lenghtResidence: null,
    householdIncome: null,
    zipCodeCenter: null,
    zipCodeRadius: null,
    zipCodesCount: null,
    brandLoyalty: null,
    educationLevel: null,
  },
})

export const recordCountValuesState = atom({
  key: "recordCountValuesState",
  default: {
    pids: null,
    fuelTypeCodes: null,
    ocupationCodes: null,
    makes: null,
    models: null,
    vehicleClasses: null,
    zipCodes: null,
    genders: null,
    mileageCodeList: null,
    inferredPurchasedDates: null,
    allWealthAssests: null,
    homeValues: null,
    householdIncome: null,
    childrens: null,
    ageRange: { initialValue: 18, finalValue: 99 },
    yearRange: null,
    newMarketScoreRange: null,
    usedMarketScoreRange: null,
    teenagerDriver: null,
    speakSpanish: null,
    veteranInHome: null,
    creditRepairInterest: null,
    creditReportInterest: null,
    educationLevel: null,
  },
})

export const csvFacebookData = atom({
  key: "csvFacebookData",
  default: [],
})

export const recordCountNumber = atom({
  key: "recordCountNumber",
  default: { value: null },
})

export const FinalWhereClsAM = atom({
  key: "FinalWhereClsAM",
  default: { sql: "" },
})

export const Spiner = atom({
  key: "Spiner",
  default: false,
})
