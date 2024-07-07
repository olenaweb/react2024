import { Component } from "react";
import { StateAppPage, Response } from "./types/types";
import "./App.css";
import SearchInput from "./components/SearchButton";
import { getData } from "./request/getData";
import { Container } from "./containers/Container";
import { ReloadButton } from "./components/ReloadButton";
import { ErrorButton } from "./components/ErrorButton";
import rickmorty from "./assets/rickmorty.jpg";

class App extends Component<object, StateAppPage> {
  state: StateAppPage = {
    storeValue: "",
    isLoading: false,
    requestData: {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    },
    errorMessage: "",
  };

  constructor(props: object) {
    super(props);
    const localStore: string | null = localStorage.getItem("olena_01_search");
    this.state = {
      storeValue: localStore || "",
      isLoading: false,
      requestData: {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      },
      errorMessage: "",
    };
  }

  updateStoreValue = (value: string) => {
    this.setState({ storeValue: value });
  };

  updateRequestData = (result: Response) => {
    if ("error" in result) {
      this.setState({
        errorMessage: result.error,
        requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
      });
    } else {
      this.setState({ requestData: result, errorMessage: "" });
    }
  };

  updateErrorMessage = (message: string) => {
    this.setState({ errorMessage: message });
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const resultData: Response = await getData(this.state.storeValue);
      if ("error" in resultData) {
        this.setState({
          isLoading: false,
          errorMessage: "**** Sorry, the name is not found. Try another name",
          requestData: { info: { count: 0, pages: 0, next: null, prev: null }, results: [] },
        });
      } else {
        this.setState({ requestData: resultData, isLoading: false, errorMessage: "" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ isLoading: false, errorMessage: "Something's gone wrong :-( " });
    }
  }

  render() {
    return (
      <>
        <div className="search-panel">
          <div className="rick-morty">
            <img className="rick-morty-img" src={rickmorty} alt="RickandMorty" />
          </div>
          <h2 className="search-title">Rick and Morty</h2>
          <SearchInput
            searchValue={this.state.storeValue ? this.state.storeValue : ""}
            updateRequestData={this.updateRequestData}
            updateStoreValue={this.updateStoreValue}
            updateErrorMessage={this.updateErrorMessage}
          />
          <ErrorButton />
        </div>
        <div className="cards-panel">
          {this.state.isLoading ? (
            <p>Loading...</p>
          ) : this.state.errorMessage !== "" ? (
            <div className="error-message">
              {this.state.errorMessage} <ReloadButton />
            </div>
          ) : (
            <Container results={this.state.requestData.results} />
          )}
        </div>
      </>
    );
  }
}

export default App;
