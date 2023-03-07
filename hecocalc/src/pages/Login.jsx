import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "../css/login.css";
import UserPool from "../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
import { useOutletContext } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var position = useOutletContext().position;
  const navigate = useNavigate();
  const [error,setError] = useState(false);
  const authenticate = useOutletContext().authenticate;
  const getCompanies = useOutletContext().getCompanies;
  const getUserDetails = useOutletContext().getUserDetails;
  const getRepositories = useOutletContext().getRepositories;
  const navigateToHome = () => {
    navigate("/dashboard");
  };

  let style;
  if(!error){
     style = {
        "& label.Mui-focused": {
          borderBottomcolor: '#FF931E',
          color:'#FF931E',
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: '#FF931E'
        },
        
      
    }
  }
  else{
     style = {
      "& .MuiFormLabel-root":{
        color:'#E50000'

      },
      "& label.MuiFormLabel-root.Mui-focused":{
        color:'#FF931E'

      },
      
      "& .MuiInput-underline:after": {
        borderBottomColor: '#FF931E',
        color:'black'
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: '#E50000',
        color:'black'
      },
      
    
  }
  }
  

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email,password)
    .then(data => {
      getUserDetails()
        .then(details => {
          position = details.UserAttributes[2].Value;
          if(position === '3'){
            getCompanies().then(x => {
              console.log(x);
              navigate('/managerselect');
            })

          }
          else{
            getRepositories().then(x => {
              console.log(x);
              navigate('/loginsettings');
          });

          }
        })
      
    })
    .catch(err => {
      setError(true);
      console.log(err);
    })

    
  };

  return (
    <>
      <div className="login-container">
        <div className="leftSide">
          <div className="Main">HecoCalc</div>
          <div className="Sub">by HecoAnalytics</div>
        </div>
        <div className="rightSide">
          <img
            src="./assets/hecologo.png"
            alt="jsx-a11y/alt-text"
            onClick={navigateToHome}
          />

          <div className="signInBox">
            <div className="Title">Sign In</div>
            <TextField
              id="standard-basic"
              label="Enter Email..."
              variant="standard"
              size="50px"
              value={email}
              sx={style}
              onChange={(event) => setEmail(event.target.value)}
            />
            
            <TextField
              id="standard-basic"
              label="Enter Password..."
              variant="standard"
              type="password"
              value={password}
              sx={style}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="loginButton" type="submit" onClick={onSubmit}>
              SIGN IN
            </button>
          </div>
        </div>
        <div className="Footer">
          Don't have an account? Reach out to contact@HecoAnalytics.com
        </div>
      </div>
    </>
  );
}

export default Login;
