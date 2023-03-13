import { useOutletContext } from "react-router-dom";
// import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
// import UserPool from "../UserPool";
import "../css/loginsettings.css";
import { useState } from "react";

// export default function Settings() {
//   const getRepo = useOutletContext().getRepo;
//   var repositories = getRepo();
//   console.log(repositories);
//   var choices = [];
//   repositories.map((item) => {
//     let arr = item.Key.split("/");
//     if (arr.length > 0) {
//       if (choices.includes(arr[1]) === false) {
//         choices.push(arr[1]);
//       }
//     }
//   });

export default function Settings() {
  localStorage.setItem("repoName",'');
  const getRepo = useOutletContext().getRepo;
  var repositories = getRepo();
  var choices = [];
  repositories.map((item) => {
    let arr = item.Key.split("/");
    if (arr.length > 0) {
      if (choices.includes(arr[2]) === false && arr[2]!=='') {
        choices.push(arr[2]);
      }
    }
  });

  const submitSettings = (event) => {
    event.preventDefault();
    if(localStorage.getItem("repoName") !== 'Select' && localStorage.getItem("repoName") !== ''){
      console.log(localStorage.getItem("repoName"));
      localStorage.setItem("s3Link", localStorage.getItem("company") + "/Repositories/" + localStorage.getItem("repoName"));
      console.log(localStorage.getItem("s3Link"));
    }
  };

  const selectValue = (event) => {
    if(event.target.Value !== 'Select'){
      localStorage.setItem("repoName", event.target.value);

    }
  };

  return (
    <div>
      <h1>Choose Repository</h1>
      <br></br>
      <div className="login-settings-form-div">
        <form>
          <select onChange={selectValue}>
            <option value='Select'>-Select-</option>
            {choices.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <input type="submit" value="Continue" onClick={submitSettings} />
        </form>
      </div>
    </div>
  );
}
