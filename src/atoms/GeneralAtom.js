import { atom } from "recoil"

// Share navbar between AdminPanel and BusinessSettings and Main
export const showNavbarBusinessAdminMain = atom({
  key: "showNavbarBusinessAdminMain",
  default: {
    tab1: true,
    tab2: false,
    tab3: false,
  },
})
