import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPost } from "../../WebAPI";
import { useParams } from "react-router-dom";

const PortWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 15px;
  min-height: calc(100vh - 64px);
`;
const PostContextWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
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
  width: 80%;
  border: 1px solid #bc8cf2;
  border-radius: 5px;
  padding: 20px;
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
