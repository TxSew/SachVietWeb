import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import { color } from "../../../../../Theme/color";
import ProductItem from "../../../../../components/ProductItem/ProductItem";
import { BaseAPi } from "../../../../../configs/BaseApi";
import HttpProductController from "../../../../../submodules/controllers/http/httpProductController";
import { Product } from "../../../../../submodules/models/ProductModel/Product";
import useLoading from "../../../../../hooks/useLoading/useLoading";
interface PropsSort {
  page: number;
  search: string;
  sortBy: string;
  sortWith: string;
  limit: number;
}

function ProductsHot() {
  const http = new HttpProductController(BaseAPi);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [alignment, setAlignment] = React.useState("web");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const [Products, setProducts] = useState<Product[]>([]);
  const fetchData = async () => {
    try {
      const productData: any = await http.getAll();
      startLoading();
      const { products } = productData;
      if (products) {
        setTimeout(() => {
          stopLoading();
        }, 1000);
      }
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Container
        maxWidth={"xl"}
        style={{
          overflow: "hidden",
        }}
      >
        <Box
          pb={2}
          borderRadius={3}
          bgcolor={"#fff"}
          sx={{
            overflow: "hidden",
          }}
        >
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
              bgcolor={"#ccc"}
            >
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/icon_dealhot_new.png"
                alt=""
              />
              <Typography
                variant="h3"
                sx={{
                  fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.25rem)",
                  textTransform: "uppercase",
                }}
                fontWeight={"bold"}
              >
                THƯƠNG HIỆU NỔI BẬT
              </Typography>
            </Stack>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{
                py: "10px",
                pl: "10px",
              }}
            >
              <ToggleButton value={"web"}>Sài gòn BOOK</ToggleButton>
              <ToggleButton value={"bestSealer"}>Đinh tị</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={1} mt={2} pb={2}>
            {!isLoading
              ? Products.map((element: Product, i) =>
                  element ? (
                    <Grid key={i} item md={4} lg={2.4} xs={12} sm={6}>
                      <ProductItem key={i} products={element} />
                    </Grid>
                  ) : (
                    <Grid item md={4} lg={2.4} xs={12} sm={6}>
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={118}
                      />
                      <Skeleton
                        animation="wave"
                        height={20}
                        width={"50%"}
                        style={{ marginBottom: 6, marginTop: 6 }}
                      />
                      <Skeleton animation="wave" height={50} width="80%" />
                    </Grid>
                  )
                )
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 3].map(() => {
                  return (
                    <Grid item md={4} lg={2.4} xs={12} sm={6} paddingBottom={4}>
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={118}
                      />
                      <Skeleton
                        animation="wave"
                        height={20}
                        width={"50%"}
                        style={{ marginBottom: 6, marginTop: 6 }}
                      />
                      <Skeleton animation="wave" height={50} width="80%" />
                    </Grid>
                  );
                })}
          </Grid>
          <Stack>
            <Button variant="outlined">Xem thêm</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductsHot;
