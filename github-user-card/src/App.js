import React from 'react';
import axios from "axios";
import CardList from "./components/CardList";
import Search from "./components/Search";
import auth from "./auth";
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: JSON.parse(localStorage.getItem('user')) || {},
      followersData: JSON.parse(localStorage.getItem('followers')) || [],
      user: 'ceedeebee',
      inputValue: ''
    }
  }

  getUserData() {
    axios
      .get(`https://api.github.com/users/${this.state.user}`, { auth })
      .then(res => {
        console.log('User Request');
        localStorage.setItem('user', JSON.stringify(res.data));
        this.setState({ userData: res.data });
      })
      .catch(err => console.log(err));
  }

  getFollowerData() {
    axios
      .get(`https://api.github.com/users/${this.state.user}/followers`, { auth })
      .then(res => {
        console.log('Followers Request');
        res.data.forEach(follower => {
          axios
            .get(follower.url, { auth })
            .then(res => {
              console.log('Follower Request');
              this.setState(prevState => (
                { followersData: [...prevState.followersData, res.data] }
              ));
            })
            .then(() => localStorage.setItem('followers', JSON.stringify(this.state.followersData)))
            .catch(err => console.log(err));
        })
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (!this.state.userData.id) {
      this.getUserData();
    }
    if (!this.state.followersData.length > 0) {
      this.getFollowerData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      this.setState({ followersData: [] });
      this.getUserData();
      this.getFollowerData();
    }
  }

  setUser = e => {
    e.preventDefault();
    this.setState({ user: this.state.inputValue });
    this.setState({ inputValue: '' });
  }

  updateInputValue = e => {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>GitHub Followers</h1>
        <Search setUser={this.setUser} inputValue={this.state.inputValue} updateInputValue={this.updateInputValue} />
        <CardList userData={this.state.userData} followersData={this.state.followersData} />
      </div>
    );
  }
}

export default App;
