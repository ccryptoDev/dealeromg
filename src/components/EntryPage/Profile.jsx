import React, { useState } from "react";
import {
  profilesEntryPage,
  CollapseEntryPage,
  profilesEntryPageActiveInactive,
} from "../../atoms/EntryPageAtom";
import { useRecoilState } from "recoil";

import arrowbarleft from "../../assets/images/arrow-bar-left.svg";

function Profile() {
  const [profiles1, setProfiles1] = React.useState([
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
  ]);
  const [profiles2, setProfiles2] = React.useState([
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
  ]);
  const [displayProfiles, setDisplayProfiles] = useState(true);
  const setSelectedProfile1 = useRecoilState(profilesEntryPage)[1];
  const setSelectedProfile2 = useRecoilState(
    profilesEntryPageActiveInactive
  )[1];
  const setCollapse = useRecoilState(CollapseEntryPage)[1];

  const changeInput = (event) => {
    const profilesAux = [...profiles1];
    if (event.target.id.substring(0, event.target.id.length - 7) === "2") {
      profilesAux[2].selected = event.target.checked;
      profilesAux[0].selected = false;
      profilesAux[1].selected = false;
      setProfiles1(profilesAux);
      setSelectedProfile1(JSON.parse(JSON.stringify(profilesAux)));
    } else if (
      event.target.id.substring(0, event.target.id.length - 7) === "0"
    ) {
      profilesAux[0].selected = event.target.checked;
      profilesAux[2].selected = false;
      profilesAux[1].selected = false;
      setProfiles1(profilesAux);
      setSelectedProfile1(JSON.parse(JSON.stringify(profilesAux)));
    } else if (
      event.target.id.substring(0, event.target.id.length - 7) === "1"
    ) {
      profilesAux[1].selected = event.target.checked;
      profilesAux[2].selected = false;
      profilesAux[0].selected = false;
      setProfiles1(profilesAux);
      setSelectedProfile1(JSON.parse(JSON.stringify(profilesAux)));
    }
  };
  const changeInput2 = (event) => {
    const profilesAux = [...profiles2];
    if (event.target.id.substring(0, event.target.id.length - 7) === "0") {
      profilesAux[0].selected = event.target.checked;
      profilesAux[1].selected = false;
      setProfiles2(profilesAux);
      setSelectedProfile2(JSON.parse(JSON.stringify(profilesAux)));
    } else if (
      event.target.id.substring(0, event.target.id.length - 7) === "1"
    ) {
      profilesAux[1].selected = event.target.checked;
      profilesAux[0].selected = false;
      setProfiles2(profilesAux);
      setSelectedProfile2(JSON.parse(JSON.stringify(profilesAux)));
    }
  };

  const handleCollapse = () => {
    setCollapse(true);
  };

  return (
    <>
      <h2 className="font-bold text-[#586283] text-[20px]">Open Profile</h2>
      <div className="flex justify-between items-center mt-4 mb-4 h-[48px]">
        <button
          onClick={handleCollapse}
          type="button"
          className="flex items-center w-auto h-[40px] justify-around text-white bg-[#298FC2] focus:ring-4 font-bold rounded-lg text-sm px-2 py-2.5 text-center mr-2 my-2"
        >
          <img src={arrowbarleft} alt="arrow" className="rotate-180" />
        </button>
      </div>
      <div className="p-[20px] bg-[#F5F9FF] rounded-md">
        <div
          className="flex flex-row space-x-2"
          onClick={() => setDisplayProfiles(!displayProfiles)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-[5px] h-3 w-3"
            fill="#F5F9FF"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
          <h3 className="font-bold text-[#586283] text-[16px]">
            Display Profiles
          </h3>
        </div>
        {profiles1.map((profile) => (
          <div
            className={
              displayProfiles ? "flex items-center mt-1 mb-1" : "hidden"
            }
          >
            <input
              id={`${profile.id}profile`}
              checked={profile.selected}
              onChange={(event) => changeInput(event)}
              aria-describedby={`checkbox-${profile.id}profile`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] rounded-full border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${profile.id}profile`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {profile.name}
            </label>
          </div>
        ))}
        <hr className={displayProfiles ? "my-2" : "hidden"} />
        {profiles2.map((profile) => (
          <div
            className={
              displayProfiles ? "flex items-center mt-1 mb-1" : "hidden"
            }
          >
            <input
              id={`${profile.id}profile`}
              checked={profile.selected}
              onChange={(event) => changeInput2(event)}
              aria-describedby={`checkbox-${profile.id}profile`}
              type="checkbox"
              className="w-4 h-4 text-[#298FC2] rounded-full border-gray-300 focus:ring-[#298FC2] focus:ring-2"
            />
            <label
              htmlFor={`${profile.id}profile`}
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {profile.name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default Profile;
