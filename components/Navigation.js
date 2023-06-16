import React from "react";
import { useState } from "react";
import { FiSettings, FiAperture } from "react-icons/fi";
import DashboardModal from "./DashboardModal";

function Navigation({ setOpenSetting, showDashboard, setShowDashboard }) {

  return (
    <div className="flex flex-col items-center gap-3">
      <nav className="pt-5 flex justify-between w-11/12 mx-auto items-center">
        <div className="flex gap-1 items-center cursor-pointer">
          <FiAperture className="text-white text-sm" />
          <h1 className="text-white">Pomodoro</h1>
        </div>

        <p
          className="text-white cursor-pointer"
          onClick={() => setShowDashboard(!showDashboard)}
        >
          Analytics
        </p>

        <FiSettings
          className="text-white text-2xl cursor-pointer"
          onClick={() => setOpenSetting(true)}
        />
      </nav>

      
    </div>
  );
}

export default React.memo(Navigation);
