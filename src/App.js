import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import Users from './components/Users';
import Blogs from './components/Blogs';
import './App.css';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(results => results.json())
      .then(users => {
        setUsers(users);
      });
  }, []); // <-- Have to pass in [] here!
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(results => results.json())
      .then(blogs => {
        setBlogs(blogs);
      });
  }, []); // <-- Have to pass in [] here!

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/test" component={(props) => <Login setAuthedUser={setAuthedUser} users={users} {...props} />} />
          <Route exact path="/login" component={(props) => <Login setAuthedUser={setAuthedUser} users={users} {...props} />} />
          <PrivateRoute exact path='/home' authedUser={authedUser} component={(props) => <Home setAuthedUser={setAuthedUser} users={users} blogs={blogs} {...props} />} />
          <PrivateRoute exact path="/users" authedUser={authedUser} component={(props) => <Users {...props} />} />
          <PrivateRoute exact path="/blogs" authedUser={authedUser} component={(props) => <Blogs  {...props} />} />
          <PrivateRoute exact path="/blogs/:blogId" authedUser={authedUser} component={(props) => <Blogs blogs={blogs} {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
