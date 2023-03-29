import React from "react"
import SwitchFilter from "../Fields/SwitchFilter"

const PrevSerROCode = () => {
  return (
    <SwitchFilter
      next={"No Service in a Date Range"}
      prev={"Never Purchased a Vehicle"}
      custBuild={true}
    />
  )
}

export default PrevSerROCode
