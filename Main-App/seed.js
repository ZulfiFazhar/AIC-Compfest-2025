import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "raksha-ai";

const users = [
  {
    _id: new ObjectId("68a7eb4bf6d83a2cfa472ccc"),
    name: "John Doe",
    email: "john@email.com",
    emailVerified: false,
    createdAt: new Date("2025-08-22T04:00:11.218Z"),
    updatedAt: new Date("2025-08-22T04:00:11.218Z"),
  },
];

const cameras = [
  {
    _id: new ObjectId(),
    name: "Lobby Camera",
    location: "Main Lobby",
    ipAddress: "192.168.1.101",
    status: "online",
    streamUrl: "rtsp://...",
    addedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "Parking Lot",
    location: "North Parking",
    ipAddress: "192.168.1.102",
    status: "online",
    streamUrl: "rtsp://...",
    addedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "Gate 1",
    location: "Main Entrance",
    ipAddress: "192.168.1.103",
    status: "offline",
    streamUrl: "rtsp://...",
    addedAt: new Date(),
  },
  {
    _id: new ObjectId(),
    name: "Fence Line",
    location: "Perimeter",
    ipAddress: "192.168.1.104",
    status: "online",
    streamUrl: "rtsp://...",
    addedAt: new Date(),
  },
];

const events = [
  {
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: "Person Detected",
    severity: "high",
    cameraId: cameras[0]._id,
  },
  {
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: "Suspicious Object",
    severity: "medium",
    cameraId: cameras[1]._id,
  },
  {
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: "Vehicle Entry",
    severity: "low",
    cameraId: cameras[2]._id,
  },
  {
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    type: "Perimeter Breach",
    severity: "high",
    cameraId: cameras[3]._id,
  },

  ...Array(4)
    .fill(0)
    .map(() => ({
      timestamp: new Date(),
      type: "Pencurian",
      severity: "high",
      cameraId: cameras[Math.floor(Math.random() * cameras.length)]._id,
    })),
  ...Array(3)
    .fill(0)
    .map(() => ({
      timestamp: new Date(),
      type: "Vandalisme",
      severity: "medium",
      cameraId: cameras[Math.floor(Math.random() * cameras.length)]._id,
    })),
  ...Array(2)
    .fill(0)
    .map(() => ({
      timestamp: new Date(),
      type: "Perkelahian",
      severity: "medium",
      cameraId: cameras[Math.floor(Math.random() * cameras.length)]._id,
    })),
  ...Array(1)
    .fill(0)
    .map(() => ({
      timestamp: new Date(),
      type: "Kecelakaan",
      severity: "low",
      cameraId: cameras[Math.floor(Math.random() * cameras.length)]._id,
    })),

  {
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    type: "Logged In",
    severity: "info",
    userId: users[0]._id.toHexString(),
  },
  {
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    type: "Viewed Camera Feed",
    severity: "info",
    userId: users[0]._id.toHexString(),
    details: { cameraId: cameras[0]._id },
  },
];

const systemStatus = {
  systemStatus: "Secure",
  activeCameras: 3,
  totalCameras: 4,
  alertsToday: 12,
  highPriorityAlerts: 2,
  averageResponseTime: 1.2,
  lastUpdatedAt: new Date(),
};

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    await db.collection("users").deleteMany({});
    await db.collection("cameras").deleteMany({});
    await db.collection("events").deleteMany({});
    await db.collection("system_status").deleteMany({});

    await db.collection("users").insertMany(users);
    console.log("Seeded users");

    await db.collection("cameras").insertMany(cameras);
    console.log("Seeded cameras");

    await db.collection("events").insertMany(events);
    console.log("Seeded events");

    await db.collection("system_status").insertOne(systemStatus);
    console.log("Seeded system status");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

seedDatabase();
