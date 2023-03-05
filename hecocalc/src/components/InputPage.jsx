import React, { useEffect, useState } from "react";
import "../css/inputpage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
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

export default function TableOption2() {
  const navigate = useNavigate();

  const router = (route) => {
    navigate(route);
  };

  var { jStat } = require("jstat");

  const valueVar = "Value";
  const probVar = "Probabilistic";
  const determVar = "Deterministic";
  const seVar = "SE";
  const lciVar = "95% LCI";
  const uciVar = "95% UCI";
  const distVar = "Distribution";
  const alphaVar = "Alpha";
  const betaVar = "Beta";
  const nVar = "N";

  const [transitionProb, setTransitionProb] = useState([
    {
      id: 0,
      name: fChild(),
    },
    {
      id: 1,
      name: ffChild() + " - " + fChild(),
    },
    {
      id: 2,
      name: fffChild() + " - " + ffChild() + " - " + fChild(),
    },
    {
      id: 3,
      name: fffChild() + " - " + fsChild() + " - " + fChild(),
    },
    {
      id: 4,
      name: sfChild() + " - " + sChild(),
    },
    {
      id: 5,
      name: sffChild() + " - " + sfChild() + " - " + sChild(),
    },
    {
      id: 6,
      name: sffChild() + " - " + ssChild() + " - " + sChild(),
    },
    {
      id: 7,
      name: sfffChild() + " - " + sfChild(),
    },
    {
      id: 8,
      name: ssffChild() + " - " + ssChild(),
    },
  ]);

  const utilities = [
    { id: 0, name: "QoL Dead" },
    { id: 1, name: "QoL Alive/With clinical response/cured" },
  ];

  const costs = [
    { id: 0, name: "Hospitalisation Cost" },
    { id: 1, name: "DIGITAL" },
    { id: 2, name: "Current Pathway" },
    { id: 3, name: "Drug AEAT" },
    { id: 4, name: "Drug IEAT" },
  ];

  const days = [
    { id: 0, name: "LOS - AEAT" },
    { id: 1, name: "LOS - IEAT" },
    { id: 2, name: "Total duration of antibiotics (d) - AEAT" },
    { id: 3, name: "Total duration of antibiotics (d) - IEAT" },
  ];

  const [value, setValue] = useState(transitionProb);

  const [alpha, setAlpha] = useState(
    transitionProb.map((item) => {
      return (
        localStorage.getItem("tpValue: " + item.name) *
        localStorage.getItem("tpN: " + item.name)
      );
    })
  );

  const [beta, setBeta] = useState(
    transitionProb.map((item, key) => {
      return parseInt(localStorage.getItem("tpN: " + item.name)) - alpha[key];
    })
  );

  const [alphaChange, setAlphaChange] = useState(
    transitionProb.map((item) => {
      return (
        localStorage.getItem("tpValue: " + item.name) *
        localStorage.getItem("tpN: " + item.name)
      );
    })
  );

  const handleValues = (e, index, name, label) => {
    const values = [...value];
    values[index].value = e.target.value;
    setValue(values);
    localStorage.setItem(label + ": " + name, e.target.value);
  };

  const [probValue, setProbValue] = useState(
    transitionProb.map((item, key) => {
      return jStat.beta.inv(Math.random(), alphaChange[key], beta[key]);
    })
  );

  const [lciVal, setLciVal] = useState(
    transitionProb.map((item, key) => {
      return jStat.beta.inv(0.025, alphaChange[key], beta[key]);
    })
  );

  const [uciVal, setUciVal] = useState(
    transitionProb.map((item, key) => {
      return jStat.beta.inv(0.975, alphaChange[key], beta[key]);
    })
  );

  const [se, setSe] = useState(
    transitionProb.map((item, key) => {
      return (uciVal[key] - lciVal[key]) / 3.92;
    })
  );

  const updateValues = () => {
    setAlpha(
      transitionProb.map((item) => {
        return (
          localStorage.getItem("tpValue: " + item.name) *
          localStorage.getItem("tpN: " + item.name)
        );
      })
    );
    setBeta(
      transitionProb.map((item, key) => {
        return (
          parseInt(localStorage.getItem("tpN: " + item.name)) - alphaChange[key]
        );
      })
    );
    setLciVal(
      transitionProb.map((item, key) => {
        return jStat.beta.inv(0.025, alphaChange[key], beta[key]);
      })
    );
    setUciVal(
      transitionProb.map((item, key) => {
        return jStat.beta.inv(0.975, alphaChange[key], beta[key]);
      })
    );
    setProbValue(
      transitionProb.map((item, key) => {
        return jStat.beta.inv(Math.random(), alphaChange[key], beta[key]);
      })
    );
    setSe(
      transitionProb.map((item, key) => {
        return (uciVal[key] - lciVal[key]) / 3.92;
      })
    );
    window.location.reload(false);
  };

  // const addRow = () => {
  //   if (transitionProb.length === 9) {
  //     transitionProb.push({ id: 9, name: "New Row" });
  //     updateValues();
  //   }
  //   document.getElementById("addRow").disabled = true;
  //   document.getElementById("removeRow").disabled = false;
  // };

  // const removeRow = () => {
  //   if (transitionProb.length === 10) {
  //     setTransitionProb(transitionProb.splice(0, transitionProb.length - 1));
  //     setProbValue(probValue.splice(0, probValue.length - 1));
  //     setLciVal(lciVal.splice(0, lciVal.length - 1));
  //     setAlpha(alpha.splice(0, alpha.length - 1));
  //     setBeta(beta.splice(0, beta.length - 1));
  //   }
  //   document.getElementById("addRow").disabled = false;
  //   document.getElementById("removeRow").disabled = true;
  // };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="header">
          <div className="header-title">Decision Tree Input</div>
          <button
            className="button-generate"
            onClick={() => router("/generatetree")}
          >
            Generate
          </button>
        </div>
        <div className="table">
          <div className="columns">
            <div className="column-title">Transition Probabilities</div>
            <div className="column-values">
              {transitionProb.map((prob) => {
                return (
                  <div className="label-container">
                    <label htmlFor="" contentEditable={true}>
                      {prob.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rows">
            <div className="variables">
              <label htmlFor="">{valueVar}</label>
              {transitionProb.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      placeholder={localStorage.getItem(
                        "tpValue: " + item.name
                      )}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "tpValue")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{probVar}</label>
              {probValue.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      value={Math.round(item * 1000) / 1000}
                      readOnly={true}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{determVar}</label>
              {transitionProb.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      value={localStorage.getItem("tpValue: " + item.name)}
                      readOnly={true}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{seVar}</label>
              {se.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      readOnly={true}
                      value={Math.round(item * 1000) / 1000}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{lciVar}</label>
              {lciVal.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      readOnly={true}
                      value={Math.round(item * 1000) / 1000}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{uciVar}</label>
              {uciVal.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      readOnly={true}
                      value={Math.round(item * 1000) / 1000}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{distVar}</label>
              {transitionProb.map((item) => {
                return (
                  <div>
                    <input value="Beta" readOnly={true} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{alphaVar}</label>
              {alpha.map((alpha) => {
                return (
                  <div>
                    <input value={alpha} readOnly={true} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{betaVar}</label>
              {beta.map((b) => {
                return (
                  <div>
                    <input
                      type="number"
                      value={Math.round(b * 1000) / 1000}
                      readOnly={true}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{nVar}</label>
              {transitionProb.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      placeholder={localStorage.getItem("tpN: " + item.name)}
                      value={value.prob}
                      onChange={(e) => {
                        handleValues(e, item.id, item.name, "tpN");
                        setAlphaChange(
                          transitionProb.map((item) => {
                            return (
                              localStorage.getItem("tpValue: " + item.name) *
                              localStorage.getItem("tpN: " + item.name)
                            );
                          })
                        );
                        // handleAlphaBeta(item);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <button id="addRow" onClick={() => addRow()}>
          Add Row
        </button>
        <button id="removeRow" onClick={() => removeRow()}>
          Remove Row
        </button> */}
        <button onClick={() => updateValues()}>Update</button>

        <div className="table">
          <div className="columns">
            <div className="column-title">Utilities</div>
            <div className="column-values">
              {utilities.map((prob) => {
                return (
                  <div className="label-container">
                    <label htmlFor="">{prob.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rows">
            <div className="variables">
              <label htmlFor="">{valueVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uValue")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{probVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uProbabilistic")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{determVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uDeterministic")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{seVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uSe")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{lciVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uLci")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{uciVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uUci")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{distVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uDistribution")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{alphaVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uAlpha")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{betaVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "uBeta")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{nVar}</label>
              {utilities.map((item) => {
                return (
                  <div>
                    <input value="-" readOnly={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="table">
          <div className="columns">
            <div className="column-title">Costs (£)</div>
            <div className="column-values">
              {costs.map((prob) => {
                return (
                  <div className="label-container">
                    <label htmlFor="">{prob.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rows">
            <div className="variables">
              <label htmlFor="">{valueVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={10}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cValue")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{probVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={10}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cProbabilistic")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{determVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cDeterministic")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{seVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cSe")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{lciVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cLci")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{uciVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cUci")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{distVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="text"
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cDistribution")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{alphaVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cAlpha")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{betaVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "cBeta")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{nVar}</label>
              {costs.map((item) => {
                return (
                  <div>
                    <input value="-" readOnly={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="table">
          <div className="columns">
            <div className="column-title">Event Duration (Days)</div>
            <div className="column-values">
              {days.map((prob) => {
                return (
                  <div className="label-container">
                    <label htmlFor="">{prob.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rows">
            <div className="variables">
              <label htmlFor="">{valueVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eValue")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{probVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eProbabilistic")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{determVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eDeterministic")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{seVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eSe")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{lciVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eLci")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{uciVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eUci")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{distVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eDistribution")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{alphaVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eAlpha")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{betaVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "eBeta")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{nVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input value="-" readOnly={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
