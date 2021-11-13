import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPost } from "../../WebAPI";
import { Link, useParams, useLocation } from "react-router-dom";

const PortWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 15px;
  border: 1px solid #000;
  padding: 10px;
`;
const PostContextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const PortTitle = styled.h1`
  font-size: 32px;
  padding-bottom: 10px;
  word-wrap: break-word;
`;
const PortTime = styled.p`
  padding-bottom: 20px;
`;
const PostContent = styled.div`
  width: 70%;
`;
const PostContentP = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
`;
function PostContext({ post }) {
  return (
    <PostContextWrapper>
      <PostContent>
        <PortTitle>{post[0].title}</PortTitle>
        <PortTime>{new Date(post[0].createdAt).toLocaleString()}</PortTime>
        <PostContentP>{post[0].body}</PostContentP>
      </PostContent>
    </PostContextWrapper>
  );
}
export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState();
  useEffect(() => {
    getPost(id).then((context) => setPost(context));
  }, [id]);
  return <PortWrapper>{post && <PostContext post={post} />}</PortWrapper>;
}
