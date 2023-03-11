import React from "react";
import "../css/treecostprob.css";
import {
  dDigAEATHpProb,
  aDigAEATHpProb,
  dDigAEATNonHpProb,
  aDigAEATNonHpProb,
  dDigIEATHpProb,
  aDigIEATHpProb,
  dDigIEATNonHpProb,
  aDigIEATNonHpProb,
  dCpAEATHpProb,
  aCpAEATHpProb,
  dCpAEATNonHpProb,
  aCpAEATNonHpProb,
  dCpIEATHpProb,
  aCpIEATHpProb,
  dCpIEATNonHpProb,
  aCpIEATNonHpProb,
  costDigitalAEAT,
  costDigitalAEATNon,
  costDigitalIEAT,
  costDigitalIEATNon,
  costCpAEAT,
  costCpAEATNon,
  costCpIEAT,
  costCpIEATNon,
  utilitiesALive
} from "../data/DataCalc.jsx";

import { openCostTable, openProbTable, closeCostTable, closeProbTable } from "./TreeCostProb";
// import {
//   digitalProb,
//   dAEATProb,
//   dAEATHospProb,
//   dAEATHospDeadProb,
//   dIEATHospProb,
//   dIEATHospDeadProb,
//   cpProb,
//   cpAEATProb,
//   cpAEATHospProb,
//   cpAEATHospDeadProb,
//   cpIEATHospProb,
//   cpIEATHospDeadProb,
//   digitalCost,
//   drugAEATCost,
//   dAEATHospCost,
//   drugIEATCost,
//   cpCost,
//   utilitiesALive,
// } from "../data/DataCalc";

export default function TableProbModal() {
  const buttonLabels = ["Probabilities", "Cost", "QALYs"];

  // //Digital Probabilities
  // const dDigAEATHpProb =
  //   digitalProb() * dAEATProb() * dAEATHospProb() * dAEATHospDeadProb();
  // const aDigAEATHpProb =
  //   digitalProb() * dAEATProb() * dAEATHospProb() * (1 - dAEATHospDeadProb());
  // const dDigAEATNonHpProb =
  //   digitalProb() * dAEATProb() * (1 - dAEATHospProb()) * dAEATHospDeadProb();
  // const aDigAEATNonHpProb =
  //   digitalProb() *
  //   dAEATProb() *
  //   (1 - dAEATHospProb()) *
  //   (1 - dAEATHospDeadProb());
  // const dDigIEATHpProb =
  //   digitalProb() * (1 - dAEATProb()) * dIEATHospProb() * dIEATHospDeadProb();
  // const aDigIEATHpProb =
  //   digitalProb() *
  //   (1 - dAEATProb()) *
  //   dIEATHospProb() *
  //   (1 - dIEATHospDeadProb());
  // const dDigIEATNonHpProb =
  //   digitalProb() *
  //   (1 - dAEATProb()) *
  //   (1 - dIEATHospProb()) *
  //   dIEATHospDeadProb();
  // const aDigIEATNonHpProb =
  //   digitalProb() *
  //   (1 - dAEATProb()) *
  //   (1 - dIEATHospProb()) *
  //   (1 - dIEATHospDeadProb());

  // //Current Pathway Probabilities
  // const dCpAEATHpProb =
  //   cpProb() * cpAEATProb() * cpAEATHospProb() * cpAEATHospDeadProb();
  // const aCpAEATHpProb =
  //   cpProb() * cpAEATProb() * cpAEATHospProb() * (1 - cpAEATHospDeadProb());
  // const dCpAEATNonHpProb =
  //   cpProb() * cpAEATProb() * (1 - cpAEATHospProb()) * cpAEATHospDeadProb();
  // const aCpAEATNonHpProb =
  //   cpProb() *
  //   cpAEATProb() *
  //   (1 - cpAEATHospProb()) *
  //   (1 - cpAEATHospDeadProb());
  // const dCpIEATHpProb =
  //   cpProb() * (1 - cpAEATProb()) * cpIEATHospProb() * cpIEATHospDeadProb();
  // const aCpIEATHpProb =
  //   cpProb() *
  //   (1 - cpAEATProb()) *
  //   cpIEATHospProb() *
  //   (1 - cpIEATHospDeadProb());
  // const dCpIEATNonHpProb =
  //   cpProb() *
  //   (1 - cpAEATProb()) *
  //   (1 - cpIEATHospProb()) *
  //   cpIEATHospDeadProb();
  // const aCpIEATNonHpProb =
  //   cpProb() *
  //   (1 - cpAEATProb()) *
  //   (1 - cpIEATHospProb()) *
  //   (1 - cpIEATHospDeadProb());

  // //Digital Cost
  // const costDigitalAEAT = digitalCost() + drugAEATCost() + dAEATHospCost();
  // const costDigitalAEATNon = digitalCost() + drugAEATCost();
  // const costDigitalIEAT = digitalCost() + drugIEATCost() + dAEATHospCost();
  // const costDigitalIEATNon = digitalCost() + drugIEATCost();

  // //Current pathway Cost
  // const costCpAEAT = cpCost() + drugAEATCost() + dAEATHospCost();
  // const costCpAEATNon = cpCost() + drugAEATCost();
  // const costCpIEAT = cpCost() + drugIEATCost() + dAEATHospCost();
  // const costCpIEATNon = cpCost() + drugIEATCost();

  return (
    <div className="probModal-container">
      <table>
        <thead>
          <tr style={{ display: "flex" }}>
            {buttonLabels.map((label, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="btn-probabilities"
                    style={{
                      backgroundColor:
                        index === 1
                          ? "#FFB5B5"
                          : index === 2
                          ? "#C3E2FF"
                          : "#B4F0BA",
                    }}
                  >
                    {label}
                  </button>
                </td>
              </tr>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(16)].map((_, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                display: "flex",
                borderBottom: rowIndex === 16 && rowIndex === 7 ? "1px " : "0",
                marginBottom: rowIndex === 7 ? "30px" : " ",
                borderTop: rowIndex === 0 && rowIndex === 8 ? "1px" : "0",
              }}
            >
              {[...Array(3)].map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="t-input"
                  style={{
                    flex: "1",
                    borderRight: "1px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {/* first column Probabilities, second Costs, third QALYs */}
                  {colIndex === 0 && rowIndex === 0
                    ? dDigAEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 1
                    ? aDigAEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 2
                    ? dDigAEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 3
                    ? aDigAEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 4
                    ? dDigIEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 5
                    ? aDigIEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 6
                    ? dDigIEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 7
                    ? aDigIEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 8
                    
                    ? dCpAEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 9
                    ? aCpAEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 10
                    ? dCpAEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 11
                    ? aCpAEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 12
                    ? dCpIEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 13
                    ? aCpIEATHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 14
                    ? dCpIEATNonHpProb().toFixed(4)
                    : colIndex === 0 && rowIndex === 15
                    ? aCpIEATNonHpProb().toFixed(4)
                    : colIndex === 1 && (rowIndex === 0 || rowIndex === 1)
                    ? costDigitalAEAT().toFixed(4)
                    : colIndex === 1 && (rowIndex === 2 || rowIndex === 3)
                    ? costDigitalAEATNon().toFixed(4)
                    : colIndex === 1 && (rowIndex === 4 || rowIndex === 5)
                    ? costDigitalIEAT().toFixed(4)
                    : colIndex === 1 && (rowIndex === 6 || rowIndex === 7)
                    ? costDigitalIEATNon().toFixed(4)
                    : colIndex === 1 && (rowIndex === 8 || rowIndex === 9)
                    ? costCpAEAT().toFixed(4)
                    : colIndex === 1 && (rowIndex === 10 || rowIndex === 11)
                    ? costCpAEATNon().toFixed(4)
                    : colIndex === 1 && (rowIndex === 12 || rowIndex === 13)
                    ? costCpIEAT().toFixed(4)
                    : colIndex === 1 && (rowIndex === 14 || rowIndex == 15)
                    ? costCpIEATNon().toFixed(4)
                    : colIndex === 2 &&
                      (rowIndex === 1 ||
                        rowIndex === 3 ||
                        rowIndex === 5 ||
                        rowIndex === 7)
                    ? utilitiesALive().toFixed(4)
                    : utilitiesALive().toFixed(4)
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>  
  );
}
