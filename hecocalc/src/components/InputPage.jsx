import React, { useState } from "react";
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
    { id: 0, name: fffChild() },
    { id: 1, name: fChild() },
    { id: 2, name: sChild() },
    { id: 3, name: "Drug - " + ffChild() },
    { id: 4, name: "Drug - " + fsChild() },
  ];

  const days = [
    { id: 0, name: "LOS - " + ffChild() },
    { id: 1, name: "LOS - " + fsChild() },
    { id: 2, name: "Total duration of antibiotics (d) - " + ffChild() },
    { id: 3, name: "Total duration of antibiotics (d) - " + fsChild() },
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

  const [cProbValue, setCProbValue] = useState(
    costs.map((item, key) => {
      return (
        Math.round(
          jStat.gamma.inv(
            Math.random(),
            parseInt(localStorage.getItem("cValue: " + item.name)),
            1.0
          ) * 100
        ) / 100
      );
    })
  );

  const [cUciVal, setCUciVal] = useState(
    costs.map((item, key) => {
      return (
        Math.round(
          jStat.gamma.inv(
            0.975,
            parseInt(localStorage.getItem("cValue: " + item.name)),
            1.0
          ) * 1000
        ) / 1000
      );
    })
  );

  const [cLciVal, setCLciVal] = useState(
    costs.map((item, key) => {
      return (
        Math.round(
          jStat.gamma.inv(
            0.025,
            parseInt(localStorage.getItem("cValue: " + item.name)),
            1.0
          ) * 1000
        ) / 1000
      );
    })
  );

  const [cSe, setCSe] = useState(
    costs.map((item, key) => {
      return Math.round(((cUciVal[key] - cLciVal[key]) / 3.92) * 1000) / 1000;
    })
  );

  const [dProbValue, setDProbValue] = useState(
    days.map((item, key) => {
      return Math.round(
        jStat.gamma.inv(
          Math.random(),
          parseInt(localStorage.getItem("dValue: " + item.name)),
          1.0
        )
      );
    })
  );

  const [dUciVal, setDUciVal] = useState(
    days.map((item, key) => {
      return (
        Math.round(
          jStat.gamma.inv(
            0.975,
            parseInt(localStorage.getItem("dValue: " + item.name)),
            1.0
          ) * 1000
        ) / 1000
      );
    })
  );

  const [dLciVal, setDLciVal] = useState(
    days.map((item, key) => {
      return (
        Math.round(
          jStat.gamma.inv(
            0.025,
            parseInt(localStorage.getItem("dValue: " + item.name)),
            1.0
          ) * 1000
        ) / 1000
      );
    })
  );

  const [dSe, setDSe] = useState(
    days.map((item, key) => {
      return Math.round(((dUciVal[key] - dLciVal[key]) / 3.92) * 1000) / 1000;
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
    setSe(
      transitionProb.map((item, key) => {
        return (uciVal[key] - lciVal[key]) / 3.92;
      })
    );
    setCUciVal(
      costs.map((item, key) => {
        return (
          Math.round(
            jStat.gamma.inv(
              0.975,
              parseInt(localStorage.getItem("cValue: " + item.name)),
              1.0
            ) * 1000
          ) / 1000
        );
      })
    );
    setCLciVal(
      costs.map((item, key) => {
        return (
          Math.round(
            jStat.gamma.inv(
              0.025,
              parseInt(localStorage.getItem("cValue: " + item.name)),
              1.0
            ) * 1000
          ) / 1000
        );
      })
    );
    setCSe(
      costs.map((item, key) => {
        return Math.round(((cUciVal[key] - cLciVal[key]) / 3.92) * 1000) / 1000;
      })
    );
    setDUciVal(
      days.map((item, key) => {
        return (
          Math.round(
            jStat.gamma.inv(
              0.975,
              parseInt(localStorage.getItem("dValue: " + item.name)),
              1.0
            ) * 1000
          ) / 1000
        );
      })
    );
    setDLciVal(
      days.map((item, key) => {
        return (
          Math.round(
            jStat.gamma.inv(
              0.025,
              parseInt(localStorage.getItem("dValue: " + item.name)),
              1.0
            ) * 1000
          ) / 1000
        );
      })
    );
    setDSe(
      days.map((item, key) => {
        return Math.round(((dUciVal[key] - dLciVal[key]) / 3.92) * 1000) / 1000;
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
                      title=""
                      placeholder={localStorage.getItem("cValue: " + item.name)}
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
              {cProbValue.map((item) => {
                return (
                  <div>
                    <input readOnly={true} value={item} />
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
                      readOnly={true}
                      value={localStorage.getItem("cValue: " + item.name)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{seVar}</label>
              {cSe.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{lciVar}</label>
              {cLciVal.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{uciVar}</label>
              {cUciVal.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{distVar}</label>
              {costs.map(() => {
                return (
                  <div>
                    <input type="text" readOnly={true} value="Gamma" />
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
                      readOnly={true}
                      value={localStorage.getItem("cValue: " + item.name)}
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
                    <input type="number" readOnly={true} value="1.0" />
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
                      placeholder={localStorage.getItem("dValue: " + item.name)}
                      value={value.prob}
                      onChange={(e) =>
                        handleValues(e, item.id, item.name, "dValue")
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{probVar}</label>
              {dProbValue.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
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
                      value={localStorage.getItem("dValue: " + item.name)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{seVar}</label>
              {dSe.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{lciVar}</label>
              {dLciVal.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{uciVar}</label>
              {dUciVal.map((item) => {
                return (
                  <div>
                    <input type="number" readOnly={true} value={item} />
                  </div>
                );
              })}
            </div>
            <div className="variables">
              <label htmlFor="">{distVar}</label>
              {days.map((item) => {
                return (
                  <div>
                    <input type="text" readOnly={true} value="Gamma" />
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
                      readOnly={true}
                      value={localStorage.getItem("dValue: " + item.name)}
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
                    <input type="number" readOnly={true} value="1.0" />
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
        <button onClick={() => updateValues()}>Update</button>
      </div>
    </>
  );
}
