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

      target.disabled = true;

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
            }
          })

          target.disabled = false;
        })
        .catch(err => console.log(err));
    }
  }

  render() {

    const { userInfo, repos, starred } = this.state;
    
    return (
      <AppContent 
        userInfo={ userInfo }
        repos={ repos }
        starred={ starred }
        handleSearch={ e => this.handleSearch(e) }
        getRepos={ this.getRepos('repos') }
        getStarred={ this.getRepos('starred') }
      />
    );
  }
}

export default App;
