import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { register, getMe } from "../../WebAPI";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../context";
import { Link } from "react-router-dom";
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
export default function RegisterPage() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !nickname || !password) {
      return setErrorMessage("資料不齊全");
    }
    register(username, password, nickname).then((data) => {
      if (data.ok === 0) {
        if (data.message === "User exists, please login or change username") {
          return setErrorMessage("帳號已存在");
        }
        return setErrorMessage(data.message.toString());
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
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterTitle>註冊</RegisterTitle>
        <RegisterLabel htmlFor="username">帳號</RegisterLabel>
        <RegisterInput
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <RegisterLabel htmlFor="nickname">暱稱</RegisterLabel>
        <RegisterInput
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
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
        <ToLoginPage to="/login">前往登入</ToLoginPage>
      </RegisterForm>
    </RegisterWrapper>
  );
}
