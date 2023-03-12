import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Pool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";

function App() {
    var repositories = [];
    var companies = [];
    var position = "";
    const authenticate = async (Username,Password) => {
      return await new Promise((resolve, reject) => {
        const user = new CognitoUser({Username,Pool});
        const authDetails = new AuthenticationDetails({Username,Password});

      user.authenticateUser(authDetails, {
        onSuccess: function (result) {
          console.log(result);
          resolve(result);
          // navigateToHome();
        },

        onFailure: (err) => {
          console.log("Error Test");
          console.log(err);
          reject(err);
        },
      });
    });
  };

  const getRepo = () => {
    return repositories;
  };

  const getComp = () => {
    return companies;
  };
  

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
            user.getUserData(function (err, userData) {
              if (err) {
                alert(err.message || JSON.stringify(err));
                return;
              }
              console.log(userData);
            });
          }
        });
      } else {
        reject();
      }
    });
  };

  const getCompanies = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            user.getUserData(function (err, userData) {
              if (err) {
                alert(err.message || JSON.stringify(err));
                return;
              }
              console.log(userData);
              var idToken = session.idToken.jwtToken;
              AWS.config.region = "eu-west-2";
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId:
                  "eu-west-2:fca66400-f2b5-4b3b-bee7-2d01ea34e734",
                Logins: {
                  "cognito-idp.eu-west-2.amazonaws.com/eu-west-2_FfGgfMElM":
                    idToken,
                },
              });
              AWS.config.credentials.get(function (err) {
                if (err) return console.error(err);
                else console.log(AWS.config.credentials);

                var s3 = new AWS.S3({
                  apiVersion: "2006-03-01",
                  params: { Bucket: 'alancompany' },
                });

                s3.listObjects(
                  { Delimiter: "", Prefix: "" },
                  function (err, data) {
                    companies = data.Contents;
                    resolve(companies);
                  }
                );
              });
            });
          }
        });
      } else {
        reject();
      }
    });
  };

  

  const getRepositories = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            user.getUserData(function (err, userData) {
              if (err) {
                alert(err.message || JSON.stringify(err));
                return;
              }
              console.log(userData);
              if(userData.UserAttributes[2].Value !== '3'){
                localStorage.setItem("company", userData.UserAttributes[4].Value);
              }
              var idToken = session.idToken.jwtToken;

              AWS.config.region = "eu-west-2";
              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId:
                  "eu-west-2:fca66400-f2b5-4b3b-bee7-2d01ea34e734",
                Logins: {
                  "cognito-idp.eu-west-2.amazonaws.com/eu-west-2_FfGgfMElM":
                    idToken,
                },
              });
              AWS.config.credentials.get(function (err) {
                if (err) return console.error(err);
                else console.log(AWS.config.credentials);

                var s3 = new AWS.S3({
                  apiVersion: "2006-03-01",
                  params: { Bucket: 'alancompany' },
                });

                s3.listObjects(
                  { Delimiter: "", Prefix: (localStorage.getItem("company") + "/Repositories/") },
                  function (err, data) {
                    repositories = data.Contents;
                    resolve(repositories);
                  }
                );
              });
            });
          }
        });
      } else {
        reject();
      }
    });
  };

  const getUserDetails = async () => {
    return await new Promise((resolve,reject) => {
      const user = Pool.getCurrentUser();
      if(user){
        user.getSession((err,session) => {
          if(err){
            reject();
          }
          else{
            user.getUserData(function (err,userData){
              if (err) {
                alert(err.message || JSON.stringify(err));
                return;
              }
              resolve(userData);
            })
          }
        })
      }
    })
  }

  return (
    <div>
    <main>
      <Outlet context={{
        authenticate: authenticate,
        getSession: getSession,
        getRepositories: getRepositories,
        repositories: repositories,
        getRepo: getRepo,
        getUserDetails: getUserDetails,
        position: position,
        companies: companies,
        getCompanies: getCompanies,
        getComp: getComp,
      }}/>
    </main>
    </div>
  );
}

export default App;
