import React from "react";

function DedupeOptions() {
  return (
    <div className="flex flex-col mt-4 bg-[#48578F] p-[20px] rounded-[12px]">
      <h1 className="font-bold mb-2 text-[#FFFFFF]">Dedupe Options</h1>
      <button
        type="button"
        className="mv-4 text-white bg-[#298FC2]  rounded-[12px] hover:bg-blue-800  px-5 py-2.5 text-center inline-flex items-center mr-2 space-x-4"
      >
        <svg
          data-accordion-icon
          className="w-6 h-6 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        />
        <p>Open</p>
      </button>
    </div>
  );
}

export default DedupeOptions;
