import React from "react";
import styled from "styled-components";

const AboutWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 15px;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 10px;
`;
const AboutTitle = styled.h2`
  border-left: 5px solid #e56bfa;
  font-size: 30px;
  font-weight: bold;
  padding-left: 15px;
  margin-bottom: 30px;
`;
const AboutContentTitle = styled.h1`
  font-size: 28px;
  padding-bottom: 15px;
  word-wrap: break-word;
  font-weight: bold;
`;
const PostContent = styled.div`
  width: 80%;
  border: 1px solid #bc8cf2;
  border-radius: 5px;
  padding: 20px;
`;
const PostContentP = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export default function AboutPage() {
  return (
    <AboutWrapper>
      <PostContent>
        <AboutTitle>關於我~</AboutTitle>
        <AboutContentTitle>幻幻</AboutContentTitle>
        <PostContentP>
          你好，我是一個前端新手，剛從Lidemy程式導師計畫第五期畢業，學習相關網路知識、前端、基本的後端，像是基礎的php、express、sequlize、MySQL、基本的資安相關知識，XSS、SQL
          Injection、CSRF 與部署，AWS、Heroku、Nginx、PM2。
        </PostContentP>
      </PostContent>
    </AboutWrapper>
  );
}
