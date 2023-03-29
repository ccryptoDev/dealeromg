import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import LayoutBusinessSettings from "../../containers/BusinessSettings/LayoutBusinessSettings";

function BusinessSettings({ activeTab }) {
  const authPermRols = useAuth(
    [""],
    false,
    "super-admin",
    "admin",
    "Management",
    "Staff"
  );
  const history = useNavigate();

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login");
      return null;
    }
    if (!authPermRols[2]) {
      history(-1);
      return null;
    }
  }, []);

  return (
    <div>
      <LayoutBusinessSettings activeTab={activeTab} />
    </div>
  );
}

export default BusinessSettings;
