import React, { useState } from "react";
import "../css/runsimulations.css";
import { useNavigate } from "react-router-dom";

const RunSimulations = ({ iterationNum, setIterationNum }) => {
  const navigate = useNavigate();
  const route = (route) => {
    navigate("/" + route);
  };

  const run = () => {
    route("simulation");
  };

  const setCloseClass = useState("Close Unclicked");
  const setModalClass = useState("Modal Hidden");
  const [isModalClicked, setIsModalClicked] = useState(false);

  const updateModal = () => {
    if (!isModalClicked) {
      setCloseClass("Close Clicked");
      setModalClass("Modal Visible");
    } else {
      setCloseClass("Close Unlicked");
      setModalClass("Modal Hidden");
    }
  };

  return (
    <>
    <div className="component">
      <p>Number of Iterations:</p>
      <input
        type="text"
        value={iterationNum}
        onChange={(e) => setIterationNum(e.target.value)}
      />
      <button className="run-button" onClick={() => run(iterationNum)}>
        Run Simulation
      </button>
      <button className="save-button"
        onClick={() => updateModal(setIsModalClicked(!isModalClicked))}>
        Save
      </button>
    </div>

    <form
        id="upload-modal"
        className={isModalClicked ? "modal" : "modal-hidden"}
      >
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close"
              onClick={() => updateModal(setIsModalClicked(!isModalClicked))}
            >
              <i className='fas fa-close' />
            </span>
            <h2>Save Snapshots</h2>
          </div>
          <div className="modal-body">
            <p>PDFs will be saved locally, snaphots will be submitted to S3.</p>
            <div className="modal-input-container">
            <input id="file-input" name="file" placeholder="Enter snapshot name..."/>
            </div>
            <div className="modal-btn-container">
              <button
                className="modal-btn"
              >
                Submit Snapshot
              </button>
              <button
                className="modal-btn"
              >
                Save as PDF
              </button>
            </div>
          </div>
        </div>
      </form>

    </>
  );
};

export default RunSimulations;
