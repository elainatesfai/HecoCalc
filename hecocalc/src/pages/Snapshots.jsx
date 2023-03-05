import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Table from "../components/Table";
import '../css/uploadsnapshotmodel.css'
import '../css/snapshots.css'
import '../css/tabs.css'

import { S3 } from 'aws-sdk';

async function getS3Data() {
  const s3 = new S3({
    // accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    // region: process.env.REACT_APP_AWS_REGION

    // This should not be hardcoded -> but .env is not working

    accessKeyId: "AKIASDINEJ4Y2BGNFONK",
    secretAccessKey: "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",
    region: "eu-west-2"
  });
  const bucket = 'alancompany';
  const prefix = 'Snapshots/';

  try {
    const s3Response = await s3.listObjectsV2({ Bucket: bucket, Prefix: prefix }).promise();
    const dataPromises = s3Response.Contents.filter(item => !item.Key.endsWith('/')).map(async item => {
      const nameParts = item.Key.split('/');
      const name = nameParts[nameParts.length - 1].split('.')[0];

      // Tags on files
      const taggingResponse = await s3.getObjectTagging({ Bucket: bucket, Key: item.Key }).promise();
      const statusTag = taggingResponse.TagSet.find(tag => tag.Key === 'status');
      const status = statusTag ? statusTag.Value : '';
      const uploadedByTag = taggingResponse.TagSet.find(tag => tag.Key === 'uploadedby');
      const uploadedBy = uploadedByTag ? uploadedByTag.Value : '';

      return {
        date: item.LastModified.toLocaleDateString(),
        name: name,
        status: status,
        by: uploadedBy
      };
    });
    const data = await Promise.all(dataPromises);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// filter tabs section
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
  
  const setCloseClass = useState("Close Unclicked");
  const setLoginModalClass = useState("Modal Hidden");
  const [isModalClicked, setIsModalClicked] = useState(false);

  const updateModal = () => {
    if (!isModalClicked) {
      setCloseClass("Close Clicked");
      setLoginModalClass("Modal Visible");
    } else {
      setCloseClass("Close Unlicked");
      setLoginModalClass("Modal Hidden");
    }
  };

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

          <button
            className="button-generate"
            onClick={() => updateModal(setIsModalClicked(!isModalClicked))}
            >
            Upload
          </button>

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

      <form
        id="upload-modal"
        className={isModalClicked ? "modal" : "modal-hidden"}
      >
        <div className="modal-content">
          <div className="modal-header">
            <span
              className="close"
              onClick={() => updateModal(setIsModalClicked(!isModalClicked))}
            >
              {/* &times; */}
              <i className='fas fa-close' />
            </span>
            <h2>Save Snapshots</h2>
          </div>
          <div className="modal-body">
            <p>PDFs will be saved locally, snaphots will be submitted to S3.</p>
            <div className="modal-input-container">
            <input id="file-input" name="file" placeholder="Enter snapshot name..."/>
              {/* <input type="text" id="file-input" name="file" placeholder="Enter snapshot name..." /> */}
            </div>
            <div className="modal-btn-container">
              <button
                className="modal-btn"
              >
                Submit Snapshot
              </button>
              <button
                className="modal-btn"
              >
                Save as PDF
              </button>
            </div>
          </div>
        </div>
      </form>

    </>
  )
}

export default Snapshots
