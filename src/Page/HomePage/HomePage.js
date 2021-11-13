import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import styled from "styled-components";
import { getPosts } from "../../WebAPI";
import { Link } from "react-router-dom";
const Root = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;
const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  /* width: 20%; */
  color: rgba(0, 0, 0, 0.8);
`;
function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

function PageChange({
  num,
  totalPage,
  handlePrePageChage,
  handleNextPageChage,
}) {
  return (
    <PageChangeWrapper>
      {num !== 1 && (
        <PageChangeButton onClick={handlePrePageChage}>＜</PageChangeButton>
      )}
      <PageChangeP>
        <NowPageSpan>{num}</NowPageSpan> / {totalPage}
      </PageChangeP>

      {num !== totalPage && (
        <PageChangeButton onClick={handleNextPageChage}>＞</PageChangeButton>
      )}
    </PageChangeWrapper>
  );
}
const PageChangeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
`;
const PageChangeButton = styled.button`
  border: none;
  color: red;
  background: none;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
`;
const PageChangeP = styled.p``;
const NowPageSpan = styled.span`
  color: #b28b00;
`;

export default function HomePage() {
  //usePagination
  const [posts, setPosts] = useState([]);
  const [num, setNum] = useState(1);
  const [pagePosts, setPagePosts] = useState([]);
  const totalPost = posts.length;
  const pageSize = 10;
  const totalPage = Math.ceil(totalPost / pageSize);
  const nowPagePost = useCallback(
    (num, pageSize) => {
      setPagePosts(posts.slice((num - 1) * 5, (num - 1) * 5 + pageSize));
    },
    [posts]
  );
  useLayoutEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);
  useEffect(() => {
    nowPagePost(num, pageSize);
  }, [nowPagePost, num]);
  const handlePrePageChage = () => {
    setNum(num - 1);
  };
  const handleNextPageChage = () => {
    setNum(num + 1);
  };
  return (
    <Root>
      {pagePosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <PageChange
        num={num}
        totalPage={totalPage}
        handlePrePageChage={handlePrePageChage}
        handleNextPageChage={handleNextPageChage}
      />
    </Root>
  );
}
