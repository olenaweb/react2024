import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";

import { RootState, AppDispatch } from "./store/Store";
import { useGetCharactersQuery } from "./store/services/characterApi";
import { setCurrentPage, setLastPage } from "./store/features/paginationSlice";
import { removeFavorite } from "./store/services/favoriteSlice";
import { useTheme } from "./store/useTheme";

import useLocalSearch from "./utils/useLocalSearch";
import SearchInput from "./components/SearchButton";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import Popup from "./components/Popup";
import "./App.css";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { theme, toggleTheme } = useTheme();
  const { pageId } = useParams<{ pageId: string }>(); // Retrieving pageId from URL

  const { currentPage, lastPage } = useSelector((state: RootState) => state.pagination);
  const [storeValue, setStoreValue] = useLocalSearch("olena_01_search", "");

  const {
    data: characterData,
    error,
    isLoading,
  } = useGetCharactersQuery(
    { name: storeValue, page: currentPage },
    {
      refetchOnFocus: true,
    }
  );
  const { favorites } = useSelector((state: RootState) => state.favorites);

  // Initialize currentPage from URL when loading page
  useEffect(() => {
    if (pageId) {
      dispatch(setCurrentPage(pageId));
    }
  }, [pageId, dispatch]);

  const updateStoreValue = (value: string) => {
    setStoreValue(value);
  };

  useEffect(() => {
    if (characterData) {
      dispatch(setLastPage(characterData.info.pages));
    }
  }, [characterData, dispatch]);

  const updateCurrentPage = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  const handleDeselectAll = () => {
    favorites.forEach((item) => dispatch(removeFavorite(item)));
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      favorites
        .map(
          (item) =>
            `${item.id},${item.name},${item.image},${item.gender},${item.species},${item.status}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${favorites.length}_items.csv`);
    link.click();
  };

  const viewContainer = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return (
        <div className="error-message">
          Something's gone wrong :-( <ReloadButton />
        </div>
      );
    } else {
      return (
        <>
          <Container results={characterData?.results || []} />
          <Outlet />
        </>
      );
    }
  }, [isLoading, error, characterData]);

  return (
    <>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "Light" : "Dark"}
      </button>
      <SearchInput
        searchValue={storeValue}
        currentPage={currentPage}
        updateStoreValue={updateStoreValue}
      />

      <Pagination
        currentPage={currentPage}
        nextPage={characterData?.info.next ? characterData.info.next : ""}
        lastPage={lastPage}
        updateCurrentPage={updateCurrentPage}
      />

      <div
        className={
          theme === "light" ? "cards-panel light-cards-panel" : "cards-panel dark-cards-panel"
        }
      >
        {viewContainer}
      </div>
      {favorites.length > 0 && (
        <Popup
          itemCount={favorites.length}
          onDeselectAll={handleDeselectAll}
          onDownload={handleDownload}
        />
      )}
    </>
  );
};

export default App;
