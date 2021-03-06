import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "../../context";
import { getAuthToken } from "../../utils";

import HomePage from "../../Page/HomePage";
import ListPage from "../../Page/ListPage";
import LoginPage from "../../Page/LoginPage";
import RegisterPage from "../../Page/RegisterPage";
import PostPage from "../../Page/PostPage";
import AboutPage from "../../Page/AboutPage";
import AddPostPage from "../../Page/AddPostPage";
import Header from "../Header";
import { getMe } from "../../WebAPI";

const Root = styled.div`
  padding-top: 64px;
  background: #eeeeee78;
`;
function App() {
  const [user, setUser] = useState(null);
  const token = getAuthToken();
  useLayoutEffect(() => {
    if (token) {
      getMe().then((response) => {
        if (response.ok !== 1) {
          localStorage.removeItem("token");
        }
        setUser(response.data);
      });
    }
  }, [token]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/list">
              <ListPage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <AddPostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
