import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminContext } from "../contexts/AdminContext";
import styled from "styled-components";

const EditProductPage = () => {
  const data = React.useContext(adminContext);
  const { getProductToEdit, productToEdit, saveEditedProduct } = data;

  const params = useParams();

  const Navigate = useNavigate();

  const [editedProduct, setEditedProduct] = useState(productToEdit);

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in editedProduct) {
      let value = editedProduct[key];
      if (typeof value === "string") {
        if (!value.trim()) {
          alert("Fullfill all areas!");
          return;
        }
      }
    }
    saveEditedProduct(editedProduct);
    Navigate("/admin-panel");
  };

  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  useEffect(() => {
    setEditedProduct(productToEdit);
  }, [productToEdit]);

  if (!editedProduct) {
    return <h2>Loading ...</h2>;
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ margin: "40px 0" }}>Edit sneakers</h2>
        <Forms onSubmit={(event) => handleSubmit(event)}>
          <Inputs
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, type: e.target.value })
            }
            value={editedProduct.type}
            type="text"
            placeholder="Type"
          />
          <Inputs
            type="text"
            placeholder="Brand"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, brand: e.target.value })
            }
            value={editedProduct.brand}
          />
          <Inputs
            type="text"
            placeholder="Subtype"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, subtype: e.target.value })
            }
            value={editedProduct.subtype}
          />
          <Inputs
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, desc: e.target.value })
            }
            value={editedProduct.desc}
          />

          <Inputs
            type="text"
            placeholder="Release date"
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                releaseDate: e.target.value,
              })
            }
            value={editedProduct.releaseDate}
          />
          <Inputs
            type="text"
            placeholder="Colorway"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, colorway: e.target.value })
            }
            value={editedProduct.colorway}
          />
          <Inputs
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
            value={editedProduct.price}
          />
          <Inputs
            type="text"
            placeholder="Add picture or URL"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, image: e.target.value })
            }
            value={editedProduct.image}
          />
          <Selects
            name="Sizes"
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, sizes: e.target.value })
            }
            value={editedProduct.sizes}
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
              setEditedProduct({ ...editedProduct, menOrWomen: e.target.value })
            }
            value={editedProduct.menOrWomen}
          >
            <option value="Choose category">Choose category</option>

            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </Selects>
          <Buttons type="submit">Save Changes</Buttons>
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

export default EditProductPage;
