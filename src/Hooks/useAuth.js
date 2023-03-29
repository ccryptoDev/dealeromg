function useAuth(
  permissons,
  lookUpPermissons = false,
  rols = [],
  lookUpRols = false
) {
  const user = JSON.parse(localStorage.getItem("permissionsDealerOMG"))
  const userPermissons = user?.policies.map((policy) => policy.policySlug)
  const userRol = user?.role?.roleName
  const localtoken = localStorage.getItem("tokenDealerOMG")
  let auth = false
  let userAccessP = false
  let userAccessR = false

  if (localtoken) {
    auth = true
  }

  if (lookUpPermissons) {
    for (let i = 0; i < permissons.length; i++) {
      if (userPermissons.includes(permissons[i])) {
        userAccessP = true
      }
    }
  }

  if (lookUpRols) {
    if (rols.includes(userRol)) {
      userAccessR = true
    }
  }

  return [auth, userAccessP, userAccessR]
}

export default useAuth
