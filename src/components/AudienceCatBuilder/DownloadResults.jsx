import { useRecoilState } from "recoil"
import axios from "axios"
import { useState } from "react"

import { dealerInfo } from "../../atoms/DealerAtom"
import {
  FinalWhereClsAM,
  filtersValuesState,
} from "../../atoms/audienceCatBuilderAtom"
import useAuth from "../../Hooks/useAuth"

function DownloadResults() {
  const [FinalWhereCls] = useRecoilState(FinalWhereClsAM)
  const [facebookSpinner, setFacebookSpinner] = useState(false)
  const dealerInfoValue = useRecoilState(dealerInfo)[0]
  const filtersValues = useRecoilState(filtersValuesState)[0]
  const [fileName, setFileName] = useState(
    `Audience-Builder-${new Date().toLocaleDateString()}.csv`
  )
  const [showNamingFile, setShowNamingFile] = useState(false)
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff", "Business"],
    true
  )

  const changeFileName = (e) => {
    setShowNamingFile(true)
  }

  const csvDataDownload = () => {
    setShowNamingFile(false)
    setFacebookSpinner(true)
    const dealerIDLog = JSON.parse(
      localStorage.getItem("permissionsDealerOMG")
    ).userID
    axios({
      url: `${process.env.REACT_APP_API_DOMG}BigQuery/getConsumersListCSV`,
      method: "POST",
      responseType: "blob",
      data: {
        sql: FinalWhereCls.sql,
        roofTopID: dealerInfoValue.rooftopID,
        sqlService: filtersValues.excludeService
          ? `${filtersValues.excludeService}`
          : "",
        sqlSales: filtersValues.excludeSales
          ? `${filtersValues.excludeSales}`
          : "",
        fileName: `${fileName}.csv`,
        userId: dealerIDLog,
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `${fileName}.csv`)
      document.body.appendChild(link)
      link.click()
      setFacebookSpinner(false)
    })
  }

  return (
    <>
      {authPermRols[2] ? (
        <div className="flex flex-col mt-4 bg-[#48578F] p-[20px] rounded-[12px]">
          <h1 className="font-bold mb-2 text-[#FFFFFF]">
            CSV Audience Download
          </h1>
          <button
            type="button"
            className="mb-4 text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
            onClick={changeFileName}
          >
            {facebookSpinner ? (
              <>
                <svg
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-[#586283]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-[14px] font-normal">
                  Generating File..
                </span>
              </>
            ) : (
              <>
                <svg
                  data-accordion-icon
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                  ></path>
                </svg>
                <p>Facebook</p>
              </>
            )}
          </button>
          <button
            type="button"
            className="mb-4 text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
          >
            <svg
              data-accordion-icon
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              ></path>
            </svg>
            <p>Amazon</p>
          </button>
          <button
            type="button"
            className="mb-4 text-white bg-[#298FC2] rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
          >
            <svg
              data-accordion-icon
              className="w-6 h-6 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              ></path>
            </svg>
            <p>All Data</p>
          </button>
        </div>
      ) : null}
      {showNamingFile ? (
        <div className="flex flex-col space-y-4 mb-2 mt-2 bg-[#48578F] p-[20px] rounded-[12px]">
          <input
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File Name"
            className="rounded-xl p-[16px]  focus:outline-[#58628325]"
          />
          <button
            onClick={csvDataDownload}
            className="flex items-center w-full justify-around text-white bg-[#298FC2] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Download CSV
          </button>
        </div>
      ) : null}
    </>
  )
}

export default DownloadResults
