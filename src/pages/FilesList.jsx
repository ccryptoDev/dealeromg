import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function FilesList() {
  const { platform_id: platformID } = useParams()
  const [files, setFiles] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (url = "empty url") => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setShowMessage(true)
    setTimeout(() => {
      setShowMessage(false)
      setCopied(false)
    }, 10000)
  }

  const getFiles = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Files/${platformID}`)
      .then((res) => {
        setShowMessage(false)
        setFiles(res.data[0])
      })
      .catch((error) => {
        setShowMessage(true)
        console.log(error)
      })
  }

  useEffect(() => {
    getFiles()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      {showMessage ? (
        <div className="flex w-full justify-center mt-8">
          <div
            className={
              !copied
                ? "text-white bg-[#ff0000] py-2 rounded-md space-x-2 flex justify-center mb-4 w-[550px]"
                : "text-white bg-[#013220] py-2 rounded-md space-x-2 flex justify-center mb-4 w-[550px]"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-white font-bold text-[15px]">
              {!copied
                ? "An error occurred when searching for the url of the files."
                : "Url copied to clipboard."}
            </h3>
          </div>
        </div>
      ) : (
        ""
      )}
      <h1 className="font-bold text-[#586283] text-[25px] mt-8">
        {files?.dealer?.businessName}
      </h1>
      {files?.destinations?.map((file, index) => (
        <div
          className="flex flex-row mt-[20px] text-[#586283] items-center text-[20px] space-x-3"
          key={index}
        >
          <p>
            {`${files?.dealer?.crmCompanyID}-${files?.dealer?.businessName}-${
              file?.file?.split("destination/")[1]
            }-inventory.csv`.replaceAll(" ", "_")}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => {
              handleCopy(file.file)
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <a key={file.destination_id} href={file.file}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  )
}

export default FilesList
