import {
  Box,
  Container,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { color } from "../../../Theme/color";
import ProductItem from "../../../components/ProductItem/ProductItem";
import Tabbar from "./components/Tabbar";

function Category() {
  const [age, setAge] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChanges = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box bgcolor={"#eee"} py={3}>
      <Container maxWidth={"xl"}>
        <Grid container bgcolor={color.white} py={3} px={3}>
          <Grid item xs={3}>
            <Tabbar />
          </Grid>
          <Grid item xs={9}>
            <Box>
              <Stack direction={"row"} spacing={3}>
                <Typography mr={2} variant="h2">
                  Sắp xếp theo:
                </Typography>
                <Select
                  sx={{
                    px: "20px",
                    py: "4px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <Select
                  sx={{
                    px: "20px",
                    py: "4px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Stack>
            </Box>
            <Box mt={3}>
              <Stack direction={"row"} flexWrap={"wrap"}>
                {Array.from({ length: 8 }).map((item) => {
                  return (
                    <Grid item xs={3}>
                      {/* <ProductItem products={item} /> */}
                    </Grid>
                  );
                })}
              </Stack>
              <Stack mt={2} spacing={2}>
                <Pagination count={10} page={page} onChange={handleChanges} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Category;
