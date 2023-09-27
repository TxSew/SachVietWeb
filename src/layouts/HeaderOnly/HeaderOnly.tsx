import { Box } from "@mui/material";
import React from "react";
import Header from "../components/Header/Header";

function HeaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <Box className="App">
      <Header />
      {children}
    </Box>
  );
}

export default HeaderOnly;
