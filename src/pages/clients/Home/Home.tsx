import { Grid } from "@mui/material";
import Banner from "./components/Banner/Banner";
import Products from "./components/Products/Products";
import CategoryNav from "./components/Category/Category";
import ProductNews from "./components/Products/ProductNew";
import ProductHots from "./components/Products/ProductHot";

function HomePage() {
  return (
    <Grid pb={2} bgcolor={"#eee"}>
      <Banner />
      <CategoryNav />
      <Products />
      <ProductHots />
      <ProductNews />
    </Grid>
  );
}

export default HomePage;
