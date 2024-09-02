import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import useAuth from "../Hooks/useAuth"

// Images
import vinAMPlogo from "../assets/logos/vinAMPlogo.png"
import dealerOmg from "../assets/logos/logo.png"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import check from "../assets/images/check.svg"

const SimpleMFACodePage = () => {
  const authPerm = useAuth([""], false)
  const [info, setInfo] = useState({
    mfAcode: "",
    userID: "",
  })
  const [wrong, setWrong] = useState(null)
  const history = useNavigate()

  const handleCode = (e) => {
    setInfo({ ...info, mfAcode: e.target.value })
  }

  const sendCode = () => {
    const user = JSON.parse(localStorage.getItem("permissionsDealerOMG"))
    setInfo({ ...info, userID: user.userID })
    axios
      .post(
        `${process.env.REACT_APP_API_DOMG}GenerateMFA?userId=${user.userID}`
      )
      .then((res) => {
        if (res.status === 200) {
          setWrong(null)
        } else {
          setWrong("The validation code was not generated. Try again.")
        }
      })
      .catch((err) => {
        console.log(err)
        setWrong("The validation code was not generated. Try again.")
      })
  }

  useEffect(() => {
    if (authPerm[0]) {
      history("/")
      return null
    }
    sendCode()
  }, [])

  const setStatus = () => {
    axios
      .post(`${process.env.REACT_APP_API_DOMG}ValidateMFA`, info)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("tokenDealerOMG", res.data.token)
          localStorage.setItem(
            "permissionsDealerOMG",
            JSON.stringify(res.data.user)
          )
          history("/")
        } else {
          setWrong("The validation code failed. Try again.")
        }
      })
      .catch((err) => {
        console.log(err)
        setWrong("The validation code failed. Try again.")
      })
  }

  return (
    <div className="flex w-[100vw] h-[100vh] bg-[#002E5D] text-white px-4 py-5 bg-login-background bg-cover object-cover bg-center">
      {/* left side */}
      <div className="flex-col w-1/2 px-4">
        <figure className="h-1/2 pt-8">
          <img
            src={dealerOmg}
            className="w-[200px] h-[56px]"
            alt="Dealer OMG logo"
          />
        </figure>
        <h1 className="absolute bottom-14 text-6xl font-black">Validate</h1>
      </div>
      {/* right side - form */}
      <div className="bg-[#F1F6FB] w-1/2 rounded-2xl flex justify-center items-center p-5">
        <section className="flex flex-col gap-3">
          <figure className="flex justify-center mb-8">
            <img src={vinAMPlogo} alt="Vin logo" />
          </figure>
          <form className="flex flex-col gap-3">
            {wrong ? (
              <div className="flex w-full justify-center">
                <div className="bg-red-600 py-2 rounded-md flex justify-center mb-4 w-[550px]">
                  <img
                    className="mx-2 pt-[4px] h-[85%]"
                    src={check}
                    alt="check"
                  />
                  <h3 className="text-white font-bold text-[15px]">{wrong}</h3>
                </div>
              </div>
            ) : null}
            <div className="flex w-[286px] justify-center">
              <div className="py-2 rounded-md flex justify-center mb-4 w-[550px]">
                <span className="text-black font-bold text-[15px]">
                  To protect your account, vinAMP just sent you an email with a
                  unique Two-Factor Authentication code. Enter that code here to
                  complete your login.
                </span>
              </div>
            </div>
            <input
              type="text"
              name="code"
              onChange={handleCode}
              className="rounded-md h-[60px] w-[286px] p-[16px] border-none login_input--password text-black"
              placeholder="Code"
            />
          </form>
          <div className="flex justify-between items-center gap-4">
            <Link
              to="/login"
              className="text-[#586283] text-[12px] font-black underline"
            >
              Back
            </Link>
            <button
              className="flex items-center w-[127px] justify-between text-white bg-[#E57200] font-bold rounded-md text-base px-5 py-2.5 text-center mr-2 my-2"
              onClick={setStatus}
            >
              Log In
              <ArrowForwardIcon />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SimpleMFACodePage
