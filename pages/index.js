// our-domain.com
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react/cjs/react.production.min";

function HomePage(props) {
  return(
  <Fragment>
    <Head>
      <title>React meetup</title>
      <meta name="description" content="Browse a huge list of highly active React meetups!"></meta>

    </Head>
    <MeetupList meetups={props.meetups}></MeetupList>;
  </Fragment>)
}

//this function runs on the server-side after deployment
// export async function getServerSideProps(context){
//   const req = context.req
//   const res = context.res
//   //fetch data
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

//this will be called first by Next.js, even before the HomePage functional component
export async function getStaticProps() {
  //fetch data via api/meetups. But since this is on server-side, it is meaningless to send request to itself.
  //Instead, we execute the code here.
  const client = await MongoClient.connect(
    "mongodb+srv://quangduy377:5115230a@cluster0.dczf1.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
