import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Grid from "@mui/material/Grid";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="App">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
