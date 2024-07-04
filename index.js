const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://baoppyhossen1234:kHhw4pkN9jvktzQX@cluster0.mkesrbs.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // Appointment
    const appointmentCollection = client
      .db("AppointmentDB")
      .collection("Appointment");
    //Doctor
    const doctorCollection = client.db("DoctorDB").collection("Doctor");
    // Service
    const serviceCollection = client.db("ServiceDB").collection("Service");
    // Service
    const usersCollection = client.db("UsersDB").collection("Users");

    // DoctorSpecialties
    const doctorSpecialtiesCollection = client
      .db("DoctorSpecialtiesDB")
      .collection("Specialties");

    ////////////////////// User Collection ////////////////////////
    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = { email: user?.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({
          massage: "User Already Exists",
          insertedIn: null,
        });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    ////////////////////// Doctor Collection //////////////////////

    //Post Doctor
    app.post("/doctors", async (req, res) => {
      const doctorData = req.body;
      const result = await doctorCollection.insertOne(doctorData);

      res.send(result);
    });

    // Get Multiply Doctor
    app.get("/doctors", async (req, res) => {
      const doctorsData = doctorCollection.find();
      const result = await doctorsData.toArray();

      res.send(result);
    });
    // Get singleDoctor
    app.get("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const doctorData = await doctorCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(doctorData);
    });
    // Patch Doctor
    app.patch("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const editDoctor = req.body;
      const doctorData = await doctorCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: editDoctor }
      );
      res.send(doctorData);
    });
    // DELETE Doctor
    app.delete("/doctors/:id", async (req, res) => {
      const id = req.params.id;
      const doctorDelete = await doctorCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(doctorDelete);
    });

    ////////////////////// Service Collection //////////////////////

    // POST Service
    app.post("/services", async (req, res) => {
      const serviceData = req.body;
      const result = await serviceCollection.insertOne(serviceData);

      res.send(result);
    });
    //GET Multiply Service
    app.get("/services", async (req, res) => {
      const serviceData = serviceCollection.find();
      const result = await serviceData.toArray();

      res.send(result);
    });
    //GET Single Service
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const serviceData = await serviceCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(serviceData);
    });

    // Patch Service
    app.patch("/services/:id", async (req, res) => {
      const id = req.params.id;
      const updatedService = req.body;
      const serviceData = await serviceCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedService }
      );

      res.send(serviceData);
    });
    // DELETE Service
    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const serviceDelete = await serviceCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(serviceDelete);
    });
    ////////////////////// Doctor Specialties Collection //////////////////////

    // GET Doctor Specialties
    app.get("/doctorSpecialties", async (req, res) => {
      const doctorSpecialties = doctorSpecialtiesCollection.find();
      const result = await doctorSpecialties.toArray();

      res.send(result);
    });
    ////////////////////// Appointment Collection //////////////////////

    // POST Appointment
    app.post("/appointment", async (req, res) => {
      const appointData = req.body;
      const result = await appointmentCollection.insertOne(appointData);

      res.send(result);
    });

    console.log("successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Route  is Working");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// pass : kHhw4pkN9jvktzQX
