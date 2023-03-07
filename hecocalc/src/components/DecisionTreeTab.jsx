import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const accessId = process.env.REACT_APP_ACCESS_ID;
const accessKey = process.env.REACT_APP_ACCESS_KEY;
const s3Bucket = "alancompany";
const region = "eu-west-2"

function DecisionTreeTab() {
  const [treeFiles, setTreeFiles] = useState([]);

  useEffect(() => {
    // create S3 client instance
    const s3 = new AWS.S3({
      accessKeyId: accessId,
      secretAccessKey: accessKey,
      region: region
    });

    // get all objects in the treespec folder
    s3.listObjectsV2({ Bucket: s3Bucket, Prefix: 'TreeSpecs' }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const fileNames = data.Contents.map(obj => obj.Key.slice(10)).filter(name => name !== '');
        setTreeFiles(fileNames);
      }
    });
  }, []);

  return (
    <div className='settings-tab-container'>
      <p className='settings-topline-small'>Decision tree specification:</p>
      <div className='settings-label-container'>
        <div className='settings-label-wrapper'>
          <label className='settings-label'>
            <select className='settings-select'>
              {treeFiles.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <button className='settings-btn'>
            Upload
          </button>
        </div>
      </div>
      <p className='settings-bottom-line-small'>Format: CSV/JSON</p>
    </div>
  )
}

export default DecisionTreeTab;
