import React from "react"

import useAuth from "../../Hooks/useAuth"

function General({ nameBuilds, preset, handleSet, handleDelete }) {
  const authPermRols = useAuth([""], false, ["super-admin", "admin"], true)
  return (
    <div className="flex flex-col">
      <fieldset className="h-auto">
        <div className="flex flex-row mb-4 justify-between items-center bg-white p-3 rounded-lg">
          <div className="flex flex-col" key={preset.presetID}>
            <p className="ml-3 text-sm font-medium text-[#586283]">
              {preset.createdAt.replace("T", " ")}
            </p>
            <p
              className="ml-3 text-sm font-bold text-[#586283] cursor-pointer"
              onClick={() => handleSet(preset.presetID)}
            >
              {`Pre-Set | ${preset.presetName} | ${preset.tags.join(" | ")}`}
            </p>
          </div>
          <div className="flex flex-row space-x-4">
            {nameBuilds === "Global" ? (
              authPermRols[2] ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#E57200] cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => handleDelete(preset.presetID)}
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : null
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#E57200] cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => handleDelete(preset.presetID)}
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#E57200] cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => handleSet(preset.presetID)}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default General
