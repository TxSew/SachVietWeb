import { Discount } from "@mui/icons-material";
import { Box, Grid, Stack } from "@mui/material";
import React from "react";

function Sales() {
  return (
    <Grid bgcolor={"#241a32"}>
      <Box>
        <img
          src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/FahasaSaleThu3_W3_T1023_banner_Mainbanner_1920x700.jpg"
          alt=""
        />
      </Box>
      <Grid
        container
        maxWidth={"xl"}
        sx={{
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
          }}
        >
          <img
            src="https://cdn0.fahasa.com/media/wysiwyg/Thang-10-2023/banner-halloween-t3-2.gif"
            alt=""
          />
        </Box>
      </Grid>
      <Grid container maxWidth={"xl"}>
        <Stack margin={"0 auto"} direction={"row"} spacing={3}>
          <Discount />
          <Discount />
        </Stack>
      </Grid>
      <Box width={"10px"} height={"30px"}></Box>
    </Grid>
  );
}

export default Sales;
