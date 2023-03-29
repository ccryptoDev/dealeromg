import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CollapseRightBar } from "../../atoms/SideBars";
import { useRecoilState } from "recoil";

import useAuth from "../../Hooks/useAuth";
// Containers
import RightSideContainer from "./RightSideContainer";
import MainBodyContainer from "./MainBodyContainer";
// Componentes
import MainNavbar from "../../components/MainNavbar";

function LayoutEntryPage() {
  const authPermRols = useAuth(
    [""],
    false,
    ["super-admin", "admin", "Management", "Staff"],
    true
  );
  const history = useNavigate();
  const collapse = useRecoilState(CollapseRightBar)[0];

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login");
      return null;
    }
  }, []);
  return (
    <div className="flex flex-col bg-[#002E5D] px-[40px] pb-[40px] 2xl:text-[14px] text-[12px]">
      <div className="grid spx-4 w-full h-[145px] text-[#FFFFFF] 2xl:text-[14px] text-[12px]">
        <MainNavbar />
      </div>
      {collapse === false ? (
        <div className="grid grid-cols-12  bg-[#FFFFFF] rounded-xl">
          <div className="grid col-span-9 p-2 bg-[#FFFFFF] 2xl:text-[14px] text-[12px] min-h-[85vh] rounded-l-xl">
            <MainBodyContainer />
          </div>
          <div
            className={`grid ${
              authPermRols[2] ? "col-span-3" : "hidden"
            } p-2 2xl:text-[14px] text-[12px]  rounded-r-xl`}
          >
            <RightSideContainer />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 bg-[#FFFFFF] rounded-xl min-h-[90vh]">
          <div
            className={`grid ${
              authPermRols[2] ? "col-span-12" : "col-span-9"
            } p-2 bg-[#FFFFFF] 2xl:text-[14px] text-[12px]  rounded-xl`}
          >
            <MainBodyContainer />
          </div>
        </div>
      )}
    </div>
  );
}

export default LayoutEntryPage;
