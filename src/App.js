import React, { Component } from 'react';

import style from './app.css';

import { AppContent } from './components';

class App extends Component {

  constructor() {
    super()
    this.state = {
      userInfo: null,
      repos: [],
      starred: []
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  getGitHubApiUrl (username, type) {

    const internalUsername = username ? `/${username}` : '';
    const internalType = type ? `/${type}` : '';

    return `https://api.github.com/users${internalUsername}${internalType}`;
  }

  getRepos (type) {

    return e => {

      const username = this.state.userInfo.login;

      fetch(this.getGitHubApiUrl(username, type))
        .then(res => res.json())
        .then(res => {
          
          this.setState({
            [type]: res.map(repo => ({
              name: repo.name,
              link: repo.html_url
            }))
          })
        })
        .catch(err => console.log(err));
    } 
  }

  handleSearch(e) {

    const { value } = e.target;
    const keyCode = e.which || e.keyCode;
    const ENTER = 13;
    const { target } = e;

    if ( keyCode === ENTER ) {

      this.setState({ isFetching: true });

      fetch(this.getGitHubApiUrl(value))
        .then(res => res.json())
        .then(res => {
          this.setState({
            userInfo: {
              username: res.name,
              photo: res.avatar_url,
              login: res.login,
              repos: res.public_repos,
              followers: res.followers,
              following: res.following
            },
            isFetching: false
          })
        })
        .catch(err => console.log(err));
    }
  }

  render() {

    return (
      <AppContent 
        {...this.state}
        handleSearch={ this.handleSearch }
        getRepos={ this.getRepos('repos') }
        getStarred={ this.getRepos('starred') }
      />
    );
  }
}

export default App;
