// our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react/cjs/react.production.min";
import Head from "next/dist/next-server/lib/head";
function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    }); // send request to the api/new-meetup, also the folder appeared on the left
    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <Fragment>
        <Head>
            <title>Add a new meetup</title>
            <meta name="description" content="Add your own meetups and create amazing networking opportunities"></meta>
        </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </Fragment>
  );
}
export default NewMeetupPage;
