/* eslint-disable no-eval */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";

import { primeConsultant } from "../../atoms/primeConsultant.js";
import {
  filterInventoryBuilder,
  presetBuilder,
} from "../../atoms/InventoryBuilderAtom.js";

function ListClientsGrouped({
  clientList,
  conditionalString,
  setDealerInfoValue,
}) {
  const [, setPrimeCon] = useRecoilState(primeConsultant);
  const [, setFilters] = useRecoilState(filterInventoryBuilder);
  const [, setPresetBuilder] = useRecoilState(presetBuilder);

  const filtersDefault = {
    id: 0,
    dealerId: 0,
    destination: "all",
    typeList: [],
    minDaysOnLot: null,
    maxDaysOnLot: null,
    makeList: [],
    modelList: [],
    year: null,
    vehicleStyle: null,
    minDealerPrice: null,
    maxDealerPrice: null,
    minMileage: null,
    maxMileage: null,
    inventoryRefill: true,
    dateInventoryRefill: null,
    minViews: null,
    maxViews: null,
    minImageCount: null,
    maxImageCount: null,
    viewLimiter: false,
    oneImageOrLess: false,
  };

  const getConsultant = (id) => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMG_NODE}dealers/primary-consultant/${id}`
      )
      .then((res) => setPrimeCon(res.data))
      .catch((error) => console.log(error));
  };

  return Object.keys(clientList).map((title) => (
    <div key={title.id}>
      <h1 className="font-bold text-[#586283] text-[20px] mt-8 mb-1">
        {title}
      </h1>
      <div className="flex flex-row flex-wrap max-h-[75vh] overflow-y-auto customScrollBar">
        {clientList[title].map((client) =>
          eval(conditionalString) ? (
            <Link
              to="/target-market/audience-builder"
              onClick={() => {
                setDealerInfoValue(client);
                getConsultant(client.dealerID);
                setFilters(filtersDefault);
                setPresetBuilder({ name: null });
              }}
              key={client.dealerID}
            >
              <div className="w-[190px] h-[125px] py-2 px-2 flex flex-col justify-center items-center space-y-2">
                <img
                  className="flex justify-center mt-4 bg-white rounded-lg object-contain h-[60px] w-[181px]"
                  src={
                    client.businessLogoUrl
                      ? client.businessLogoUrl
                      : "https://www.nicepng.com/png/full/301-3010705_car-dealership-building-filled-icon-dealership-icon-png.png"
                  }
                  alt={`${client.businessName} logo`}
                />
                <p className="text-[#586283] text-[12px] text-center font-bold">
                  {client.businessName}
                </p>
              </div>
            </Link>
          ) : null
        )}
      </div>
    </div>
  ));
}

export default ListClientsGrouped;
