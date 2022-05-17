import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import AdminContext from "./contexts/AdminContext";
import ClientContext from "./contexts/ClientContext";
import Navigation from "./Navigation";

const App = () => {
  const lightTheme = {
    bg: "#eee",
    text: "black",
  };
  const darkTheme = {
    bg: "black",
    text: "white",
  };
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <ClientContext>
        <AdminContext>
          <Navigation toggleTheme={toggleTheme} />
        </AdminContext>
      </ClientContext>
    </ThemeProvider>
  );
};

export default App;
