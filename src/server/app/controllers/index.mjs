import { DogController } from "./dogs.mjs";

export default function (app, db, s3) {
  new DogController(db, s3).register(app);
}
