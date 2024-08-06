import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from "react";

import { Character, FavoriteItem } from "../types/types";
import { useTheme } from "./../store/useTheme";
import { addFavorite, removeFavorite } from "./../store/services/favoriteSlice";
import { useAppSelector } from "./../store/redux";

export const Card: React.FC<Character> = ({ id, name, image, gender, species, status }) => {
  const dispatch = useDispatch();
  const { pageId } = useParams<{ pageId: string }>();
  const { theme } = useTheme();

  const favoriteItem: FavoriteItem = useMemo(
    () => ({
      id,
      name,
      image,
      gender,
      species,
      status,
    }),
    [id, name, image, gender, species, status]
  );

  const { favorites } = useAppSelector((state) => state.favorites);

  const [isFavorite, setIsFavorite] = useState(favorites.includes(favoriteItem));

  useEffect(() => {
    const isThere = favorites.some((item) => item.id === favoriteItem.id);
    setIsFavorite(isThere);
  }, [favorites, favoriteItem.id]);

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addFavorite(favoriteItem));
    setIsFavorite(true);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(removeFavorite(favoriteItem));
    setIsFavorite(false);
  };

  return (
    <li className="card" role="listitem">
      <div className="manager-panel">
        {!isFavorite && (
          <button
            className={theme === "light" ? "light-to-favorite btn" : "dark-to-favorite btn"}
            onClick={addToFavorite}
          >
            Add
          </button>
        )}

        {isFavorite && (
          <button
            className={theme === "light" ? "light-from-favorite btn" : "dark-from-favorite btn"}
            onClick={removeFromFavorite}
          >
            Remove
          </button>
        )}
      </div>
      <Link
        className={theme === "light" ? "light-card-link" : "dark-card-link"}
        to={`/react2024/page/${pageId}/detail/${id}`}
      >
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
