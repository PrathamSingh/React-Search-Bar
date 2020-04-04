import React from "react";
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      searchResult: [],
      userData: {},
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({ value: event.target.value }, () =>
      fetch(`https://api.github.com/search/users?q=${this.state.value}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log("data", data);
          this.setState({ searchResult: data.items || [] });
        })
    );
  };

  handleCardClick = (data) => {
    fetch(`https://api.github.com/users/${data.login}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log("user data", data);
      this.setState({ userData: data || {} });
    })
  }

  render() {
    const { value, searchResult } = this.state;
    return (
      <>
        <input
          className="inputField"
          name="value"
          value={value}
          placeholder="type to begin..."
          onChange={this.handleChange}
        />
        {searchResult.length > 0 && (
          <div className="cards-container">
            {searchResult.map(data =>
              <div
              className="card"
              key={data.node_id}
              onClick={() => this.handleCardClick(data)}
              >
                <div className="avatar">
                  <img src={data.avatar_url} alt="avatar" />
                </div>
                <div>
                  <div>{data.login}</div>
                  <div>score: {data.score}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
