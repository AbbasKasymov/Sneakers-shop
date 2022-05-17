import { Container, Table, TableContainer } from "@mui/material";
import { useContext, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { clientContext } from "../contexts/ClientContext";
import styled from "styled-components";

import * as React from "react";

const FavoritesPages = () => {
  const data = useContext(clientContext);
  const {
    getProductsFromFavorites,
    myFavorites,
    addProductToCart,
    checkProductInCart,
    deleteProductInCart,
  } = data;

  useEffect(() => {
    getProductsFromFavorites();
  }, []);

  if (!myFavorites) {
    return <h2>Loading...</h2>;
  }
  if (myFavorites.products.legth === 0) {
    return <h2>Favorites is empty</h2>;
  }

  return (
    <React.Fragment>
      <div>
        <Container>
          <Title>Favorites</Title>
          <TableContainer component={Paper} style={{ marginBottom: "40px" }}>
            <Table sx={{ minWidth: 320 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name of item</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">About sneakers</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myFavorites.products.map((item) => (
                  <TableRow
                    key={item.product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      {item.product.subtype}
                    </TableCell>
                    <TableCell align="center">
                      <img width={100} src={item.product.image} alt="" />
                    </TableCell>
                    <TableCell align="center">
                      {item.product.price} USD
                    </TableCell>
                    <TableCell align="center">{item.product.desc}</TableCell>
                    <TableCell>
                      {checkProductInCart(item.id) ? (
                        <BMButton onClick={() => deleteProductInCart(item.id)}>
                          Add to cart
                        </BMButton>
                      ) : (
                        <BMButton onClick={() => addProductToCart(item)}>
                          Add to cart
                        </BMButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </React.Fragment>
  );
};

const Title = styled.h2`
  margin: 20px 0;
`;

const BMButton = styled.button`
  width: 200px;
  background: black;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  font-weight: 700;
  padding: 5px 0;
  /* margin-top: 10px; */
  cursor: pointer;
`;

export default FavoritesPages;
