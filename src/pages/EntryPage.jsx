import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
// Components
import LayoutEntryPage from "../containers/EntryPage/LayoutEntryPage";

function EntryPage() {
  const authPermRols = useAuth([""], false);
  const history = useNavigate();

  useEffect(() => {
    if (!authPermRols[0]) {
      history("/login");
      return null;
    }
  }, []);

  return (
    <div className="flex flex-col">
      <LayoutEntryPage />
    </div>
  );
}

export default EntryPage;
