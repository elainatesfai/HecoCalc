import React from 'react'

function DecisionTreeTab() {
  const fileNames = ['input1.csv', 'input2.csv', 'input3.json'];

  return (
    <div className='settings-tab-container'>
      <p className='settings-topline-small'>Input data specification:</p>
      <div className='settings-label-container'>
        <div className='settings-label-wrapper'>
          <label className='settings-label'>
            <select className='settings-select'>
              {fileNames.map((name) => (
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

export default DecisionTreeTab
