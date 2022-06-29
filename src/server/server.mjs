import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import router from "./app/controllers/index.mjs";
import { S3Client } from "@aws-sdk/client-s3";
import cors from "cors";

const dsn = "mongodb://127.0.0.1:27017";
const port = 8000;

const s3Config = {
  region: "placeholder",
  endpoint: "http://192.168.1.70:9000/",
  signatureVersion: "v4",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "iZTGjiIwQwHnHPb0",
    secretAccessKey: "TuTIu61K0ahgPAK1eXVvAglHmyijD9Vj",
  },
};

async function main() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    cors(function (req, callback) {
      const allowedHosts = ["http://localhost:3000", "http://localhost:8000"];
      callback(null, {
        origin: allowedHosts.includes(req.header("Origin")),
      });
    })
  );

  const db = await MongoClient.connect(dsn);
  const s3 = new S3Client(s3Config);
  // TODO: close connections properly

  router(app, db.db("gallery"), s3);
  app.listen(port, () => {
    console.error("We are live on " + port);
  });
}

main();
