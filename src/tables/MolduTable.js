import React from "react";

const MolduTable = props => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th>Text</th>
        <th>Author</th>
        <th>Prio</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.moldus.length > 0 ? (
        props.moldus.map(moldu => (
          <tr key={moldu.id}>
            <td>{moldu.text}</td>
            <td>{moldu.author}</td>
            <td>{moldu.priority}</td>
            <td>
              <div className="btn-group">
                <button
                  type="button"
                  onClick={() => {
                    props.editRow(moldu);
                  }}
                  className="btn btn-info"
                >
                  <span className="glyphicon glyphicon-trash" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => props.deleteMoldu(moldu.id)}
                  className="btn btn-info"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No moldus</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default MolduTable;
