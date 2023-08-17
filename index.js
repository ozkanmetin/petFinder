// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

const title = "Pet Finder";

// GET - / - returns homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    let counter = 0;
    let petList = `<h1>${title} : All Pets</h1>`;
    pets.map((pet) => {
        counter++;
        let appts = "";
        pet.appointments.map((appointment) => {
            appts += `<br>>> Date/Time: ${appointment.date} ${appointment.time} 
                    Reason: ${appointment.reason}`;
        });
        petList += `<b>Pet ${counter}</b><br>
                    Name: ${pet.name}<br>
                    Breed: ${pet.breed}<br>
                    Age: ${pet.age}<br>
                    Owner: ${pet.owner}<br>
                    Phone: ${pet.telephone}<br>
                    Appointment(s): ${appts}<br><br>`;
    });
    res.send(petList);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query.owner;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    let appts = "";
    pet.appointments.map((appointment) => {
        appts += `<br>>> Date/Time: ${appointment.date} ${appointment.time} 
                  Reason: ${appointment.reason}`;
    });
    res.send(`<h1>${title} : Find a pet by owner</h1>
              Name: ${pet.name}<br>
              Breed: ${pet.breed}<br>
              Age: ${pet.age}<br>
              Owner: ${pet.owner}<br>
              Phone: ${pet.telephone}<br>
              Appointment(s): ${appts}`);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    let appts = "";
    pet.appointments.map((appointment) => {
        appts += `<br>>> Date/Time: ${appointment.date} ${appointment.time} 
                  Reason: ${appointment.reason}`;
    });
    res.send(`<h1>${title} : Find a pet by name</h1>
              Name: ${pet.name}<br>
              Breed: ${pet.breed}<br>
              Age: ${pet.age}<br>
              Owner: ${pet.owner}<br>
              Phone: ${pet.telephone}<br>
              Appointment(s): ${appts}`);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;