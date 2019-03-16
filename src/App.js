import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

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

  CreateContact = contact => {
    ContactsAPI.create(contact).then(contact => {
      this.setState(prevState => ({
        contacts: prevState.contacts.concat([contact])
      }));
    });
  };

  render() {
    const { state, removeContact } = this;
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              onDeleteContact={removeContact}
              contacts={state.contacts}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.CreateContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
