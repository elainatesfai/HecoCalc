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


export default function TreeCostProb() {
  const [probOpen, setProbOpen] = useState(false);
  const [costOpen, setCostOpen] = useState(false);

  const openProbTable = () => {
    setProbOpen(true);
  };

  const openCostTable = () => {
    setCostOpen(true);
  };

  // const ECDigSum = sumECDigital();
  // const ECCPSum = sumECCurrentP();

  const column1 = ["Dead", "Alive"];

  const data = [sumECDigital(),sumECCurrentP()];
  const column2 = ["Digital", "Current pathway"];

  const buttonlabels = ["DIGITAL", "Current pathway"];

  // const digitalProb = parseFloat(localStorage.getItem("tpValue: " + fChild()));
  // const dAEATProb = parseFloat(
  //   localStorage.getItem("tpValue: " + ffChild() + " - " + fChild())
  // );
  // const dAEATHospProb = parseFloat(
  //   localStorage.getItem(
  //     "tpValue: " + fffChild() + " - " + ffChild() + " - " + fChild()
  //   )
  // );
  // const dAEATHospDeadProb = parseFloat(
  //   localStorage.getItem("tpValue: " + ffffChild() + " - " + ffChild())
  // );
  // const dIEATHospProb = parseFloat(
  //   localStorage.getItem(
  //     "tpValue: " + fffChild() + " - " + fsChild() + " - " + fChild()
  //   )
  // );
  // const dIEATHospDeadProb = parseFloat(
  //   localStorage.getItem("tpValue: " + ffffChild() + " - " + fsChild())
  // );

  // const cpProb = parseFloat(1 - localStorage.getItem("tpValue: " + fChild()));
  // const cpAEATProb = parseFloat(
  //   localStorage.getItem("tpValue: " + sfChild() + " - " + sChild())
  // );
  // const cpAEATHospProb = parseFloat(
  //   localStorage.getItem(
  //     "tpValue: " + fffChild() + " - " + sfChild() + " - " + sChild()
  //   )
  // );
  // const cpAEATHospDeadProb = parseFloat(
  //   localStorage.getItem("tpValue: " + ffffChild() + " - " + sfChild())
  // );
  // const cpIEATHospProb = parseFloat(
  //   localStorage.getItem(
  //     "tpValue: " + sffChild() + " - " + ssChild() + " - " + sChild()
  //   )
  // );
  // const cpIEATHospDeadProb = parseFloat(
  //   localStorage.getItem("tpValue: " + ffffChild() + " - " + ssChild())
  // );

  // const dDead =
  //   digitalProb * dAEATProb * dAEATHospProb * dAEATHospDeadProb +
  //   digitalProb * dAEATProb * (1 - dAEATHospProb) * dAEATHospDeadProb +
  //   digitalProb * (1 - dAEATProb) * dIEATHospProb * dIEATHospDeadProb +
  //   digitalProb * (1 - dAEATProb) * (1 - dIEATHospProb) * dIEATHospDeadProb;

  // const dAlive =
  //   digitalProb * dAEATProb * dAEATHospProb * (1 - dAEATHospDeadProb) +
  //   digitalProb * dAEATProb * (1 - dAEATHospProb) * (1 - dAEATHospDeadProb) +
  //   digitalProb * (1 - dAEATProb) * dIEATHospProb * (1 - dIEATHospDeadProb) +
  //   digitalProb *
  //     (1 - dAEATProb) *
  //     (1 - dIEATHospProb) *
  //     (1 - dIEATHospDeadProb);

  // const cpDead =
  //   cpProb * cpAEATProb * cpAEATHospProb * cpAEATHospDeadProb +
  //   cpProb * cpAEATProb * (1 - cpAEATHospProb) * cpAEATHospDeadProb +
  //   cpProb * (1 - cpAEATProb) * cpIEATHospProb * cpIEATHospDeadProb +
  //   cpProb * (1 - cpAEATProb) * (1 - cpIEATHospProb) * cpIEATHospDeadProb;

  // const cpAlive =
  //   cpProb * cpAEATProb * cpAEATHospProb * (1 - cpAEATHospDeadProb) +
  //   cpProb * cpAEATProb * (1 - cpAEATHospProb) * (1 - cpAEATHospDeadProb) +
  //   cpProb * (1 - cpAEATProb) * cpIEATHospProb * (1 - cpIEATHospDeadProb) +
  //   cpProb * (1 - cpAEATProb) * (1 - cpIEATHospProb) * (1 - cpIEATHospDeadProb);

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
              <button className="Link" onClick={openProbTable}>
                View More
              </button>
              {probOpen && <TableProbModal />}
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
              {/* <td className="t-input">{index === 0 ? sumECDigital().toFixed(3): sumECDigital().toFixed(3) }</td>
              <td className="t-input">{index === 1 ? sumECCurrentP().toFixed(3): sumECCurrentP().toFixed(3) }</td> */}
              <td className="t-input">{index===0?sumECDigital(): sumECCurrentP()}</td>
              <td className="t-input"></td>

            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
            <button className="Link" onClick={openCostTable}>
                View More
              </button>
              {costOpen && <TableCostModal />}
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
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
