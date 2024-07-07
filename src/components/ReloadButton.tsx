import { Component } from "react";

export class ReloadButton extends Component {
  render() {
    return (
      <>
        <button className="reload-btn btn" onClick={() => window.location.reload()}>
          Sorry, try again
        </button>
      </>
    );
  }
}
