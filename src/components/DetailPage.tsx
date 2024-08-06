import { useParams } from "react-router-dom";
import { useGetCharacterByIdQuery } from "../store/services/characterApi";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";
import { useTheme } from "./../store/useTheme";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: characterDataId, error, isLoading } = useGetCharacterByIdQuery(id!);
  const { theme } = useTheme();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  let location = "";
  if (characterDataId?.location) {
    location = characterDataId.location.name ?? "";
  }

  return (
    <div className={theme === "light" ? "light-detail" : "dark-detail"}>
      <Link className="detail-page-exit" to={`/react2024`}>
        <span>⨉</span>
      </Link>
      <h3>Detail for ID: {characterDataId?.id}</h3>
      <h3>{characterDataId?.name}</h3>
      <img src={characterDataId?.image} alt={characterDataId?.name} />
      <p>Status: {characterDataId?.status}</p>
      <p>Species: {characterDataId?.species}</p>
      <p>Gender: {characterDataId?.gender}</p>
      <p>Type: {characterDataId?.type}</p>
      <p>Location: {location}</p>
      <p>Created: {characterDataId?.created}</p>
    </div>
  );
};

export default DetailPage;
