import { Pagination } from "@mui/material";
import React, { useContext } from "react";
import { adminContext } from "../contexts/AdminContext";

const MyPagination = (props) => {
  const data = useContext(adminContext);
  const { totalCount, productsPerPage, handlePagination } = data;
  const totalPages = Math.ceil(totalCount / productsPerPage);

  return (
    <div className="my-pagination">
      <Pagination
        onChange={(_, page) => handlePagination(page)}
        count={totalPages}
        style={{ color: "red" }}
      />
    </div>
  );
};

export default MyPagination;
