import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { clientContext } from "../contexts/ClientContext";
import { Badge } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BurgerMenu = () => {
  const data = React.useContext(clientContext);
  const { cartCount, favoritesCount, getProduct } = data;
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
    <Menu>
      <MainDiv>
        <NavDiv>
          <Link to="/women-sneakers">
            <Spans>WOMAN</Spans>
          </Link>
          <Link to="/mens-sneakers">
            <Spans>MAN</Spans>
          </Link>
          <Link to="/">
            <Spans>ALL</Spans>
          </Link>
        </NavDiv>
        <IconsDiv>
          <Link to="/cart-page">
            <Badge badgeContent={cartCount} color="error">
              <Spans>Your Cart</Spans>
            </Badge>
          </Link>
          <Link to="/favorites">
            <Badge badgeContent={favoritesCount} color="error">
              <Spans>Your Favorites</Spans>
            </Badge>
          </Link>
          <Inputs
            onChange={(e) => handleFilters("q", e.target.value)}
            type="search"
            placeholder="Live search"
            value={searchValue}
          />
        </IconsDiv>
      </MainDiv>
    </Menu>
  );
};

const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: space-between;
  /* text-align: center; */
`;
const IconsDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  justify-content: space-between;
  margin-top: 20px;
  /* text-align: center; */
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-between;
  /* text-align: center; */
`;
const Spans = styled.span``;

const Inputs = styled.input`
  height: 20px;
  border-radius: 10px;
  padding: 5px 10px;
  border: none;
`;

export default BurgerMenu;
