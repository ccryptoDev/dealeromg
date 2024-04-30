import React from "react"
import SwitchFilter from "../Fields/SwitchFilter"

const PrevSerROCode = () => {
  return (
    <SwitchFilter
      next={"Previously Purchased a Vehicle"}
      prev={"Never Purchased a Vehicle"}
      custBuild={true}
    />
  )
}

export default PrevSerROCode
