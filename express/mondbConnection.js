import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "nodeJsPractice";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("users");

  //   // insert
  //   await collection.insertOne({ name: "Oscar", age: 22 }, (err) => {
  //     if (err) {
  //       return console.log("Unable to insert user");
  //     }
  //   });

  // query
  const result = await collection.find({ name: "Oscar" }).toArray();
  console.log(result);
}

main();
