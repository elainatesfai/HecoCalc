import { useOutletContext } from "react-router-dom";
import "../css/loginsettings.css";
import { useNavigate } from "react-router-dom";



export default function ManagerSelection(){
    localStorage.setItem("company",'');
    const navigate = useNavigate();
    const getComp = useOutletContext().getComp;
    const getRepositories = useOutletContext().getRepositories;
    var companies = getComp();
    var choices = [];
    companies.map((item) => {
        let arr = item.Key.split("/");
        if(arr.length>0){
            if(choices.includes(arr[0]) === false) {
                choices.push(arr[0]);
            }
        }
    });

    const submitCompany = (event) => {
      event.preventDefault();
        if(localStorage.getItem("company") !== 'Select' && localStorage.getItem("company")!==''){
          console.log(localStorage.getItem("company"));
          getRepositories().then(x => {
                console.log(x);
                navigate('/loginsettings');
            });
        }
    };
    
    const select = (event) => {
        localStorage.setItem("company", event.target.value);
    };



    return (
        <div>
          <h1>Choose Company</h1>
          <br></br>
          <div className="login-settings-form-div">
            <form>
              <select onChange={select}>
                <option value='Select'>-Select-</option>
              {choices.map((item) => {
              return <option value={item}>{item}</option>;
                })}
              </select>
              <input type="submit" value="Continue" onClick={submitCompany}/>
            </form>
          </div>
        </div>
      );

}