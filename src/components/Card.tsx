import React from "react";
import { Character } from "../types/types";
import { Link, useParams } from "react-router-dom";

export const Card: React.FC<Character> = ({ id, name, image, gender, species, status }) => {
  const { pageId } = useParams<{ pageId: string }>();
  return (
    <li className="card">
      <Link to={`/react2024/page/${pageId}/detail/${id}`}>
        <div className="card-content">
          <p className="card-name">
            <b>{name}</b>
          </p>
          <div>
            <img className="card-image" src={image} alt={name} />
          </div>
          <p>Gender: {gender}</p>
          <p>Species: {species}</p>
          <p className="card-status"> {status}</p>
        </div>
      </Link>
    </li>
  );
};
