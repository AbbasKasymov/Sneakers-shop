import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FiltersBlock = ({ getProduct }) => {
  const location = useLocation("");
  const navigate = useNavigate();
  const filter = new URLSearchParams(location.search);
  const [searchValue, setSearchValue] = useState(filter.get("q") || "");
  const [sizeValue, setSizeValue] = useState(filter.get("sizes") || "");
  const [categoryValue, setCategoryValue] = useState(
    filter.get("menOrWomen") || ""
  );

  const handleFilters = (key, value) => {
    filter.set(key, value);
    navigate(`${location.pathname}?${filter.toString()}`);
    setSearchValue(filter.get("q") || "");
    setSizeValue(filter.get("sizes") || "");
    setCategoryValue(filter.get("menOrWomen") || "");

    getProduct(filter.toString());
  };

  const resetFilter = async () => {
    setSearchValue("");
    setSizeValue("");
    setCategoryValue("");
    navigate("/admin-panel");
    await getProduct();
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container>
      <Inputs
        value={searchValue}
        onChange={(e) => handleFilters("q", e.target.value)}
        type="search"
        placeholder="Live search"
      />
      <Selects
        value={sizeValue}
        onChange={(e) => handleFilters("sizes", e.target.value)}
      >
        <option value="Choose size">Choose size</option>
        <option value="36-42">36-40</option>
        <option value="37-41">37-41</option>
        <option value="38-42">38-42</option>
        <option value="39-41">39-41</option>
        <option value="40-42">40-42</option>
        <option value="41-42">41-43</option>
        <option value="42-44">42-44</option>
      </Selects>
      <Selects
        value={categoryValue}
        onChange={(e) => handleFilters("menOrWomen", e.target.value)}
      >
        <option value="Choose category">Choose category</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
      </Selects>
      <Buttons onClick={resetFilter}>Reset filter</Buttons>
    </Container>
  );
};

const Inputs = styled.input`
  width: 30%;
  margin: 5px;
  border: none;
  padding: 10px;
  border-radius: 15px;
`;
const Selects = styled.select`
  width: 30%;
  margin: 5px;
  border: none;
  padding: 10px;
  border-radius: 15px;
`;
const Buttons = styled.button`
  width: 100%;
  margin: 5px;
  border: none;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
  background: black;
  color: white;
`;
const Container = styled.div`
  width: 90%;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 30px;
`;

export default FiltersBlock;
