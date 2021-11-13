import React, { useState, useContext } from "react";
import styled from "styled-components";
import { getPosts, login, getMe } from "../../WebAPI";
import { AuthContext } from "../../context";
import { Link, useHistory } from "react-router-dom";
import { setAuthToken, getAuthToken } from "../../utils";

const RegisterWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;
const RegisterForm = styled.form`
  width: 50%;
  padding: 30px 15px 15px;
  border: 1px solid #000;
`;

const RegisterTitle = styled.h2`
  border-left: 5px solid #e56bfa;
  font-size: 28px;
  font-weight: bold;
  padding-left: 15px;
  margin-bottom: 30px;
`;

const RegisterLabel = styled.label`
  display: block;
  padding-bottom: 15px;
`;
const RegisterInput = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 5px;
  margin-bottom: 15px;
  outline: none;
`;
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
`;
const RegisterButton = styled.button`
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #000;
  background: #fff;
  margin-left: 30px;
  margin-bottom: 15px;
`;

const ToLoginPage = styled(Link)`
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px 0;
  display: block;
  text-align: center;
  text-decoration: none;
  color: red;
  font-size: 18px;
`;
export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          localStorage.removeItem("token");
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };
  return (
    <RegisterWrapper>
      <RegisterForm onSubmit={handleLogin}>
        <RegisterTitle>登入</RegisterTitle>
        <RegisterLabel htmlFor="username">帳號</RegisterLabel>
        <RegisterInput
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <RegisterLabel htmlFor="password">密碼</RegisterLabel>
        <RegisterInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <ButtonDiv>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <RegisterButton>註冊</RegisterButton>
        </ButtonDiv>
        <hr />
        <ToLoginPage to="/register">前往註冊</ToLoginPage>
      </RegisterForm>
    </RegisterWrapper>
  );
}
