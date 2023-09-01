import { Grid } from "@mui/material";
import Banner from "./components/Banner/Banner";
import Category from "./components/Category/Category";
import Products from "./components/Products/Products";

function HomePage() {
  return (
    <Grid pb={2} bgcolor={"#eee"}>
      <Banner />
      <Category />
      <Products />
    </Grid>
  );
}

export default HomePage;
