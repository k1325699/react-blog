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
  margin-top: 30px;
  min-height: calc(100vh - 64px);
`;
const PostContainer = styled.div`
  border: 1px solid #bc8cf2;
  padding: 16px;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  & + & {
    margin-top: 15px;
  }
`;

const PostTitle = styled(Link)`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
  color: #333;
  text-decoration: none;
  line-height: 1.5;
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
  color: #aa14f0;
  background: none;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
`;
const PageChangeP = styled.p``;
const NowPageSpan = styled.span`
  color: #bc8cf2;
`;

export default function HomePage() {
  //usePagination
  const [posts, setPosts] = useState([]);
  const [num, setNum] = useState(1);
  const [pagePosts, setPagePosts] = useState([]);
  const totalPost = posts.filter((post) => post.title.length >= 20).length;
  const pageSize = 10;
  const totalPage = Math.ceil(totalPost / pageSize);
  posts.map((post) => console.log(post.title.length));
  const nowPagePost = useCallback(
    (num, pageSize) => {
      setPagePosts(
        posts
          .filter((post) => post.title.length >= 20)
          .slice((num - 1) * pageSize, (num - 1) * pageSize + pageSize)
      );
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
