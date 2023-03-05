import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Table from "../components/Table";
import '../css/snapshots.css'
import '../css/tabs.css'

import { S3 } from 'aws-sdk';

async function getS3Data() {
  const s3 = new S3({
    // accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    // region: process.env.REACT_APP_AWS_REGION

    accessKeyId: "AKIASDINEJ4Y2BGNFONK",
    secretAccessKey: "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",
    region: "eu-west-2"
  });
  const bucket = 'alancompany';
  const prefix = 'Snapshots/';

  try {
    const s3Response = await s3.listObjectsV2({ Bucket: bucket, Prefix: prefix }).promise();
    const data = s3Response.Contents.map(item => {
      const nameParts = item.Key.split('/');
      const name = nameParts[nameParts.length - 1].split('.')[0];
      return {
        date: item.LastModified.toLocaleDateString(),
        name: name,
        status: '',
        by: null
        // item.Metadata.uploadedby

      };
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

console.log(process.env)

function filterDataByStatus(status, data) {
  if (status === "All") {
    return data;
  } else {
    return data.filter(item => item.status === status);
  }
}

function Snapshots(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleState, setToggleState] = useState("All");
  const [tempList, setTempList] = useState([]);

  const toggleTab = (status) => {
    setToggleState(status);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const s3Data = await getS3Data();
      setData(s3Data);
    }
    fetchData();
  }, []);

  const filteredData = filterDataByStatus(toggleState, data).filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    const aDate = new Date(a.date.split('/').reverse().join('-'));
    const bDate = new Date(b.date.split('/').reverse().join('-'));
    return bDate - aDate;
  });

  return (
    <>
      <Navbar />

      {/* using divs and css from inputpage*/}
      <div className="grid-container">
        <div className="header">
          <div className="header-title">My snapshots</div>
        </div>

        <div className="bloc-tabs-topic">
          <div
            className={toggleState === "All" ? "tabs-topic active-tabs-topic" : "tabs-topic"}
            onClick={() => {
              toggleTab("All");
            }}
          >
            <p>All</p>
          </div>
          <div
            className={toggleState === "Approved" ? "tabs-topic active-tabs-topic" : "tabs-topic"}
            onClick={() => {
              toggleTab("Approved");
            }}
          >
            <p>Approved</p>
          </div>
          <div
            className={toggleState === "Rejected" ? "tabs-topic active-tabs-topic" : "tabs-topic"}
            onClick={() => {
              toggleTab("Rejected");
            }}
          >
            <p>Rejected</p>
        </div>
      </div>
      {/* ... */}
      <Table data={sortedData}  />
      {/* ... */}


      </div>
    </>
  )
}

export default Snapshots
