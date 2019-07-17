import React from "react";

// Ipv een Component wordt Contacts als een function geimplementeerd
// Indien je geen state and lifecycle functionaliteit nodig hebt is een function goedkoper, dan een component
const Contacts = ({ contacts }) => {
  return (
    <div>
      <center>
        <h1>Contact List</h1>
      </center>
      {contacts.map(contact => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{contact.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{contact.email}</h6>
            <p class="card-text">{contact.company.catchPhrase}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
