import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Pool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";

function App() {
  var repositories = [];
  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

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
              var bucket = userData.UserAttributes[4].Value;
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
                  params: { Bucket: bucket },
                });

                s3.listObjects(
                  { Delimiter: "", Prefix: "Repositories/" },
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

  return (
    <div>
      <main>
        <Outlet
          context={{
            authenticate: authenticate,
            getSession: getSession,
            getRepositories: getRepositories,
            repositories: repositories,
            getRepo: getRepo,
          }}
        />
      </main>
    </div>
  );
}

export default App;
