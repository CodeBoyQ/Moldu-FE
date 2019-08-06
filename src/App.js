import React, { useState, useEffect } from "react";
import MolduTable from "./tables/MolduTable";
import AddMolduForm from "./forms/AddMolduForm";
import EditMolduForm from "./forms/EditMolduForm";
import axios from "axios";

const App = () => {
  // const molduData = [
  //   { id: 1, text: "Het leven is prachtig!", author: "Frans", priority: 1 },
  //   { id: 2, text: "Deepwork is belangrijk", author: "Mistro", priority: 2 },
  //   {
  //     id: 3,
  //     text: "Leef met het einde voor ogen",
  //     author: "Benjogu",
  //     priority: 3
  //   }
  // ];

  const [moldus, setMoldus] = useState([]); // Create a new state variable: moldus with a corresponding setMoldus method, to set it's state

  const [editing, setEditing] = useState(false);

  //const [data, setData] = useState([]); // Creeert een nieuwe state-variabele met een initieel lege waarde

  // Creeer een nieuwe state variabele: currentMoldu en vul deze initieel met een leeg moldu object
  const initialFormState = { id: null, text: "", author: "", priority: 3 };
  const [currentMoldu, setCurrentMoldu] = useState(initialFormState);

  const addMoldu = moldu => {
    moldu.id = moldus.length + 1;
    setMoldus([...moldus, moldu]); //Voegt een moldu toe aan het einde van de lijst
  };

  // Take the id and filter that moldu out of the list en set the new state
  const deleteMoldu = id => {
    setEditing(false);
    setMoldus(moldus.filter(moldu => moldu.id !== id));
  };

  const editRow = moldu => {
    setEditing(true);
    // Door setCurrentMoldu wordt de state geset en wordt er opnieuw gerenderd en dus de edit mode getoond!
    setCurrentMoldu({
      id: moldu.id,
      text: moldu.text,
      author: moldu.author,
      priority: moldu.priority
    });
  };

  const updateMoldu = (id, updateMoldu) => {
    setEditing(false);
    setMoldus(moldus.map(moldu => (moldu.id === id ? updateMoldu : moldu)));
  };

  // Use Effect wordt bij elke render aangeroepen, tenzij x gelijk is aan x
  // useEffect(() => {
  //   fetch("http://jsonplaceholder.typicode.com/users")
  //     .then(res => res.json())
  //     .then(data => { setState(data)
  //       this.setState({ contacts: data });
  //     })
  //     .catch(console.log);
  //   console.log("Wagnu");
  // }, [contacts]);

  // Onetime read the Moldus from the Back-end and Initialise the moldus state variabel (that holds all hte moldus)
  useEffect(() => {
    axios
      .get("https://moldu.herokuapp.com/moldu/v1/moldus")
      .then(result => setMoldus(result.data));
  }, []);

  return (
    <div className="container">
      {/* Dit is Javascript comment, omdat dit JSX is */}

      <div className="jumbotron">
        <h1>MoldU</h1>
        <p>Be reminded of those valuable life lessons!</p>
      </div>
      <div className="flex-row">
        {/* Afhankelijk van de waarde van de editing state variabele, laat je het edit or add form zien*/}
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit mold</h2>
              <EditMolduForm
                editing={editing}
                setEditing={setEditing} //Dit is de functie voor het setten van de state variabele editing. En deze wordt gebruikt door de cancel button van de EditMolduForm.js
                currentMoldu={currentMoldu} //Dit zijn de gegevens van de huidige moldu
                updateMoldu={updateMoldu} //Deze funtie wordt door EditMolduForm component aangeroepen als er op de submit knop wordt gedrukt
              />
            </div>
          ) : (
            <div>
              <h2>Add mold</h2>
              {/* Je geeft o.a. de addMoldu en deleteMoldu methods mee via de properties van het AddMolduForm component, zodat deze de methods weer kan aanroepen! */}
              <AddMolduForm addMoldu={addMoldu} />
            </div>
          )}
        </div>
        <div className="flex-large mt-5">
          <h2>View molds</h2>
          <MolduTable
            moldus={moldus}
            editRow={editRow}
            deleteMoldu={deleteMoldu}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
