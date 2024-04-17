import { useEffect, useState } from "react"

export const StaticInputs = ({ sentValues, minBack, maxBack }) => {
  const [min, setMin] = useState(minBack)
  const [max, setMax] = useState(maxBack)
  const handleClick = () => {
    sentValues("", [min, max])
  }

  useEffect(() => {
    setMin(minBack)
    setMax(maxBack)
  }, [minBack, maxBack])

  return (
    <div className="flex space-x-2 items-center w-full">
      <input
        className="h-[38px] w-full text-black rounded-lg border-none text-xs focus:ring-[#58628325] hide-arrow"
        type="number"
        value={min ?? ""}
        onChange={(e) => setMin(e.target.value)}
      />
      <span className="text-xs text-[#586283]">to</span>
      <input
        className="h-[38px] w-full text-black rounded-lg border-none text-xs focus:ring-[#58628325] hide-arrow"
        type="number"
        value={max ?? ""}
        onChange={(e) => setMax(e.target.value)}
      />
      <button
        type="button"
        className="flex w-6 items-center justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-1 py-1 text-center"
        onClick={handleClick}
      >
        Go
      </button>
    </div>
  )
}
