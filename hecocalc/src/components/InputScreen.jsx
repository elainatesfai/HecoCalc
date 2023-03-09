import React, { useEffect } from "react";
import "../css/inputscreen.css";

export default function InputScreen({
  digitalProbability,
  setDigitalProbability,
  appropriateTreatment,
  setAppropriateTreatment,
  hospitalWithDigital,
  setHospitalWithDigital,
  serviceWithDigital,
  setServiceWithDigital,
}) {
  const handleChange = (e, change, item) => {
    change(e.target.value);
    localStorage.setItem("tpValue: " + item, e.target.value / 100);
  };

  const handleChange2 = (e, change, item, item2) => {
    change(e.target.value);
    localStorage.setItem(
      "tpValue: " + item,
      parseFloat(localStorage.getItem("tpValue: " + item2)) -
        parseFloat(localStorage.getItem("tpValue: " + item2)) *
          (e.target.value / 100)
    );
    console.log(localStorage.getItem("tpValue: " + item));
  };

  console.log(
    parseFloat(localStorage.getItem("tpValue: Hospital Adm - IEAT - DIGITAL")) -
      parseFloat(
        localStorage.getItem("tpValue: Hospital Adm - IEAT - DIGITAL")
      ) *
        (50 / 100)
  );

  return (
    <div className="input-screen-container">
      <h1>MODEL INPUT PARAMETERS</h1>
      <div className="container">
        <div className="input-group">
          <p>Digital Probability</p>
          <input type="range" />
          <div className="input-cont">
            <input
              type="number"
              max={100}
              min={0}
              name="digitalProbability"
              value={digitalProbability}
              onChange={(e) =>
                handleChange(e, setDigitalProbability, "DIGITAL")
              }
            />
          </div>
        </div>
        <div className="input-group">
          <p>Appropriate Treatment with Digital%</p>
          <input type="range" />
          <div className="input-cont">
            <input
              type="number"
              max={100}
              min={0}
              name="appropriateTreatment"
              value={appropriateTreatment}
              onChange={(e) =>
                handleChange(e, setAppropriateTreatment, "AEAT - DIGITAL")
              }
            />
          </div>
        </div>
        <div className="input-group">
          <p>Hospital with Digital%</p>
          <input type="range" />
          <div className="input-cont">
            <input
              type="number"
              max={100}
              min={0}
              name="hospitalWithDigital"
              value={hospitalWithDigital}
              onChange={(e) =>
                handleChange2(
                  e,
                  setHospitalWithDigital,
                  "Hospital Adm - AEAT - DIGITAL",
                  "Hospital Adm - IEAT - DIGITAL"
                )
              }
            />
          </div>
        </div>
        <div className="input-group">
          <p>Service with Digital%</p>
          <input type="range" />
          <div className="input-cont">
            <input
              type="number"
              max={100}
              min={0}
              name="serviceWithDigital"
              value={serviceWithDigital}
              onChange={(e) => setServiceWithDigital(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
