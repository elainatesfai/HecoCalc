import "../css/treecostprob.css";
import React, { useState } from "react";
// import {
//   fChild,
//   ffChild,
//   fffChild,
//   fsChild,
//   sChild,
//   sfChild,
//   ssChild,
//   sffChild,
//   sfffChild,
//   ssffChild,
//   ffffChild,
// } from "../data/ChildrenData";
import TableProbModal from "./TableProbModal";
import TableCostModal from "./TableCostModal";


import {
  digitalProb,
  dAEATHospProb,
  dAEATHospDeadProb,
  dIEATHospProb,
  dIEATHospDeadProb,
  cpProb,
  cpAEATProb,
  cpAEATHospProb,
  cpAEATHospDeadProb,
  cpIEATHospProb,
  cpIEATHospDeadProb,
  dDead,
  dAlive,
  cpDead,
  cpAlive,
  sumECCurrentP,
  sumECDigital
} from "../data/DataCalc";

// export const probBtn=()=>{[probOpen, setProbOpen] = useState(false)};
// export const costBtn=()=>{[costOpen, setCostOpen] = useState(false)};

// export const openProbTable = () => {
//   setProbOpen(true);

// };

// export const closeProbTable = () => {
//   probBtn.setProbOpen(false);

// };


// export const openCostTable = () => {
//   setCostOpen(true);
// };

// export const closeCostTable = () => {
//   setCostOpen(false);
// };

export default function TreeCostProb() {


  const [probOpen, setProbOpen] = useState(1);
  const [costOpen, setCostOpen] = useState(1);

  const column1 = ["Dead", "Alive"];

  const data = [sumECDigital(),sumECCurrentP()];
  const column2 = ["Digital", "Current pathway"];

  const buttonlabels = ["DIGITAL", "Current pathway"];

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
              <td className="t-input" style={{ padding: "10px" }}>
                {label}
              </td>
              <td className="t-input">
                {index === 0 ? dDead().toFixed(3) : dAlive().toFixed(3)}
              </td>
            </tr>
          ))}
          <tr style={{ height: "10px" }}></tr>
          {column1.map((label, index) => (
            <tr key={index}>
              <td></td>
              <td className="t-input" style={{ padding: "10px" }}>
                {label}
              </td>
              <td className="t-input">
                {index === 0 ? cpDead().toFixed(3) : cpAlive().toFixed(3)}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>

            
              <button className="Link" onClick={()=>setProbOpen(probOpen+1)}>
                View More
              </button>
              
              {( probOpen%2==0) && <TableProbModal />}
              
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
          {column2.map((label,index) => (
            <tr key={index}>
              <td></td>

              <td className="t-input">{label}</td>
              <td className="t-input">{index===0?sumECDigital().toFixed(3): sumECCurrentP().toFixed(3)}</td>
              <td className="t-input"></td>

            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
            <button className="Link" onClick={()=> setCostOpen(costOpen+1) }>
                View More
              </button>
              {(costOpen%2==0) &&<TableCostModal/>}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table-box3">
        <thead>
          <tr>
            
            <th>
              <button className="btn-cost-qalys">Cost/QALYs</button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
