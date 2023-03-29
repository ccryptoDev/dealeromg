import { useEffect, useState } from "react";
import axios from "axios";
import LayoutAdminPanel from "../../containers/AdminPanel/LayoutAdminPanel";
import upload from "../../assets/images/upload.svg";

const FeedProvider = (props) => {
  const [providers, setProviders] = useState([
    {
      dataproviderid: 1,
      dataprovidername: "",
    },
  ]);

  const [selectedProvider, setSelectedProvider] = useState([]);
  const [selectCustomAttr, setSelectCustomAttr] = useState({
    provid: "",
    host: "",
    username: "",
    password: "",
    port: "",
  });

  const getAllProviders = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMG_NODE}/providers/`)
      .then((res) => setProviders(res.data))
      .catch((error) => console.log(error));
  };

  function handleSelectChange(event) {
    if (event.target.value !== "default") {
      setSelectedProvider(event.target.value);
      setSelectCustomAttr({
        provid: getAttr(event, "provid"),
        host: getAttr(event, "host"),
        username: getAttr(event, "username"),
        password: getAttr(event, "password"),
        port: getAttr(event, "port"),
      });
    } else {
      setSelectedProvider("");
      setSelectCustomAttr({
        provid: "",
        host: "",
        username: "",
        password: "",
        port: "",
      });
    }
  }

  const getAttr = (e, attr) => {
    const idx = e.target.selectedIndex;
    const option = e.target.querySelectorAll("option")[idx];
    const host = option.getAttribute(attr);
    return host;
  };

  useEffect(() => {
    getAllProviders();
  }, []);

  return (
    <LayoutAdminPanel>
      <div className="bg-[#F5F9FF] rounded-xl min-h-[80vh] p-4">
        {/* -----  select existing provider -----  */}
        <div className="flex flex-col items-center">
          <div className="w-full px-[32px] mt-[32px]">
            <p className="text-[#2D3032]">Existing Provider:</p>
            <select
              onChange={handleSelectChange}
              className="w-full rounded-xl focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0] mt-[8px] h-[48px] text-[#75787B] text-[16px]"
            >
              <option value="default">Select Provider To Edit</option>
              {providers.map((provider) => (
                <option
                  key={provider.dataproviderid}
                  value={provider.dataprovidername}
                  // eslint-disable-next-line react/no-unknown-property
                  provid={provider.random_id}
                   // eslint-disable-next-line react/no-unknown-property
                  host={provider.host}
                   // eslint-disable-next-line react/no-unknown-property
                  username={provider.username}
                   // eslint-disable-next-line react/no-unknown-property
                  password={provider.password}
                   // eslint-disable-next-line react/no-unknown-property
                  port={provider.port}
                >
                  {provider.dataprovidername}
                </option>
              ))}
            </select>
          </div>
          {/* -----  feed provider profile ----- */}
          <form className="w-full px-[32px] mt-[20px]">
            {/* feed provider container */}
            <div className="bg-[#EAEFF5] p-[24px] rounded-xl">
              <h2 className="text-[16px] font-bold text-[#586283]">
                Feed Provider Profile
              </h2>
              {/* provider ID + provider name */}
              <div className="mt-[24px] flex gap-[24px] h-[75px]">
                <div className="bg-white rounded-[12px] py-[12px] px-[20px] text-[#586283]">
                  <p className="text-[12px] ">Provider ID</p>
                  <p className="text-[20px] mt-[1px] font-bold">{`${selectCustomAttr.provid}`}</p>
                </div>
                <div className="w-full">
                  <label className="block text-[14px] text-[#2D3032]">
                    Feed Provider Name
                  </label>
                  <input
                    className="w-full rounded-[8px] h-[48px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0] mt-[8px]"
                    type="text"
                    name="providerName"
                    value={`${selectedProvider}`}
                  />
                </div>
              </div>

              {/* mapping type */}
              <div className="mt-[24px]">
                <label className="block text-[14px] text-[#2D3032]">
                  Mapping Type
                </label>
                <input
                  className="w-full rounded-[8px] h-[48px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0] mt-[8px]"
                  type="text"
                  name="mappingType"
                />
              </div>
              {/* credentials + export template name */}
              <div className="mt-[24px] grid grid-cols-2 gap-[24px]">
                <div className="w-full">
                  <label className="block text-[14px] text-[#2D3032]">
                    Credentials
                  </label>
                  <textarea
                    spellCheck="false"
                    className="overflow-hidden text-[#002E5D] text-[16px] resize-none w-full rounded-[8px] h-[111px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0] mt-[8px]"
                    type="text"
                    name="credentials"
                    value={`${selectCustomAttr.host}\nusername: ${selectCustomAttr.username}\npassword: ${selectCustomAttr.password}\nport: ${selectCustomAttr.port}`}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-[14px] text-[#2D3032]">
                    Export Template Name
                  </label>
                  <textarea
                    className="text-[#002E5D] text-[16px] resize-none w-full rounded-[8px] h-[111px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0] mt-[8px]"
                    type="text"
                    name="templateName"
                    placeholder="Dealer OMG Standard"
                  />
                </div>
              </div>
              {/* support document */}
              <div className="mt-[24px]">
                <label className="block text-[14px] text-[#2D3032]">
                  Support Document URL
                </label>
                <input
                  className="w-full rounded-[8px] h-[48px] focus:outline-none focus:ring focus:ring-[#b4b4b4] border-[#E0E0E0] mt-[8px]"
                  type="text"
                  name="supportDocument"
                  placeholder="7777000033"
                />
              </div>
              {/* submit button */}
              <div className="flex gap-[12px] w-[100px] px-[16px] py-[10px] bg-[#586283] rounded-[8px] text-white text-[14px] mt-[24px]">
                <input className="font-bold" type="submit" value="Submit" />
                <img src={upload} alt="upload file icon" />
              </div>
            </div>
            {/* end feed provider container */}
          </form>
        </div>
      </div>
    </LayoutAdminPanel>
  );
};

export default FeedProvider;
