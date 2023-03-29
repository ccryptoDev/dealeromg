import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import LayoutAudienceBuilder from "../../containers/AudienceCatBuilder/LayoutAudienceBuilder";

function AudienceBuilder() {
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
      <LayoutAudienceBuilder />
    </div>
  );
}

export default AudienceBuilder;
