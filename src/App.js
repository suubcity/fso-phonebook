import React, { useState, useEffect, useDebugValue } from "react";
import personsService from "./services/persons";

const App = () => {
  const useStateWithLabel = (initialValue, name) => {
    const [value, setValue] = useState(initialValue);
    useDebugValue(`${name}: ${value}`);
    return [value, setValue];
  };

  //States
  const [persons, setPersons] = useStateWithLabel([], "persons");
  const [newName, setNewName] = useStateWithLabel("", "newName");
  const [newNumber, setNewNumber] = useStateWithLabel("", "newNumber");
  const [newSearch, setNewSearch] = useStateWithLabel("", "search");
  const [message, setMessage] = useStateWithLabel(null, "message");
  const [errorMessage, setErrorMessage] = useStateWithLabel(
    null,
    "errorMessage"
  );
  //Functions
  useEffect(() => {
    getAll();
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const personAlreadyExists = () => {
    return persons.find((person) => person.name === newName);
  };

  const addNewPerson = () => {
    personsService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((res) => {
        setPersons(persons.concat(res.data));
        displayNotification(`${newName} was added to phone book.`);
      });
  };

  const updatePerson = () => {
    const personToEdit = persons.find((person) => person.name === newName);
    personsService
      .edit(personToEdit.id, {
        name: newName,
        number: newNumber,
      })
      .then(() => displayNotification(`${newName}'s number was changed.`))
      .catch(() =>
        displayError(`${newName} was already deleted from phonebook`)
      );
  };

  const clearInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const getAll = () => {
    personsService.getAll().then((res) => {
      setPersons(res.data);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (personAlreadyExists()) {
      if (
        window.confirm(
          `${newName} already exists in phonebook. Replace old number with new one?`
        )
      ) {
        updatePerson();

        getAll();
        clearInputs();
      } else {
        clearInputs();
      }
    } else {
      addNewPerson();
      clearInputs();
    }
  };

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const filterPersons = () => {
    const regex = new RegExp(newSearch, "gi");
    return persons.filter((person) => person.name.match(regex));
  };

  const handleDelete = (e) => {
    const { name, id } = e.target.dataset;
    if (window.confirm(`Delete ${name}`)) {
      personsService
        .remove(id)
        .then(() => displayNotification(`${name} was deleted`));

      getAll();
    }
  };

  const displayPersons = () => {
    return filterPersons().map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <button
          onClick={handleDelete}
          data-id={person.id}
          data-name={person.name}
        >
          delete
        </button>
      </div>
    ));
  };

  const displayNotification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const displayError = (errorMessage) => {
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error errorMessage={errorMessage} />
      <Search handleChange={handleSearchChange} newSearch={newSearch} />

      <h3>add a new</h3>
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={handleAdd}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      {displayPersons()}
    </div>
  );
};

//React Modules

const Search = ({ handleChange, newSearch }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleChange} value={newSearch} />
    </div>
  );
};

const Form = ({
  handleNameChange,
  handleNumberChange,
  handleClick,
  newName,
  newNumber,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button onClick={handleClick} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

const Error = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }
  return <div className="error">{errorMessage}</div>;
};

export default App;
