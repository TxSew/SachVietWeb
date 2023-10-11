import { Grid } from "@mui/material";
import React from "react";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import NavAdmin from "../components/NavAdmin/NavAdmin";

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
