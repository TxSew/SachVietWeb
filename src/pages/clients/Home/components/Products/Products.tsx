import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import { color } from "../../../../../Theme/color";
import ProductItem from "../../../../../components/ProductItem/ProductItem";
import { BaseAPi } from "../../../../../configs/BaseApi";
import HttpProductController from "../../../../../submodules/controllers/http/httpProductController";
import { Product } from "../../../../../submodules/models/ProductModel/Product";
interface PropsSort {
  page: number;
  search: string;
  sortBy: string;
  sortWith: string;
  limit: number;
}
function Products() {
  const http = new HttpProductController(BaseAPi);
  const [alignment, setAlignment] = React.useState("web");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const [Products, setProducts] = useState<Product[]>([]);
  const fetchData = async (props: any) => {
    try {
      const productData: any = await http.getAll(props);
      const { products } = productData;
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const props = {
      categoryFilter: "sach-am-nhac",
    };
    fetchData(props);
  }, []);

  return (
    <Box>
      <Container maxWidth={"xl"}>
        <Box pb={2} borderRadius={3} bgcolor={"#fff"}>
          <Box
            mt={3}
            sx={{
              borderTopLeftRadius: 3,
              borderBottom: " 1px solid #eee",
              borderTopRightRadius: 3,
            }}
          >
            <Stack
              sx={{
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              }}
              direction={"row"}
              spacing={2}
              py={2}
              px={2}
              borderBottom={"1px solid #eee"}
            >
              <img
                src="https://cdn0.fahasa.com/skin/frontend/base/default/images/ico_dealhot.png"
                alt=""
              />
              <Typography
                variant="h3"
                sx={{
                  fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.25rem)",
                }}
                fontWeight={"bold"}
              >
                XU HƯỚNG MUA SẮM
              </Typography>
            </Stack>
          </Box>
          <Grid container p={"10px"}>
            {Products.map((element: Product, i) => {
              return (
                <Grid key={i} item md={3} xs={6} sm={6} p={"10px"}>
                  <ProductItem key={i} products={element} />
                </Grid>
              );
            })}
          </Grid>
          <Stack>
            <Button variant="OutlinedRed">Xem thêm</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Products;
