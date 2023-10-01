import { Grid } from "@mui/material";
import Banner from "./components/Banner/Banner";
import Products from "./components/Products/Products";
import CategoryNav from "./components/Category/Category";

function HomePage() {
  return (
    <Grid pb={2} bgcolor={"#eee"}>
      <Banner />
      <CategoryNav />
      <Products />
    </Grid>
  );
}

export default HomePage;
