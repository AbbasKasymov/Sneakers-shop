import React, { useContext } from "react";
import styled from "styled-components";
import AddProduct from "../components/AddProduct";
import AdminProductCard from "../components/AdminProductCard";
import FiltersBlock from "../components/FiltersBlock";
import MyPagination from "../components/MyPagination";
import { adminContext } from "../contexts/AdminContext";

const AdminPanel = () => {
  const data = useContext(adminContext);
  const { getProduct, products: sneakers } = data;

  return (
    <PageContent>
      <AddProduct />
      <FiltersBlock getProduct={getProduct} sneakers={sneakers} />
      <DivContent>
        {sneakers.map((item) => (
          <AdminProductCard key={item.id} item={item} />
        ))}
      </DivContent>
      <DivPag>
        <MyPagination />
      </DivPag>
    </PageContent>
  );
};

const DivContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 50px 0;
  column-gap: 20px;
  row-gap: 20px;
`;
const PageContent = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const DivPag = styled.div`
  display: flex;
  margin: 60px auto;
`;

export default AdminPanel;
