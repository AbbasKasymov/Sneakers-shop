import React, { useState } from "react";
import styled from "styled-components";
import { adminContext } from "../contexts/AdminContext";

const AddProduct = () => {
  const data = React.useContext(adminContext);
  const { addProduct, getProduct } = data;

  const [newProduct, setNewProduct] = useState({
    type: "",
    brand: "",
    subtype: "",
    desc: "",
    releaseDate: "",
    colorway: "",
    price: "",
    image: "",
    sizes: "",
    menOrWomen: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in newProduct) {
      let value = newProduct[key];
      if (typeof value === "string") {
        if (!value.trim()) {
          alert("Fullfill all areas");
          return;
        }
      }
      getProduct();
    }
    addProduct(newProduct);
    setNewProduct({
      type: "",
      brand: "",
      subtype: "",
      desc: "",
      releaseDate: "",
      colorway: "",
      price: "",
      image: "",
      sizes: "",
      menOrWomen: "",
      feedbacks: [],
      likes: 0,
    });
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ margin: "40px 0" }}>Add sneakers</h2>
        <Forms onSubmit={(event) => handleSubmit(event)}>
          <Inputs
            onChange={(e) =>
              setNewProduct({ ...newProduct, type: e.target.value })
            }
            value={newProduct.type}
            type="text"
            placeholder="Type"
          />
          <Inputs
            type="text"
            placeholder="Brand"
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            value={newProduct.brand}
          />
          <Inputs
            type="text"
            placeholder="Subtype"
            onChange={(e) =>
              setNewProduct({ ...newProduct, subtype: e.target.value })
            }
            value={newProduct.subtype}
          />
          <Inputs
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setNewProduct({ ...newProduct, desc: e.target.value })
            }
            value={newProduct.desc}
          />

          <Inputs
            type="text"
            placeholder="Release date"
            onChange={(e) =>
              setNewProduct({ ...newProduct, releaseDate: e.target.value })
            }
            value={newProduct.releaseDate}
          />
          <Inputs
            type="text"
            placeholder="Colorway"
            onChange={(e) =>
              setNewProduct({ ...newProduct, colorway: e.target.value })
            }
            value={newProduct.colorway}
          />
          <Inputs
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            value={newProduct.price}
          />
          <Inputs
            type="text"
            placeholder="Add picture or URL"
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            value={newProduct.image}
          />
          <Selects
            name="Sizes"
            onChange={(e) =>
              setNewProduct({ ...newProduct, sizes: e.target.value })
            }
            value={newProduct.sizes}
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
            name="Men/Women"
            onChange={(e) =>
              setNewProduct({ ...newProduct, menOrWomen: e.target.value })
            }
            value={newProduct.menOrWomen}
          >
            <option value="Choose category">Choose category</option>

            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </Selects>
          <Buttons type="submit">Add product</Buttons>
        </Forms>
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 90%;
  background: transparent;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
`;

const Forms = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
`;
const Inputs = styled.input`
  width: 47%;
  margin: 5px;
  border: none;
  padding: 10px;
  border-radius: 15px;
`;
const Selects = styled.select`
  width: 48.5%;
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

export default AddProduct;
