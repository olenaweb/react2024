import { Component } from "react";

interface ErrorState {
  errorState: boolean;
}

export class ErrorButton extends Component {
  state: ErrorState = {
    errorState: false,
  };

  createError = () => {
    this.setState({ errorState: true });
  };

  componentDidUpdate() {
    if (this.state.errorState) {
      throw new Error('New Error was created by press button "Create Error"');
    }
  }

  render() {
    return (
      <button className="search-error-button btn" onClick={this.createError}>
        Create Error
      </button>
    );
  }
}
