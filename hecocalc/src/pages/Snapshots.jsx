import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Table from "../components/Table";
import '../css/uploadsnapshotmodel.css'
import '../css/snapshots.css'
import '../css/tabs.css'

import AWS from 'aws-sdk';


const accessId = process.env.REACT_APP_ACCESS_ID;
const accessKey = process.env.REACT_APP_ACCESS_KEY;
const s3Bucket = "alancompany";
const region = "eu-west-2"


async function getS3Data() {
    // create S3 client instance
    const s3 = new AWS.S3({
      accessKeyId: accessId,
      secretAccessKey: accessKey,
      region: region
    });
  const bucket = 'alancompany';
  const prefix = 'alancompany/Snapshots/';

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

// filter by search
function filterBySearch(searchTerm, data) {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}


function Snapshots(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleState, setToggleState] = useState("All");

  // Declaring role
  const [userRole, setUserRole] = useState("analyst"); // new state for user role
  
  // const setCloseClass = useState("Close Unclicked");
  // const setModalClass = useState("Modal Hidden");
  // const [isModalClicked, setIsModalClicked] = useState(false);

  // const updateModal = () => {
  //   if (!isModalClicked) {
  //     setCloseClass("Close Clicked");
  //     setModalClass("Modal Visible");
  //   } else {
  //     setCloseClass("Close Unlicked");
  //     setModalClass("Modal Hidden");
  //   }
  // };

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

          
          {/* {userRole === "analyst" ? ( // display button only for analyst role
            <button
              className="button-generate"
              onClick={() => updateModal(setIsModalClicked(!isModalClicked))}
            >
              Upload
            </button>
          ) : null} don't display button for manager role */}
        </div> 

        <div class="search-bar">
          <i class="fas fa-search"/>
          <input type="text" placeholder="Search..."/>
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
