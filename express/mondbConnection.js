import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "nodeJsPractice";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection("users");

  collection.insertMany(
    [
      {
        description: "Clean the house",
        completed: true,
      },
      {
        description: "Renew inspection",
        completed: false,
      },
      {
        description: "Pot plants",
        completed: false,
      },
    ],
    (error, result) => {
      if (error) {
        return console.log("Unable to insert tasks!");
      }

      console.log(result.ops);

      client.close();
    }
  );
  return "done.";
}

main().then(console.log).catch(console.error);
