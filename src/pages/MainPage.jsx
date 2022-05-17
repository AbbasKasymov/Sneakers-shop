import React from "react";
import ClientProduct from "../components/ClientProduct";

const MainPage = ({ toggleTheme }) => {
  return (
    <div>
      <ClientProduct toggleTheme={toggleTheme} />
    </div>
  );
};

export default MainPage;
