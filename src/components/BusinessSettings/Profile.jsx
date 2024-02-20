import { useEffect, useState, useRef } from "react"
import { useRecoilState } from "recoil"
import CollapsingButton from "../../components/Fields/CollapsingButton"
import { CollapseRightBar } from "../../atoms/SideBars"
import axios from "axios"

import { dealerInfo } from "../../atoms/DealerAtom"
import check from "../../assets/images/check.svg"
import Support from "./Support"
import { CameraIcon } from "@heroicons/react/outline"

import supportIcon from "../../assets/images/reset.png"

export default function Profile() {
  const [success, setSuccess] = useState(false)
  const rightMenuCollapse = useRecoilState(CollapseRightBar)[0]
  const [randomID, setRandomID] = useState("")
  const [address, setAddress] = useState("")
  const [dealerGroup, setDealerGroup] = useState("")
  const [alertInfoGroup, setAlertInfoGroup] = useState(false)
  const [alertInfoProfile, setAlertInfoProfile] = useState(false)
  const [previosProfile, setPreviousProfile] = useState({
    dealerID: 1,
    dealerGroupID: 1,
    businessName: "",
    address: "",
    address2: "",
    city: "",
    zipCode: "",
    state: "",
    businessLogoUrl: null,
    profileStatus: true,
    crmCompanyUrl: "",
    crmCompanyID: null,
    dealership: true,
    dealergroup: false,
    tierLevel: false,
    randomID: "XXXXXXXXXX",
    latitude: null,
    longitude: null,
  })
  const [profile, setProfile] = useState({
    dealerID: 1,
    dealerGroupID: 1,
    businessName: "",
    address: "",
    address2: "",
    city: "",
    zipCode: "",
    state: "",
    businessLogoUrl: null,
    profileStatus: true,
    crmCompanyUrl: "",
    crmCompanyID: null,
    dealership: true,
    dealergroup: false,
    tierLevel: false,
    randomID: "XXXXXXXXXX",
    latitude: null,
    longitude: null,
  })
  const [dealerInfoValue, setDealerInfoValue] = useRecoilState(dealerInfo)

  const filePickerRef = useRef(null)
  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setProfile((profileAct) => {
        return { ...profileAct, businessLogoUrl: readerEvent.target.result }
      })
    }
  }

  useEffect(() => {
    if (
      dealerInfoValue.crmCompanyID ||
      dealerInfoValue.businessName !== "TestUserIOD"
    ) {
      const initialProfile = {
        dealerID: dealerInfoValue.dealerID,
        dealerGroupID: dealerInfoValue.dealerGroup.dealerGroupID,
        businessName: dealerInfoValue.businessName,
        address: dealerInfoValue.address,
        address2: dealerInfoValue.address2,
        city: dealerInfoValue.city,
        zipCode: dealerInfoValue.zipCode,
        state: dealerInfoValue.state,
        businessLogoUrl: dealerInfoValue.businessLogoUrl,
        profileStatus: dealerInfoValue.profileStatus,
        crmCompanyUrl: dealerInfoValue.crmCompanyUrl,
        crmCompanyID: dealerInfoValue.crmCompanyID,
        dealership: true,
        dealergroup: false,
        tierLevel: dealerInfoValue.tierLevel,
        randomID: dealerInfoValue.random_id,
        longitude: dealerInfoValue.longitude,
        latitude: dealerInfoValue.latitude,
      }
      setProfile(initialProfile)
      setPreviousProfile(initialProfile)
    }
  }, [])

  const getRandomID = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG_NODE}dealer-groups/random`)
      .then((res) => {
        setRandomID(res.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getRandomID()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    if (value.length > 0 && name === "businessName") {
      setAlertInfoProfile(false)
    } else if (value.length === 0 && name === "businessName") {
      setAlertInfoProfile(true)
    }
    setProfile((profileAct) => {
      return { ...profileAct, [name]: value }
    })
  }

  const handleChangeGroup = (event) => {
    const { name, value } = event.target
    if (value.length > 0 && name === "dealerGroupName") {
      setAlertInfoGroup(false)
    } else if (value.length === 0 && name === "dealerGroupName") {
      setAlertInfoGroup(true)
    }
    setDealerGroup(value)
  }

  const handleChangeRadio = (event) => {
    const { name, checked } = event.target
    name === "dealership" &&
      setProfile((profileAct) => {
        return { ...profileAct, dealership: checked, dealergroup: !checked }
      })
    name === "dealergroup" &&
      setProfile((profileAct) => {
        return { ...profileAct, dealership: !checked, dealergroup: checked }
      })
  }

  const handleSubmit = () => {
    if (profile.businessName && profile.businessName.length > 0) {
      const formData = new FormData()
      formData.append("DealerID", profile.dealerID)
      formData.append("DealerGroupID", profile.dealerGroupID)
      formData.append("BusinessName", profile.businessName)
      formData.append("Address", profile.address)
      formData.append("Address2", profile.address2)
      formData.append("City", profile.city)
      formData.append("ZipCode", profile.zipCode)
      formData.append("State", profile.state)
      formData.append("latitude", profile.latitude)
      formData.append("longitude", profile.longitude)
      const file = document.getElementById("businessLogoUrl").files[0]
      file
        ? formData.append("BusinessLogo", file)
        : formData.append("BusinessLogo", null)
      formData.append("ProfileStatus", profile.profileStatus)
      formData.append("CrmCompanyID", profile.crmCompanyID)
      formData.append("TierLevel", profile.tierLevel)
      formData.append("CrmCompanyUrl", profile.crmCompanyUrl)
      axios
        .patch(`${process.env.REACT_APP_API_DOMG}Dealers/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            alert("Error updating dealer")
          } else {
            setSuccess(true)
            const dealerLoc = response.data
            setDealerInfoValue(dealerLoc)
            const newProfile = {
              dealerID: dealerLoc.dealerID,
              dealerGroupID: dealerLoc.dealerGroupID,
              businessName: dealerLoc.businessName,
              address: dealerLoc.address,
              address2: dealerLoc.address2,
              city: dealerLoc.city,
              zipCode: dealerLoc.zipCode,
              state: dealerLoc.state,
              businessLogoUrl: dealerLoc.businessLogoUrl,
              profileStatus: dealerLoc.profileStatus,
              crmCompanyUrl: dealerLoc.crmCompanyUrl,
              crmCompanyID: dealerLoc.crmCompanyID,
              dealership: true,
              dealergroup: false,
              tierLevel: dealerLoc.tierLevel,
              randomID: dealerLoc.random_id,
              latitude: dealerLoc.latitude,
              longitude: dealerLoc.longitude,
            }
            setPreviousProfile(newProfile)
            setTimeout(() => {
              setSuccess(false)
            }, 10000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setAlertInfoProfile(true)
    }
  }

  const handleSubmitGroup = () => {
    if (dealerGroup && dealerGroup.length > 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_DOMG}DealerGroups/`,
          { dealerGroup, random_id: randomID, address },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          if (response.status !== 200) {
            alert("Error updating dealer group")
          } else {
            setSuccess(true)
            setTimeout(() => {
              setSuccess(false)
            }, 10000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setAlertInfoGroup(true)
    }
  }

  return (
    <div className="flex bg-[#F5F9FF] rounded-xl min-h-[90vh]">
      <div className="grid col-span-5 2xl:text-[14px] text-[12px] rounded-l-xl p-4 w-[83%] grow">
        {success ? (
          <div className="flex w-full justify-center">
            <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px]">
              <img className="mx-2 pt-[4px] h-[85%]" src={check} alt="check" />
              <h3 className="text-white font-bold text-[15px]">
                Your profile was saved successfully.
              </h3>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="h-[67px] flex items-center">
          <h2 className="font-bold text-[#586283] text-[20px] w-[15%]">
            Dealer Profile
          </h2>
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-row bg-white rounded-lg w-[85%] h-[67px] items-center justify-center">
              <div className="flex flex-row items-center justify-center w-[200px]">
                <input
                  name="dealership"
                  onChange={(event) => handleChangeRadio(event)}
                  checked={profile.dealership}
                  type="checkbox"
                  className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded-full border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                />
                <h3 className="ml-[6px]">Dealership</h3>
              </div>
              <div className="flex flex-row items-center justify-center w-[200px]">
                <input
                  name="dealergroup"
                  onChange={(event) => handleChangeRadio(event)}
                  checked={profile.dealergroup}
                  type="checkbox"
                  className="w-4 h-4 text-[#298FC2] bg-[#298fc217] rounded-full border-gray-300 focus:ring-[#298FC2] focus:ring-2"
                />
                <h3 className="ml-[6px]">Dealer Group (Profile Only)</h3>
              </div>
            </div>
          </div>
        </div>
        {profile.dealership ? (
          <div className="grid grid-cols-2 gap-4 mt-[20px]">
            <div className="grid col-span-1 p-[20px] bg-[#EAEFF5] rounded-lg">
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Platform ID
                </h3>
                <p className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]">
                  {profile.randomID}
                </p>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px] justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Business Name
                </h3>
                <input
                  id="businessName"
                  name="businessName"
                  onChange={(event) => handleChange(event)}
                  value={profile.businessName}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
                {alertInfoProfile ? (
                  <label
                    htmlFor="businessName"
                    className="grid col-span-10 text-red-600 w-full px-[16px] ml-[20%]"
                  >
                    You must provide a dealer name
                  </label>
                ) : null}
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Address
                </h3>
                <input
                  name="address"
                  onChange={(event) => handleChange(event)}
                  value={profile.address}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Address 2
                </h3>
                <input
                  name="address2"
                  onChange={(event) => handleChange(event)}
                  value={profile.address2}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  City
                </h3>
                <input
                  name="city"
                  onChange={(event) => handleChange(event)}
                  value={profile.city}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  State
                </h3>
                <select
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                  value={profile.state}
                  name="state"
                  onChange={(event) => handleChange(event)}
                  defaultValue="None"
                >
                  <option value="None">Select a State</option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="DC">DC</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NE</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                </select>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Zip Code
                </h3>
                <input
                  name="zipCode"
                  onChange={(event) => handleChange(event)}
                  value={profile.zipCode}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Latitude
                </h3>
                <input
                  name="latitude"
                  onChange={(event) => handleChange(event)}
                  value={profile.latitude}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
              </div>
              <div className="grid grid-cols-12 mb-[12px] pr-[20px]  justify-start w-full items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Longitude
                </h3>
                <input
                  name="longitude"
                  onChange={(event) => handleChange(event)}
                  value={profile.longitude}
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                ></input>
              </div>
            </div>
            <div className="grid col-span-1 p-[20px] bg-white rounded-lg">
              <div>
                <h3 className="font-bold text-[#586283] text-[20px]">
                  Business Logo
                </h3>
                {profile.businessLogoUrl ? (
                  <div>
                    <img
                      src={profile.businessLogoUrl}
                      className="w-full object-contain cursor-pointer my-[12px]"
                      alt="Selected file"
                      style={{
                        width: "250px",
                        height: "auto",
                      }}
                    />
                    <button
                      onClick={() =>
                        setProfile((profileAct) => {
                          return { ...profileAct, businessLogoUrl: null }
                        })
                      }
                      className="flex items-center w-auto justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
                    >
                      Change Selected Business Logo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="mx-auto flex items-center justify-center h-12 w-12
                      rounded-full bg-[#E57200] cursor-pointer"
                    >
                      <CameraIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-[10px] text-[#586283]">
                      Press the icon and select your favorite logo
                    </h3>
                  </div>
                )}
                <input
                  id="businessLogoUrl"
                  name="businessLogoUrl"
                  onChange={(event) => addImageToPost(event)}
                  ref={filePickerRef}
                  type="file"
                  className="hidden rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                ></input>
              </div>
              <div>
                <div>
                  <h3 className="font-bold text-[#586283] text-[20px]">
                    Profile Settings
                  </h3>
                  <div className="flex flex-col w-full items-center justify-start space-y-8 mb-[12px]">
                    <div className="flex flex-row items-center justify-start w-full">
                      <h3 className="w-[50%]">
                        Profile Status:{" "}
                        <span className="font-bold text-[#586283]">
                          {previosProfile.profileStatus
                            ? "Activated"
                            : "Deactivated"}
                        </span>
                      </h3>
                      <select
                        name="profileStatus"
                        onChange={(event) => handleChange(event)}
                        value={profile.profileStatus}
                        className="rounded-xl w-[50%] px-[16px] py-[8px] focus:outline-[#58628325] ml-[15px] focus:border-none"
                      >
                        <option value={true}>Activated</option>
                        <option value={false}>Deactivated</option>
                      </select>
                    </div>
                    <div className="flex flex-row items-center justify-start w-full">
                      <h3 className="w-[50%]">
                        Tier Level:{" "}
                        <span className="font-bold text-[#586283]">
                          {previosProfile.tierLevel ? "Client" : "Trial"}
                        </span>
                      </h3>
                      <select
                        name="tierLevel"
                        onChange={(event) => handleChange(event)}
                        value={profile.tierLevel}
                        className="rounded-xl w-[50%] px-[16px] py-[8px] focus:outline-[#58628325] ml-[15px] focus:border-none"
                      >
                        <option value={true}>Client</option>
                        <option value={false}>Trial</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#586283] text-[20px]">
                    CRM Company URL
                  </h3>
                  {previosProfile.crmCompanyUrl &&
                  previosProfile.crmCompanyUrl !== "null" ? (
                    <>
                      <>
                        <span className="font-bold text-[#586283]">
                          Current URL
                        </span>
                        <a
                          className="grid col-span-10 bg-[#EAEFF5] rounded-xl font-bold w-full p-[16px]  focus:outline-[#58628325] mt-[12px]"
                          href={previosProfile.crmCompanyUrl}
                        >
                          {previosProfile.crmCompanyUrl}
                        </a>
                      </>
                      <>
                        <span className="font-bold text-[#586283]">
                          New URL
                        </span>
                        <input
                          type="url"
                          name="crmCompanyUrl"
                          onChange={(event) => handleChange(event)}
                          value={profile.crmCompanyUrl}
                          className="grid col-span-10 rounded-xl w-full p-[16px] focus:border-none focus:outline-[#58628325] mt-[10px]"
                        ></input>
                      </>
                    </>
                  ) : (
                    <div className="grid col-span-12 bg-[#EAEFF5] rounded-xl w-full p-[16px]  focus:outline-[#58628325] mt-[12px]">
                      <input
                        name="crmCompanyUrl"
                        onChange={(event) => handleChange(event)}
                        value={profile.crmCompanyUrl}
                        className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] ml-[15px]"
                      ></input>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 h-[80vh] mt-[20px] bg-[#EAEFF5] rounded-xl w-1/2">
            <div className="grid col-span-2 p-[20px] h-[100px]  rounded-lg">
              <div className="grid grid-cols-12 mb-[12px] py-[20px] w-full flex-row justify-center items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Platform ID
                </h3>
                <p className="grid col-span-10 rounded-xl w-[80%] p-[16px]  focus:outline-[#58628325] ml-[15px]">
                  {randomID}
                </p>
              </div>
              <div className="grid grid-cols-12 mb-[12px] py-[20px] w-full flex-row justify-center items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Dealer group name
                </h3>
                <input
                  id="dealerGroupName"
                  name="dealerGroupName"
                  onChange={(event) => handleChangeGroup(event)}
                  value={dealerGroup}
                  placeholder="Dealer group name"
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] pl-[15px]"
                ></input>
                {alertInfoGroup ? (
                  <label
                    htmlFor="dealerGroupName"
                    className="grid col-span-12 ml-[20%] text-red-600 w-full"
                  >
                    You must provide a dealer group name
                  </label>
                ) : null}
              </div>
              <div className="grid grid-cols-12 mb-[12px] py-[20px] w-full flex-row justify-center items-center">
                <h3 className="grid col-span-2 font-bold text-[#586283]">
                  Address
                </h3>
                <input
                  id="address"
                  name="address"
                  onChange={(event) => setAddress(event.target.value)}
                  value={address}
                  placeholder="Address"
                  className="grid col-span-10 rounded-xl w-full p-[16px]  focus:outline-[#58628325] pl-[15px]"
                ></input>
                {alertInfoGroup ? (
                  <label
                    htmlFor="address"
                    className="grid col-span-12 ml-[20%] text-red-600 w-full"
                  >
                    You must provide a dealer group address
                  </label>
                ) : null}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row my-[12px] justify-center w-full">
          <button
            onClick={profile.dealership ? handleSubmit : handleSubmitGroup}
            className="h-[50px] flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
          >
            Submit
          </button>
        </div>
      </div>
      {rightMenuCollapse ? (
        <div className="flex flex-col">
          <CollapsingButton side="right" />
          <div className="flex items-center justify-center w-[48px] h-[48px]">
            <img src={supportIcon} alt="support" />
          </div>
        </div>
      ) : (
        <div className="p-2 2xl:text-[14px] text-[12px] rounded-r-xl bg-[#FFFFFF] w-[17%]">
          <CollapsingButton side="right" />
          <Support />
        </div>
      )}
    </div>
  )
}
