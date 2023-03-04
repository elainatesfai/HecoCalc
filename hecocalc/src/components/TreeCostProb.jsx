import DataTable, { createTheme } from "react-data-table-component";
import treecostprob from "../css/treecostprob.css"


export default function TreeCostProb(){
const column1 = [
  "Dead",
  "Alive"
]

const column2 = [
  "Digital",
  "Current pathway"
]

const buttonlabels = [
  "DIGITAL",
  "Current pathway"
]
    return(
    
    <div className="tcontainer">
      <table>
      {buttonlabels.map((label)=>(
      <tr>
        <td><button className="btn-labels">{label}</button></td>
        <td></td>
      </tr>
       ))}
       </table>
      <table className="table-box1"> 
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th><button className="btn-probabilities">Probabilities</button></th>
          </tr>
        </thead>
        <tbody>
        
          {/* column labels Dead Alive*/}
          {column1.map((label)=> (
          <tr>
            <td></td>
            <td className="t-input">{label}</td>
            <td className="t-input"></td>
          </tr>
          ))}
          {column1.map((label)=> (
          <tr>
            <td></td>
            <td className="t-input">{label}</td>
            <td className="t-input"></td>
          </tr>
          ))}           
        </tbody>
      </table>
      <table className="table-box2">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th><button className="btn-interventions">Interventions</button></th>
            <th><button className="btn-cost">Total Cost</button></th>
            <th><button className="btn-qalys">Total QALYs</button></th>
            <th></th>
            <th><button className="btn-qalys">Cost/QALYs</button></th>
          </tr>
        </thead>
        <tbody>
        
          {/* column labels Dead Alive*/}
          {column2.map((label)=> (
          <tr>
            <td></td>
            <td className="t-input">{label}</td>
            <td className="t-input"></td>
            <td className="t-input"></td>
            <td className="t-input"></td>
            <td></td>
            <td className="t-input"></td>
          </tr>
          ))}
                 
        </tbody>
      </table>
        
    </div>)
}