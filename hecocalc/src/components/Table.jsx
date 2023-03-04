import React from 'react';
import '../css/table.css';

function Table() {
  const data = [
    { date: '13/01/2023', name: 'diabetes-snapshot-v3', status: 'Rejected', by: 'john@gmail.com' },
    { date: '12/01/2023', name: 'diabetes-snapshot-v2', status: 'Approved', by: 'john@gmail.com' },
    { date: '11/01/2023', name: 'diabetes-snapshot-v1', status: '', by: 'john@gmail.com' },
  ];

  function getStatusClassName(status) {
    switch (status) {
      case 'Approved':
        return 'td-approved';
      case 'Rejected':
        return 'td-rejected';
      default:
        return 'td';
    }
  }

  return (
    <table id="myTable">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Status</th>
          <th>By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.date}</td>
            <td>{row.name}</td>
            <td className={getStatusClassName(row.status)}>{row.status}</td>
            <td>{row.by}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
