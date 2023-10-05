import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Grid } from "@mui/material";
import NavAdmin from "../components/NavAdmin/NavAdmin";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="App">
      <HeaderAdmin />
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <NavAdmin />
        </Grid>
        <Grid item xs={10} px={5}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminLayout;
