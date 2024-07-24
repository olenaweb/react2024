import "./../App.css";
import { useState, useEffect } from "react";
import { isNotNullable } from "../types/types";
import { Link } from "react-router-dom";

interface Props {
  currentPage: string;
  updateCurrentPage: (page: string) => void;
  nextPage: string | null;
  lastPage: number | null;
}

export default function Pagination({ currentPage, updateCurrentPage, nextPage, lastPage }: Props) {
  const currentPageValue = Number(currentPage) ? currentPage : "1";
  const [page, setPage] = useState<string>(currentPageValue);
  const nextPageValue = nextPage ? Number(nextPage) : null;

  useEffect(() => {
    setPage(currentPageValue);
  }, [currentPageValue]);

  const toFirstPage = () => {
    const prevPage = (0).toString();
    setPage(prevPage);
    updateCurrentPage("1");
  };
  const toPrevPage = () => {
    const prevPage = (parseInt(page) - 1).toString();
    setPage(prevPage);
    updateCurrentPage(prevPage);
  };

  const toNextPage = () => {
    const nextPage = (parseInt(page) + 1).toString();
    setPage(nextPage);
    updateCurrentPage(nextPage);
  };
  const toLastPage = () => {
    if (lastPage) {
      updateCurrentPage(lastPage.toString());
    }
  };

  return (
    <>
      <div className="pagination-panel">
        <Link to={`/react2024/page/1`}>
          <button onClick={toFirstPage} disabled={parseInt(page) == 1}>
            First
          </button>
        </Link>
        <Link to={`/react2024/page/${parseInt(page) <= 1 ? 0 : parseInt(page) - 1}`}>
          <button onClick={toPrevPage} disabled={parseInt(page) <= 1}>
            Prev
          </button>
        </Link>
        <span className="current-page">{Number(page) ? page : currentPageValue}</span>
        <Link to={`/react2024/page/${parseInt(page) + 1}`}>
          <button onClick={toNextPage} disabled={!isNotNullable(nextPageValue)}>
            Next
          </button>
        </Link>
        <Link to={`/react2024/page/${lastPage}`}>
          <button onClick={toLastPage} disabled={parseInt(page) == lastPage}>
            Last
          </button>
        </Link>
      </div>
    </>
  );
}
