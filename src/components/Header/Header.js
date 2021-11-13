import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  background: #fff;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
  box-sizing: border-box;
`;

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
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
    background: rgba(0, 0, 0, 0.1);
  `}
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
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>我的React部落格</Brand>
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
      <NavbarList>
        {!user && (
          <Nav to="/login" $active={location.pathname === "/login"}>
            登入
          </Nav>
        )}
        {user && <NavNoLink onClick={handleLogout}>登出</NavNoLink>}
      </NavbarList>
    </HeaderContainer>
  );
}
