import React from 'react';
import axios from "axios";
import CardList from "./components/CardList";
import auth from "./auth";
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: JSON.parse(localStorage.getItem('user')) || {},
      followersData: JSON.parse(localStorage.getItem('followers')) || []
    }
  }

  componentDidMount() {
    if (!this.state.userData.id) {
      axios
        .get("https://api.github.com/users/ceedeebee", { auth })
        .then(res => {
          console.log('User Request');
          localStorage.setItem('user', JSON.stringify(res.data));
          this.setState({ userData: res.data });
        })
        .catch(err => console.log(err));
    }
    if (!this.state.followersData.length > 0) {
      axios
        .get("https://api.github.com/users/ceedeebee/followers", { auth })
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
  }

  render() {
    return (
      <div className="App">
        <h1>GitHub Followers</h1>
        <CardList userData={this.state.userData} followersData={this.state.followersData} />
      </div>
    );
  }
}

export default App;
