import EventItem from "../components/EventItem";
import { json, useRouteLoaderData, redirect } from "react-router-dom";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");
  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.id;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ params, request, uuuo }) {
  const eventId = params.id;
  console.log("kcndkcndnckd",eventId, uuuo)
  const response = fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  console.log("deleteres",response)

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }

  return redirect('/events');
}
