import React, { useState } from "react";
import Navbar from '../components/Navbar'
import Table from "../components/Table";
import '../css/snapshots.css'
import '../css/tabs.css'

function filterDataByStatus(status, data) {
  if (status === "All") {
    return data;
  } else {
    return data.filter(item => item.status === status);
  }
}

function Snapshots() {
  const data = [
    { date: '13/01/2023', name: 'diabetes-snapshot-v3', status: 'Rejected', by: 'john@gmail.com' },
    { date: '12/01/2023', name: 'diabetes-snapshot-v2', status: 'Approved', by: 'john@gmail.com' },
    { date: '11/01/2023', name: 'diabetes-snapshot-v1', status: '', by: 'john@gmail.com' },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [toggleState, setToggleState] = useState("All");
  const [tempList, setTempList] = useState([]);

  const toggleTab = (status) => {
    setToggleState(status);
  };

  const filteredData = filterDataByStatus(toggleState, data).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('filteredData: ', filteredData);

  return (
    <>
      <Navbar />

      {/* using divs and css from inputpage*/}
      <div className="grid-container">
        <div className="header">
          <div className="header-title">My snapshots</div>
        </div>

      <div className="bloc-tabs-topic">
        <div
          className={toggleState === "All" ? "tabs-topic active-tabs-topic" : "tabs-topic"}
          onClick={() => {
            toggleTab("All");
          }}
        >
          <p>All</p>
        </div>
        <div
          className={toggleState === "Approved" ? "tabs-topic active-tabs-topic" : "tabs-topic"}
          onClick={() => {
            toggleTab("Approved");
          }}
        >
          <p>Approved</p>
        </div>
        <div
          className={toggleState === "Rejected" ? "tabs-topic active-tabs-topic" : "tabs-topic"}
          onClick={() => {
            toggleTab("Rejected");
          }}
        >
          <p>Rejected</p>
        </div>
      </div>
      {/* ... */}
      <Table data={filteredData} />
      {/* ... */}


      </div>
    </>
  )
}

export default Snapshots
