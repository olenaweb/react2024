import { Component } from "react";
import { Card } from "../components/Card";
import { Props } from "../types/types";

export class Container extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <ul className="cards">
        {this.props.results.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </ul>
    );
  }
}
