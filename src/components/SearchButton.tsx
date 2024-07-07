import { Component, ChangeEvent, FormEvent } from "react";
import { getData } from "../request/getData";
import { Response } from "../types/types";

interface SearchInputProps {
  searchValue: string;
  updateRequestData?: (result: Response) => void;
  updateStoreValue?: (value: string) => void;
  updateErrorMessage?: (message: string) => void;
}

export default class SearchInput extends Component<SearchInputProps> {
  state: SearchInputProps = {
    searchValue: "",
  };

  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      searchValue: props.searchValue,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await getData(this.state.searchValue.trim());
      console.log('"result="', result);

      if ("error" in result) {
        if (
          this.props.updateStoreValue &&
          this.props.updateRequestData &&
          this.props.updateErrorMessage
        ) {
          this.props.updateErrorMessage("*** Sorry, the name is not found. Try another name");
          this.props.updateStoreValue("");
          localStorage.removeItem("olena_01_search");
        }
      } else {
        localStorage.setItem("olena_01_search", this.state.searchValue.trim());
        if (
          this.props.updateStoreValue &&
          this.props.updateRequestData &&
          this.props.updateErrorMessage
        ) {
          this.props.updateErrorMessage("");
          this.props.updateRequestData(result);
          this.props.updateStoreValue(this.state.searchValue.trim());
        }
      }
    } catch {
      throw new Error("Something's gone wrong :-( ");
    }
  };

  render() {
    return (
      <>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input
            className="search-input"
            type="search"
            id="searchValue"
            value={this.state.searchValue}
            onChange={this.handleChange}
            placeholder="Enter the name"
          />
          <button className="search-button btn" type="submit">
            🔍
          </button>
        </form>
      </>
    );
  }
}
