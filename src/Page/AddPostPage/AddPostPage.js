import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addPost } from "../../WebAPI";
import { useHistory } from "react-router-dom";
const AddPortWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 30px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  padding: 15px;
`;
const AddPortForm = styled.form`
  width: 80%;
`;
const AddPortLabel = styled.label`
  display: block;
  padding-bottom: 15px;
`;
const AddPortTitleInput = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 5px;
  margin-bottom: 15px;
  outline: none;
`;
const AddPortBodyTextarea = styled.textarea`
  width: 100%;
  height: 50vh;
  font-size: 18px;
  padding: 5px;
  resize: none;
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
const AddPortButton = styled.button`
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #000;
  background: #fff;
  margin-left: 30px;
`;
export default function AddPostPage() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) {
      return setErrorMessage("資料不齊全");
    }
    addPost(title, body).then((response) => {
      if (response.ok === 0) {
        return setErrorMessage(response.message.toString());
      }
      history.push("/");
    });
  };

  return (
    <AddPortWrapper>
      <AddPortForm onSubmit={handleSubmit}>
        <AddPortLabel htmlFor="title">標題</AddPortLabel>
        <AddPortTitleInput
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <AddPortLabel htmlFor="content">內容</AddPortLabel>
        <AddPortBodyTextarea
          id="content"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <ButtonDiv>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <AddPortButton>提交</AddPortButton>
        </ButtonDiv>
      </AddPortForm>
    </AddPortWrapper>
  );
}
