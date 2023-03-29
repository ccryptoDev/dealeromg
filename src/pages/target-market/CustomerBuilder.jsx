import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import LayoutCustomerBuilder from "../../containers/CustomerBuilder/LayoutCustomerBuilder";

const CustomerBuilder = () => {
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
      <LayoutCustomerBuilder />
    </div>
  );
};

export default CustomerBuilder;
