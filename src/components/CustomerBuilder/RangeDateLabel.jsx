import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file

const RangeDateLabel = ({ setDays }) => {
  const daysSelection = (e) => {
    let initialSelection = ""
    let endSelection = ""
    switch (e.target.innerText) {
      case "Last 30 Days":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 30)
        endSelection = new Date()
        break
      case "Last 3 Months":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 90)
        endSelection = new Date()
        break
      case "Last 6 Months":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 180)
        endSelection = new Date()
        break
      case "Last 12 Months":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 365)
        endSelection = new Date()
        break
      case "Last 2 Years":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 730)
        endSelection = new Date()
        break
      case "Last 3 Years":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 1096)
        endSelection = new Date()
        break
      case "Last 4 Years":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 1461)
        endSelection = new Date()
        break
      case "Last 5 Years":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 1826)
        endSelection = new Date()
        break
      case "Last 10 Years":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 3653)
        endSelection = new Date()
        break
      case "Last 2-7 Years":
        initialSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 2557)
        endSelection = new Date(Date.now() - 24 * 60 * 60 * 1000 * 730)
        break
      default:
        break
    }

    setDays([
      {
        startDate: initialSelection,
        endDate: endSelection,
        key: "selection",
      },
    ])
  }

  const inputDaysHandler = (e) => {
    const { value } = e.target
    const date = new Date()
    if (e.target.id === "past") {
      date.setDate(date.getDate() - value)
      setDays([
        {
          startDate: date,
          endDate: new Date(),
          key: "selection",
        },
      ])
    } else {
      date.setDate(date.getDate() + +value)
      setDays([
        {
          startDate: new Date(),
          endDate: date,
          key: "selection",
        },
      ])
    }
  }

  return (
    <div className="rdrDefinedRangesWrapper">
      <div className="rdrStaticRanges" onClick={daysSelection}>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 30 Days
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 3 Months
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 6 Months
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 12 Months
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 2 Years
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 3 Years
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 4 Years
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 5 Years
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 10 Years
          </span>
        </button>
        <button type="button" className="rdrStaticRange">
          <span tabIndex="-1" className="rdrStaticRangeLabel">
            Last 2-7 Years
          </span>
        </button>
      </div>
      <div className="rdrInputRanges">
        <div className="rdrInputRange">
          <input
            className="rdrInputRangeInput"
            placeholder="-"
            min="0"
            max="99999"
            onChange={inputDaysHandler}
            id="past"
          />
          <span>days up to today</span>
        </div>
        <div className="rdrInputRange">
          <input
            className="rdrInputRangeInput"
            placeholder="-"
            min="0"
            max="99999"
            onChange={inputDaysHandler}
            id="future"
          />
          <span>days starting today</span>
        </div>
      </div>
    </div>
  )
}

export default RangeDateLabel
