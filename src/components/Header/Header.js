import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";
const HeaderWrapper = styled.div`
  height: 64px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d0a8fd67;
  /* padding: 0 32px; */
  margin: 0 auto;
`;
const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  color: #000;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    background: #d0a8fd52;
  `}
  &:hover {
    background: #d0a8fd67;
  }
`;
const NavNoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  &:hover {
    background: #d0a8fd67;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftContainer>
          <NavbarList>
            <Nav to="/" $active={location.pathname === "/"}>
              首頁
            </Nav>
            {user && (
              <Nav to="/new-post" $active={location.pathname === "/new-post"}>
                發布文章
              </Nav>
            )}
          </NavbarList>
        </LeftContainer>
        <Brand to="/">我的React部落格</Brand>
        <NavbarList>
          {!user && (
            <Nav to="/login" $active={location.pathname === "/login"}>
              登入
            </Nav>
          )}
          {user && <NavNoLink onClick={handleLogout}>登出</NavNoLink>}
        </NavbarList>
      </HeaderContainer>
    </HeaderWrapper>
  );
}
