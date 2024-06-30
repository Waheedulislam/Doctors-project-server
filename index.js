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
    const doctorCollection = client.db("DoctorDB").collection("Doctor");

    ////////////////////// Doctor Collection //////////////////////

    //Doctor
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

    app.get("/bikes/:id", async (req, res) => {
      const id = req.params.id;
      const bikeData = await bikesCollection.findOne({ _id: new ObjectId(id) });

      res.send(bikeData);
    });

    // Appointments
    app.post("/appointment", (req, res) => {});

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
