import { useOutletContext } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import "../css/loginsettings.css";
import { useState } from "react";





export default function Settings(){

    const getRepo = useOutletContext().getRepo;
    var repoName = useOutletContext().repoName;
    var repositories = getRepo();
    var choices = [];
    repositories.map(item => {
        let arr = item.Key.split('/');
        if(arr.length>0){
            if(choices.includes(arr[1])===false){
                choices.push(arr[1]);
            }
        }
    })

    const submitSettings = (event) => {
        event.preventDefault();
        console.log(repoName);

    }

    const selectValue = (event) => {
        repoName = event.target.value;
    }



    
    return(
        <div>
            <h1>Choose Repository</h1>
            <br></br>
            <div className="login-settings-form-div">
            <form>
                <select onChange={selectValue}>
                {choices.map(item => {
                return(
                    <option value={item}>{item}</option>
                )
            })}
                </select>
                <input type="submit" value="Continue" onClick={submitSettings} />
            </form>
            </div>
        </div>
    );
}