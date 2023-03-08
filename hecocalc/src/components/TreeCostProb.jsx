import DataTable, { createTheme } from "react-data-table-component";
import "../css/treecostprob.css";
import React, { useState, useEffect } from "react";
import {
  fChild,
  ffChild,
  fffChild,
  fsChild,
  sChild,
  sfChild,
  ssChild,
  sffChild,
  sfffChild,
  ssffChild,
} from "../data/ChildrenData";


export default function TreeCostProb() {
  const [pIsOpen, probIsOpen] = useState(false);
  const [cIsOpen, costIsOpen] = useState(false);
  const column1 = ["Dead", "Alive"];

  // const deadAlive =[
  //   //DIGIT-AET-HOSPITAL-DEAD , DIGIT-AET-NONHOSPITAL-DEAD , DIGIT-IEET-HOSPITAL-DEAD , DIGIT-IEET-NONHOSPITAL-DEAD
  //   //DIGIT-AET-HOSPITAL-ALIVE , DIGIT-AET-NONHOSPITAL-ALIVE, DIGIT-IAET-HOSPITAL-ALIVE , DIGIT-IAET-NONHOSPITAL-ALIVE
  //   //CURRENT-AET-HOSPITAL-DEAD ,CURRENT-AET-NONHOSPITAL-DEAD , CURRENT-IEET-HOSPITAL-DEAD , CURRENT-IEET-NONHOSPITAL-DEAD
  //   //CURRENT-AET-HOSPITAL-ALIVE , CURRENT-AET-NONHOSPITAL-ALIVE, CURRENT-IAET-HOSPITAL-ALIVE , CURRENT-IAET-NONHOSPITAL-ALIVE
  // ]

  // const costs=[

  // ]

  const column2 = ["Digital", "Current pathway"];

  const buttonlabels = ["DIGITAL", "Current pathway"];
  const [tpValue, setTpValue] = useState('');

  //calculation for the DIGITAL AEAT - Hospital adm - Dead
  const digitalValue = localStorage.getItem('tpValue: DIGITAL');
  const digitalAEAT = localStorage.getItem('tpValue: AEAT - DIGITAL');
  const hospitalAEAT = localStorage.getItem('tpValue: Hospital Adm - AEAT - DIGITAL');
  const deadValue = localStorage.getItem('tpValue: Dead - AEAT');
  const totalAEATDead = (digitalValue*digitalAEAT*hospitalAEAT*deadValue).toFixed(4);
  const aliveValue = 1 - deadValue;

  //calculation for the DIGITAL AEAT - Hospital adm - Alive
  const totalAEATAlive = (digitalValue*digitalAEAT*hospitalAEAT*aliveValue).toFixed(4);

  //calculation for the Current Pathway - AEAT - Hospital adm - Dead
  const cpValue = 1- digitalValue; 
  const cpAEAT = localStorage.getItem('tpValue: AEAT - Current Pathway');
  const cpHospitalAEAT = localStorage.getItem('tpValue: Hospital Adm - AEAT - Current Pathway');
  const totalCpDead = (cpValue*cpAEAT*cpHospitalAEAT*deadValue).toFixed(4);

  //calculation for the Current Pathway - AEAT - Hospital adm - Alive
  const totalCpAlive = (cpValue*cpAEAT*cpHospitalAEAT*aliveValue).toFixed(4);
  
  return (
    <div className="tcontainer">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap');
      </style>

      <table className="table-box0">
        {buttonlabels.map((label, index) => (
          <tr key={index}>
            <td>
              <button
                className="btn-labels"
                style={{ width: index === 0 ? "80px" : "120px" }}
              >
                {label}
              </button>
            </td>
          </tr>
        ))}
      </table>

      <table className="table-box1">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>
              <button className="btn-probabilities">Probabilities</button>
            </th>
          </tr>
        </thead>
        <tbody>
          
          {column1.map((label, index) => (
            <tr key={index}>
              <td></td>
              <td className="t-input">{label}</td>
              <td className="t-input">{index === 0 ? totalAEATDead : totalAEATAlive}</td>
            </tr>
          ))}
          <tr style={{ height: "10px" }}></tr>
          {column1.map((label, index) => (
            <tr key={index}>
              <td></td>
              <td className="t-input">{label}</td>
              <td className="t-input">{index === 0 ? totalCpDead : totalCpAlive}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="Link" onClick={() => probIsOpen(true)}>
                View More
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-box2">
        <thead>
          <tr>
            <th></th>
            <th>
              <button className="btn-interventions">Interventions</button>
            </th>
            <th>
              <button className="btn-cost">Total Cost</button>
            </th>
            <th>
              <button className="btn-qalys">Total QALYs</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* column labels Dead Alive*/}
          {column2.map((label) => (
            <tr>
              <td></td>

              <td className="t-input">{label}</td>
              <td className="t-input"></td>
              <td className="t-input"></td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <button className="Link" onClick={() => costIsOpen(true)}>
                View More
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-box3">
        <thead>
          <tr>
            <th></th>
            <th>
              <button className="btn-cost-qalys">Cost/QALYs</button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td className="t-input">{totalAEATDead}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* FOR POPUP INCASE WE NEED IT */}
      {/* {cIsOpen && (
         <div className="tableCost">
          <div>
            This is the content of the pop-up.
          </div>
          <button className="costClose"onClick={() => costIsOpen(false)}>
            CloseCost
          </button>
         </div>
        )}

    {pIsOpen && (
         <div className="tableProb">
          <div>
            This is the content of the pop-up.
          </div>
          <button className="probClose"onClick={() => probIsOpen(false)}>
            CloseProb
          </button>
         </div>
        )} */}
    </div>
  );
}
