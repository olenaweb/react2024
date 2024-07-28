import React from "react";
import { useTheme } from "../store/useTheme";
import { CSVLink } from "react-csv";
import { FavoriteItem } from "types/types";

interface PopupProps {
  itemCount: number;
  onDeselectAll: () => void;
  favorites: FavoriteItem[];
}

const Popup: React.FC<PopupProps> = ({ itemCount, onDeselectAll, favorites }) => {
  const { theme } = useTheme();
  const headers = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Image", key: "image" },
    { label: "Gender", key: "gender" },
    { label: "Species", key: "species" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className={theme === "light" ? "popup light-popup" : "popup dark-popup"}>
      <p>Selected {itemCount} items</p>
      <button onClick={onDeselectAll}>Deselect All</button>
      <button>
        <CSVLink
          className="btn download-btn"
          data={favorites}
          headers={headers}
          filename={`${favorites.length}_characters.csv`}
          target="_blank"
        >
          Download
        </CSVLink>
      </button>
    </div>
  );
};

export default Popup;
