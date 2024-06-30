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

    const appointmentCollection = client
      .db("AppointmentDB")
      .collection("Appointment");
    //Doctor
    const doctorCollection = client.db("DoctorDB").collection("Doctor");

    // DoctorSpecialties
    const doctorSpecialtiesCollection = client
      .db("DoctorSpecialtiesDB")
      .collection("Specialties");

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
