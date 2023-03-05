import Linechart from "../components/Linechart";
import ScatterPlot from "../components/ScatterPlot";
import Tornado from "../components/TornadoDiagram";
import InputScreen from "../components/InputScreen";
import DeterministicResults from "../components/DeterministicResults";
import ProbabilisticResults from "../components/ProbabilisticResults";
import RunSimulations from "../components/RunSimulations";
import Navbar from "../components/Navbar";
import "../css/dashboard.css";

function GraphsDashboard({
  iterationNum,
  setIterationNum,
  digitalProbability,
  setDigitalProbability,
  appropriateTreatment,
  setAppropriateTreatment,
  hospitalWithDigital,
  setHospitalWithDigital,
  serviceWithDigital,
  setServiceWithDigital,
}) {
  return (
    <>
      <Navbar />
      <div>
        <RunSimulations
          iterationNum={iterationNum}
          setIterationNum={setIterationNum}
        />
      </div>
      <div className="DashBoard">
        <div className="InputScreen">
          <InputScreen
            digitalProbability={digitalProbability}
            setDigitalProbability={setDigitalProbability}
            appropriateTreatment={appropriateTreatment}
            setAppropriateTreatment={setAppropriateTreatment}
            hospitalWithDigital={hospitalWithDigital}
            setHospitalWithDigital={setHospitalWithDigital}
            serviceWithDigital={serviceWithDigital}
            setServiceWithDigital={setServiceWithDigital}
          />
        </div>
        <div className="DeterministicResults">
          <div className="Results">
            <DeterministicResults />
          </div>
        </div>
        <div className="ProbabilisticResults">
          <div className="Results">
            <ProbabilisticResults />
          </div>
        </div>
      </div>
      <div className="GridLineAndScatter">
        <div className="grid-itemscatter">
          <Tornado />
        </div>
        <div className="grid-itemline">
          <Linechart />
        </div>
        {/* <h1 className="heading">One-way sensitivity analysis</h1> */}
        <hr className="horizontalLine" />
      </div>

      
    </>
  );
}

export default GraphsDashboard;
