import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DecisionTreeTab from "../components/DecisionTreeTab";
import InputDataTab from "../components/InputDataTab";
import "../css/tabs.css";
import "../css/settings.css";
import Repositories from "../components/Repositories";
import { useOutletContext } from "react-router-dom";
import CompaniesSelect from "../components/CompaniesSelect";

export default function Settings() {
  const getRepositories = useOutletContext().getRepositories;
  const getRepo = useOutletContext().getRepo;
  var repositories = getRepo();
  var choices = [];
  repositories.map((item) => {
    let arr = item.Key.split("/");
    if (arr.length > 0) {
      if (choices.includes(arr[2]) === false && arr[2]!=='') {
        choices.push(arr[2]);
      }
    }
  });
  const [toggleState, setToggleState] = useState(localStorage.getItem("startSettings"));

  const toggleTab = (tab) => {
    setToggleState(tab);
  };
  const getComp = useOutletContext().getComp;
  var companies = getComp();
  var companyChoice = [];
  companies.map((item) => {
      let arr = item.Key.split("/");
      if(arr.length>0){
          if(companyChoice.includes(arr[0]) === false) {
              companyChoice.push(arr[0]);
          }
      }
  });

  // const activeTabComponent = toggleState === "Decision Tree"
  //   ? <DecisionTreeTab />
  //   : <InputDataTab />;
  var activeTabComponent;
  var manager = false;
  var position = localStorage.getItem('position');
  if(position ==='3'){
    manager = true;
  }

  if(toggleState==="Decision Tree"){
    activeTabComponent = <DecisionTreeTab />;
  }
  if(toggleState ==="Input Data"){
    activeTabComponent = <InputDataTab />;
  }
  if(toggleState ==="Repository"){
    activeTabComponent = Repositories(choices);
  }
  if(toggleState ==="Company"){
    activeTabComponent = CompaniesSelect(companyChoice);
    
  }

  const updateRepositories = () => {
    getRepositories().then(x => {
      repositories = getRepo();
      var choices = [];
     repositories.map((item) => {
    let arr = item.Key.split("/");
    if (arr.length > 0) {
      if (choices.includes(arr[2]) === false && arr[2]!=='') {
        choices.push(arr[2]);
      }
    }
  });
  toggleTab("Repository");

  });

  }




  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="header">
          <div className="header-title">Settings</div>

          <button className="button-generate">Save</button>
        </div>
        <div className="bloc-tabs-topic">
        {
          manager && (
            
            <div
            className={
              toggleState === "Company"
              ? "tabs-topic active-tabs-topic"
              : "tabs-topic"
            }
            onClick={() => {
              toggleTab("Company");
            }}
          >
            <p>Company</p>
          </div>
          

          )
        }
        <div
            className={
              toggleState === "Repository"
              ? "tabs-topic active-tabs-topic"
              : "tabs-topic"
            }
            onClick={() => {
              updateRepositories();
            }}
          >
            <p>Repository</p>
          </div>
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
          {activeTabComponent}
        </div>
      </div>
    </>
  );
} 

