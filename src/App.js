import React, { useState, useEffect } from "react";
import MolduTable from "./tables/MolduTable";
import AddMolduForm from "./forms/AddMolduForm";
import EditMolduForm from "./forms/EditMolduForm";
import axios from "axios";

const local = "http://localhost:9000";
const remote = "https://moldu.herokuapp.com";
const API_URL = remote + "/moldu/v1";

const App = () => {
  const [moldus, setMoldus] = useState([]); // Create a new state variable: moldus (die alle moldussen bevat) with a corresponding setMoldus method, to set it's state
  const [editing, setEditing] = useState(false); // False is de initiele waarde van de state variabele

  // Creeer een nieuwe state variabele: currentMoldu en vul deze initieel met een leeg moldu object
  const initialFormState = { id: null, text: "", author: "", priority: 3 };
  const [currentMoldu, setCurrentMoldu] = useState(initialFormState);
  const [loadingStatus, setLoadingStatus] = useState("Loading...");
  const [randomMoldu, setRandomMoldu] = useState([]);

  // Functie voor het toevoegen van een moldu
  const addMoldu = moldu => {
    // Roep de REST-API aan om een moldu toe te voegen
    axios
      .post(`${API_URL}/moldus`, moldu)
      .then(function(response) {
        // Haal de id op van de toegevoegde moldu en update de lokale lijst
        moldu.id = response.data.id; // Id van het toegevoegde moldu object
        setMoldus([...moldus, moldu]); // Voeg de moldu toe aan het einde van de lijst (lokaal)
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deleteMoldu = id => {
    setEditing(false); // Zorgt er voor dat bij rendering het Add formulier (ipv Edit formulier wordt getoond)

    axios
      .delete(`${API_URL}/moldus/${id}`)
      .then(function(response) {
        // Take the id and filter that moldu out of the lokal list en set the new state
        setMoldus(moldus.filter(moldu => moldu.id !== id));
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Functie die de geselecteerde row toont in het edit scherm
  const editRow = moldu => {
    setEditing(true); // Toon het Edit formulier (dit gebeurd na rendering)

    // Door setCurrentMoldu wordt de state geset en wordt er opnieuw gerenderd en dus de edit mode getoond!
    setCurrentMoldu({
      id: moldu.id,
      text: moldu.text,
      author: moldu.author,
      priority: moldu.priority
    });
  };

  // Functie voor het updaten van een moldu
  const updateMoldu = (id, updateMoldu) => {
    setEditing(false);

    axios
      .put(`${API_URL}/moldus`, updateMoldu)
      .then(function(response) {
        // Update de Moldu in de lokale lijst (DOM)
        setMoldus(moldus.map(moldu => (moldu.id === id ? updateMoldu : moldu)));
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Onetime read the Moldus from the Back-end and Initialise the moldus state variabel (that holds all hte moldus)
  // Also load a random Moldu
  useEffect(() => {
    // Load all the Moldu's
    axios
      .get(`${API_URL}/moldus`)
      .then(result => {
        setMoldus(result.data);
        setLoadingStatus("No Moldus"); //This will appear if the list is empty after loading
        console.log(result);
      })
      .catch(error => {
        setLoadingStatus("There was a problem. " + error);
        console.log(error);
      });

    // Load a Random Moldu to show
    axios
      .get(`${API_URL}/moldus/random`)
      .then(function(response) {
        setRandomMoldu(response.data[0]);
        console.log(response);
      })
      .catch(function(error) {
        console.log("Random Moldu could not be loaded. " + error);
      });
  }, []);

  return (
    <div className="container">
      {/* Dit is Javascript comment, omdat dit JSX is */}

      <div className="jumbotron">
        <h1>MoldU</h1>
        <p className="text-secondary">
          Be reminded of those valuable life lessons!
        </p>
        <blockquote>
          <h4 className="font-italic">{randomMoldu.text}</h4>
          <footer className="small">
            {randomMoldu.author} [{randomMoldu.priority}]
          </footer>
        </blockquote>
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
            loadingStatus={loadingStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
