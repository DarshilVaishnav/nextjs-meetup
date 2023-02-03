// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  if (req.method === "POST") {
    const data = req.body;

    // const {title, image, address, description} = data;

    const client = await MongoClient.connect(
      "mongodb+srv://darshil69:Darshil%4069@cluster0.qkawsfc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    // console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
