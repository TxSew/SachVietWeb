import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductItem from "../../../../../components/ProductItem/ProductItem";
import { BaseAPi } from "../../../../../configs/BaseApi";
import useLoading from "../../../../../hooks/useLoading/useLoading";
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
  const { isLoading, startLoading, stopLoading } = useLoading();
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
      startLoading();
      if (products) {
        setTimeout(() => {
          stopLoading();
        }, 2000);
      }
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const props = {};
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
            {!isLoading
              ? Products.map((element: Product, i) => {
                  return (
                    <Grid key={element.id} item md={3} xs={6} sm={6} p={"10px"}>
                      <ProductItem key={i} products={element} />
                    </Grid>
                  );
                })
              : Array.from({ length: Products.length }).map((e, i) => {
                  return (
                    <Grid key={i} item md={3} paddingBottom={4} >
                      <Skeleton
                        variant="rectangular"
                        width={"95%"}
                        height={"170px"}
                      />
                      <Skeleton
                        animation="wave"
                        height={"50px"}
                        width={"95%"}
                        style={{ marginBottom: 6, marginTop: 6 }}
                      />
                      <Stack direction={"row"} justifyContent={"space-around"}>
                        <Skeleton animation="wave" height={50} width="33%" />
                        <Skeleton animation="wave" height={50} width="33%" />
                      </Stack>
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
