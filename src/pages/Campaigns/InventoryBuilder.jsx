import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import LayoutInventoryBuilder from "../../containers/InventoryBuilder/LayoutInventoryBuilder";

function InventoryBuilder() {
  const authPermRols = useAuth([""], false);
  const history = useNavigate();

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login");
      return null;
    }
  }, []);

  return (
    <div>
      <LayoutInventoryBuilder />
    </div>
  );
}

export default InventoryBuilder;
