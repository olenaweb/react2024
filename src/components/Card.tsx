import { Component } from "react";
import { Character } from "../types/types";

export class Card extends Component<Character> {
  constructor(props: Character) {
    super(props);
  }
  render() {
    return (
      <li className="card">
        <div className="card-content">
          <p className="card-name">
            <b>{this.props.name}</b>
          </p>
          <div>
            <img className="card-image" src={this.props.image} />
          </div>
          <p>Gender: {this.props.gender}</p>
          <p>Species: {this.props.species}</p>
          <p className="card-status"> {this.props.status}</p>
        </div>
      </li>
    );
  }
}
