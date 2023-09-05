import { Box, Container, Stack, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { color } from "../../../../../Theme/color";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ProductItem from "../../../../../components/ProductItem/ProductItem";

function Products() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
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
              bgcolor={color.pink}
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
              <ToggleButton value={"web"}>Xu Hướng Theo Ngày</ToggleButton>
              <ToggleButton value={"sale"}> Sách HOT - Giảm Sốc</ToggleButton>
              <ToggleButton value={"bestSealer"}>
                BestSeller - Ngoại văn
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid container spacing={1} mt={2} pb={2}>
            {[12, 5, 3,  5, 5, 3, 5, 4, 5, 6].map((e,i) => {
              return (
                <Grid key={i} item xs={2.4}>
                  <ProductItem />
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

export default Products;
