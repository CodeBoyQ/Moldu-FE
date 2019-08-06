import React, { useState, useEffect } from "react";

const EditMolduForm = props => {
  // Creeer nieuwe state variabele moldu en initialiseer deze met de moldu die wordt mee gegeven door App.js middels de props
  const [moldu, setMoldu] = useState(props.currentMoldu);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setMoldu({ ...moldu, [name]: value });
  };

  // useEffect wordt na elke render aangeroepen, mits props is gewijzigd. Zorgenaamde Hook
  // is nodig zodat je op edit van een andere moldu kan klikken als er reeds een
  // moldu geedit wordt
  useEffect(() => {
    setMoldu(props.currentMoldu);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.updateMoldu(moldu.id, moldu);
      }}
    >
      <label>Text</label>
      <input
        type="text"
        className="form-control"
        name="text"
        value={moldu.text}
        onChange={handleInputChange}
      />
      <label className="mt-2">Author</label>
      <input
        type="text"
        className="form-control"
        name="author"
        value={moldu.author}
        onChange={handleInputChange}
      />
      <label>Priority</label>
      <select
        className="form-control"
        name="priority"
        onChange={handleInputChange}
        value={moldu.priority}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <div className="btn-group mt-2">
        <button className="btn btn-info">Update</button>
        <button
          type="submit"
          onClick={() => props.setEditing(false)}
          className="btn btn-default"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMolduForm;
