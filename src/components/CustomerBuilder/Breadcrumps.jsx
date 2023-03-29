import { useRecoilState } from "recoil"
// component
import { customerBuilderState } from "../../atoms/CustomerBuilderAtom"

function Breadcrumps() {
  let breadCrumbTitle = ""
  const show = useRecoilState(customerBuilderState)[0]
  const showIndex = show.findIndex((item) => item.status === true)
  if (showIndex <= 16 && showIndex >= 14) {
    breadCrumbTitle = "Geographic"
  } else if (showIndex <= 13 && showIndex >= 10) {
    breadCrumbTitle = "Previously Purchased a Vehicle"
  } else if (showIndex <= 9 && showIndex >= 2) {
    breadCrumbTitle = "Previously Serviced a Vehicle"
  } else if (showIndex === 1 || showIndex === 0) {
    breadCrumbTitle = "Never Serviced a Vehicle"
  }

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Customer Builds
          </a>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">
              {breadCrumbTitle}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

export default Breadcrumps
