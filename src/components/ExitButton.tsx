import { Link, redirect } from "react-router-dom";

const ExitButton = () => {
  const exit = () => {
    redirect(`/react2024/`);
  };
  return (
    <>
      <p>Sorry, try back</p>
      <button className="reload-btn btn" onClick={exit}>
        <Link to={`/react2024/page/1`}>Sorry, try again</Link>
      </button>
    </>
  );
};

export default ExitButton;
