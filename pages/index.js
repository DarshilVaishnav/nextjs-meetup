// import { useEffect, useState } from "react";

import { MongoClient } from "mongodb";
import Head from "next/head";

const { default: MeetupList } = require("@/components/meetups/MeetupList");

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://thumbs.dreamstime.com/z/ellis-bridge-ahmedabad-century-old-situated-gujarat-india-bridges-western-eastern-parts-city-across-124476810.jpg",
//     address: "Some address abc",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://thumbs.dreamstime.com/z/ellis-bridge-ahmedabad-century-old-situated-gujarat-india-bridges-western-eastern-parts-city-across-124476810.jpg",
//     address: "Some address pqr",
//     description: "This is a second meetup",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image:
//       "https://thumbs.dreamstime.com/z/ellis-bridge-ahmedabad-century-old-situated-gujarat-india-bridges-western-eastern-parts-city-across-124476810.jpg",
//     address: "Some address xyz",
//     description: "This is third meetup",
//   },
// ];

function HomePage(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  //   useEffect(() => {
  //       setLoadedMeetups(DUMMY_MEETUPS);
  //   },[]);
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://darshil69:Darshil%4069@cluster0.qkawsfc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
