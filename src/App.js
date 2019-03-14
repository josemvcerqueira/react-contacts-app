import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState(() => ({
        contacts
      }));
    });
  }

  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(user => {
        return user.id !== contact.id;
      })
    }));
    ContactsAPI.remove(contact);
  };

  render() {
    const { state, removeContact } = this;
    return (
      <div>
        <ListContacts
          onDeleteContact={removeContact}
          contacts={state.contacts}
        />
      </div>
    );
  }
}

export default App;
