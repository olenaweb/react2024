import { useLoaderData } from "react-router-dom";
import { Character } from "../types/types";
import { Link } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Loader from "./../components/Loader";

const DetailPage = () => {
  const data = useLoaderData() as Character;
  const navigation = useNavigation();
  let name = "";
  let location = "";
  if (data.origin) {
    name = data.origin.name ?? "";
  }
  if (data.location) {
    location = data.location.name ?? "";
  }
  const ContentDetail = () => {
    return (
      <>
        <Link className="detail-page-exit" to={`/react2024`}>
          <span>⨉</span>
        </Link>
        <h2>Detail for ID: {data.id}</h2>
        <img src={data.image} alt={data.name} />
        <p>
          <b>Name: {data.name}</b>
        </p>
        <p>Status: {data.status}</p>
        <p>Species: {data.species}</p>
        <p>Type: {data.type}</p>
        <p>Gender: {data.gender}</p>
        <p>Origin: {name}</p>
        <p>Location: {location}</p>
        <p>Created: {data.created}</p>
      </>
    );
  };

  return (
    <>
      {navigation.state === "loading" ? (
        <div className="detail-page">
          <Loader />
        </div>
      ) : (
        <ContentDetail />
      )}
    </>
  );
};

export default DetailPage;
