import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  profilesEntryPage,
  profilesEntryPageActiveInactive,
} from "../../atoms/EntryPageAtom"
import { CollapseRightBar } from "../../atoms/SideBars"
import { dealerInfo } from "../../atoms/DealerAtom"
import { useRecoilState } from "recoil"
import useAuth from "../../Hooks/useAuth"
import vinAMPlogo from "../../assets/logos/vinAMPlogo.png"
import axios from "axios"
import check from "../../assets/images/check.svg"
import ListClientsNoGrouped from "./ListClientsNoGrouped"
import ListClientsGrouped from "./ListClientsGrouped"
import CollapsingButton from "../../components/Fields/CollapsingButton"

const _ = require("lodash")

function ListClient() {
  const [clients, setClients] = useState([])
  const [letter, setLetter] = useState(0)
  const [displayDealer, setDisplayDealer] = useState(false)
  const [search, setSearch] = useState("")
  const [dealerGrouped, setDealerGrouped] = useState([])
  const [profiles1, setProfiles1] = useRecoilState(profilesEntryPage)
  const [profiles2, setProfiles2] = useRecoilState(
    profilesEntryPageActiveInactive
  )
  const collapse = useRecoilState(CollapseRightBar)[0]
  const setDealerInfoValue = useRecoilState(dealerInfo)[1]
  const [userData, setUserData] = useState([])
  const [showPopUp, setShowPopUp] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management"],
    true
  )
  const history = useNavigate()

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login")
      return null
    }
  }, [])

  function SortArray(item1, item2) {
    return item1.businessName.localeCompare(item2.businessName)
  }

  const getClients = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Dealers`)
      .then((res) => {
        if (res.status === 200) {
          const clientAux = res.data
          clientAux.sort(SortArray)
          setClients(clientAux)
        }
      })
      .catch((error) => console.log(error))
  }

  const getUserSessionData = () => {
    setUserData(JSON.parse(localStorage.getItem("permissionsDealerOMG")))
  }

  useEffect(() => {
    getClients()
    getUserSessionData()
  }, [])

  useEffect(() => {
    setDealerGrouped(_.groupBy(clients, "dealerGroup.dealerGroupName"))
  }, [clients])

  useEffect(() => {
    if (userData.passwordUpdatedAt === null) {
      setShowPopUp(true)
    }
  }, [userData])

  const updatedPassword = () => {
    const formData = new FormData()
    formData.append("userID", userData.userID)
    formData.append("firstName", userData.firstName)
    formData.append("lastName", userData.lastName)
    formData.append("title", userData.title)
    formData.append("email", userData.email)
    formData.append("phone", userData.phone)
    formData.append("RoleID", parseInt(userData.role.roleID))
    formData.append("department", userData.department)
    formData.append("photo", userData.photo)
    formData.append("status", userData.status)
    formData.append("password", password)
    setLoading(true)
    axios
      .put(`${process.env.REACT_APP_API_DOMG}User`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true)
          setLoading(false)
          setStatus()
          setTimeout(() => {
            setShowPopUp(false)
            setSuccess(false)
          }, 4000)
        }
      })
      .catch((error) => console.log(error))
  }

  const setStatus = () => {
    axios
      .post(`${process.env.REACT_APP_API_DOMG}Login`, {
        user: userData.email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("tokenDealerOMG", res.data.token)
          localStorage.setItem(
            "permissionsDealerOMG",
            JSON.stringify(res.data.user)
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleProfile1 = (event) => {
    if (event.target.value === "0") {
      setProfiles1([
        {
          name: "Clients",
          id: "0",
          selected: true,
        },
        {
          name: "Trial",
          id: "1",
          selected: false,
        },
        {
          name: "All",
          id: "2",
          selected: false,
        },
      ])
    } else if (event.target.value === "1") {
      setProfiles1([
        {
          name: "Clients",
          id: "0",
          selected: false,
        },
        {
          name: "Trial",
          id: "1",
          selected: true,
        },
        {
          name: "All",
          id: "2",
          selected: false,
        },
      ])
    } else if (event.target.value === "2") {
      setProfiles1([
        {
          name: "Clients",
          id: "0",
          selected: false,
        },
        {
          name: "Trial",
          id: "1",
          selected: false,
        },
        {
          name: "All",
          id: "2",
          selected: true,
        },
      ])
    }
  }
  const handleProfile2 = (event) => {
    if (event.target.value === "0") {
      setProfiles2([
        {
          name: "Active Accounts",
          id: "0",
          selected: true,
        },
        {
          name: "Inactive Accounts",
          id: "1",
          selected: false,
        },
      ])
    } else if (event.target.value === "1") {
      setProfiles2([
        {
          name: "Active Accounts",
          id: "0",
          selected: false,
        },
        {
          name: "Inactive Accounts",
          id: "1",
          selected: true,
        },
      ])
    }
  }
  const filteredClientsAZ = useMemo(() => {
    return clients.filter((client) => {
      return client.businessName.toLowerCase().includes(search.toLowerCase())
    })
  }, [clients, search])

  const filteredClientsZA = useMemo(() => {
    return clients
      .filter((client) => {
        return client.businessName.toLowerCase().includes(search.toLowerCase())
      })
      .reverse()
  }, [clients, search])

  const filteredClientsGroupedAZ = useMemo(() => {
    return Object.keys(dealerGrouped)
      .filter((key) => key.includes(search))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: dealerGrouped[key] })
      }, {})
  }, [search, dealerGrouped])

  const filteredClientsGroupedZA = useMemo(() => {
    return Object.keys(dealerGrouped)
      .reverse()
      .filter((key) => key.includes(search))
      .reduce((cur, key) => {
        return Object.assign(cur, { [key]: dealerGrouped[key] })
      }, {})
  }, [search, dealerGrouped])

  return (
    <div className="py-[24px] px-[32px]">
      {showPopUp ? (
        <div className="overflow-y-auto backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-auto flex items-center justify-center">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="bg-white rounded-lg w-[500px] flex flex-col items-center justify-center p-8 space-y-6">
              {success ? (
                <div className="flex w-full justify-center">
                  <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
                    <img
                      className="mx-2 pt-[4px] h-[85%]"
                      src={check}
                      alt="check"
                    />
                    <h3 className="text-white font-bold text-[15px]">
                      Your new password has been updated, correctly.
                    </h3>
                  </div>
                </div>
              ) : (
                ""
              )}
              <p className="font-bold text-[#586283] text-[20px] text-center">
                Update your password now
              </p>
              <div className="w-[50%] flex flex-col space-y-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  className="rounded-xl p-[16px] focus:outline-[#58628325]"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Repeat the new password"
                  className="rounded-xl p-[16px]  focus:outline-[#58628325]"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button
                  disabled={
                    password !== passwordConfirm ||
                    password === "" ||
                    passwordConfirm === ""
                  }
                  className="flex flex-row justify-center
                  items-center text-white bg-[#298FC2] focus:ring-4
                  font-bold rounded-lg text-sm px-5 py-2.5 text-center
                  disabled:bg-gray-400"
                  onClick={updatedPassword}
                >
                  {loading === false ? (
                    password !== passwordConfirm ? (
                      "Passwords don't match"
                    ) : (
                      "Update Password"
                    )
                  ) : (
                    <span className='text-white font-medium rounded-lg text-sm text-center inline-flex items-center"'>
                      <svg
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Loading...
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-row justify-center space-x-2 items-center mt-6 mb-4">
        <figure className="w-[20%]">
          <img src={vinAMPlogo} className="h-[15px]" alt="Vin logo" />
        </figure>
        <input
          className="image-input_search border border-[#58628325] w-[50%] h-[48px] px-4 py-2 rounded-lg text-sm focus:border-none focus:ring-[#58628325]"
          type="text"
          value={search ?? ""}
          placeholder="Find List"
          onChange={handleSearch}
        ></input>
        <div className="flex w-[20%] h-[48px] bg-[#F5F9FF] rounded-lg justify-center items-center pl-[2px]">
          <input
            id={`display-dealer`}
            checked={displayDealer}
            onChange={(event) => setDisplayDealer(event.target.checked)}
            aria-describedby={`checkbox-display-dealer`}
            type="checkbox"
            className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded border-gray-300 focus:ring-[#298FC2] focus:ring-2"
          />
          <label
            htmlFor={`checkbox-display-dealer`}
            className="pl-[2px] text-[14px] font-medium text-gray-900 dark:text-gray-300"
          >
            By Dealer Group(s)
          </label>
        </div>
        <select
          className="rounded-xl text-black w-[10%] p-[16px] focus:outline-[#58628325] focus:border-none"
          onChange={(e) => setLetter(parseInt(e.target.value))}
          value={letter}
        >
          <option value={0}>A-Z</option>
          <option value={1}>Z-A</option>
        </select>
        <select
          className="rounded-xl text-black w-[15%] p-[16px] focus:outline-[#58628325] focus:border-none"
          onChange={handleProfile1}
        >
          <option value="0">Clients</option>
          <option value="1">Trial</option>
          <option value="2">All</option>
        </select>
        <select
          className="rounded-xl text-black w-[25%] p-[16px] focus:outline-[#58628325] focus:border-none"
          onChange={handleProfile2}
        >
          <option value="0">Active Accounts</option>
          <option value="1">Inactive Accounts</option>
        </select>

        {collapse && authPermRols[2] ? (
          <div className="flex flex-col pt-2">
            <CollapsingButton side="right" />
          </div>
        ) : (
          ""
        )}
      </div>
      {!displayDealer ? (
        <div>
          {profiles1[0].selected && profiles2[0].selected ? (
            <>
              <ListClientsNoGrouped
                title="Active Client"
                clientList={
                  letter === 0 ? filteredClientsAZ : filteredClientsZA
                }
                conditionalString="client.tierLevel && client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[1].selected && profiles2[0].selected ? (
            <>
              <ListClientsNoGrouped
                title="Active Trial"
                clientList={
                  letter === 0 ? filteredClientsAZ : filteredClientsZA
                }
                conditionalString="!client.tierLevel && client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[2].selected && profiles2[0].selected ? (
            <>
              <ListClientsNoGrouped
                title="Active Clients & Active Trials"
                clientList={
                  letter === 0 ? filteredClientsAZ : filteredClientsZA
                }
                conditionalString="client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[0].selected && profiles2[1].selected ? (
            <>
              <ListClientsNoGrouped
                title="Inactive Clients"
                clientList={
                  letter === 0 ? filteredClientsAZ : filteredClientsZA
                }
                conditionalString="client.tierLevel && !client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[1].selected && profiles2[1].selected ? (
            <>
              <ListClientsNoGrouped
                title="Inactive Trials"
                clientList={
                  letter === 0 ? filteredClientsAZ : filteredClientsZA
                }
                conditionalString="!client.tierLevel && !client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[2].selected && profiles2[1].selected ? (
            <>
              <ListClientsNoGrouped
                title="Inactive Trials & Inactive Clients"
                clientList={
                  letter === 0 ? filteredClientsAZ : filteredClientsZA
                }
                conditionalString="!client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          {profiles1[0].selected && profiles2[0].selected ? (
            <>
              <ListClientsGrouped
                clientList={
                  letter === 0
                    ? filteredClientsGroupedAZ
                    : filteredClientsGroupedZA
                }
                conditionalString="client.tierLevel && client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[1].selected && profiles2[0].selected ? (
            <>
              <ListClientsGrouped
                clientList={
                  letter === 0
                    ? filteredClientsGroupedAZ
                    : filteredClientsGroupedZA
                }
                conditionalString="!client.tierLevel && client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[2].selected && profiles2[0].selected ? (
            <>
              <ListClientsGrouped
                clientList={
                  letter === 0
                    ? filteredClientsGroupedAZ
                    : filteredClientsGroupedZA
                }
                conditionalString="client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[0].selected && profiles2[1].selected ? (
            <>
              <ListClientsGrouped
                clientList={
                  letter === 0
                    ? filteredClientsGroupedAZ
                    : filteredClientsGroupedZA
                }
                conditionalString="client.tierLevel && !client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[1].selected && profiles2[1].selected ? (
            <>
              <ListClientsGrouped
                clientList={
                  letter === 0
                    ? filteredClientsGroupedAZ
                    : filteredClientsGroupedZA
                }
                conditionalString="!client.tierLevel && !client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
          {profiles1[2].selected && profiles2[1].selected ? (
            <>
              <ListClientsGrouped
                clientList={
                  letter === 0
                    ? filteredClientsGroupedAZ
                    : filteredClientsGroupedZA
                }
                conditionalString="!client.profileStatus"
                setDealerInfoValue={setDealerInfoValue}
              />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  )
}

export default ListClient
