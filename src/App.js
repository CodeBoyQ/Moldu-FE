import React, { useState } from "react";
import UserTable from "./tables/UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "Tania", username: "floppydiskette" },
    { id: 2, name: "Craig", username: "siliconeidolon" },
    { id: 3, name: "Ben", username: "benisphere" }
  ];

  const [users, setUsers] = useState(usersData); // Create a new state variable: users with a corresponding setUsers method, to set it's state

  const [editing, setEditing] = useState(false);

  // Creeer een nieuwe state variabele: currentUser en vul deze initieel met een leeg user object
  const initialFormState = { id: null, name: "", username: "" };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]); //Voegt een user toe aan het einde van de lijst
  };

  // Take the id and filter that user out of the list en set the new state
  const deleteUser = id => {
    setEditing(false);
    setUsers(users.filter(user => user.id !== id));
  };

  const editRow = user => {
    setEditing(true);
    // Door setCurrentUser wordt de state geset en wordt er opnieuw gerenderd en dus de edit mode getoond!
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };

  return (
    <div className="container">
      {/* Dit is Javascript comment, omdat dit JSX is */}
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        {/* Afhankelijk van de waarde van de editing state variabele, laat je het edit or add form zien*/}
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing} //Dit is de functie voor het setten van de state variabele editing. En deze wordt gebruikt door de cancel button van de EditUserForm.js
                currentUser={currentUser} //Dit zijn de gegevens van de huidige user
                updateUser={updateUser} //Deze funtie wordt door EditUserForm component aangeroepen als er op de submit knop wordt gedrukt
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              {/* Je geeft o.a. de addUser en deleteUser methods mee via de properties van het AddUserForm component, zodat deze de methods weer kan aanroepen! */}
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
