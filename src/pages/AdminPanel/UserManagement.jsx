import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import check from "../../assets/images/check.svg"
import { CameraIcon } from "@heroicons/react/outline"
import LayoutAdminPanel from "../../containers/AdminPanel/LayoutAdminPanel"

export default function UserManagement() {
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickerRef = useRef(null)
  const [roleID, setRoleID] = React.useState(0)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [department, setDepartment] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState(true)
  const [oldStatus, setOldStatus] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const [users, setUsers] = useState([])
  const [userID, setUserID] = useState(0)
  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG}Users`)
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      setRoleID(
        users.find((user) => user.userID === parseInt(userID))?.role?.roleID
      )
      setSelectedFile(
        users.find((user) => user.userID === parseInt(userID))?.photo
      )
      setFirstName(
        users.find((user) => user.userID === parseInt(userID))?.firstName
      )
      setLastName(
        users.find((user) => user.userID === parseInt(userID))?.lastName
      )
      setTitle(users.find((user) => user.userID === parseInt(userID))?.title)
      setPhone(users.find((user) => user.userID === parseInt(userID))?.phone)
      setDepartment(
        users.find((user) => user.userID === parseInt(userID))?.department
      )
      setEmail(users.find((user) => user.userID === parseInt(userID))?.email)
      setStatus(users.find((user) => user.userID === parseInt(userID))?.status)
    }
  }, [userID])

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const updateUser = (e) => {
    e.preventDefault()
    if (
      email !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      title !== "" &&
      phone !== "" &&
      department !== "" &&
      roleID !== 0 &&
      status !== null &&
      userID !== 0
    ) {
      const formData = new FormData()
      formData.append("UserID", userID)
      formData.append("Password", password)
      formData.append("RoleID", parseInt(roleID))
      formData.append("FirstName", firstName)
      formData.append("LastName", lastName)
      formData.append("Title", title)
      formData.append("Phone", phone)
      formData.append("Department", department)
      formData.append("Email", email)
      const file = document.getElementById("userLogo").files[0]
      file ? formData.append("Photo", file) : formData.append("Photo", null)
      formData.append("Status", status)
      axios
        .put(`${process.env.REACT_APP_API_DOMG}User`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true)
            setOldStatus(status)
            setTimeout(() => {
              setSuccess(false)
            }, 10000)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <LayoutAdminPanel>
      <div className="grid grid-cols-6 bg-[#F5F9FF] rounded-xl min-h-[85vh]">
        <div className="grid col-span-6 2xl:text-[14px] text-[12px] rounded-l-xl p-4">
          {success ? (
            <div className="flex w-full justify-center items-center">
              <div className="bg-[#E57200] py-2 rounded-md flex justify-center mb-4 w-[550px] items-center">
                <img
                  className="mx-2 pt-[4px] h-[85%]"
                  src={check}
                  alt="check"
                />
                <h3 className="text-white font-bold text-[15px]">
                  The user account data was saved successfully.
                </h3>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col ml-[2px] w-[50%]">
            {/* select user */}
            <div className="flex gap-12 items-center">
              <h3 className="font-bold text-[#586283] text-[16px]">
                Users List
              </h3>
              <select
                onChange={(e) => setUserID(e.target.value)}
                value={userID}
                className="rounded-xl w-[70%] h-[48px] text-[16px] p-[12px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0]"
              >
                <option value={"0"} key="0">
                  Select an user
                </option>
                {users.map((user) => (
                  <option value={user.userID} key={user.userID}>
                    {`${user.firstName} ${user.lastName} - ${user.email}`}
                  </option>
                ))}
              </select>
            </div>
            {/* access level */}
            <div className="flex gap-7 mt-[20px] items-center">
              <h3 className="font-bold text-[#586283] text-[16px]">
                Access Level
              </h3>
              <select
                onChange={(e) => setRoleID(e.target.value)}
                value={roleID}
                className="rounded-xl w-[70%] h-[48px] text-[16px] p-[12px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0]"
              >
                <option value={"0"} key="0">
                  Select a level
                </option>
                <option value={1}>Admin</option>
                <option value={4}>Management</option>
                <option value={5}>Staff</option>
                <option value={6}>Business</option>
                <option value={7}>Business Free</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row space-x-4 w-full my-[20px]">
            <div className="grid grid-cols-1 w-[50%] rounded-lg bg-[#EAEFF5] p-[20px]">
              <h3 className="font-bold text-[#586283] mb-[10px]">
                User ID:{" "}
                <span className="text-[#586283]">
                  {userID === 0 ? "XXXXXXXXX" : userID}
                </span>
              </h3>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  First Name
                </h2>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                />
              </div>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  Last Name
                </h2>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                />
              </div>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  Password
                </h2>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                />
              </div>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  Title
                </h2>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                />
              </div>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  Department
                </h2>
                <select
                  onChange={(e) => setDepartment(e.target.value)}
                  value={department}
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px] focus:outline-[#58628325] ml-[15px] mb-[12px] focus:border-none"
                >
                  <option value={""}>Select a department</option>
                  <option>Marketing</option>
                  <option>Technology</option>
                  <option>Client Success</option>
                  <option>Business Development</option>
                  <option>Administration</option>
                </select>
              </div>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  Phone
                </h2>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                />
              </div>
              <div className="grid grid-cols-12">
                <h2 className="grid col-span-2 font-bold text-[#586283]">
                  Email
                </h2>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="grid col-span-10 rounded-xl w-[90%] p-[16px]  focus:outline-[#58628325] ml-[15px] mb-[12px]"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[50%] rounded-lg bg-white p-[20px]">
              <div className="mb-[20px] w-full">
                <h3 className="font-bold text-[#586283] text-[20px]">
                  User Profile Picture:
                </h3>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                    alt="delaer profile"
                    style={{
                      width: "250px",
                      height: "auto",
                      borderRadius: "50%",
                    }}
                  />
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
                      Press the icon and select your favorite picture
                    </h3>
                  </div>
                )}
                <div>
                  <input
                    id="userLogo"
                    ref={filePickerRef}
                    type="file"
                    className="hidden"
                    onChange={addImageToPost}
                  />
                </div>
              </div>
              <div className="w-full">
                <h3 className="font-bold text-[#586283] text-[20px]">
                  User Status [Internal]:
                </h3>
                <div className="w-full mb-[12px]">
                  <div className="flex flex-row w-full items-center justify-start py-6 space-x-6">
                    <h3>
                      User Status:{" "}
                      <span className="font-bold">
                        {oldStatus ? "Activated" : "Deactivated"}
                      </span>
                    </h3>
                    <select
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      className="rounded-xl w-[200px] p-[16px] focus:outline-[#58628325] ml-[15px] focus:border-none"
                    >
                      <option value={true}>Activated</option>
                      <option value={false}>Deactivated</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <button
              onClick={updateUser}
              className="flex items-center w-[103px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </LayoutAdminPanel>
  )
}
