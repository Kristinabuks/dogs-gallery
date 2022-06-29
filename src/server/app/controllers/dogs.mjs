import multer from "multer";
import { v4 as uuidV4, parse as uuidParse } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { body, validationResult } from "express-validator";
import { fileTypeFromBuffer } from "file-type";

const bucketUrl = "http://localhost:9000/dogs-photo/";
const upload = multer({});

async function validateFile(buffer) {
  if (!(buffer instanceof Buffer)) {
    throw Error();
  }
  const { ext, mime } = await fileTypeFromBuffer(buffer);
  if (!["image/jpeg", "image/png"].includes(mime)) {
    throw Error();
  }
  return ext;
}

class DogController {
  constructor(db, s3) {
    this.db = db;
    this.s3 = s3;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  register(app) {
    app.get("/dogs/:dogId", this.get);
    app.get("/dogs", this.getAll);
    app.post(
      "/dogs",
      upload.single("photo"),
      body("breed").isString().isLength({
        min: 3,
        max: 128,
      }),
      body("description").isString().isLength({
        min: 0,
        max: 512,
      }),
      body("care").isString().isLength({
        min: 0,
        max: 512,
      }),
      this.create
    );
  }

  async get(req, res) {
    const dogId = req.params["dogId"];

    try {
      uuidParse(dogId);
    } catch {
      return res.status(400).send();
    }

    const dog = await this.db.collection("dogs").findOne(
      { dogId },
      {
        projection: {
          _id: 0,
        },
      }
    );
    if (!dog) {
      return res.status(404).send();
    }

    res.send(dog);
  }

  async getAll(req, res) {
    const dogs = (
      await this.db
        .collection("dogs")
        .find(
          {},
          {
            projection: {
              _id: 0,
            },
          }
        )
        .toArray()
    ).map((d) => ({ ...d, photo: bucketUrl + d.photo }));

    res.send(dogs);
  }

  async create(req, res) {
    const dogId = uuidV4();
    let dogPhotoFilename;

    try {
      validationResult(req).throw();
      const ext = await validateFile(req?.file?.buffer);
      dogPhotoFilename = `${dogId}.${ext}`;
    } catch (e) {
      // console.error(e);
      return res.status(400).send();
    }

    await this.s3.send(
      new PutObjectCommand({
        Bucket: "dogs-photo",
        Key: dogPhotoFilename,
        Body: req.file.buffer,
      })
    );

    const insertMeta = await this.db.collection("dogs").insertOne({
      dogId: dogId,
      breed: req.body.breed,
      description: req.body.description,
      care: req.body.care,
      photo: dogPhotoFilename,
    });

    const dog = await this.db.collection("dogs").findOne(
      { _id: insertMeta.insertedId },
      {
        projection: {
          _id: 0,
        },
      }
    );

    res.send(dog);
  }
}

export { DogController };
