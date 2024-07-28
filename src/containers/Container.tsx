import React from "react";
import { Card } from "../components/Card";
import { Props } from "../types/types";

export const Container: React.FC<Props> = ({ results }) => {
  return (
    <ul className="cards">
      {results.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </ul>
  );
};
