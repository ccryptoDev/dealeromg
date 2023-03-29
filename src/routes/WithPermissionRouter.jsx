import React from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { useRecoilState } from "recoil"

import { dealerInfo } from "../atoms/DealerAtom"
import useAuth from "../Hooks/useAuth"

export default function WithPermissionRouter({
  children,
  loggedNeeded = true,
  rols = [""],
  grantByRols = false,
  permissions = [""],
  grantByPermissions = false,
  requireDealer = false,
}) {
  const history = useNavigate()
  const [dealerInfoValue] = useRecoilState(dealerInfo)

  const authPermRols = useAuth(
    permissions,
    grantByPermissions,
    rols,
    grantByRols
  )

  if (!authPermRols[0] && loggedNeeded) {
    return <Navigate to="/login" />
  }

  if (
    requireDealer &&
    dealerInfoValue.crmCompanyID === null &&
    dealerInfoValue.businessName === "TestUserIOD" &&
    loggedNeeded
  ) {
    return <Navigate to="/" />
  }

  if (!authPermRols[2] && grantByRols && loggedNeeded) {
    history(-1)
  }

  if (!loggedNeeded && authPermRols[0]) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
