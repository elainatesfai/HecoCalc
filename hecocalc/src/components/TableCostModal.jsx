import React from "react";
import "../css/treecostprob.css";
import {
    dDigAEATHpProb,
    aDigAEATHpProb,
    dDigIEATHpProb,
    aDigIEATHpProb,
    dCpAEATHpProb,
    aCpAEATHpProb,
    dCpIEATHpProb,
    aCpIEATHpProb,
    costDigitalAEAT,
    costDigitalAEATNon,
    costDigitalIEAT,
    costDigitalIEATNon,
    costCpAEAT,
    costCpAEATNon,
    costCpIEAT,
    costCpIEATNon,
    aDigAEATNonHpProb,
    dDigAEATNonHpProb,
    dDigIEATNonHpProb,
    aDigIEATNonHpProb,
    dCpAEATNonHpProb,
    aCpAEATNonHpProb,
    dCpIEATNonHpProb,
    aCpIEATNonHpProb,
    
    dECDigitalAeatHos,
    aECDigitalAeatHos,
    dECDigitalAeatNon,
    aECDigitalAeatNon,
    dECDigitalIeatHos,
    aECDigitalIeatHos,
    dECDigitalIeatNon,
    aECDigitalIeatNon,

    dECCurrentPAeatHos,
    aECCurrentPAeatHos,
    dECCurrentPAeatNon,
    aECCurrentPAeatNon,
    dECCurrentPIeatHos,
    aECCurrentPIeatHos,
    dECCurrentPIeatNon,
    aECCurrentPIeatNon



} from "../data/DataCalc.jsx";
export default function TableCostModal(){
    const buttonLabels = ["Expected Costs", "Expected QALYs"];
    //   //Excpected costs for Digital
    //   const dECDigitalAeatHos = dDigAEATHpProb()*costDigitalAEAT();
    //   const aECDigitalAeatHos = aDigAEATHpProb()*costDigitalAEAT();
    //   const dECDigitalAeatNon = dDigAEATNonHpProb()*costDigitalAEATNon();
    //   const aECDigitalAeatNon = aDigAEATNonHpProb()*costDigitalAEATNon();
    //   const dECDigitalIeatHos = dDigIEATHpProb()*costDigitalIEAT();
    //   const aECDigitalIeatHos = aDigIEATHpProb()*costDigitalIEAT();
    //   const dECDigitalIeatNon = dDigIEATNonHpProb()*costDigitalIEATNon();
    //   const aECDigitalIeatNon = aDigIEATNonHpProb()*costDigitalIEATNon();
   
    //   //Expected costs for Current Pathway
    //   const dECCurrentPAeatHos = dCpAEATHpProb()*costCpAEAT();
    //   const aECCurrentPAeatHos = aCpAEATHpProb()*costCpAEAT();
    //   const dECCurrentPAeatNon = dCpAEATNonHpProb()*costCpAEATNon();
    //   const aECCurrentPAeatNon = aCpAEATNonHpProb()*costCpAEATNon();
    //   const dECCurrentPIeatHos = dCpIEATHpProb()*costCpIEAT();
    //   const aECCurrentPIeatHos = aCpIEATHpProb()*costCpIEAT();
    //   const dECCurrentPIeatNon = dCpIEATNonHpProb()*costCpIEATNon();
    //   const aECCurrentPIeatNon = aCpIEATNonHpProb()*costCpIEATNon();
    return(
        <div className="costModal-container">
            <table>
                <thead>
                    <tr style={{display:"flex"}}>
                        {buttonLabels.map((label,index)=>(
                            <tr key ={index}>
                                <td>
                                    <button 
                                      className="btn-cost"
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
                    {[...Array(16)].map((_,rowIndex)=>(
                      <tr
                        key={rowIndex}
                        style={{
                            display: "flex",
                            borderBottom: rowIndex === 16 && rowIndex === 7 ? "1px " : "0",
                            marginBottom: rowIndex === 7 ? "30px" : " ",
                            borderTop: rowIndex === 0 && rowIndex === 8 ? "1px" : "0",
                        }}
                      >
                        {[...Array(2)].map((_,colIndex)=>(
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
                                {colIndex === 0 && rowIndex === 0
                                
                                    // Digital Expected Cost
                                    ? dECDigitalAeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 1)
                                    ? aECDigitalAeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 2)
                                    ? dECDigitalAeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 3)
                                    ? aECDigitalAeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 4)
                                    ? dECDigitalIeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 5)
                                    ? aECDigitalIeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 6)
                                    ? dECDigitalIeatNon().toFixed(4)                                    
                                    : colIndex === 0 && (rowIndex === 7)
                                    ? aECDigitalIeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 8)
                            
                                    //Current Pathway Expected
                                    ? dECCurrentPAeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 9)
                                    ? aECCurrentPAeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 10)
                                    ? dECCurrentPAeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 11)
                                    ? aECCurrentPAeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 12)
                                    ? dECCurrentPIeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 13)
                                    ? aECCurrentPIeatHos().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 14)
                                    ? dECCurrentPIeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 15)
                                    ? aECCurrentPIeatNon().toFixed(4)
                                    : colIndex === 0 && (rowIndex === 16)
                           
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

