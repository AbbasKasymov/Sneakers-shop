import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/Navbar/logo.svg";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";

import styled from "styled-components";
import { clientContext } from "../contexts/ClientContext";
import { Avatar, Badge } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";

const Navbar = ({ toggleTheme }) => {
  const data = React.useContext(clientContext);
  const {
    authWithGoogle,
    user,
    logOut,
    cartCount,
    favoritesCount,
    getProduct,
  } = data;
  const location = useLocation("");
  const navigate = useNavigate();
  const filter = new URLSearchParams(location.search);
  const [searchValue, setSearchValue] = useState(filter.get("q") || "");

  const handleFilters = (key, value) => {
    filter.set(key, value);
    navigate(`${location.pathname}?${filter.toString()}`);
    setSearchValue(filter.get("q") || "");

    getProduct(filter.toString());
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Root>
      <BurgerDiv>
        <BurgerMenu
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          style={{ display: "none" }}
        />
      </BurgerDiv>
      <Container>
        <Nav>
          <Link to="/women-sneakers">
            <Button>WOMAN</Button>
          </Link>
          <Link to="/mens-sneakers">
            <Button>MAN</Button>
          </Link>
          <Link to="/">
            <Button>ALL</Button>
          </Link>
        </Nav>
        <div>
          <LogoDiv>
            <LogoH1>
              <YourLogo>YOUR</YourLogo>
              <YourLogoBold>SNEAKERS</YourLogoBold>
            </LogoH1>
            <LogoImg src={logo} alt="" />
          </LogoDiv>
        </div>
        <NavsLogos>
          <div className="box">
            <form name="search">
              <input
                onChange={(e) => handleFilters("q", e.target.value)}
                type="search"
                placeholder="Live search"
                value={searchValue}
                class="input"
                name="txt"
              />
            </form>
          </div>
          <Link to="/cart-page">
            <Badge badgeContent={cartCount} color="error">
              <LocalMallOutlinedIcon
                src=""
                alt=""
                style={{ color: "#a7a7a7" }}
              />
            </Badge>
          </Link>
          <Link to="/favorites">
            <Badge badgeContent={favoritesCount} color="error">
              <StarOutlineOutlinedIcon style={{ color: "#a7a7a7" }} />
            </Badge>
          </Link>

          {user ? (
            <>
              <Avatar
                style={{ marginRight: 10 }}
                src={user.photoURL}
                alt={user.displayName}
              />
              <Button onClick={logOut}>
                <Logout
                  style={{ width: "22px", cursor: "pointer", color: "#a7a7a7" }}
                />
              </Button>
            </>
          ) : (
            <PersonOutlineIcon
              onClick={authWithGoogle}
              style={{ cursor: "pointer", color: "#a7a7a7" }}
            />
          )}
        </NavsLogos>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  width: 100%;
  /* height: 110px; */
  align-items: center;

  /* margin-top: 30px; */
  background-color: ${(props) => props.theme.bg};
`;

const Container = styled.div`
  width: 90%;
  height: 81px;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 30px;
  @media (max-width: 973px) {
    justify-content: center;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: 268px;
  height: 24px;
  font-size: 20px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: ${(props) => props.theme.bg};
  @media (max-width: 973px) {
    display: none;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YourLogo = styled.span`
  font-weight: 400;
  color: rgba(189, 189, 189, 0.5); ;
`;

const LogoH1 = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
  letter-spacing: 3px;
  @media (max-width: 482px) {
    font-size: 24px;
  }
  @media (max-width: 390px) {
    font-size: 16px;
  }
`;
const YourLogoBold = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.text};
`;

const LogoImg = styled.img`
  width: 62px;
  color: ${(props) => props.theme.text} !important;
`;

const NavsLogos = styled.div`
  display: flex;
  flex-direction: row;
  width: 250px;
  height: 40px;
  box-sizing: border-box;

  justify-content: space-between;
  text-align: center;
  align-items: center;
  @media (max-width: 973px) {
    display: none;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

const BurgerDiv = styled.div`
  display: none;
  @media (max-width: 973px) {
    display: flex;
  }
`;

export default Navbar;
