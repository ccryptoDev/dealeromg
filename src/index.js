import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./routes/App"
import "flowbite"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
