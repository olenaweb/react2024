import errorImage from "./../assets/error.jpg";
import "./../App.css";
import ExitButton from "../components/ExitButton";
import { useTheme } from "./../store/useTheme";

export default function ErrorPage() {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={theme === "light" ? "error-page light-error-page" : "error-page dark-error-page"}
      >
        <h2 className="error-title">There nothing here:-( </h2>
        <ExitButton />
        <div className="error-image-host">
          <img className="error-image" src={errorImage} alt="error" />
        </div>
      </div>
    </>
  );
}
