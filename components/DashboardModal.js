import React from 'react'

const DashboardModal = ({ showDashboard, setShowDashboard }) => {
  return (
    <div className="flex flex-col justify-around items-start gap-5 bg-gray-300 px-5 py-5 rounded-lg w-6/12 m-auto transform translate-x-50 translate-y-50">
      <h1 className="text-2xl m-auto">Analytics Dashboard</h1>
      <div className="border border-gray-500 m-auto p-2 rounded-lg">
        Total Users: 100
      </div>
      <div className="border border-gray-500 m-auto p-2 rounded-lg">
        Total Completed Tasks: 200
      </div>
      <div className="border border-gray-500 m-auto p-2 rounded-lg">
        Total Tomatoes Used: 300
      </div>
      <div
        className="border border-black bg-white m-auto px-2 cursor-pointer"
        onClick={() => setShowDashboard(!showDashboard)}
      >
        close
      </div>
    </div>
  );
};

export default DashboardModal