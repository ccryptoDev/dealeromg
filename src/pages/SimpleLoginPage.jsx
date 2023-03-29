import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import useAuth from "../Hooks/useAuth"

// Images
import vinAMPlogo from "../assets/logos/vinAMPlogo.png"
import dealerOmg from "../assets/logos/logo.png"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import check from "../assets/images/check.svg"

const SimpleLoginPage = () => {
  const authPerm = useAuth([""], false)
  const [pss, setPss] = useState("")
  const [user, setUser] = useState("")
  const [wrong, setWrong] = useState("NO")
  const history = useNavigate()

  const handleUser = (e) => {
    setUser(e.target.value)
  }

  const handlePss = (e) => {
    setPss(e.target.value)
  }

  useEffect(() => {
    if (authPerm[0]) {
      history("/")
      return null
    }
  }, [])

  const setStatus = () => {
    axios
      .post(`${process.env.REACT_APP_API_DOMG}Login`, {
        user,
        password: pss,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("tokenDealerOMG", res.data.token)
          localStorage.setItem(
            "permissionsDealerOMG",
            JSON.stringify(res.data.user)
          )
          history("/")
        } else {
          setWrong("YES")
        }
      })
      .catch((err) => {
        console.log(err)
        setWrong("YES")
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
        <h1 className="absolute bottom-14 text-6xl font-black">Welcome</h1>
      </div>
      {/* right side - form */}
      <div className="bg-[#F1F6FB] w-1/2 rounded-2xl flex justify-center items-center p-5">
        <section className="flex flex-col gap-3">
          <figure className="flex justify-center mb-8">
            <img src={vinAMPlogo} alt="Vin logo" />
          </figure>
          <form className="flex flex-col gap-3">
            {wrong === "YES" ? (
              <div className="flex w-full justify-center">
                <div className="bg-red-600 py-2 rounded-md flex justify-center mb-4 w-[550px]">
                  <img
                    className="mx-2 pt-[4px] h-[85%]"
                    src={check}
                    alt="check"
                  />
                  <h3 className="text-white font-bold text-[15px]">
                    The password or username failed. Try again.
                  </h3>
                </div>
              </div>
            ) : null}
            <input
              type="email"
              name="email"
              onChange={handleUser}
              className="rounded-md h-[60px] w-[286px] border-none login_input--user text-black"
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              onChange={handlePss}
              className="rounded-md h-[60px] w-[286px] p-[16px] border-none login_input--password text-black"
              placeholder="Password"
            />
          </form>
          <div className="flex justify-between items-center gap-4">
            <Link
              to="/forgot-password"
              className="text-[#586283] text-[12px] font-black underline"
            >
              Forgot your password?
            </Link>
            <button
              className="flex items-center w-[127px] justify-between text-white bg-[#E57200] font-bold rounded-md text-base px-5 py-2.5 text-center mr-2 my-2"
              onClick={setStatus}
            >
              Login
              <ArrowForwardIcon />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SimpleLoginPage
