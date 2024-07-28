import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/features/paginationSlice";
import { useGetCharactersQuery } from "../store/services/characterApi";
import ErrorButton from "./ErrorButton";
import rickmorty from "./../assets/rickmorty.jpg";
import "./../App.css";
import { useTheme } from "./../store/useTheme";

interface SearchInputProps {
  searchValue: string;
  currentPage?: string;
  updateStoreValue?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchValue, updateStoreValue }) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const dispatch = useDispatch();
  const { refetch } = useGetCharactersQuery({ name: inputValue.trim(), page: "1" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // localStorage.setItem("olena_01_search", inputValue.trim());
    if (updateStoreValue) {
      updateStoreValue(inputValue.trim());
    }
    dispatch(setCurrentPage("1"));
    refetch();
  };

  return (
    <div
      className={
        theme === "light" ? "search-panel light-search-panel" : "search-panel dark-search-panel"
      }
    >
      <div className="rick-morty">
        <img className="rick-morty-img" src={rickmorty} alt="Rick and Morty" />
      </div>
      <h2
        className={
          theme === "light" ? "search-title light-search-panel" : "search-title dark-search-panel"
        }
      >
        Rick and Morty
      </h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          id="searchValue"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter the name"
        />
        <button className="search-button btn" type="submit">
          🔍
        </button>
      </form>
      <ErrorButton />
    </div>
  );
};

export default SearchInput;
