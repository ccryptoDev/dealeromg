import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

// Images
import vinAMPlogo from "../assets/logos/vinAMPlogo.png";
import dealerOmg from "../assets/logos/logo.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import check from "../assets/images/check.svg";

const PasswordRecovery = () => {
  const [pss, setPss] = useState("");
  const [secondPss, setSecondPss] = useState("");
  const [wrong, setWrong] = useState("");
  const [searchParams] = useSearchParams();
  const history = useNavigate();

  const handleSecondPss = (e) => {
    setSecondPss(e.target.value);
  };

  const handlePss = (e) => {
    setPss(e.target.value);
  };

  const setStatus = () => {
    if (pss === secondPss) {
      const formData = new FormData();
      formData.append("Password", pss);
      formData.append("RecoveryToken", searchParams.get("token"));
      axios
        .post(`${process.env.REACT_APP_API_DOMG}ResetPassword`, formData)
        .then((res) => {
          if (res.status === 200) {
            setWrong("Your password was changed succesfully.");
            setTimeout(() => {
              history("/login");
            }, 6000);
          } else {
            setWrong("Unable to change your password, try again.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setWrong("Password don't match, try again.");
    }
  };

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
        <h1 className="absolute bottom-14 text-6xl font-black">
          Change your password
        </h1>
      </div>
      {/* right side - form */}
      <div className="bg-[#F1F6FB] w-1/2 rounded-2xl flex justify-center items-center p-5">
        <section className="flex flex-col items-center gap-3">
          <figure className="flex justify-center mb-8">
            <img src={vinAMPlogo} alt="Vin logo" />
          </figure>
          <form className="flex flex-col items-center gap-3">
            {wrong !== "" ? (
              <div className="flex w-full justify-center">
                <div
                  className={
                    wrong[0] === "Y"
                      ? "bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]"
                      : "bg-red-600 py-2 rounded-md flex justify-center mb-4 w-[550px]"
                  }
                >
                  <img
                    className="mx-2 pt-[4px] h-[85%]"
                    src={check}
                    alt="check"
                  />
                  <h3 className="text-white font-bold text-[15px]">{wrong}</h3>
                </div>
              </div>
            ) : null}
            <input
              type="password"
              name="password"
              onChange={handleSecondPss}
              className="rounded-md h-[60px] w-[286px] border-none login_input--password text-black"
              placeholder="Password"
            />
            <input
              type="password"
              name="password"
              onChange={handlePss}
              className="rounded-md h-[60px] w-[286px] p-[16px] border-none login_input--password text-black"
              placeholder="Confirm Password"
            />
          </form>
          <div className="flex justify-between items-center gap-4">
            <button
              className="flex items-center w-auto justify-between text-white bg-[#E57200] font-bold rounded-md text-base px-5 py-2.5 text-center mr-2 my-2"
              onClick={setStatus}
            >
              Submit
              <ArrowForwardIcon />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PasswordRecovery;
