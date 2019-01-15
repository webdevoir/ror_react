import React from 'react';
import { Link } from 'react-router-dom';
import {Api} from '../middleware/api'

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkState = this.checkState.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleClick() {
    console.log("handleClick");
    var username = this.refs.username.value;
    var fullname = this.refs.fullname.value;
    Api.createUser(username, fullname);
  }

  checkState() {
    console.dir(this.state);
  }

  componentDidMount() {
    // this.setState({loaded: true});
    // Api.getUsers(this.setUsers);
    $.getJSON('/api/v1/user.json', (response) => {
      console.dir(response);
      this.setState({users: response});
    });
  }

  render() {
    return(
      <div>
        <h1 className="hello">I'm a user list</h1>
        <Link to="/">Home</Link>
        <input ref="username" placeholder="Username" />
        <input ref="fullname" placeholder="Full Name" />
        <a className="btn btn-default" onClick={this.handleClick} >New User</a>
        <a className="btn btn-default" onClick={this.checkState} >Check State</a>
      </div>
    )
  }
}

export default UserList
