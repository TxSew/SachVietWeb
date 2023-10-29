import { Grid } from "@mui/material";
import Banner from "./components/Banner/Banner";
import Products from "./components/Products/Products";
import CategoryNav from "./components/Category/Category";
import ProductsHot from "./components/ProductWith/ProductsHot";

function HomePage() {
  return (
    <Grid
      pb={2}
      bgcolor={"#eee"}
      sx={{
        overflow: "hidden",
      }}
    >
      <Banner />
      <CategoryNav />
      <Products />
      <ProductsHot />
    </Grid>
  );
}

export default HomePage;
