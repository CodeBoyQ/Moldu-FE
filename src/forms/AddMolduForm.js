import React, { useState } from "react"; // We import the useState Hook from React. It lets us keep local state in a function component.

// Dit is het Component, maar er wordt een function gebruikt ipv een Component
// Indien je geen Lifecycles etc. gebruikt is een function (const) goedkoper dan een Component
const AddUserForm = props => {
  //props bevat alle mee gegeven properties. In dit geval de addMoldu functie, die in de App.js wordt mee gegeven
  const initialFormState = { id: null, text: "", author: "", priority: 3 }; // Dit is gewoon een constante, die wordt geset met een Javascript object {..}
  // Inside the AddUserForm component, we declare a new state variable by calling the useState Hook. It returns a pair of values, to which we give names. We’re calling our variable moldu. We initialize it with an object als the only useState argument. The second returned item is itself a function. It lets us update the moldu so we’ll name it setMoldu.
  const [moldu, setMoldu] = useState(initialFormState); // Er wordt dus een nieuwe state Variabele moldu aangemaakt, die wordt geinitialiseerd met initialstate object en kun worden geset door de molduState method aan te roepen

  // Deze method krijgt een event object mee, met alle info over het event
  const handleInputChange = event => {
    //console.log(event.target.value);
    const { name, value } = event.target; // Event.target bevat de info van de desbetreffende input tag bv. <input type="text" name="author" value="fd"> in het geval er iets in author wordt ingetypt
    setMoldu({ ...moldu, [name]: value }); // When the moldu clicks, we call setMoldu with a new value. React will then re-render the AddUserForm component, passing the new moldu value to it.
  };

  // De return method. Alles hierbinnne wordt gerenderd, zodra dit component/function wordt aangeroepen
  return (
    <form
      // onSubmit is de functie die wordt aangeroepen als de submit button wordt geklikt
      onSubmit={event => {
        event.preventDefault(); // De standaard event wordt niet uitgevoerd, omdat we zelf in control willen zijn
        if (!moldu.text) return; // Als de tekst leeg is, dan wordt er niks gedaan

        props.addMoldu(moldu); // Roep de addMoldu method aan die je via App.js als property hebt mee gekregen!
        setMoldu(initialFormState);
      }}
    >
      <label>Text</label>
      <input
        className="form-control"
        type="text"
        name="text"
        value={moldu.text} // De waarde wordt initieel geset, met de waarde van name property van de Component state variabele moldu
        onChange={handleInputChange} // Bij elke wijziging van dit veld, wordt de onChange aangeroepen
      />
      <label className="mt-2">Author</label>
      <input
        className="form-control"
        type="text"
        name="author"
        value={moldu.author} // De waarde wordt initieel geset, met de waarde van author property van de Component state variabele moldu
        onChange={handleInputChange} // Bij elke wijziging van dit veld, wordt de onChange aangeroepen
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
      <button className="btn btn-info mt-3">Add</button>
    </form>
  );
};

export default AddUserForm;
