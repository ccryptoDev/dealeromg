import { atom } from "recoil"

export const primeConsultant = atom({
  key: "primeConsultant",
  default: {
    userid: "",
    rolename: "",
    firstname: "",
    lastname: "",
    title: "",
    phone: "",
    email: "",
    department: "",
    photo: "",
    status: false,
  },
})
