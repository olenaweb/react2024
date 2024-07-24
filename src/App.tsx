import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";

import { SuccessResponse, Response } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchButton";
import { getData } from "./request/getData";
import { Container } from "./containers/Container";
import ReloadButton from "./components/ReloadButton";
import useLocalSearch from "./utils/useLocalSearch";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

const App = () => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [storeValue, setStoreValue] = useLocalSearch("olena_01_search", "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<SuccessResponse>({
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>(pageId || "1");

  const [nextPage, setNextPage] = useState<string | null>(requestData.info.next);
  const [lastPage, setLastPage] = useState<number | null>(requestData.info.pages);

  const updateStoreValue = (value: string) => {
    setStoreValue(value);
  };

  const updateRequestData = (result: Response) => {
    if ("error" in result) {
      setErrorMessage(result.error);
      setRequestData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
    } else {
      setRequestData(result);
      setErrorMessage("");
    }
  };

  const updateErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const updateCurrentPage = (page: string) => {
    setCurrentPage(page);
    navigate(`/react2024/page/${page}`);
  };
  const updateNextPage = (page: string | null) => {
    setNextPage(page);
  };
  const updateLastPage = (page: number | null) => {
    setLastPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const resultData: Response = await getData(storeValue, currentPage);
        if ("error" in resultData) {
          setIsLoading(false);
          setErrorMessage("Sorry, the name is not found. Try another name");
          setRequestData({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
        } else {
          setRequestData(resultData);
          setIsLoading(false);
          setErrorMessage("");
          updateNextPage(resultData.info.next);
          updateLastPage(resultData.info.pages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setErrorMessage("Something's gone wrong :-( ");
      }
    };

    fetchData();
  }, [storeValue, currentPage]);

  const viewContainer = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    } else if (errorMessage !== "") {
      return (
        <div className="error-message">
          {errorMessage} <ReloadButton />
        </div>
      );
    } else {
      return (
        <>
          <Container results={requestData.results} />
          <Outlet />
        </>
      );
    }
  }, [isLoading, errorMessage, requestData]);

  return (
    <>
      <SearchInput
        searchValue={storeValue}
        currentPage={currentPage}
        updateRequestData={updateRequestData}
        updateStoreValue={updateStoreValue}
        updateErrorMessage={updateErrorMessage}
        updateCurrentPage={updateCurrentPage}
      />

      <Pagination
        currentPage={currentPage}
        updateCurrentPage={updateCurrentPage}
        nextPage={nextPage}
        lastPage={lastPage}
      />

      <div className="cards-panel">{viewContainer}</div>
    </>
  );
};

export default App;
