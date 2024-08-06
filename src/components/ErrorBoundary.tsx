import { Component, ErrorInfo } from "react";
import errorImage from "../assets/error.jpg";
import ExitButton from "./ExitButton";

interface ErrorProps {
  children: React.ReactNode;
}

interface ErrorState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Caught an error by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="error-page">
            <h2 className="error-title">Something went wrong:-( </h2>
            <ExitButton />
            <div className="error-image-host">
              <img className="error-image" src={errorImage} alt="error" />
            </div>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
