import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-full fixed z-10  border-2 flex items-center justify-center ">
        <div className="w-14 h-14 border-4 border-indigo-600 rounded-full border-t-gray-400 animate-spin ">
        </div>
    </div>
  );
};

export default Spinner;
