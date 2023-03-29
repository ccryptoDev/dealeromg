import { atom } from "recoil"

export const profilesEntryPage = atom({
  key: "profilesEntryPage",
  default: [
    {
      name: "Clients",
      id: "0",
      selected: true,
    },
    {
      name: "Trial",
      id: "1",
      selected: false,
    },
    {
      name: "All",
      id: "2",
      selected: false,
    },
  ],
})

export const profilesEntryPageActiveInactive = atom({
  key: "profilesEntryPageActiveInactive",
  default: [
    {
      name: "Active Accounts",
      id: "0",
      selected: true,
    },
    {
      name: "Inactive Accounts",
      id: "1",
      selected: false,
    },
  ],
})
