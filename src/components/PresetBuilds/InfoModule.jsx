function InfoModule() {
  return (
    <div
      className="flex flex-col justify-center items-center p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
      role="alert"
    >
      <svg
        height="24"
        viewBox="0 0 48 48"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h48v48h-48z" fill="none" />
        <path
          fill="#1d4ed8"
          d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"
        />
      </svg>
      <div className="flex flex-col gap-2">
        <span className="font-bold self-center">Restore a Build</span>
        <p>
          Click on the plus {""}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline h-4 w-4"
            viewBox="0 0 20 20"
            fill="#E57200"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>{" "}
          icon or the build title to re-initiate the saved build.
        </p>
      </div>
    </div>
  )
}

export default InfoModule
