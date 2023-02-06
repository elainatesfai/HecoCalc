import Linechart from "../components/Linechart";
import ScatterPlot from "../components/ScatterPlot";
import Tornado from "../components/TornadoDiagram";
import "../css/dashboard.css"

function GraphsDashboard() {
  return (
  <>
  <div class="grid-container">
    <div class="grid-item1"><ScatterPlot/></div>
    <div class="grid-item1"><Linechart/></div>
    <h1 className="heading"> One-way sensitivity analysis</h1>
    <hr className="horizontalLine"/>
    <div class="grid-item2"><Tornado/></div>
  </div>
  </>
  );
}

export default GraphsDashboard;