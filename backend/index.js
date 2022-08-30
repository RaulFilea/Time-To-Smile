const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swagger = require("swagger-ui-express");

const appointments = require("./appointments.json");
const users = require("./users.json");
const patients = require("./patients.json");

const app = express();

app.use(cors());
app.use(bodyParser.json());

function appToHeader({ id, date, time, patient_id, confirmed }) {
  const name = patients[patient_id].name;
  return { id, date, time, patient_id, confirmed, name };
}
function appCopy(id, { date, time, patient_id, confirmed }) {
  return { id, date, time, patient_id, confirmed };
}

function patToHeader ({id, name, email, phone, address, problem}) {
  return {id, name, email, phone, address, problem};
}
function patCopy (id, {name, email, phone, address, problem}) {
  return {id, name, email, phone, address, problem};
}

let nextId =
  Math.max.apply(
    Math,
    Object.keys(appointments).map((n) => parseInt(n, 10))
  ) + 1;

app.get("/appointments", function (_, res) {
  res.send(
    Object.values(appointments)
      .sort((a, b) => a.id - b.id)
      .map(appToHeader)
  );
});

app.post("/appointments", function (req, res) {
  const id = nextId++;
  const appointment = appCopy(id, req.body || {});
  appointments[id] = appointment;
  res.send(appointment);
});

app.get("/appointments/:id", function (req, res) {
  if (appointments.hasOwnProperty(req.params.id)) {
    res.send(appointments[req.params.id]);
  } else {
    res.sendStatus(404);
  }
});

app.put("/appointments/:id", function (req, res) {
  if (appointments.hasOwnProperty(req.params.id)) {
    appointments[req.params.id] = appCopy(req.params.id, req.body || {});
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/appointments/:id", function (req, res) {
  if (appointments.hasOwnProperty(req.params.id)) {
    delete appointments[req.params.id];
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.post("/login", function (req, res) {
  const user = users[req.body.username];
  if (user && user.password === req.body.password) {
    const { password, ...withoutPassword } = user;
    res.send(withoutPassword);
  } else {
    res.sendStatus(401);
  }
});

app.get("/patients", function (_, res) {
  res.send(
    Object.values(patients)
      .sort((a, b) => a.id - b.id)
      .map(patToHeader)
  );
});

app.get("/patients/:name", function (req, res) {
  res.send(
    Object.values(patients)
      .sort((a, b) => a.id - b.id)
      .map(patToHeader)
  );
});

app.post("/patients", function (req, res) {
  const id = nextId++;
  const patient = patCopy(id, req.body || {});
  patients[id] = patient;
  res.send(patient);
});

app.get("/patients/:id", function (req, res) {
  if (patients.hasOwnProperty(req.params.id)) {
    res.send(patients[req.params.id]);
  } else {
    res.sendStatus(404);
  }
});

app.put("/patients/:id", function (req, res) {
  if (patients.hasOwnProperty(req.params.id)) {
    patients[req.params.id] = patCopy(req.params.id, req.body || {});
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/patients/:id", function (req, res) {
  if (patients.hasOwnProperty(req.params.id)) {
    delete patients[req.params.id];
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.use("/", swagger.serve, swagger.setup(require("./swagger.json")));

app.listen(3000, function () {
  console.log('Server listening on port 3000... Press CTRL + C to stop.')
});
