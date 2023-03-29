import React, { useState } from "react"
import { useRecoilState } from "recoil"
import {
  filterInventoryBuilder,
  refreshInventoryBuilder,
} from "../../atoms/InventoryBuilderAtom.js"
import { filterSoldTable, refreshSold } from "../../atoms/SoldTableAtom.js"

const VehStyleFilter = ({ valuesInvBuilder, setShowStyleModal, view }) => {
  const [check, setCheck] = useState([])
  const [filters, setFilters] = useRecoilState(
    view !== "sold" ? filterInventoryBuilder : filterSoldTable
  )
  const [refresh, setRefresh] = useRecoilState(
    view !== "sold" ? refreshInventoryBuilder : refreshSold
  )
  const newFormat = valuesInvBuilder.vehicleStyleList.map((style) => {
    return `${style.charAt(0).toUpperCase()}${style.slice(1).toLowerCase()}`
  })

  const handleChangeStyle = (event) => {
    if (event.target.checked) {
      setCheck((prevState) => [...prevState, event.target.value.toUpperCase()])
    } else {
      setCheck(
        check.filter((value) => value !== event.target.value.toUpperCase())
      )
    }
    // setRenderType(true)
  }

  return (
    <>
      <h1 className="font-bold text-[#586283] text-[20px]">Styles</h1>
      <fieldset className="grid grid-cols-4 mt-4 h-auto">
        <p className="sr-only">Style</p>
        {newFormat.map((style, id) => (
          <div
            className="flex items-center mb-4 2xl:text-[14px] text-[12px]"
            key={id}
          >
            <input
              id={`${id}styles`}
              checked={check?.find((value) => value === style.toUpperCase())}
              onChange={handleChangeStyle}
              value={style}
              aria-describedby={`checkbox-${id}`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${id}makes`}
              className="mx-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {style}
            </label>
          </div>
        ))}
      </fieldset>
      <div className="flex justify-between w-full bg-white rounded-lg mt-4">
        <button
          className="bg-[#586283] text-white rounded-lg text-sm px-5 py-2.5 text-center mx-4 my-2"
          onClick={() => {
            setShowStyleModal(false)
          }}
        >
          Close
        </button>
        <button
          className="bg-[#298FC2] text-white rounded-lg text-sm px-5 py-2.5 text-center mx-4 my-2"
          onClick={() => {
            setShowStyleModal(false)
            setFilters({ ...filters, vehicleStyleList: check })
            setRefresh(!refresh)
            setCheck([])
          }}
        >
          Submit
        </button>
      </div>
    </>
  )
}

export default VehStyleFilter
