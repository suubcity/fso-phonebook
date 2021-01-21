import { promises } from "fs";
import { METHODS } from "http";

//frontend
const toggleImportanceOf = (id) => {
  const url = `http://localhost:3001/notes/${id}`;
  const note = notes.find((n) => n.id === id);
  const changedNote = { ...note, important: !note.important };

  noteService
    .update(id, changedNote)
    .then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
    })
    .catch((error) => {
      setErrorMessage(`Note '${note.content}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
};

//find id from newName
//create new person object
//send both of these to person service
//.then and update the state using only the updated item.

//axios - person service
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

//send url and object to put
//return a .then with res.data (i think its the updated object)

//backend
app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});


//put body into a variable
// create a new object from the body variables..
//use findbyidandupdate to update the database
//.then should return updated object


//then the models folder is accessed to get the mongoose model whcih has the findByIdAndUpdate method on it.


Frontend DOWN

App.js sends a http request by calling a function that is imported from the services folder (services folder is stored in the root directory). 

The services folder uses the axios library and contains the code to send requests to the back end and recieve responses.

The axios library helps convert js objects into json data.



Backend DOWN

Node and Express recieve the http request from axios containing a url and possibly some json data.

The express json parser middleware converts json data back into regular js objects. app.use(express.json());

Express methods are used to handle the http request on the backend server. They take two arguments.

The first argument is the url. When http requests are sent to this url express will run the second argument a function of your choice.

This function has three parammeters req, res and next.

A request object automatically created and passed into req.

This object contains within it many sub objects containing data from the client/frontend side that you can access including, req.params, req.query, and req.body. 

This data can be passed into a mongoose models async operation such as Note.save() to update the monggDB atlas database.

The mongoose model operation returns a thenable. This is pretty much the same as a promise. It returns data from the database that can be sent back up the chain to the front end. 

Backend UP

The .then() method is then called on the thenable. The callback function inside .then() recieves an object as an argument which is some data from the database. Or an error object if the promise is rejected. 

Frontend UP

The Axios http request from earlier returns a promise that will resolve to either a... 
response object (when promise is fullfilled) or... 
an error object (if promise is rejected).

These response or error objects can be accessed in App.js by following the axios function with a .then(res) or .catch(error) method. 

for example someAxiosFunction.then(res => do something with response).catch(error => do something with error).















