const ErrorButton = () => {
  return (
    <>
      <button className="reload-btn btn" onClick={() => window.location.reload()}>
        Sorry, try again
      </button>
    </>
  );
};

export default ErrorButton;
