import React, { useState } from "react"; // We import the useState Hook from React. It lets us keep local state in a function component.

// Dit is het Component, maar er wordt een function gebruikt ipv een Component
// Indien je geen Lifecycles etc. gebruikt is een function (const) goedkoper dan een Component
const AddUserForm = props => {
  //props bevat alle mee gegeven properties. In dit geval de addUser property, die in de App.js wordt mee gegeven
  const initialFormState = { id: null, name: "", username: "" }; // Dit is gewoon een constante, die wordt geset met een Javascript object {..}
  // Inside the AddUserForm component, we declare a new state variable by calling the useState Hook. It returns a pair of values, to which we give names. We’re calling our variable user. We initialize it with an object als the only useState argument. The second returned item is itself a function. It lets us update the user so we’ll name it setUser.
  const [user, setUser] = useState(initialFormState); // Er wordt dus een nieuwe state Variabele user aangemaakt, die wordt geinitialiseerd met initialstate object en kun worden geset door de userState method aan te roepen

  // Deze method krijgt een event object mee, met alle info over het event
  const handleInputChange = event => {
    //console.log(event.target.value);
    const { name, value } = event.target; // Event.target bevat de info van de desbetreffende input tag bv. <input type="text" name="username" value="fd"> in het geval er iets in username wordt ingetypt
    setUser({ ...user, [name]: value }); // When the user clicks, we call setUser with a new value. React will then re-render the AddUserForm component, passing the new user value to it.
  };

  // De return method. Alles hierbinnne wordt gerenderd, zodra dit component/function wordt aangeroepen
  return (
    <form
      // onSubmit is de functie die wordt aangeroepen als de submit button wordt geklikt
      onSubmit={event => {
        event.preventDefault(); // De standaard event wordt niet uitgevoerd, omdat we zelf in control willen zijn
        if (!user.name || !user.username) return; // Als een van deze twee leeg is, dan wordt er niks gedaan

        props.addUser(user); // Roep de addUser method aan die je via App.js als property hebt mee gekregen!
        setUser(initialFormState);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name} // De waarde wordt initieel geset, met de waarde van name property van de Component state variabele user
        onChange={handleInputChange} // Bij elke wijziging van dit veld, wordt de onChange aangeroepen
      />
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.username} // De waarde wordt initieel geset, met de waarde van username property van de Component state variabele user
        onChange={handleInputChange} // Bij elke wijziging van dit veld, wordt de onChange aangeroepen
      />
      <button>Add new user</button>
    </form>
  );
};

export default AddUserForm;
