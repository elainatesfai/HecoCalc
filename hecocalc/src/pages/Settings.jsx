import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../css/tabs.css";
import "../css/settings.css";

function Settings() {
  const [toggleState, setToggleState] = useState("Decision Tree");

  const toggleTab = (tab) => {
    setToggleState(tab);
  };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="header">
          <div className="header-title">Settings</div>

          <button className="button-generate">Save</button>
        </div>
        <div className="bloc-tabs-topic">
          <div
            className={
              toggleState === "Decision Tree"
              ? "tabs-topic active-tabs-topic"
              : "tabs-topic"
            }
            onClick={() => {
              toggleTab("Decision Tree");
            }}
          >
            <p>Decision Tree</p>
          </div>
          <div
            className={
              toggleState === "Input Data"
                ? "tabs-topic active-tabs-topic"
                : "tabs-topic"
            }
            onClick={() => {
              toggleTab("Input Data");
            }}
          >
            <p>Input Data</p>
          </div>
        </div>
        <div className="active-tab">
          <p>Active Tab Component: {toggleState}</p>
        </div>
      </div>
    </>
  );
} 

export default Settings;
